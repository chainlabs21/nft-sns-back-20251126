import React from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function ContestLeaderboard() {
  const leaderboardData = [
    {
      rank: "#1",
      nft: "Digital Dreams",
      creator: "DigitalCreator",
      likes: 623,
      score: 98.5,
      status: "Auto-Shared",
      nftImg: "/ms-4/Frame 13 (13).png",
      creatorImg: "/ms-4/userimg.png",
    },
    {
      rank: "#2",
      nft: "3D Universe",
      creator: "NFTMaster",
      likes: 198,
      score: 95.2,
      status: "Auto-Shared",
      nftImg: "/ms-4/Frame 13 (14).png",
      creatorImg: "/ms-4/userimg (1).png",
    },
    {
      rank: "#3",
      nft: "Neon Dreams",
      creator: "ArtistPro",
      likes: 142,
      score: 84.3,
      status: "Auto-Shared",
      nftImg: "/ms-4/Frame 13 (15).png",
      creatorImg: "/ms-4/userimg (2).png",
    },
    {
      rank: "#4",
      nft: "Abstract Flow",
      creator: "DigitalCreator",
      likes: 167,
      score: 89.3,
      status: "Not Shared",
      nftImg: "/ms-4/Frame 13 (16).png",
      creatorImg: "/ms-4/userimg (3).png",
    },
    {
      rank: "#5",
      nft: "Digital Dreams",
      creator: "DigitalCreator",
      likes: 167,
      score: 89.3,
      status: "Not Shared",
      nftImg: "/ms-4/Frame 13 (13).png",
      creatorImg: "/ms-4/userimg (4).png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-6 sm:px-8">
      {/* Header */}
      <div className="flex justify-start items-center mb-4">
        <button className="flex items-center gap-2 text-gray-300 hover:text-white text-xs sm:text-sm bg-[#131316] px-3 py-2 rounded-lg border border-[#1F1F23]">
          <FiArrowLeft /> Back to Events
        </button>
      </div>

      {/* Title + Share Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2.5">
            <img
              src="/ms-4/trophy (3).png"
              alt="trophy"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain inline-block mt-1"
            />
            <span className="leading-tight glow">Contest Leaderboard</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Top-ranked entries based on community engagement
          </p>
        </div>

        <button className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-black font-medium px-3 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto justify-center transition-all">
          <img
            src="/ms-4/share icon.png"
            alt="share"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
          Share Top 3 Winners
        </button>
      </div>

      {/* Leaderboard Table - Horizontal scroll on mobile */}
      <div className="bg-[#131316] rounded-2xl border border-[#18181B] overflow-hidden shadow-lg overflow-x-auto">
        <div className="min-w-[720px]">
          {/* Table Header */}
          <div className="grid grid-cols-7 text-xs sm:text-sm text-gray-400 px-4 sm:px-6 py-3 border-b border-[#1F1F23]">
            <p>Rank</p>
            <p>NFT</p>
            <p>Creator</p>
            <p>Likes</p>
            <p>Score</p>
            <p>Status</p>
            <p>Actions</p>
          </div>

          {/* Table Rows */}
          {leaderboardData.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-7 items-center text-xs sm:text-sm px-4 sm:px-6 py-4 border-b border-[#1F1F23] hover:bg-[#1A1A1D] transition relative ${
                index < 3 ? "border-l-4 border-l-cyan-400" : ""
              }`}
            >
              {/* Rank */}
              <div className="flex items-center">
                <span
                  className={`font-semibold rounded-2xl border px-3 py-0.5 text-white border-[#1F1F23] ${
                    index < 3
                      ? "bg-cyan-400 text-black brightness-110"
                      : "bg-[#131316]"
                  }`}
                >
                  {item.rank}
                </span>
              </div>

              {/* NFT */}
              <div className="flex items-center gap-3">
                <img
                  src={item.nftImg}
                  alt={item.nft}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                />
                <p className="font-medium text-white truncate">{item.nft}</p>
              </div>

              {/* Creator */}
              <div className="flex items-center gap-2">
                <img
                  src={item.creatorImg}
                  alt={item.creator}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                />
                <p className="text-white truncate">{item.creator}</p>
              </div>

              {/* Likes */}
              <div className="flex items-center gap-1 text-white">
                <img
                  src="/ms-4/heart (1).png"
                  alt="heart"
                  className="w-4 h-4"
                />
                <p>{item.likes}</p>
              </div>

              {/* Score */}
              <p className="text-cyan-400 font-semibold">{item.score}</p>

              {/* Status */}
              <div className="flex justify-start">
                {item.status === "Auto-Shared" ? (
                  <span className="flex items-center gap-1 bg-[#122E26] text-green-400 text-[10px] sm:text-xs px-3 py-1 rounded-full border border-green-500">
                    <img
                      src="/ms-4/check (3).png"
                      alt="tick"
                      className="w-3 h-3"
                    />
                    Auto-Shared
                  </span>
                ) : (
                  <span className="bg-[#2A2A2A] text-gray-400 text-[10px] sm:text-xs px-3 py-1 rounded-full border border-[#3A3A3A]">
                    Not Shared
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-start">
                <button className="text-white border border-[#1F1F23] bg-[#0d0d0d] px-3 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-gray-400 text-xs sm:text-sm border border-[#18181B] py-8 sm:py-10 bg-[#131316] rounded-2xl">
        🎉 Auto-publishing enabled for Top 3 entries via connected SNS accounts
      </div>
    </div>
  );
}
