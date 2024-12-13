import { ReactNode } from "react";

type TooltipProps = {
  icon: ReactNode;
  description: string;
  iconColor?: string;
  descriptionClass?: string;
  isActive?: boolean;
};

export default function Tooltip({ isActive = true, ...props }: TooltipProps) {
  return (
    <div className="absolute justify-center items-center z-50">
      <div className="relative group">
        <span className={`flex justify-center items-center ${props.iconColor}`}>
          {props.icon}
        </span>
        <div
          className={`${
            !isActive && "hidden group-hover:hidden"
          } select-none absolute left-1/2 transform -translate-x-1/2 mt-2 hidden w-max bg-gray-800 text-white text-xs rounded-lg px-3 py-2 group-hover:block`}
        >
          {props.description}
        </div>
      </div>
    </div>
  );
}
