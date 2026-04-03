import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Plus, X, UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MaterialsUploadSection({ form, setForm }) {
  const materials = form.materials || [];

  const documentTypes = [
    "Completed Project",
    "Past Performance",
    "Testimonial",
    "Case Study",
    "Video",
    "Capability Statement",
    "Other",
  ];

  useEffect(() => {
    if (materials.length === 0) {
      setForm((prev) => ({
        ...prev,
        materials: [{ id: Date.now(), type: "", fileName: "", file: null }],
      }));
    }
  }, []);

  const addMaterialRow = () => {
    setForm((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        { id: Date.now(), type: "", fileName: "", file: null },
      ],
    }));
  };

  const updateMaterialType = (id, newType) => {
    setForm((prev) => ({
      ...prev,
      materials: prev.materials.map((mat) =>
        mat.id === id ? { ...mat, type: newType } : mat,
      ),
    }));
  };

  const handleFileChange = (id, selectedFile) => {
    if (selectedFile) {
      setForm((prev) => ({
        ...prev,
        materials: prev.materials.map((mat) =>
          mat.id === id
            ? { ...mat, file: selectedFile, fileName: selectedFile.name }
            : mat,
        ),
      }));
    }
  };

  const removeMaterialRow = (id) => {
    setForm((prev) => ({
      ...prev,
      materials: prev.materials.filter((mat) => mat.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xl font-bold text-gray-900">
          Upload Company Materials (Max 500mb)
        </Label>
        <p className="text-gray-500 text-sm font-medium leading-relaxed mt-2">
          Use the Upload area to share completed projects, past performance
          details, testimonials, case studies, videos, capability statement.
          (Max file size - 500MB)
        </p>
      </div>

      <div className="space-y-4">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
          >
            {/* THE DROPDOWN FOR FILE TYPE */}
            <Select
              value={mat.type}
              onValueChange={(val) => updateMaterialType(mat.id, val)}
            >
              <SelectTrigger
                className={`w-full sm:w-64 h-14 min-h-14 flex items-center px-4 text-base md:text-base border border-gray-300 rounded-lg hover:border-iwePrimary focus:ring-1 focus:ring-iwePrimary transition-all bg-white shadow-sm ${
                  mat.type ? "text-gray-900 font-medium" : "text-gray-500"
                }`}
              >
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>

              <SelectContent className="bg-white border-gray-200 z-50 shadow-xl rounded-lg">
                {documentTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-base py-3 px-4 cursor-pointer focus:bg-iwePrimary/5 focus:text-iwePrimary font-medium transition-colors"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex border border-gray-300 hover:border-iwePrimary rounded-lg overflow-hidden h-14 min-h-14 flex-1 shadow-sm transition-colors group cursor-pointer bg-white w-full">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => handleFileChange(mat.id, e.target.files[0])}
                title="Click to upload a file"
              />

              <div className="bg-iwePrimary group-hover:bg-iwePrimaryHover text-white px-6 text-base flex items-center justify-center font-bold transition-colors shrink-0 gap-2 h-full">
                <UploadCloud className="w-5 h-5 text-white transition-colors" />
                Upload
              </div>

              <div
                className={`flex-1 px-4 flex items-center text-base truncate h-full ${
                  mat.fileName ? "text-gray-900 font-medium" : "text-gray-400"
                }`}
              >
                {mat.fileName || "No file selected"}
              </div>
            </div>

            {/* Delete Button */}
            {materials.length > 1 && (
              <button
                type="button"
                onClick={() => removeMaterialRow(mat.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 shrink-0 bg-white rounded-full hover:bg-red-50 self-center"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addMaterialRow}
        className="text-iwePrimary hover:text-iwePrimaryHover text-base font-bold flex items-center gap-1.5 transition-colors mt-2 w-fit"
      >
        <Plus className="w-5 h-5" /> Add more materials
      </button>
    </div>
  );
}
