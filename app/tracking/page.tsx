// components/DashboardLayout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegBell, FaSearch, FaHome, FaChartBar, FaFileInvoice, FaRegUserCircle } from "react-icons/fa";
import { MdSort, MdSpaceDashboard } from "react-icons/md";
import { IoLocationOutline, IoTimerOutline } from "react-icons/io5";
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
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import DriverCard from "@/component/DriverCard";
import MapContainer from "@/component/MapContainer";
import { IoListSharp } from "react-icons/io5";
import { FaSort } from "react-icons/fa6";

const packages = [
  {
    id: 'CA-12321-US',
    status: 'On progress',
    from: 'California, US',
    to: 'Michigan, US',
    driver: 'Ethan',
  },
  {
    id: 'NY-12321-SF',
    status: 'On progress',
    from: 'New York, US',
    to: 'San Francisco, US',
    driver: 'Ricky',
  },
  {
    id: 'CGK-12321-NY',
    status: 'Delivered',
    from: 'Jakarta, ID',
    to: 'New York, US',
    driver: 'Louis',
  },
  // Add more data as needed
];

const drivers = [
  {
    id: "CA-12321-US",
    name: "Ethan",
    status: "On Progress" as const,
    from: "California, US",
    to: "Michigan, US",
    date: "12/11/2024",
    avatar: "/images/ethan.jpg",
    position: { lat: 40.73, lng: -73.93 },
    route: [
      { lat: 40.73, lng: -73.93 },
      { lat: 40.75, lng: -74.0 },
      { lat: 40.77, lng: -74.02 },
    ],
  },
  {
    id: "NY-12321-SF",
    name: "Ricky",
    status: "On Progress" as const,
    from: "New York, US",
    to: "San Francisco, US",
    date: "14/11/2024",
    avatar: "/images/ricky.jpg",
    position: { lat: 40.72, lng: -74.05 },
    route: [
      { lat: 40.72, lng: -74.05 },
      { lat: 40.71, lng: -73.98 },
      { lat: 40.7, lng: -73.9 },
    ],
  },
];

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <FaHome size={22} /> },
  { name: "Tracker", href: "/tracking", icon: <MdSpaceDashboard size={22} /> },
  { name: "Inbox", href: "/inbox", icon: <LuMessageSquareText size={22} /> },
  { name: "Reports", href: "/reports", icon: <FaChartBar size={22} /> },
  { name: "Invoice", href: "/invoice", icon: <FaFileInvoice size={22} /> },
];

const otherLinks = [
  { name: "Units", href: "/units", icon: <LuKeyRound size={22} /> },
  { name: "Drivers", href: "/drivers", icon: <FaRegUserCircle size={22} /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [selected, setSelected] = useState<string | null>(null);

  const selectedDriver = drivers.find((d) => d.id === selected) || null;

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
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${pathname === link.href
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
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${pathname === link.href
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
                <FaRegBell className="text-[#292928] cursor-pointer" size={20} />
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
          <div className="grid grid-cols-3 gap-4 h-screen">
            <div className="col-span-1 overflow-y-auto">
              <div className="items-center justify-between flex flex-row gap-4">
                <div className="flex items-center justify-center rounded-3xl w-10 h-10 border border-gray-300">
                  <IoListSharp size={24} />
                </div>
                <div className="flex items-center justify-center rounded-3xl w-10 h-10 border border-gray-300">
                  <FaSort size={24} />
                </div>
                <div className="border border-gray-200 items-center flex flex-row rounded-4xl w-34 h-9 justify-center ml-auto mr-4 gap-3 m-6">
                  <IoLocationOutline size={24} className="color-[#292928]" />
                  <span className="text-sm font-medium">Lagos, Nigeria</span>
                </div>
              </div>
              {drivers.map((driver) => (
                <DriverCard
                  key={driver.id}
                  {...driver}
                  selected={selected === driver.id}
                  onClick={() => setSelected(driver.id)}
                />
              ))}
            </div>
            <div className="col-span-2">
              <MapContainer selectedDriver={selectedDriver} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

