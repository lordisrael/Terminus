// components/DashboardLayout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegBell, FaSearch, FaHome, FaChartBar, FaFileInvoice, FaRegUserCircle } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { LuMessageSquareText, LuKeyRound } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";
import { IoCalendarOutline } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ShipmentCard from "@/component/ShipmentCard";
import { CustomBarProps, CustomBar, CustomTooltip } from "@/component/CustomBar";
import ShipmentTable from "@/component/ShipmentTable";
import TrackingCard from "@/component/TrackingCard";


const data = [
  { name: "Jan", shipment: 80, delivery: 50 },
  { name: "Feb", shipment: 65, delivery: 40 },
  { name: "Mar", shipment: 95, delivery: 70 },
  { name: "Apr", shipment: 70, delivery: 45 },
  { name: "May", shipment: 92, delivery: 51 },
  { name: "Jun", shipment: 80, delivery: 60 },
  { name: "Jul", shipment: 75, delivery: 55 },
  { name: "Aug", shipment: 85, delivery: 65 },
  { name: "Sep", shipment: 90, delivery: 70 },
  { name: "Oct", shipment: 88, delivery: 68 },
  { name: "Nov", shipment: 76, delivery: 55 },
  { name: "Dec", shipment: 95, delivery: 80 },
];

const datacard = [
    { title: "Total Shipment", value: 120, change: "+1.2%" },
    { title: "Pickup Package", value: 56, change: "+2.2%" },
    { title: "Pending", value: 30, change: "-0.5%" },
    { title: "Delivery Shipments", value: 30, change: "+30%" },
  ];


const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <FaHome size={22}/> },
  { name: "Tracker", href: "/tracking", icon: <MdSpaceDashboard size={22}/> },
  { name: "Inbox", href: "/inbox", icon: <LuMessageSquareText size={22}/> },
  { name: "Reports", href: "/reports", icon: <FaChartBar size={22}/> },
  { name: "Invoice", href: "/invoice", icon: <FaFileInvoice size={22}/> },
];

const otherLinks = [
  { name: "Units", href: "/units", icon: <LuKeyRound size={22}/> },
  { name: "Drivers", href: "/drivers", icon: <FaRegUserCircle size={22}/> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col justify-between border-r border-r-gray-300">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-b-gray-300">
            <span className="text-xl font-bold text-[#292928]">⚡ Terminus</span>
          </div>

          {/* Main nav */}
          <nav className="px-4 py-5 space-y-2">
            <h3 className="text-xs uppercase text-gray-400 mb-4">Main</h3>
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-[#292928] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex  items-center gap-3">
                    {link.icon}
                    {link.name}
                </div>
              </Link>
            ))}
          </nav>

          {/* Others */}
          <div className="px-4 py-5 mt-6">
            <h3 className="text-xs uppercase text-gray-400 mb-2">Others</h3>
            {otherLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-[#292928] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex  items-center gap-3">
                    {link.icon}
                    {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 mb-6">
          <Link
            href="/setup"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="flex items-center gap-3">
              <CiSettings size={22} />
              Setup
            </span>
          </Link>
          <button className="flex items-center gap-2 w-full mt-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50">
            <FiLogOut />
            Log out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3.5 border-b border-b-gray-300 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-72">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-2 py-1">
                <div className="flex items-center justify-center rounded-2xl w-8 h-8 border border-gray-300">
                    <FaRegBell className="text-[#292928] cursor-pointer" size={20}/>
                </div>
                <div className="flex items-center justify-center rounded-2xl w-8 h-8 border border-gray-300">
                    <IoTimerOutline className="text-[#292928] cursor-pointer" size={20} />
                </div>
            </div>
            <div className="border border-gray-300 flex w-39 h-10 rounded-full">
                <div className="flex items-center gap-2 justify-center ml-auto mr-4">
                    <div className="w-8 h-8 rounded-full bg-[#292928] flex items-center justify-center text-white text-sm">
                    J
                    </div>
                    <span className="text-sm font-medium">Welcome, Jane!</span>
                </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
            <div className="flex gap-6">
            {/* Left column (2/3) */}
            <div className="w-2/3 space-y-4">
            {/* Shipments Stats */}
            <section className="mb-4 bg-white rounded-xl shadow">
            <div className=" p-6 flex justify-between items-center mb-6">
                <h2 className="font-semibold text-xl text-gray-700">Shipments</h2>
                <SlOptionsVertical size={22} className="text-gray-600" />
            </div>
            <div className="px-6">
            <div className="grid grid-cols-4 gap-6">
                {datacard.map((item) => (
                <ShipmentCard key={item.title} {...item} />
                ))}
            </div>
            </div>
            </section>
            {/* Analytics */}
            <section className="bg-white mb-4 rounded-xl shadow p-6">
                <div className=" p-2 flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-xl text-gray-700 mb-2">Analytics</h2>
                    <div>
                        <div className="flex items-center gap-2 ml-4">
                          <button className="px-3 py-1 border border-gray-300 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100">Day</button>
                          <button className="px-3 py-1 border border-gray-300 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100">Week</button>
                          <button className="px-3 py-1 border border-gray-300 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100">Month</button>
                          <IoCalendarOutline size={22} className="text-gray-600"/>
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis  ticks={[0, 20, 40, 60, 80, 100]} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="shipment" fill="#9CA3AF" barSize={20}  shape={(props:unknown) => <CustomBar {...(props as CustomBarProps)} />} />
                    {/* <Bar dataKey="shipment" fill="#9CA3AF" barSize={20} radius={[10, 10, 0, 0]}/>
                    <Bar dataKey="delivery" fill="#292928" barSize={20} radius={[10, 10, 0, 0]}/> */}
                </BarChart>
                </ResponsiveContainer>
            </section>
             {/* Recent Activity */}
            <section className="bg-white rounded-xl shadow p-6">
                <div className=" p-4 flex justify-between items-center mb-1">
                <h2 className="font-semibold text-xl text-gray-700">Recent Activity</h2>
                <SlOptionsVertical size={22} className="text-gray-600" />
                </div>  
                <div className="overflow-x-auto">
                <ShipmentTable />
                </div>
            </section>
            </div>
            {/* Right column (1/3) */}
            {/* Right column (Tracking full width) */}
            <div className="w-1/3">
                <section className="bg-white rounded-xl shadow p-6 w-full">
                <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-xl text-gray-700">Tracking</h2>
                <SlOptionsVertical size={22} className="text-gray-600" />
                </div>
                <TrackingCard />
                </section>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
}
