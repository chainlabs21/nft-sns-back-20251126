// UnifiedAlert.jsx
import React from "react";
import { X } from "lucide-react";

export default function AnimatedAlert({
  type = "info",
  message,
  onClose,
}) {
  const styles = {
    success: "border-cyan-500",
    error: "border-red-500",
    info: "border-cyan-500",
    warning: "border-yellow-400",
  };

  return (
    <div
      className={`fixed right-8 top-20 bg-black border ${styles[type]}
      rounded-xl px-6 py-4 w-80 shadow-xl z-[9999] animate-fade-slide`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-1">
        {type === "error"
          ? "Error"
          : type === "success"
          ? "Success"
          : type === "warning"
          ? "Warning"
          : "Info"}
      </h2>

      {/* Message */}
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
