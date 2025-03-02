interface categoryProps {
  category: string;
  value: string[] | null; 
}

export default function EstimateCategory({ category, value }: categoryProps) {
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center text-sm gap-3 bg-[#FFFFFF]">
        <span className="text-[#676B85]">{category}</span>
        <span className="text-[#AEADB7] border border-[#F8F8F9] px-2 py-1 rounded-sm font-bold">
          ?
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-sm gap-3 bg-[#FFFFFF]">
      <span className="text-[#676B85]">{category}</span>
      {/* Render each element in the array */}
      <div className="flex gap-2 flex-wrap">
        {value.map((item, idx) => (
          <span
            key={idx}
            className="bg-[#5DFDCB]/[0.15] text-[#1D4ED8] px-2 py-1 rounded-sm font-bold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
