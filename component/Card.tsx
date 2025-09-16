// components/Card.tsx
"use client";

import { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Card({ icon, title, description, isSelected, onClick }: CardProps) {
  return (
    <div className={`shadow-md rounded-2xl p-12 max-w-82 hover:shadow-lg transition relative ${isSelected ?  "bg-[#292928] text-white" : "bg-white text-[#292928]"}`} onClick={onClick}>
      {/* Icon at top-left edge */}
      <div className={`w-12 h-12 flex items-center justify-center rounded-full absolute top-4 left-4 ${isSelected ? "bg-white text-[#292928]" : "bg-[#292928] text-white"}`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className={`text-lg font-semibold mt-36 ${isSelected ? "text-white" : "text-gray-900"}`}>{title}</h3>

      {/* Description */}
      <p className={`mt-2 text-sm leading-relaxed  ${isSelected ? "text-gray-300" : "text-gray-600"}`}>{description}</p>
    </div>
  );
}
