import React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8">Available Pages</h1>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          <Link to="/login" className="text-blue-500 hover:underline">Login Page</Link>
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          <Link to="/wallets" className="text-blue-500 hover:underline">Wallet</Link>
          <Link to="/profile" className="text-blue-500 hover:underline">Profile Page</Link>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          <Link to="/feed" className="text-blue-500 hover:underline">Feed</Link>
          <Link to="/uploadnft" className="text-blue-500 hover:underline">Upload NFT</Link>
          <Link to="/nftmodals" className="text-blue-500 hover:underline">NFT Modals</Link>
          <Link to="/mynft" className="text-blue-500 hover:underline">My NFTs Page</Link>

        </div>
      </div>
    </div>
  );
}
