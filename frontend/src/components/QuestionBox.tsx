import { ReactNode } from "react";
import Image from "next/image";

interface QuestionBoxProps {
  step: number;
  question: string;
  isActive: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function QuestionBox({
  step,
  question,
  isActive,
  onToggle,
  children,
}: QuestionBoxProps) {
  return (
    <div className="bg-white px-6 border border-[#F0F0F2] rounded-sm 
    shadow-custom w-full h-full transition-all duration-200">
      {/* Header: Clicking toggles open/close */} 
      <div
        className="flex items-center justify-between py-8 cursor-pointer h-fit"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#D2DCF7] font-bold text-3xl">
            {String(step).padStart(2, "0")}
          </span>
          <span className="text-3xl text-[#020833] font-medium">{question}</span>
        </div>
        <div className="flex-shrink-0">
          {isActive ? (
            <Image src="/icons/collapse.svg" alt="Collapse" width={24} height={24} />
          ) : (
            <Image src="/icons/expand.svg" alt="Expand" width={24} height={24} />
          )}
        </div>
      </div>

      {/* Dropdown Content with Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? "opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="gap-4 ">{children}</div>
      </div>
    </div>
  );
}
