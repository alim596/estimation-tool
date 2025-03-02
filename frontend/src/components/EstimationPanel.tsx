import React, { useState } from "react";
import EstimateCategory from "./EstimateCategory";
import { createSubmission } from "@/utils/api";
import { SubmissionResponse } from "@/types/types";

interface EstimationPanelProps {
  selectedPlatforms: string[];
  categoryAnswers: Record<string, string[]>;
}

export default function EstimationPanel({
  selectedPlatforms,
  categoryAnswers,
}: EstimationPanelProps) {

  const [hourlyRate, setHourlyRate] = useState<number>(30);
  const [budget, setBudget] = useState<number>(0);
  const [designerHours, setDesignerHours] = useState<number>(0);
  const [developerHours, setDeveloperHours] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    {
      category: "Platforms",
      value: selectedPlatforms.length ? selectedPlatforms : null,
    },
    {
      category: "App size",
      value: convert(categoryAnswers["App size"]),
    },
    {
      category: "UI Level",
      value: convert(categoryAnswers["UI Level"]),
    },
    {
      category: "Users & Accounts",
      value: convert(categoryAnswers["Users & Accounts"]),
    },
    {
      category: "User Generated Content",
      value: convert(categoryAnswers["User Generated Content"]),
    },
    {
      category: "Dates & Locations",
      value: convert(categoryAnswers["Dates & Locations"]),
    },
    {
      category: "Social & Engagement",
      value: convert(categoryAnswers["Social & Engagement"]),
    },
    {
      category: "Billing & eCommerce",
      value: convert(categoryAnswers["Billing & eCommerce"]),
    },
    {
      category: "Admin, Feedback, Analytics",
      value: convert(categoryAnswers["Admin, Feedback, Analytics"]),
    },
    {
      category: "External APIs and Integrations",
      value: convert(categoryAnswers["External APIs and Integrations"]),
    },
    {
      category: "Security Hours",
      value: convert(categoryAnswers["Security Hours"]),
    },
    {
      category: "Mobile Specific Features",
      value: convert(categoryAnswers["Mobile Specific Features"]),
    },
  ];

  const decreaseRate = () => {
    if (hourlyRate > 0) {
      setHourlyRate((prev) => prev - 5);
    }
  };
  const increaseRate = () => setHourlyRate((prev) => prev + 5);

  // Estimation in the backend
  const estimate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call the API
      const response: SubmissionResponse = await createSubmission({
        hourlyRate,
        answers: categoryAnswers,
      });
      // Update state with values returned from backend.
      setDesignerHours(response.designerHours);
      setDeveloperHours(response.developerHours);
      setTotalHours(response.totalHours);
      setBudget(response.budget);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Failed to create submission. " + err.message);
      } else {
        setError("Failed to create submission.");
      }
    } finally {
      setLoading(false);
    }
  };

  function convert(array?: string[]): string[] | null {
    return array && array.length > 0 ? array : null;
  }

  return (
    <div className="w-[509px] h-[1024px] ml-6 border-y border-l border-[#F0F0F2] bg-[#FFFFFF] shadow-custom">
      {/* Top section */}
      <div className="flex items-center justify-between h-[127px] border-b border-[#F0F0F2] px-12">
        <span className="mt-10 mb-7 flex text-sm text-[#020833] w-[215px]">
          Average hourly rate <br />
          in USD per team <br />
          member
        </span>
        <div className="mt-10 mb-7 flex items-center h-[54px] border border-[#D2DCF7]">
          <button
            onClick={decreaseRate}
            className="bg-white text-[#1D4ED8] text-3xl w-[50px]"
          >
            –
          </button>
          <div className="flex border-x border-[#D2DCF7] h-full w-[150px] bg-white items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-[#020833] text-3xl mr-1">{hourlyRate}</span>
              <span className="text-[#676B85] text-sm">$/hour</span>
            </div>
          </div>
          <button
            onClick={increaseRate}
            className="bg-white text-[#1D4ED8] text-3xl w-[50px]"
          >
            +
          </button>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl px-16 font-bold mt-7 mb-6 text-[#020833]">
        Your Estimate
      </h2>

      {/* Grid of categories */}
      <div className="px-16 grid grid-cols-1 h-[477px] space-y-2 mb-7 overflow-y-scroll">
        {categories.map((cat) => (
          <EstimateCategory
            key={cat.category}
            category={cat.category}
            value={cat.value}
          />
        ))}
      </div>

      {/* hours and budget */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-8 w-full px-16 border-t border-[#D2DCF7]">
        {/* Top */}
        <div className="text-center mt-7">
          <div className="text-[#676B85] text-base">Designer person-hours</div>
          <div className="text-[#020833] text-2xl font-bold mt-1">
            {designerHours}
          </div>
        </div>
        <div className="text-center mt-7">
          <div className="text-[#676B85] text-base">Developer person-hours</div>
          <div className="text-[#020833] text-2xl font-bold mt-1">
            {developerHours}
          </div>
        </div>

        {/* Mid */}
        <div className="text-center">
          <div className="text-[#020833] font-bold text-base">
            Total man/hours
          </div>
          <div className="text-[#020833] text-[32px] font-bold mt-1">
            {totalHours}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#020833] font-bold text-base">Budget</div>
          <div className="text-[#020833] text-[32px] font-bold mt-1">
            ${budget}
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="text-red-500 text-center px-16 py-2">
          {error}
        </div>
      )}

      {/* Estimate button */}
      <div className="flex justify-center pb-7 mt-6 px-16">
        <button
          className="bg-[#1D4ED8] text-white font-bold text-[20px] w-full h-[58px] rounded-md"
          onClick={estimate}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get your estimate"}
        </button>
      </div>
    </div>
  );
}
