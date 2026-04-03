import React, { useState } from "react";
import { X } from "lucide-react";

export default function LabelModal({ isOpen, onClose, onSubmit }) {

  const [form, setForm] = useState({
    labelName: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.labelName.trim()) {
      alert("Label name is required");
      return;
    }

    onSubmit(form);

    // reset
    setForm({
      labelName: "",
      description: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-2xl bg-[#0B1220] text-white rounded-xl shadow-xl border border-gray-800">

        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold">New Label</h2>
            <p className="text-sm text-gray-400 mt-1">
              Define a new label
            </p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Label Name */}
          <div>
            <label className="text-xs text-gray-400 font-medium">
              LABEL NAME
            </label>
            <input
              name="labelName"
              value={form.labelName}
              onChange={handleChange}
              placeholder="e.g., High Priority"
              className="w-full mt-2 h-12 px-4 rounded-md bg-[#0F172A] border border-iwePrimary text-sm placeholder-gray-500 focus:ring-2 focus:ring-iwePrimary outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-400 font-medium">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe this label..."
              className="w-full mt-2 px-4 py-3 rounded-md bg-[#0F172A] border border-gray-700 text-sm placeholder-gray-500 focus:ring-2 focus:ring-iwePrimary outline-none resize-none"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={handleSubmit}
            className="w-full h-12 bg-iwePrimary hover:bg-iwePrimaryHover text-white font-semibold rounded-md transition-all"
          >
            Create Label
          </button>
        </div>

      </div>
    </div>
  );
}