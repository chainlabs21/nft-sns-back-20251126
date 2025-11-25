const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = "your_jwt_secret_here";

// -------------------------
// DB CONNECTION
// -------------------------
const db = mysql.createPool({
  host: "151.106.113.26",
  user: "nftsns02",
  password: "NN9CNXJ3",
  database: "nftsns",
  port: 55681,
});

// -------------------------
// JWT
// -------------------------
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email || null,
      wallet_address: user.wallet_address || null,
      role: user.role || "User",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}


function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// -------------------------
// USER SIGNUP (FORM)
// -------------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)",
      [full_name, email, hashedPassword, role]
    );

    return res.status(201).json({
      message: "Account created successfully",
      user_id: result.insertId,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// LOGIN
// -------------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user_id: user.id,
      wallet_connected: !!user.wallet_address,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// WALLET REGISTER / LINK
// -------------------------
app.post("/api/auth/register-wallet", async (req, res) => {
  try {
    const { wallet_address, role, user_id } = req.body;

    if (!wallet_address)
      return res.status(400).json({ message: "Wallet address is required" });

    // -------------------------
    // CASE 1: Wallet linking after signup
    // -------------------------
    if (user_id) {
      const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
        user_id,
      ]);

      if (users.length === 0)
        return res.status(404).json({ message: "User not found" });

      await db.query(
        "UPDATE users SET wallet_address = ?, role = ? WHERE id = ?",
        [wallet_address, role || users[0].role, user_id]
      );

      const updatedUser = {
        ...users[0],
        wallet_address,
        role: role || users[0].role,
      };

      const token = generateToken(updatedUser);

      return res.json({
        message: "Wallet linked successfully",
        user_id,
        token,
      });
    }

    // -------------------------
    // CASE 2: Direct Wallet Login or New Wallet Signup
    // -------------------------
    const [existing] = await db.query(
      "SELECT * FROM users WHERE wallet_address = ?",
      [wallet_address]
    );

    let user;

    if (existing.length > 0) {
      user = existing[0];
    } else {
      const [result] = await db.query(
        "INSERT INTO users (wallet_address, role) VALUES (?, ?)",
        [wallet_address, role || "User"]
      );

      user = {
        id: result.insertId,
        wallet_address,
        role: role || "User",
      };
    }

    const token = generateToken(user);

    return res.json({
      message:
        existing.length > 0
          ? "Wallet login successful"
          : "Wallet registered successfully",
      user_id: user.id,
      token,
    });
  } catch (err) {
    console.error("Wallet register/login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, bio, twitter, instagram, website, wallet_address FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ profile: rows[0] });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const { full_name, bio, twitter, instagram, website } = req.body;

    await db.query(
      `UPDATE users 
       SET full_name = ?, bio = ?, twitter = ?, instagram = ?, website = ?
       WHERE id = ?`,
      [full_name, bio, twitter, instagram, website, req.user.id]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// app.get("/api/user/wallet-status", authMiddleware, async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       "SELECT wallet_address FROM users WHERE id = ?",
//       [req.user.id]
//     );

//     if (rows.length === 0)
//       return res.status(404).json({ message: "User not found" });

//     const wallet = rows[0].wallet_address;

//     res.json({
//       wallet_address: wallet,
//       connected: !!wallet
//     });
//   } catch (err) {
//     console.error("Wallet status error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });










app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
