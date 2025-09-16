// components/InfoCard.tsx
"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
//import * as motion from "motion/react-client"
//import { AnimatePresence } from "framer-motion";
// import { motion, AnimatePresence } from "motion/react-client";
import {motion, AnimatePresence } from "framer-motion"; 
import React, { useState } from "react";



const paragraphs = [
  `At Terminus, we understand that every industry has unique logistics 
   challenges. That's why we offer customized solutions for a wide range of sectors.`,

  `Our advanced technology helps businesses streamline supply chains, 
   improve efficiency, and reduce costs while ensuring reliable delivery.`,

  `From retail to healthcare, we partner with organizations to provide 
   tailored logistics that meet the demands of a fast-changing world.`,
];

// ...existing code...
export default function InfoCard() {
  const [progress, setProgress] = useState(0); // 1, 2, or 3
  const [direction, setDirection] = useState(0);

  // Calculate width percentage
  const getProgressWidth = () => {
    if (progress === 0) return "w-1/3";
    if (progress === 1) return "w-2/3";
    return "w-full";
  };

  const handleLeft = () => {
    if(progress > 0) {
        setDirection(-1);
        setProgress((prev) => prev - 1);
    } 
    
  };
  const handleRight = () => {
    if(progress < 3) {
        setDirection(1);
        setProgress((prev) =>  prev + 1 );
    }
  };

  return (
    <div className="max-w-sm p-6 mt-8 mb-12">

      {/* Text with animation */}
      <div className="relative min-h-[120px] overflow-hidden">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={progress}
          custom={direction}
          initial={{ x: direction === 1 ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 1 ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-1xl leading-relaxed w-full"
        >
          {paragraphs[progress]}
        </motion.div>
      </AnimatePresence>
      </div>


      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Left button */}
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100"
          onClick={handleLeft}
          disabled={progress === 0}
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 mx-4">
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div className={`bg-gray-600 h-1 rounded-full ${getProgressWidth()}`}></div>
          </div>
        </div>

        {/* Right button */}
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100"
          onClick={handleRight}
          disabled={progress === paragraphs.length - 1}
        >
          <FaArrowRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
