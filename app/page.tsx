"use client";
import Card from "@/component/Card";
import Header from "@/component/Header";
import InfoCard from "@/component/InfoCard";
import { useState } from "react";
import { FaCartPlus, FaBriefcaseMedical } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = [
    {
      icon: <FaCartPlus size={24} />,
      title: "Retail & E-commerce",
      description:
        "Streamline your fulfillment process, reduce delivery times, and improve customer satisfaction.",
    },
    {
      icon: <MdFactory size={24} />,
      title: "Manufacturing",
      description:
        "Optimize your supply chain, manage inventory, and ensure timely delivery of raw materials and finished goods.",
    },
    {
      icon: <FaBriefcaseMedical  size={24}/>,
      title: "Healthcare & Pharmaceuticals",
      description:
        "Ensure the safe and timely delivery of medical supplies, equipment, and pharmaceuticals.",
    },
    {
      icon: <FaComputer size={24} />,
      title: "Technology & Electronics",
      description:
        "Streamline your supply chain, manage inventory, and ensure timely delivery of electronic components and devices.",
    }
  ];
  return (
    <div className="bg-[#f2f2f2] min-h-screen">
      <Header />
      <main className="">
        <div className="justify-between p-8 mx-4 flex flex-row mt-6 mb-12">

          <div className="flex flex-col mb-4">
            <div className="font-medium text-[#292928] mb-9">INDUSTRIES WE SERVE</div>
            <div className="font-bold text-[#292928] mt-1 text-6xl mb-4">Tailored logistics</div>
            <div className="font-bold text-[#292928] text-6xl mt-1">for Every Business</div>
          </div>
          
          <div>
            <InfoCard />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-8 py-4">
            {items.map((item, index) => (
            <Card
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              isSelected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
      </div> 
      </main>
    </div>
  );
}
