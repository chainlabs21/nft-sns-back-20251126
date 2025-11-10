import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Search, Grid, List, Upload } from "lucide-react";
import CustomDropdown from "./customdropdown";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function MyNFTsPage() {
    const navigate = useNavigate();
    const [view, setView] = useState("grid"); // grid or list
    const [status, setStatus] = useState("All Status");
    const [category, setCategory] = useState("All Categories");

    const nfts = [
        {
            id: 1,
            title: "Neon Dreams #247",
            description:
                "A vibrant digital artwork exploring the intersection of technology and imagination.",
            image: "Frame 13 (2).png",
            status: "Minted",
        },
        {
            id: 2,
            title: "Neon Dreams #247",
            description:
                "A vibrant digital artwork exploring the intersection of technology and imagination.",
            image: "Frame 13 (1).png",
            status: "Minted",
        },
        {
            id: 3,
            title: "Neon Dreams #247",
            description:
                "A vibrant digital artwork exploring the intersection of technology and imagination.",
            image: "Frame 13 (2).png",
            status: "Draft",
        },
        {
            id: 4,
            title: "Neon Dreams #247",
            description:
                "A vibrant digital artwork exploring the intersection of technology and imagination.",
            image: "Frame 13 (2).png",
            status: "Draft",
        },
        {
            id: 5,
            title: "Neon Dreams #247",
            description:
                "A vibrant digital artwork exploring the intersection of technology and imagination.",
            image: "Frame 13 (1).png",
            status: "Minted",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0d0d0d] text-white p-4 sm:p-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold glow">My NFTs</h1>
                        <p className="text-gray-400 text-sm">
                            Manage your minted NFTs and drafts
                        </p>
                    </div>
                    <button
                        className="bg-cyan-300 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg mt-4 md:mt-0 flex items-center justify-center gap-2 font-semibold text-base sm:text-lg"
                        onClick={() => navigate("/uploadnft")}
                    >
                        <Upload
                            size={23}
                            className="border-black border rounded-full p-1"
                        />
                        Upload New NFT
                    </button>
                </div>

                {/* Filter + Search */}
                <div className="bg-[#111111] border border-[#18181B] p-4 rounded-xl flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center flex-grow bg-[#0d0d0d] rounded-lg px-3 py-2.5 border border-[#18181B] min-w-[220px]">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or tag..."
                            className="bg-transparent outline-none text-sm text-gray-300 w-full ml-2"
                        />
                    </div>

                    <CustomDropdown
                        value={status}
                        onChange={setStatus}
                        options={["All Status", "Minted", "Draft"]}
                    />
                    <CustomDropdown
                        value={category}
                        onChange={setCategory}
                        options={["All Categories", "Art", "Music", "Collectibles"]}
                    />
                    <div className="flex gap-2 ml-auto">
                        <button
                            className={`p-2 rounded-lg border border-[#18181B] hover:bg-[#222222] transition ${view === "grid" ? "bg-cyan-400 text-white" : "bg-[#0d0d0d]"
                                }`}
                            onClick={() => setView("grid")}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            className={`p-2 rounded-lg border border-[#18181B] hover:bg-[#222222] transition ${view === "list" ? "bg-cyan-400 text-white" : "bg-[#0d0d0d]"
                                }`}
                            onClick={() => setView("list")}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* NFT Cards Section */}
                <div
                    className={`${view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pl-10 pr-10"
                        : "flex flex-col gap-6 pl-10 pr-10"
                        }`}
                >
                    {nfts.map((nft) => (
                        <div
                            key={nft.id}
                            className={`bg-[#111111] border border-[#18181B] rounded-2xl shadow-md transition-all duration-300 relative 
                            hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
                            ${view === "list" ? "flex flex-col sm:flex-row p-4 items-start gap-4" : ""}`}
                        >
                            {/* Status Badge */}
                            {nft.status && (
                                <span
                                    className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md font-medium ${nft.status === "Minted"
                                        ? "bg-cyan-400 text-white"
                                        : "bg-[#3a3a3a] text-gray-300"
                                        }`}
                                >
                                    {nft.status}
                                </span>
                            )}

                            {/* Image */}
                            <img
                                src={nft.image}
                                alt={nft.title}
                                className={`${view === "list"
                                    ? "w-full sm:w-40 h-44 object-cover rounded-lg flex-shrink-0"
                                    : "w-full h-72 object-cover rounded-t-2xl"
                                    }`}
                            />

                            {/* Content */}
                            <div
                                className={`flex flex-col justify-start flex-1 ${view === "grid" ? "p-4 mt-1" : "mt-1"}`}
                            >
                                {/* Title (xl for grid, lg for list) */}
                                <h3
                                    className={`font-semibold ${view === "grid" ? "text-lg sm:text-xl" : "text-lg sm:text-xl"} leading-tight`}
                                >
                                    {nft.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                                    {nft.description}
                                </p>

                                {view === "grid" && <div className="w-full h-px bg-gray-800 my-7" />}

                                {/* Metadata + Socials */}
                                {view === "grid" ? (
                                    <div className="flex justify-between items-center -mt-2 text-white text-sm flex-wrap gap-2">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <p>#342</p>
                                            <div className="flex items-center gap-2.5">
                                                <img src="Vector (1).png" className="h-3 w-3 mt-0.5" />
                                                <p>342</p>
                                            </div>
                                            <p>7.5% Royalty</p>
                                        </div>
                                        <div className="flex items-center gap-3 text-xl mt-2 sm:mt-0">
                                            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
                                            <FaYoutube className="hover:text-red-500 cursor-pointer" />
                                            <FaTiktok className="hover:text-cyan-400 cursor-pointer" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center mt-3 gap-4 text-white text-xs flex-wrap">
                                        <p>#342</p>
                                        <div className="flex items-center gap-2.5">
                                            <img src="Vector (1).png" className="h-3 w-3 mt-0.5" />
                                            <p>342</p>
                                        </div>
                                        <p>7.5% Royalty</p>
                                        <FaInstagram className="hover:text-pink-400 cursor-pointer text-white text-xl ml-8 mt-1" />
                                        <FaYoutube className="hover:text-red-500 cursor-pointer text-white text-xl ml-2 mt-1" />
                                        <FaTiktok className="hover:text-cyan-400 cursor-pointer text-white text-xl ml- mt-1" />

                                    </div>
                                )}

                                {/* Buttons */}
                                {nft.status === "Draft" ? (
                                    <div className={`flex gap-2 mb-2 mt-10 ${view === "grid" ? "w-full" : "w-[200px]"}`}>
                                        <button className="flex-1 border bg-[#0d0d0d] border-[#18181B] hover:bg-[#1a1a1a] rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5">
                                            <img src="Edit (1).png" className="object-contain h-4 w-4" /> Edit
                                        </button>
                                        <button className="flex-1 border bg-[#0d0d0d] border-[#18181B] hover:bg-[#1a1a1a] rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5">
                                            <img src="eye.png" className="object-contain h-5 w-5" /> View
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className={` border bg-[#0d0d0d] border-[#18181B] hover:bg-[#1a1a1a] rounded-lg py-2 mt-10 text-sm font-medium flex items-center justify-center gap-1.5 ${view === "grid" ? "w-full" : "w-[100px] px-4 "
                                            }`}
                                    >
                                        <img src="eye.png" className="object-contain h-5 w-5" /> View
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
