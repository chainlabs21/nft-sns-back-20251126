import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function SubmitEntryModal() {
  const [selectedNFT, setSelectedNFT] = useState("Choose an NFT to submit");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    "My Artwork #1",
    "My Artwork #2",
    "My Artwork #3",
    "My Artwork #4",
    "My Artwork #5",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-[#131316] text-white rounded-2xl p-6 w-full max-w-md md:max-w-lg shadow-2xl border border-[#2b2b2b]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Submit Your Entry</h2>
          <button className="text-gray-300 hover:text-white text-2xl font-bold -translate-y-1">
            ×
          </button>
        </div>

        {/* Dropdown */}
        <div className="mb-5">
          <label className="block text-sm mb-2 text-gray-300">
            Select NFT from My Collection
          </label>
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="flex justify-between items-center w-full bg-[#0f0f0f] text-gray-300 border border-[#2b2b2b] rounded-lg px-3 py-2 text-sm cursor-pointer select-none"
            >
              {selectedNFT}
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>

            {open && (
              <div className="absolute mt-1 w-full bg-[#0f0f0f] border border-[#2b2b2b] rounded-lg shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
                {options.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedNFT(option);
                      setOpen(false);
                    }}
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-cyan-500/20 cursor-pointer transition"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Text */}
        <div className="flex items-start text-gray-400 text-sm border border-[#1F1F23] p-3 rounded-lg mb-6">
          <span className="text-white mr-2">💡</span>
          <p className="text-xs sm:text-sm">
            By submitting, you agree to the contest rules and terms.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button className="border border-[#1F1F23] bg-[#0d0d0d] w-full sm:w-1/2 text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition font-medium">
            Cancel
          </button>
          <button className="bg-cyan-400 w-full sm:w-1/2 text-black font-semibold px-4 py-2 rounded-lg hover:bg-cyan-500 transition">
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );
}
