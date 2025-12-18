import React from "react";
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-max">
        {React.cloneElement(children, { onClose })}
      </div>
    </div>
  );
}
