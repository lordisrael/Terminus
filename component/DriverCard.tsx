"use client";

import { FC } from "react";
import clsx from "clsx";
import { IoCallOutline, IoListSharp, IoLocationOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/stores/useChatStore";

interface DriverCardProps {
    id: string;
    name: string;
    status: "On Progress" | "Delivered" | "Pending";
    from: string;
    to: string;
    date: string;
    selected: boolean;
    avatar: string;
    onClick: () => void;
}

const statusColors: Record<DriverCardProps["status"], string> = {
    "On Progress": "bg-yellow-200 text-yellow-700",
    Delivered: "bg-green-200 text-green-700",
    Pending: "bg-red-200 text-red-700",
};

const DriverCard: FC<DriverCardProps> = ({
    id,
    name,
    status,
    from,
    to,
    date,
    selected,
    avatar,
    onClick,
}) => {
    const router = useRouter();
    const openChat = useChatStore((s) => s.openChat);

    const handleOpenChat = () => {
        openChat(id, name, avatar);
        router.push(`/inbox?id=${id}`);
    };
    return (
        <div>
            <div
                onClick={onClick}
                className={clsx(
                    "rounded-xl p-4 mb-4 cursor-pointer border transition",
                    selected ? "border-[#292928]" : "border-gray-200"
                )}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 rounded-2xl p-2">
                            <FaTruck size={24} className="text-[#1561c5]" />
                        </div>
                        <h2 className="font-semibold text-xl text-gray-700">{id}</h2>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs ${statusColors[status]}`}>
                        {status}
                    </span>
                </div>
                {/* <p className="text-sm text-gray-500">{from} → {to}</p>
                <p className="text-xs text-gray-400">{date}</p> */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                        <TbCurrentLocation />
                    </div>
                    <div className="flex-1 flex items-center justify-center px-4 relative">
                        {/* Left dashed line */}
                        <div className="w-1/2 border-t-2 border-dashed border-gray-600"></div>
                        {/* Dot */}
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <div className="w-5 h-5 bg-gray-400 border-4 border-white rounded-full shadow-lg"></div>
                        </div>
                        {/* Right dashed line */}
                        <div className="w-1/2 border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                        <TbCurrentLocation />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                    {/* From */}
                    <div className="flex flex-col items-start">
                        <span className="text-sm text-gray-600">{from}</span>
                        <span className="text-xs text-gray-400">{date}</span>
                    </div>
                    {/* To */}
                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-600">{to}</span>
                        <span className="text-xs text-gray-400">{date}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2 border border-gray-200 p-2 rounded-lg">
                    <img src={avatar} alt={name} className="w-8 h-8 rounded-lg mr-2" />
                    <div className="flex flex-col items-start">
                        <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                            <span className="text-sm font-medium">{name}</span>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">Driver/Courier</span>
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <div className="flex items-center justify-center border border-gray-200 rounded-lg h-8 w-8">
                            <IoCallOutline size={22} className="text-[#292928]" />
                        </div>
                        <button
                            onClick={handleOpenChat}
                            className="flex items-center justify-center border border-gray-200 rounded-lg h-8 w-8"
                        >
                            <MdOutlineEmail size={22} className="text-[#292928]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverCard;
