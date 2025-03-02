import { FC, ReactNode } from "react";
import Image from "next/image";

interface CategoryProps {
  title: string;
  isOpen: boolean;      // Parent controls whether the Category is open
  onToggle?: () => void; // Optional if you still want a clickable header
  children?: ReactNode;
}

const Category: FC<CategoryProps> = ({ title, isOpen, onToggle, children }) => {

  return (
    <div className="w-[819px] h-full shadow-custom transition-all duration-200">
      {/* Header */}
      <div
        className="flex w-full items-center justify-between bg-[#E8EDFB] 
         cursor-pointer px-6 py-9"
        onClick={onToggle}
      >
        <span className="text-2xl font-bold text-[#1D4ED8]">{title}</span>
        <Image
          src={isOpen ? "/icons/collapse2.svg" : "/icons/expand.svg"}
          alt="Toggle Icon"
          width={36}
          height={36}
        />
      </div>

      {/* Dropdown Content with Smooth Animation */}
      <div  className="space-y-4">
      <div
         className={`
            transition-all duration-500 ease-in-outspace-y-4 overflow-hidden
            ${isOpen ? "opacity-100 pt-10" : "max-h-0 opacity-0"}
          `}
      >
        {children}
      </div>
      </div>
    </div>
  );
};

export default Category;
