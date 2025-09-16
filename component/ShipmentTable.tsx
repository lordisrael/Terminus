"use client";
import React from "react";

interface Shipment {
  product: string;
  destination: string;
  status: "Approved" | "Rejected";
  driver: string;
  driverId: string;
}

const data: Shipment[] = [
  {
    product: "#2998-30",
    destination: "JNE",
    status: "Approved",
    driver: "Courtney",
    driverId: "LEMDUJ 302030",
  },
  {
    product: "#1264-87",
    destination: "DHL",
    status: "Rejected",
    driver: "Esther",
    driverId: "LEMDUJ 302030",
  },
  {
    product: "#5723-89",
    destination: "RedX",
    status: "Approved",
    driver: "Mitchell",
    driverId: "WRKFMI 858665",
  },
  {
    product: "#6478-26",
    destination: "Amazon",
    status: "Approved",
    driver: "Debra",
    driverId: "QLCMVF 563041",
  },
];

export default function ShipmentTable() {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-gray-500 text-sm border-b border-gray-300">
          <th className="p-3">Product</th>
          <th className="p-3">Destination</th>
          <th className="p-3">Status</th>
          <th className="p-3">Driver</th>
          <th className="p-3">Driver ID</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="p-3">{item.product}</td>
            <td className="p-3">{item.destination}</td>
            <td
              className={`p-3 font-medium ${
                item.status === "Approved" ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.status}
            </td>
            <td className="p-3">{item.driver}</td>
            <td className="p-3">{item.driverId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
