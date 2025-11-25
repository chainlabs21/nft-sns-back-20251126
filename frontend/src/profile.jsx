// ProfileSettings.jsx
import React, { useEffect, useState } from "react";
import { X, Save, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.jsx";

const API_BASE = "http://localhost:5000";

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // profile state
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState("avatarusrer 1.png");

  // wallet display
  const [walletAddress, setWalletAddress] = useState("—");
  const [walletConnected, setWalletConnected] = useState(false);

  const token = localStorage.getItem("token");

  const authHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // fetch profile + wallet
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/api/user/profile`, {
          method: "GET",
          headers: authHeaders(),
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Failed to fetch profile");
        }

        const data = await res.json();
        const profileData = data.profile; // <-- FIXED: destructure profile

        if (isMounted && profileData) {
          setFullName(profileData.full_name || "");
          setBio(profileData.bio || "");
          setTwitter(profileData.twitter || "");
          setInstagram(profileData.instagram || "");
          setWebsite(profileData.website || "");
          setAvatar(profileData.avatar || "avatarusrer 1.png");

          if (profileData.wallet_address) {
            setWalletAddress(profileData.wallet_address);
            setWalletConnected(true);
          }
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        if (isMounted) setError(err.message || "Failed to load profile");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => { isMounted = false; };
  }, [token, navigate]);

  const handleEditToggle = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const body = { full_name: fullName, bio, twitter, instagram, website };

      const res = await fetch(`${API_BASE}/api/user/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update profile");
      }

      setAlert("profileSaved");
      setIsEditing(false);
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err.message || "Failed to save changes");
      setAlert("profileSaveFailed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Profile Settings
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage your creator profile and settings
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border border-[#18181B] bg-[#09090B4D] text-white font-semibold hover:bg-[#1a1a1a] transition-all text-sm sm:text-base"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold hover:opacity-90 transition-all flex items-center gap-2 text-sm sm:text-base"
                  disabled={saving}
                >
                  <Save className="w-5 h-5 flex-none" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditToggle}
                  className="px-3 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold hover:opacity-90 transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <img src="Edit.png" alt="Edit" className="w-5 h-5 flex-none object-contain" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md border border-[#18181B] bg-[#09090B4D] text-white font-semibold hover:bg-[#1a1a1a] flex items-center gap-2 text-sm sm:text-base"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center shadow-md border border-[#18181B]">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#111111] flex items-center justify-center overflow-hidden">
                <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
                {fullName || "Creator Name"}
              </h2>
              <p className="text-gray-400 text-sm">Creator</p>
            </div>

            {/* Wallet */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-3 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white uppercase flex items-center gap-2">
                <img src="Vector.png" alt="Wallet" className="w-4 h-4 flex-none object-contain" />
                Wallet
              </h3>
              <p className="text-sm text-gray-300">Connection Status</p>
              <div className="flex items-center gap-2">
                <div className={`inline-block w-2 h-2 rounded-full ${walletConnected ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-sm font-semibold">{walletConnected ? "Connected" : "Not Connected"}</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">Connected Address</p>
              <div className="text-sm bg-[#09090B4D] px-6 py-2 rounded-md text-gray-400 border border-[#18181B] break-words">
                {walletAddress || "—"}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 bg-[#13131680] rounded-xl p-5 sm:p-8 space-y-6 shadow-md border border-[#18181B]">
            <h3 className="text-lg font-semibold text-white">Profile Information</h3>

            {loading ? (
              <div className="text-gray-400">Loading profile...</div>
            ) : error ? (
              <div className="text-red-400">Error: {error}</div>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-white mb-1">Display Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-1">Bio / About</label>
                  <textarea
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 focus:outline-none resize-none ${
                      isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                </div>

                <h4 className="text-sm text-white uppercase mb-4 sm:mb-6">Social Links</h4>
                <div className="space-y-6 sm:space-y-8">
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://your-twitter.com"
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://your-instagram.com"
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://your-website.com"
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                </div>

                <div className="pt-4 border-t border-[#18181B]">
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 sm:px-5 sm:py-3 bg-red-500 hover:bg-red-600 rounded-md text-sm sm:text-base font-large flex items-center gap-2"
                  >
                    <img src="logout.png" alt="Logout" className="w-4 h-4 flex-none object-contain" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Alert Box */}
      {alert && (
        <div className={`fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 bg-[#09090B] border rounded-xl px-5 sm:px-6 py-4 w-80 sm:w-96 shadow-lg transition-all duration-300 z-50 ${
          alert === "profileSaved" ? "border-cyan-500" : "border-red-500"
        }`}>
          <button onClick={() => setAlert(null)} className="absolute top-2 right-2 text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-white text-lg font-semibold mb-1">
            {alert === "profileSaved" ? "Profile Updated" : "Error"}
          </h2>
          <p className="text-gray-400 text-sm">
            {alert === "profileSaved"
              ? "Your profile changes have been saved successfully."
              : "There was an error saving your profile. Please try again."}
          </p>
        </div>
      )}
    </div>
  );
}
