import React, { useState } from "react";

export default function Events() {
    const [activeTab, setActiveTab] = useState("Active");
    const events = [
        {
            id: 1,
            title: "Digital Art Spring Contest",
            startDate: "11/1/2025",
            endDate: "1/30/2025",
            description:
                "Submit your best digital artwork for a chance to win exclusive rewards and get featured on our platform.",
            status: "Active",
            cover: "/ms-4/imgwrapper.png",
        },
        {
            id: 2,
            title: "3D Art Masters Challenge",
            startDate: "11/10/2025",
            endDate: "11/15/2025",
            description:
                "Showcase your 3D modeling skills and compete with the best creators in the space.",
            status: "Active",
            cover: "/ms-4/imgwrapper(3).png",
        },
        {
            id: 3,
            title: "AI Portraits Contest",
            startDate: "10/01/2025",
            endDate: "10/20/2025",
            description:
                "Create stunning AI-generated portraits blending creativity and technology to impress the judges.",
            status: "Closed",
            cover: "/ms-4/imgwrapper (1).png",
        },
        {
            id: 4,
            title: "Fantasy Worlds Challenge",
            startDate: "09/15/2025",
            endDate: "09/30/2025",
            description:
                "Build immersive fantasy-themed digital environments and share your world-building vision.",
            status: "Closed",
            cover: "/ms-4/imgwrapper(2).png",
        },
    ];


    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-8 py-8">
            {/* Header Section */}
            <div className="mb-7">
                <h1 className="text-3xl font-semibold mb-1 glow">Events & Contests</h1>
                <p className="text-gray-400 text-sm">
                    Participate in contests, showcase your creativity, and win exclusive rewards
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 mb-8 border-b border-[#1F1F23] pb-3 text-sm">
                {["All Events", "Active", "Closed"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-md transition ${activeTab === tab
                            ? "bg-cyan-500 text-black font-semibold"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Events Grid (2 columns max per row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-[#131316] border border-[#1F1F23] rounded-2xl overflow-hidden shadow-lg flex flex-col transition hover:shadow-cyan-500/10 hover:border-cyan-600/40"
                    >
                        <div className="relative overflow-hidden rounded-t-lg">
                            <img
                                src={event.cover}
                                alt={event.title}
                                className="w-full h-48 sm:h-56 object-cover object-[center_-50px]"
                            />
                            <span
                                className={`absolute top-3 right-3 flex items-center justify-center text-sm font-semibold px-4    rounded-full border
    ${event.status === "Active"
                                        ? "text-green-300 border-green-500 bg-green-500/20 "
                                        : "text-gray-400 border-gray-500 bg-gray-800/50"
                                    }`}
                            >
                                {event.status}
                            </span>

                        </div>
                        {/* Content */}
                        <div className="p-5 flex flex-col justify-between flex-grow">
                            <div>
                                <h2 className="text-[25px] font-semibold mb-1">{event.title}</h2>
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-10">
                                    <img src="ms-4/Vector (2).png" alt="calendar" className="w-4 h-4" />
                                    <span>{event.startDate}</span>
                                    <img src="ms-4/Vector (4).png" alt="arrow" className="" />
                                    <img src="ms-4/Vector (3).png" alt="clock" className="w-4 h-4" />
                                    <span>{event.endDate}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                            </div>

                            {/* Buttons + Social Icons */}
                            <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
                                {/* Left: Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {/* View Details Button */}
                                    <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-4 py-2 rounded-lg">
                                        View Details
                                    </button>

                                    {/* Leaderboard Button with Icon */}
                                    <button className="flex items-center gap-1 bg-[#1A1A1D] border border-[#2A2A2A] text-white hover:bg-[#222225] text-sm px-4 py-2 rounded-lg">
                                        <img
                                            src="/ms-4/trophy (2).png"
                                            alt="trophy"
                                            className="w-5 h-5 object-contain"
                                        />
                                        Leaderboard
                                    </button>
                                </div>


                                {/* Right: Social Icons */}
                                <div className="flex items-center gap-2">
                                    {/* First two — slightly larger and brighter */}
                                    <img
                                        src="ms-4/iconDev (4).png"
                                        alt="twitter"
                                        className="w-11 h-11 sm:w-12 sm:h-12 brightness-125 hover:brightness-150 hover:scale-110 transition-transform duration-200"
                                    />
                                    <img
                                        src="ms-4/iconDev (5).png"
                                        alt="instagram"
                                        className="w-11 h-11 sm:w-12 sm:h-12 brightness-125 hover:brightness-150 hover:scale-110 transition-transform duration-200"
                                    />

                                    {/* Last three — smaller but still clear and interactive */}
                                    <img
                                        src="ms-4/iconDev (6).png"
                                        alt="youtube"
                                        className="w-6 h-6 sm:w-7 sm:h-7 brightness-110 hover:brightness-125 hover:scale-105 transition-transform duration-200"
                                    />
                                    <img
                                        src="ms-4/iconDev (7).png"
                                        alt="tiktok"
                                        className="w-6 h-6 sm:w-7 sm:h-7 brightness-110 hover:brightness-125 hover:scale-105 transition-transform duration-200"
                                    />
                                    <img
                                        src="ms-4/iconDev (8).png"
                                        alt="discord"
                                        className="w-6 h-6 sm:w-7 sm:h-7 brightness-110 hover:brightness-125 hover:scale-105 transition-transform duration-200"
                                    />
                                </div>


                            </div>


                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="border border-[#18181B] bg-[#131316] rounded-xl py-8 text-center text-gray-400 text-xs sm:text-sm">
                🎉 Winners will be auto-published via connected social accounts
            </div>
        </div>
    );
}
