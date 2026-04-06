import React, { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";

//  Zod Schema
const verticalSchema = z.object({
  verticalId: z.string().min(1, "Vertical ID is required"),
  verticalName: z.string().min(1, "Vertical Name is required"),
  description: z.string().optional(),
});

export default function VerticalModal({ isOpen, onClose, onSubmit }) {

  const [form, setForm] = useState({
    verticalId: "",
    verticalName: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // clear error while typing
    setErrors(prev => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = () => {
    const result = verticalSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    onSubmit(form);

    // reset
    setForm({
      verticalId: "",
      verticalName: "",
      description: "",
    });

    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-3xl bg-[#0B1220] text-white rounded-xl shadow-xl border border-gray-800">

        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold">New Vertical</h2>
            <p className="text-sm text-gray-400 mt-1">
              Define a new business vertical
            </p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Vertical ID */}
          <div>
            <label className="text-xs text-gray-400 font-medium">
              VERTICAL ID
            </label>
            <input
              name="verticalId"
              value={form.verticalId}
              onChange={handleChange}
              placeholder="e.g., V001"
              className={`w-full mt-2 h-12 px-4 rounded-md bg-[#0F172A] text-sm placeholder-gray-500 outline-none focus:ring-2 ${
                errors.verticalId
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-iwePrimary"
              }`}
            />
            {errors.verticalId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.verticalId}
              </p>
            )}
          </div>

          {/* Vertical Name */}
          <div>
            <label className="text-xs text-gray-400 font-medium">
              VERTICAL NAME
            </label>
            <input
              name="verticalName"
              value={form.verticalName}
              onChange={handleChange}
              placeholder="e.g., Finance"
              className={`w-full mt-2 h-12 px-4 rounded-md bg-[#0F172A] text-sm placeholder-gray-500 outline-none focus:ring-2 ${
                errors.verticalName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-iwePrimary focus:ring-iwePrimary"
              }`}
            />
            {errors.verticalName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.verticalName}
              </p>
            )}
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
              placeholder="Provide a detailed description of this vertical..."
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
            Create Vertical
          </button>
        </div>

      </div>
    </div>
  );
}