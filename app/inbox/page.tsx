// components/DashboardLayout.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaRegBell, FaSearch, FaHome, FaChartBar, FaFileInvoice, FaRegUserCircle } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { LuMessageSquareText, LuKeyRound } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { useChatStore } from "@/stores/useChatStore";
import { useState } from "react";


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
    const searchParams = useSearchParams();
    const driverId = searchParams.get("id");


    const chat = useChatStore((s) =>
        driverId ? s.getChat(driverId) : undefined
    );
    const sendMessage = useChatStore((s) => s.sendMessage);

    const [input, setInput] = useState<string>("");

    if (!driverId) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-400 text-lg font-medium">
                    💬 Get chatting with drivers…
                </p>
            </div>
        );
    }

    if (!chat) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-400">No chat found for this driver</p>
            </div>
        );
    }

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(driverId, {
            sender: "me",
            text: input,
            time: new Date().toLocaleTimeString(),
        });
        setInput("");
    };


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
                    <div className="h-[840px] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                            <img
                                src={chat.driverAvatar}
                                alt={chat.driverName}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{chat.driverName}</p>
                                <p className="text-xs text-gray-500">Driver / Courier</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {chat.messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-xl max-w-xs ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                        <span className="text-[10px] block mt-1 opacity-70">
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-gray-200 flex gap-2">
                            <input
                                type="text"
                                placeholder="Send a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1 p-2 border rounded-lg focus:outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-500 text-white px-4 rounded-lg"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
