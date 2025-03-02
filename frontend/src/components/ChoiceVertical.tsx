import Image from "next/image";

interface ChoiceVerticalProps {
  title: string;
  description: string;
  iconSrc: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ChoiceVertical({
  title,
  description,
  iconSrc,
  selected,
  onSelect,
}: ChoiceVerticalProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex shadow-custom items-center h-full w-full rounded-sm 
        transition-all cursor-pointer ${
        selected
          ? "bg-green-50 border-3 border-[#5DFDCB]"
          : "bg-white border border-[#F0F0F2]"
      }`}
    >
        {/* Left Icon */}
        <div className="p-6 flex items-center h-27 w-27 justify-center 
        border-r border-r-[#F0F0F2]">
          <Image src={iconSrc} alt="Icon" width={60} height={60} />
        </div>

        
      {/* Right Section */}
      <div className="flex flex-1 items-center justify-between p-6">
        {/* Text Content */}
        <div className="text-left">
          <h3 className={`font-bold text-lg ${
              selected ? "text-[#1D4ED8]" : "text-[#020833]"
            }`}>
              {title}
            </h3>
          <p className={`text-[16px] ${
            selected ? "text-[#1D4ED8]" : "text-[#676B85]"
          }`}>
            {description}
          </p>
        </div>

        {/*Circle */}
        <div className="">
        {selected ? (
          <Image src="/icons/checked-choice.svg" alt="Selected" width={32} height={32} />
        ) : (
          <Image src="/icons/choice.svg" alt="Selected" width={32} height={32} />
        )}
        </div>
      </div>
    </div>
  );
}
