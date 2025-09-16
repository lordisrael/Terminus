"use client";


import { Rectangle } from "recharts";

export interface CustomBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  payload: { shipment: number; delivery: number };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { shipment: number; delivery: number } }>;
  label?: string;
}

// Remove duplicate export
const CustomBar = ({ x, y, width, height, payload }: CustomBarProps) => {
  // The "base" of the bar is y + height (bottom of the bar area)
  const baseY = y + height;

  // Scale proportion of delivery vs shipment
  const shipmentHeight = height;
  const deliveryHeight =
    payload.shipment > 0
      ? (payload.delivery / payload.shipment) * shipmentHeight
      : 0;

  return (
    <g>
      {/* Shipment background */}
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={shipmentHeight}
        fill="#9CA3AF"
        radius={[10, 10, 0, 0]}
      />
      {/* Delivery overlay */}
      <Rectangle
        x={x}
        y={baseY - deliveryHeight}
        width={width}
        height={deliveryHeight}
        fill="#292928"
        radius={[10, 10, 0, 0]}
      />
    </g>
  );
}
// Custom tooltip to show both Shipment + Delivery
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#F9FAFB] p-2 rounded shadow text-sm">
        <p>
          Shipment: <span className="font-bold mx-4">{data.shipment}</span>
        </p>
        <div className="flex items-center my-1">
            <div className="flex-1 h-px bg-gray-300" />
        </div>
        <p>
          Delivery: <span className="font-bold mx-6">{data.delivery}</span>
        </p>
      </div>
    );
  }
  return null;
};


export {
  CustomBar,
  CustomTooltip
};