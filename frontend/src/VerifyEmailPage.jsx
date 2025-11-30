import React, { useState, useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedAlert from "./Alertanimated";

export default function VerifyEmailPage() {
  const navigate = useNavigate();

  // Read temp_user_id into state so we can react to it predictably
  const [userId, setUserId] = useState(() => localStorage.getItem("temp_user_id"));
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(100); // keep as you currently have it

  // If there's no userId we DON'T auto-redirect to /register.
  // Instead we show a helpful alert and let the user choose to go register.
  useEffect(() => {
    if (!userId) {
      setAlert({
        type: "error",
        message: "No verification session found. Please register or login to request a verification code.",
      });
    }
    // We intentionally do NOT navigate away automatically here.
    // This prevents a brief flash/redirect which hides the success alert later.
  }, [userId]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      setAlert({ type: "error", message: "Enter the verification code" });
      return;
    }

    if (!userId) {
      setAlert({ type: "error", message: "No verification session. Please register first." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, code: otp }),
      });

      const data = await response.json();
      // helpful debugging (remove in production)
      // console.log("verify response:", response.status, data);

      if (response.ok) {
        // SHOW SUCCESS ALERT FIRST
        setAlert({ type: "success", message: "Email verified! Redirecting to Login..." });

        // Wait for user to see the alert, then remove temp id and redirect.
        // Do NOT remove temp_user_id immediately — some other components might read it and redirect.
        setTimeout(() => {
          try {
            localStorage.removeItem("temp_user_id");
            setUserId(null);
          } catch {
            // ignore
          }
          navigate("/profile");
        }, 1700); // 1.7s gives the AnimatedAlert a chance to appear
      } else {
        setAlert({ type: "error", message: data.message || "Verification failed" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!userId) {
      setAlert({ type: "error", message: "No verification session. Please register first." });
      return;
    }

    setResendLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert({ type: "success", message: "Verification code resent!" });
        setTimer(100); // keep consistent with initial timer
      } else {
        setAlert({ type: "error", message: data.message || "Failed to resend OTP" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Something went wrong. Try again later." });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-white relative">
      {alert && (
        <AnimatedAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="mb-5 flex justify-center">
        <Mail className="w-14 h-14 text-cyan-400" />
      </div>

      <h1 className="text-3xl font-bold mb-3 text-center glow">Verify Your Email</h1>
      <p className="text-gray-400 mb-6 text-center text-sm sm:text-base">
        Enter the 6-digit verification code sent to your email
      </p>

      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-black rounded-2xl p-6 sm:p-8 border border-[#18181B] shadow-[0_0_20px_rgba(36,203,245,0.3)] transition-all duration-300"
      >
        {/* OTP Input */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2">Verification Code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter code"
            maxLength={6}
            className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Countdown */}
        <div className="text-right text-sm text-gray-400 mb-4">
          Expires in: {formatTime(timer)}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold text-black text-base bg-gradient-to-r from-[#24CBF5] to-[#9952E0] hover:opacity-90 transition-opacity"
        >
          {loading ? "Verifying..." : "Verify Email"}
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Resend OTP */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading || timer > 0}
            className={`text-sm ${resendLoading || timer > 0 ? "text-gray-600 cursor-not-allowed" : "text-cyan-400 hover:underline"}`}
          >
            {resendLoading ? "Resending..." : "Resend Code"}
          </button>
        </div>

        {/* If there's no session, show actions */}
        {!userId && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-3">No verification session found.</p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md border border-[#18181B] text-white"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md bg-cyan-500 text-black"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
