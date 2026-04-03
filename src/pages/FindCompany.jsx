import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeft } from "lucide-react";

export default function FindCompany() {
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState("companyName");
  const [form, setForm] = useState({ ueid: "", cage: "", companyName: "" });

  const options = [
    {
      value: "ueid",
      label: "Unique Entity ID (UEID)",
      placeholder: "Enter UEID...",
    },
    { value: "cage", label: "CAGE Code", placeholder: "Enter CAGE Code..." },
    {
      value: "companyName",
      label: "Company Name",
      placeholder: "Choose from list",
    },
  ];

  return (
    <AuthLayout showBack={false}>
      <div className="flex flex-col justify-center min-h-[calc(100vh-10rem)] w-full max-w-xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-500 hover:text-gray-900 font-medium text-base mb-6 w-fit transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          Find your company
        </h1>
        <p className="text-base text-gray-500 mb-10 font-medium">
          Search for your company below. If it's not found, please{" "}
          <Link
            to="/onboarding/company-info"
            className="text-iwePrimary font-bold hover:underline"
          >
            Add it now
          </Link>
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/onboarding/company-info", {
              state: {
                searchMethod: searchMethod,
                searchValue: form[searchMethod],
              },
            });
          }}
        >
          <RadioGroup
            value={searchMethod}
            onValueChange={setSearchMethod}
            className="space-y-8 mb-12 w-full"
          >
            {options.map((opt) => (
              <div key={opt.value} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem
                    value={opt.value}
                    id={opt.value}
                    className="scale-125 origin-left"
                  />
                  <Label
                    htmlFor={opt.value}
                    className="text-lg font-semibold text-gray-800 cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>

                {searchMethod === opt.value && (
                  <div className="pl-9">
                    {opt.value === "companyName" ? (
                      <Select
                        onValueChange={(val) =>
                          setForm({ ...form, companyName: val })
                        }
                      >
                        <SelectTrigger className="h-14 px-4 text-base md:text-base border-gray-300 focus:ring-iwePrimary bg-white transition-all">
                          <SelectValue placeholder="Choose from list" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-xl z-50">
                          <SelectItem
                            value="Cencore LLC"
                            className="text-base focus:bg-gray-100 focus:text-iwePrimary py-3 cursor-pointer"
                          >
                            Cencore LLC
                          </SelectItem>
                          <SelectItem
                            value="Encore"
                            className="text-base focus:bg-gray-100 focus:text-iwePrimary py-3 cursor-pointer"
                          >
                            Encore
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={form[opt.value]}
                        onChange={(e) =>
                          setForm({ ...form, [opt.value]: e.target.value })
                        }
                        placeholder={opt.placeholder}
                        className="h-14 px-4 text-base md:text-base border-gray-300 focus-visible:ring-iwePrimary transition-all"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>

          <Button
            type="submit"
            disabled={!form[searchMethod]}
            className="w-full sm:w-40 bg-iwePrimary hover:bg-iwePrimaryHover text-white h-14 text-lg font-bold transition-all shadow-sm"
          >
            Continue
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
