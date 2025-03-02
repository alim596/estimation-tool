import Image from "next/image";

interface HorizontalChoiceProps {
  title: string;
  description: string;
  iconSrc: string;
  selected: boolean;
  onSelect: () => void;
}

export default function HorizontalChoice({
  title,
  description,
  iconSrc,
  selected,
  onSelect,
}: HorizontalChoiceProps) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-sm shadow-custom transition-all w-full max-w-[263px]
         h-full cursor-pointer flex flex-col ${
        selected 
        ? "bg-green-100 border-4 border-[#5DFDCB]" 
        : "bg-[#FFFFFF] border border-[#F0F0F2]"
      }`}
    >
      {/* Top Section: Icon & Selection */}
      <div className="flex items-start gap-3 p-6">
        {/* Left Icon 1352*/}
        <Image 
          src={iconSrc}
          alt="Icon"
          width={48} 
          height={48} 
        />

        {/* Selection Circle */}
        <div className="ml-auto">
          <Image
            src={selected ? "/icons/checked-choice.svg" : "/icons/choice.svg"}
            alt="Select"
            width={48}
            height={48}
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 px-6 pb-7 ">
        <h3 className="text-[#020833] font-bold text-2xl">{title}</h3>
        <p className="text-[#676B85] text-base h-17">{description}</p>
      </div>
    </div>
  );
}
