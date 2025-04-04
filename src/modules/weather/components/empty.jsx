import { LottieAnimation } from "@/components/ui/lottie-animation";
import ghostAnimation from "@/assets/animations/ghost.json";

export const Empty = ({ message = "No data found", description }) => {
  return (
    <div className="grid justify-center">
      <LottieAnimation className="w-[300px]" animationData={ghostAnimation} />
      <div className="grid gap-2">
        <h3 className="text-center font-bold text-gray-500 text-2xl">
          {message}
        </h3>
        {description && <p className="font-thin">{description}</p>}
      </div>
    </div>
  );
};
