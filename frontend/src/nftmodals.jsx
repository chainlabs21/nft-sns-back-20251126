import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function NFTMintPage() {
    return (
        <div className="min-h-screen bg-[#0d0d0d] flex justify-center items-center p-4 md:p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-white w-full max-w-6xl">
                
                {/* Left Section */}
                <div className="space-y-2 w-full md:w-[60%]">
                    {/* NFT Details */}
                    <div className="bg-[#0d0d0d] border border-[#18181B] rounded-2xl p-4 shadow-md">
                        <h1 className="text-white pb-3 text-lg md:text-xl">NFT Details</h1>
                        <div className="relative">
                            <img
                                src="Frame 48.png"
                                alt="NFT Preview"
                                className="rounded-lg object-cover w-full h-48 md:h-56"
                            />
                            <button className="absolute -top-10 right-2 bg-[#1f1f1f] p-1.5 rounded-full hover:bg-[#2a2a2a]">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-3">
                            <h2 className="font-semibold text-base md:text-lg">NFT-banner-mage.jpg</h2>
                            <p className="text-gray-400 text-sm">Abstract forms dancing in the digital void</p>

                            {/* Combined Box */}
                            <div className="bg-[#1a1a1a] rounded-lg p-3 mt-4 border border-[#18181B] text-sm md:text-base">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                    <div>
                                        <p className="text-gray-400">Category</p>
                                        <p>Art</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Token ID</p>
                                        <p>#1198</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Minted Date</p>
                                        <p>1/10/2024</p>
                                    </div>
                                </div>

                                {/* Royalty + Socials */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">
                                    <div>
                                        <p className="text-gray-400">Royalty</p>
                                        <p>7.5%</p>
                                    </div>
                                    <div className=" mr-81 flex items-center gap-3 text-xl text-white justify-start sm:justify-end">
                                        <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
                                        <a href="#" className="hover:text-red-500"><FaYoutube /></a>
                                        <a href="#" className="hover:text-cyan-400"><FaTiktok /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-[#0d0d0d] border border-[#18181B] rounded-2xl p-4 shadow-md">
                        <h1 className="text-white pb-3 text-lg md:text-xl">Preview</h1>
                        <div className="relative">
                            <img
                                src="Frame 48.png"
                                alt="NFT Preview"
                                className="rounded-lg object-cover w-full h-40 md:h-52"
                            />
                            <button className="absolute -top-10 right-2 bg-[#1f1f1f] p-1.5 rounded-full hover:bg-[#2a2a2a]">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="mt-3">
                            <p className="font-medium text-sm md:text-base">NFT-banner-mage.jpg</p>
                            <p className="text-gray-500 text-xs md:text-sm">No description</p>
                            <p className="text-sm mt-1 text-gray-400">Royalty: 5%</p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-black border border-[#18181B] w-full md:w-[40%] h-fit p-6 rounded-2xl text-center shadow-md">
                    <div className="flex justify-end">
                        <button className="bg-[#1f1f1f] p-1.5 rounded-full hover:bg-[#2a2a2a]">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mt-2">
                        <h3 className="font-semibold text-xl md:text-2xl mb-4">NFT Minted Successfully! 🎉</h3>
                        <div className="bg-[#0d3b4c] p-4 rounded-full mb-3">
                            <CheckCircle2 size={48} className="text-cyan-400" />
                        </div>
                        <p className="mt-1 text-gray-400 text-sm">Possimus nulla expe</p>
                        <p className="text-gray-500 text-xs">Token ID: #12315</p>
                        <a href="#" className="text-cyan-400 text-xs mt-1">
                            View on explorer: 0xA2E...9C3
                        </a>

                        <button className="bg-cyan-500 hover:bg-cyan-600 w-full py-2 rounded-lg mt-6 font-medium text-black">
                            Go to My NFTs
                        </button>
                        <button className="border border-gray-700 hover:bg-[#1f1f1f] w-full py-2 rounded-lg mt-3 font-medium">
                            Mint Another
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
