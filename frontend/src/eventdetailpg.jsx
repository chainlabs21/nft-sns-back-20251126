import React, { useState } from "react";

export default function ContestDetails() {
    const [activeTab, setActiveTab] = useState("overview");

    const entries = [
        { id: 1, title: "Neon Dreams #247", creator: "by CryptoArtist", img: "/ms-4/imgwrapper8.png", likes: 120 },
        { id: 2, title: "3D Universe", creator: "by NFTMaster", img: "/ms-4/imgwrapper8.png", likes: 95 },
        { id: 3, title: "Abstract Art", creator: "by DigitalCreator", img: "/ms-4/imgwrapper8.png", likes: 150 },
    ];

    const rewards = [
        { id: 1, title: "1st Place", description: "5 ETH + Platform Feature", img: "/ms-4/iconBG.png" },
        { id: 2, title: "2nd Place", description: "3 ETH + Platform Feature", img: "/ms-4/iconBG.png" },
        { id: 3, title: "3rd Place", description: "1 ETH + Platform Feature", img: "/ms-4/iconBG.png" },
    ];

    const rules = [
        "Original artwork only — no plagiarism",
        "Maximum one entry per creator",
        "NFT must be minted on Polygon network",
        "Submission deadline: November 30, 2025",
    ];

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white px-3 sm:px-5 md:px-10 py-6">
            {/* Back Button */}
            <button className="p-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm border border-[#1F1F23] text-gray-300 hover:text-white mb-4">
                <img src="/ms-4/Vector (5).png" alt="back" className="w-3 h-3" />
                Back to Events
            </button>

            {/* Header Section */}
            <div className="bg-[#0F0F0F] rounded-2xl overflow-hidden border border-[#18181B] mb-7 relative">
                {/* Banner Image */}
                <img
                    src="/ms-4/imgwrapper.png"
                    alt="Contest Banner"
                    className="w-full h-48 sm:h-56 md:h-60 lg:h-72 object-cover brightness-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-black/40 to-transparent px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col justify-end gap-3">

                    {/* Desktop: Title + Active + Button row */}
                    <div className="hidden md:flex md:items-center md:justify-between gap-3 w-full">
                        <div className="flex items-center gap-4"> {/* Increased gap between Active tag and Title */}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold glow">
                                Digital Art Spring Contest
                            </h1>
                            <span className="bg-green-400/20 text-xs font-semibold px-3 pb-0.5 rounded-xl text-green-200 border border-green-400 whitespace-nowrap translate-y-1">
                                Active
                            </span>
                        </div>

                        <button className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition">
                            <img src="/ms-4/upload file.png" alt="upload" className="w-3 h-3 object-contain" />
                            Participate Now
                        </button>
                    </div>
                    
                    {/* Mobile & Tablet: Stacked layout */}
                    <div className="flex flex-col md:hidden gap-2">
                        <div className="flex flex-col items-start gap-2 px-2"> {/* Aligns Active, Title, Dates to left */}
                            <span className="bg-green-400/20 text-xs font-semibold px-3 pb-0.5 rounded-xl text-green-200 border border-green-400 whitespace-nowrap translate-y-1">
                                Active
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-semibold glow">
                                Digital Art Spring Contest
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <img src="/ms-4/Vector (2).png" alt="calendar" className="w-3 h-3 sm:w-4 sm:h-4" />
                                    11/1/2025 – 11/30/2025
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/ms-4/trophy (1).png" alt="trophy" className="w-3 h-3 sm:w-4 sm:h-4" />
                                    30/11/2025
                                </div>
                            </div>
                        </div>

                        {/* Button stays centered and full width */}
                        <button className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition w-full mt-2">
                            <img src="/ms-4/upload file.png" alt="upload" className="w-3 h-3 object-contain" />
                            Participate Now
                        </button>
                    </div>


                    {/* Dates for desktop (below the top row) */}
                    <div className="hidden md:flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 mb-4">
                        <div className="flex items-center gap-2">
                            <img src="/ms-4/Vector (2).png" alt="calendar" className="w-3 h-3 sm:w-4 sm:h-4" />
                            11/1/2025 – 11/30/2025
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/ms-4/trophy (1).png" alt="trophy" className="w-3 h-3 sm:w-4 sm:h-4" />
                            30/11/2025
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#0F0F0F] border border-[#18181B] rounded-xl flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-lg mb-6 overflow-x-auto no-scrollbar w-full sm:w-fit">
                {["overview", "entries", "rewards"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap transition font-medium ${activeTab === tab ? "text-white " : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab === "overview" ? "Overview" : tab === "entries" ? `Entries (${entries.length})` : "Rewards"}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
                <>
                    <div className="bg-[#0F0F0F] border border-[#18181B] rounded-xl px-4 sm:px-6 py-8 mb-6">
                        <h2 className="text-base sm:text-xl font-semibold mb-2">About This Contest</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Submit your best digital artwork for a chance to win exclusive rewards
                            and get featured on our platform.
                        </p>
                    </div>

                    <div className="bg-[#0F0F0F] border border-[#18181B] rounded-xl px-4 sm:px-6 py-5 mb-4">
                        <h2 className="text-base sm:text-xl font-semibold mb-3">Contest Rules</h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            {rules.map((rule, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-xl leading-[1]">•</span>
                                    <span className="text-gray-300">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Entries */}
            {activeTab === "entries" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
                    {entries.map((entry) => (
                        <div
                            key={entry.id}
                            className="bg-[#0F0F0F] border border-[#18181B] rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_15px_#06b6d4]"
                        >
                            <img
                                src={entry.img}
                                alt={entry.title}
                                className="w-full h-48 sm:h-56 md:h-60 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-1">
                                <h3 className="font-semibold text-white text-base sm:text-lg">{entry.title}</h3>
                                <p className="text-gray-400 text-sm">{entry.creator}</p>
                                <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs sm:text-sm">
                                    <img
                                        src="/ms-4/heart2.png"
                                        alt="likes"
                                        className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
                                    />
                                    <span>{entry.likes} Likes</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Rewards */}
            {activeTab === "rewards" && (
                <div className="space-y-4 mb-4">
                    {rewards.map((reward) => (
                        <div
                            key={reward.id}
                            className="flex items-center gap-3 sm:gap-4 border border-[#18181B] bg-[#0F0F0F] rounded-xl p-3 sm:p-4"
                        >
                            <img
                                src={reward.img}
                                alt={reward.title}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-contain"
                            />
                            <div>
                                <h3 className="font-semibold text-white text-sm sm:text-md">{reward.title}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm">{reward.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* View Leaderboard */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl px-3 sm:px-6 py-3 mb-8 mt-17">
                <button className="flex items-center justify-center gap-2 w-full text-white hover:text-gray-300 rounded-xl text-xs sm:text-sm font-medium">
                    <img
                        src="/ms-4/trophy (2).png"
                        alt="leaderboard"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    View Leaderboard
                </button>
            </div>

            {/* Footer Note */}
            <div className="border border-[#18181B] bg-[#0F0F0F] rounded-xl py-6 sm:py-8 text-center text-gray-400 text-xs sm:text-sm">
                🎉 Winners will be auto-published via connected social accounts
            </div>
        </div>
    );
}
