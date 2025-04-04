"use client";

import { cn } from "@/lib/utils";
import Lottie from "lottie-react";

export const LottieAnimation = ({ animationData, options = {}, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        {...options}
      />
    </div>
  );
};
