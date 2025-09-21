"use client"

import { IoArrowUp, IoArrowDown  } from "react-icons/io5";

export default function ShipmentCard({
  title,
  value,
  change,
}: {
  title: string;
  value: number;
  change: string;
}) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow p-4 flex flex-col h-45 w-full mb-4">
      <p className="text-center text-4xl mt-4 font-bold">{value}</p>
      <h3 className="text-center mt-2 text-sm font-medium text-gray-500">{title}</h3>
      <span className={`flex items-center justify-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"} text-sm text-center mt-6`}>
        {isPositive ? <IoArrowUp size={20}/> : <IoArrowDown size={20}/>}
        {change}
      </span>
    </div>
  );
}