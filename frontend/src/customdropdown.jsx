import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // 👈 Import dropdown arrow icon

const CustomDropdown = ({ value, onChange, options, placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-40">
      {/* Main selector */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#09090B4D] border border-[#18181B] rounded-md px-4 py-2 text-gray-300 w-full cursor-pointer flex items-center justify-between focus:outline-none focus:border-cyan-500 transition-all"
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          size={18}
          className={`text-white transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Options list */}
      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-[#131316] border border-[#18181B] rounded-md max-h-48 overflow-auto shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="px-3 py-2 cursor-pointer text-white hover:bg-cyan-500 transition-colors"
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

export default CustomDropdown;
