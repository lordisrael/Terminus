// components/TrackingCard.tsx
"use client";

//import { Progress } from "@/components/ui/progress"; // Optional: If you use shadcn/ui
import Image from "next/image";
import { MoreVertical } from "lucide-react";

export default function TrackingCard() {
    return (
        <div>
            {/* Progress Circle */}
            <div className="flex flex-col bg-[#f9fafb] border border-gray-100 rounded-xl p-6 mb-6">
                <div className="flex flex-col items-center mb-12">
                    <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="112"
                                stroke="#E5E7EB"
                                strokeWidth="20"
                                fill="none"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r="112"
                                stroke="#1f2937"
                                strokeWidth="20"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 112}
                                strokeDashoffset={2 * Math.PI * 112 * (1 - 0.8)} // 80%
                                fill="none"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-gray-600 text-sm">Delivery</span>
                            <span className="text-4xl font-semibold">80%</span>
                        </div>
                    </div>
                </div>

                {/* Tracking Details */}
                <div className="text-sm text-gray-600 space-y-2 mt-5 mb-6">
                    <p>
                        <span className="font-semibold text-lg">Tracking Number:</span>
                        <span className="ml-2 text-lg font-medium">QLCMFV 563041</span>
                    </p>
                    <p>
                        <span className="font-semibold text-lg">Driver's Name:</span>
                        <span className="ml-2 text-lg font-medium">Israel Mojolaoluwa</span>
                    </p>
                    <p>
                        <span className="font-semibold text-lg">Status:</span>{" "}
                        <span className="text-green-600 ml-2 text-smfont-medium">Approved</span>
                    </p>
                </div>
            </div>

            {/* Customer Card */}
            <div className="flex items-center justify-center gap-8 mb-6">
                <Image
                    src="/images/profile.avif"
                    alt="Customer"
                    width={72}
                    height={72}
                    className="w-20 h-20 rounded-full object-cover object-center"
                />
                <div className="flex-1 gap-3">
                    <h3 className="font-medium text-lg text-gray-800">Israel Mojolaoluwa</h3>
                    <p className="text-xs text-gray-500 mb-2">israel.mojolaoluwa@example.com</p>
                    <p className="text-xs font-medium text-gray-500">
                        3517 Ikeja GRA. Ikeja, Lagos, NG.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            {/* Timeline */}
            <div className="relative">
                {/* Vertical line placed at the center of the marker column (left-6 when marker column is w-12) */}
                <div className="absolute left-6 top-1 bottom-0 w-px bg-gray-300"></div>

                <div className="space-y-6">
                    {/* Item 1 - active */}
                    <div className="flex items-start">
                        {/* Marker column (fixed width) */}
                        <div className="w-12 flex justify-center">
                            <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white z-10 mt-1" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 mb-2 pl-2">
                            <p className="font-medium text-gray-700">Waiting Pickup</p>
                            <p className="text-xs text-gray-500">Warsaw</p>
                            <p className="text-xs text-gray-400">26 April • 11:30 AM</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start">
                        <div className="w-12 flex justify-center">
                            <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white z-10 mt-1" />
                        </div>

                        <div className="flex-1 pl-2">
                            <p className="font-medium text-gray-700">Pickup</p>
                            <p className="text-xs text-gray-500">Warsaw</p>
                            <p className="text-xs text-gray-400">26 April • 12:00 AM</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start">
                        <div className="w-12 flex justify-center">
                            <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white z-10 mt-1" />
                        </div>

                        <div className="flex-1 pl-2">
                            <p className="font-medium text-gray-700">In Transit</p>
                            <p className="text-xs text-gray-500">On Route</p>
                            <p className="text-xs text-gray-400">26 April • 03:45 PM</p>
                        </div>
                    </div>

                    {/* Item 4 - completed */}
                    <div className="flex items-start">
                        <div className="w-12 flex justify-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white z-10 mt-1" />
                        </div>

                        <div className="flex-1 pl-2">
                            <p className="font-medium text-gray-700">Delivered</p>
                            <p className="text-xs text-gray-500">Destination</p>
                            <p className="text-xs text-gray-400">27 April • 09:00 AM</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
