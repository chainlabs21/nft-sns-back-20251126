import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { FiChevronDown } from "react-icons/fi"; 
import {useNavigate} from 'react-router-dom';

export default function UploadMintNFT() {
  const navigate = useNavigate()
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
  const [showAlert, setShowAlert] = useState(false);
  const [previewCleared, setPreviewCleared] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(false);
    setPreviewCleared(false);
    setProgress(0);
  };

  const handleCancelFile = () => {
    setFile(null);
    setIsUploaded(false);
    setPreviewCleared(true);
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    setIsUploaded(false);
    setShowAlert(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsUploaded(true);
          setShowAlert(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // ✅ Dropdown Component with white arrow
  const CustomDropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full cursor-pointer focus:outline-none focus:border-cyan-500 flex items-center justify-between"
        >
          <span>{value || "Select category"}</span>
          <FiChevronDown
            className={`text-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
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
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center py-8 px-6 sm:px-10 font-sans relative">
        {/* ✅ Reduced top padding (py-8 instead of py-16) */}

        {/* ✅ Success Alert */}
        {showAlert && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-[#131316] border border-cyan-500 text-white px-5 py-5 rounded-xl shadow-lg text-sm sm:text-base flex items-center gap-2 transition-all">
            <img src="check (1).png" alt="check" className="object-contain" />
            Uploaded to IPFS successfully!
          </div>
        )}

        {/* Header */}
        <div className="w-full max-w-6xl mb-8 text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 glow">
            Upload & Mint NFT
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md">
            Create and mint your digital masterpiece on the blockchain
          </p>
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Upload Section */}
          <div className="bg-[#13131680] border border-[#18181B] rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between h-[500px] transition-all duration-300">
            <div>
              <h2 className="text-xl font-semibold mb-4">Upload Asset</h2>

              {/* Upload Area */}
              <label className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-cyan-500 transition overflow-hidden min-h-[240px]">
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {file && file.type.startsWith("image/") ? (
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="object-contain w-full h-full rounded-lg"
                    />
                    <button
                      onClick={handleCancelFile}
                      type="button"
                      className="absolute top-0 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 text-4xl flex items-center justify-center pb-2.5"
                    >
                      ×
                    </button>
                  </div>
                ) : previewCleared ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                    <img
                      src="item.png"
                      alt="Upload Icon"
                      className="w-16 h-16 object-contain opacity-50 mb-2"
                    />
                    <p>Click below to upload a new file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-10">
                    <img
                      src="item.png"
                      alt="Upload Icon"
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <p className="text-gray-300 mb-1">
                      {file ? (
                        <span className="text-cyan-400 font-medium">
                          {file.name}
                        </span>
                      ) : (
                        "Drop your file here or click to browse"
                      )}
                    </p>
                    <p className="text-gray-500 text-xs">
                      JPG, PNG, GIF, MP4, WebM (Max 100MB)
                    </p>
                  </div>
                )}
              </label>

              {/* Upload progress */}
              <div className="mt-5 transition-all duration-300">
                {(isUploading || isUploaded) && (
                  <>
                    <div className="flex justify-between items-center text-sm text-gray-300 mb-3">
                      <span>{isUploaded ? "Upload Complete" : "Uploading"}</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner mb-2">
                      <div
                        className="h-full bg-cyan-500 transition-all duration-200 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee,0_0_30px_#22d3ee]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {isUploaded && (
                      <div className="flex items-center gap-2 text-cyan-500 font-medium text-sm mb-5">
                        <img
                          src="check (1).png"
                          alt="check"
                          className="object-contain"
                        />
                        <span>Uploaded to IPFS successfully!</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={handleUpload}
                disabled={isUploaded}
                className={`transition-all w-[320px] py-2 rounded-lg font-semibold text-base ${
                  isUploaded
                    ? "bg-[#0a0a0a] text-cyan-500 border border-cyan-500 cursor-default"
                    : "bg-cyan-500 hover:bg-cyan-600 text-black"
                }`}
              >
                {isUploaded ? "Uploaded" : "Upload to IPFS"}
              </button>

              <button className="bg-[#0d0d0d] border-2 border-[#18181B] hover:bg-gray-700 transition-all px-8 py-2 rounded-lg font-semibold text-gray-400 text-md flex items-center gap-2 >" onClick={() => navigate("/nftmodals")} >
                <img src="eye.png" alt="Preview" />
                Preview
              </button>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="bg-[#13131680] border border-[#18181B] rounded-2xl p-6 sm:p-8 shadow-md">
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
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full focus:outline-none focus:border-cyan-500"
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
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 h-24 w-full focus:outline-none focus:border-cyan-500"
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
                  placeholder="digital-art, nft, crypto (comma-separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 text-gray-300 w-full focus:outline-none focus:border-cyan-500"
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
                  className="bg-[#09090B4D] border border-[#18181B] rounded-md p-3 w-full text-gray-300 focus:outline-none focus:border-cyan-500"
                />
                <p className="text-gray-500 text-xs mt-1">
                  You’ll receive this royalty on secondary sales (0–50%)
                </p>
              </div>
              <label className="flex items-start gap-3 mt-2 relative">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="p-2 appearance-none rounded-full border-2 border-cyan-500 bg-black checked:bg-cyan-500 cursor-pointer relative"
                />
                {confirmed && (
                  <span className="absolute left-1 -top-0.5 flex items-center justify-center text-gray-900 font-bold">
                    ✓
                  </span>
                )}
                <span className="text-gray-400 text-sm leading-snug">
                  I confirm that I own all rights to this content and have
                  permission to mint it as an NFT.
                </span>
              </label>
              <button
                disabled={!confirmed}
                className={`w-full py-2 rounded-md font-semibold mt-4 transition-all ${
                  confirmed
                    ? "bg-cyan-500 hover:bg-cyan-600 text-black"
                    : "bg-[#09090B4D] text-gray-600 cursor-not-allowed border border-[#18181B]"
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
