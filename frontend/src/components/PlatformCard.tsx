import Image from "next/image";

interface PlatformCardProps {
  title: string;
  description: string;
  iconLight: string;
  iconDark: string;
  selected: boolean;
  onSelect: () => void;
}

export default function PlatformCard({
  title,
  description,
  iconLight,
  iconDark,
  selected,
  onSelect,
}: PlatformCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex shadow-custom justify-between w-full 
        h-full rounded-md transition-all cursor-pointer p-9 ${
        selected
          ? "bg-[#1D4ED8] border-3 border-[#5DFDCB] text-white"
          : "bg-white border border-[#F0F0F2] text-black"
      }`}
    >
      {/* Left Section: Icon & Text */}
      <div className="flex flex-col gap-3">
        {/* Left Icon */}
        <div className="w-12 h-12 flex items-center justify-center">
          <Image 
           src={selected ? iconDark : iconLight}    
           alt="Icon" 
           width={80} 
           height={80} />
        </div>

        {/* Text Content */}
        <div className="text-left">
          <h3
            className={`font-bold text-2xl ${
              selected ? "text-[#FFFFFF]" : "text-[#020833]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-[16px] ${
              selected ? "text-[[#F9F9F9]]" : "text-[#676B85]"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Right Selection Circle */}
      <div className="w-12 h-12  flex flex-col items-center">
        {selected ? (
          <Image src="/icons/checked-choice.svg" alt="Selected" width={48} height={48} />
        ) : (
          <Image src="/icons/choice.svg" alt="Selected" width={48} height={48} />
        )}
      </div>
      
    </button>
  );
}
