import React from "react";

export default function ProductForm({ onSubmit, onDelete, onClose }) {
  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
        
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">
        ¿Estas seguro?
      </h2>
        <div className="flex gap-4 mt-4">
            <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Si</button>
            <button type="button" onClick={onClose} className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">No</button>
        </div>
    </form>
  );
}
