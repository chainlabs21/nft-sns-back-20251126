import React, { useState } from "react";
import Navbar from "./navbar";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "./config";
import AnimatedAlert from "./Alertanimated"; // animated alert component

export default function UploadMintNFT() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [royalty, setRoyalty] = useState(5);
  const [confirmed, setConfirmed] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewCleared, setPreviewCleared] = useState(false);
  const [itemId, setItemId] = useState(null);

  // Animated alert state
  const [alert, setAlert] = useState({ message: "", type: "" });

  const token = localStorage.getItem("token"); // JWT token stored in localStorage

  // ===========================
  // 🔥 File Change
  // ===========================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(false);
    setPreviewCleared(false);
    setProgress(0);
  };

  // ===========================
  // ❌ Cancel file (remove preview)
  // ===========================
  const handleCancelFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreviewCleared(true);
    setIsUploaded(false);
    setProgress(0);
  };

  // Animate progress smoothly
  const animateProgress = (target) => {
    let current = progress;
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
        setProgress(target);
      } else {
        current += 1; // increment step
        setProgress(current);
      }
    }, 10); // 10ms per step, adjust for speed
  };


  // ===========================
  // 🚀 Upload handler
  // ===========================
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    setIsUploaded(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("event_id", 1); // optional

      const response = await axios.post(
        `${BASE_URL}/api/upload-item-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            animateProgress(percent);
          },
        }
      );

      setIsUploading(false);
      setIsUploaded(true);
      setItemId(response.data.item_id);

      setAlert({ message: "File uploaded successfully!", type: "success" });
    } catch (err) {
      console.error("Upload error:", err);
      setIsUploading(false);
      setIsUploaded(false);
      setAlert({ message: "File upload failed!", type: "error" });
    }
  };

  // ===========================
  // Mint NFT
  // ===========================
  const handleMint = async () => {
    if (!itemId) {
      setAlert({ message: "Please upload the file first!", type: "error" });
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/update-item-metadata`,
        {
          item_id: itemId,
          title,
          description,
          category,
          tags,
          royalty,
          event_id: 1, // optional
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({ message: "NFT minted successfully!", type: "success" });

    } catch (err) {
      console.error("Mint NFT error:", err);
      setAlert({ message: "Failed to mint NFT!", type: "error" });
    }
  };

  // ===========================
  // Dropdown Component
  // ===========================
  const CustomDropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full cursor-pointer flex items-center justify-between"
        >
          <span>{value || "Select category"}</span>
          <FiChevronDown
            className={`text-white transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          />
        </div>

        {isOpen && (
          <ul className="absolute z-50 w-full mt-1 bg-[#131316] border border-[#18181B] rounded-md max-h-48 overflow-auto">
            {options.map((option) => (
              <li
                key={option}
                className="px-3 py-2 cursor-pointer text-white hover:bg-cyan-500"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      {/* Animated Alert */}
      {alert.message && (
        <AnimatedAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center py-8 px-6 sm:px-10 font-sans relative">
        {/* Header */}
        <div className="w-full max-w-6xl mb-8 text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold glow">
            Upload & Mint NFT
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md">
            Create and mint your digital masterpiece on the blockchain
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Upload Card */}
          <div className="bg-[#13131680] border border-[#18181B] rounded-2xl p-6 shadow-md h-[500px] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Upload Asset</h2>
              <label className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-cyan-500 transition overflow-hidden min-h-[240px]">
                {!file && (
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                )}

                {file && file.type.startsWith("image/") ? (
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="object-contain w-full h-full rounded-lg"
                    />
                    <button
                      onClick={handleCancelFile}
                      className="absolute -top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 pb-1.5 text-2xl flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : file && file.type.startsWith("video/") ? (
                  <div className="relative w-full h-48">
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="object-contain w-full h-full rounded-lg"
                    />
                    <button
                      onClick={handleCancelFile}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 text-xl flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : previewCleared ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <img
                      src="item.png"
                      className="w-16 h-16 opacity-50 mb-2"
                    />
                    <p>Click to upload a new file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-10">
                    <img src="item.png" className="w-16 h-16 mb-2" />
                    <p className="text-gray-300 mb-1">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-gray-500 text-xs">
                      JPG, PNG, MP4, WebM (Max 100MB)
                    </p>
                  </div>
                )}
              </label>

              {(isUploading || isUploaded) && (
                <div className="mt-5">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>{isUploaded ? "Upload Complete" : "Uploading..."}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleUpload}
                disabled={isUploaded || !file}
                className={`transition-all w-[320px] py-2 rounded-lg font-semibold ${isUploaded
                  ? "bg-black text-cyan-500 border border-cyan-500"
                  : "bg-cyan-500 hover:bg-cyan-600 text-black"
                  }`}
              >
                {isUploaded ? "Uploaded" : "Upload"}
              </button>

              <button
                className="bg-[#0d0d0d] border-2 border-[#18181B] hover:bg-gray-700 px-8 py-2 rounded-lg font-semibold text-gray-400 flex items-center gap-2"
                onClick={() => navigate("/nftmodals")}
              >
                <img src="eye.png" alt="Preview" />
                Preview
              </button>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="bg-[#13131680] border border-[#18181B] rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">NFT Metadata</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-1 block">
                  Title<span className="text-cyan-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter NFT title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-1 block">
                  Description<span className="text-cyan-500">*</span>
                </label>
                <textarea
                  placeholder="Describe your NFT"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 h-24 w-full"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-1 block">
                  Category
                </label>
                <CustomDropdown
                  value={category}
                  onChange={setCategory}
                  options={["Art", "Music", "Video", "Photography"]}
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-1 block">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="digital-art, nft, crypto"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-1 block">
                  Royalty Percentage
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={royalty}
                  onChange={(e) => setRoyalty(e.target.value)}
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full"
                />
              </div>
              <label className="flex items-start gap-3 mt-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="
        w-5 h-5 
        appearance-none 
        border-2 border-cyan-500 
        rounded-full 
        bg-black 
        checked:bg-cyan-500
        cursor-pointer
      "
                  />

                  {confirmed && (
                    <Check
                      size={15}
                      className="text-white absolute top-2.75 left-2.75 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  )}
                </div>

                <span className="text-gray-400 text-sm">
                  I confirm that I own all rights to this content.
                </span>
              </label>



              <button
                disabled={!confirmed}
                onClick={handleMint}
                className={`w-full py-2 rounded-md font-semibold mt-4 transition-all ${confirmed
                  ? "bg-cyan-500 hover:bg-cyan-600 text-black"
                  : "bg-[#09090B4D] text-gray-600 cursor-not-allowed"
                  }`}
              >
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
