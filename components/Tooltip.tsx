import { ReactNode } from "react";

type TooltipProps = {
  icon: ReactNode;
  description: string;
  iconColor?: string;
};

export default function Tooltip(props: TooltipProps) {
  return (
    <div className="absolute justify-center items-center">
      <div className="relative group">
        <span className={`flex justify-center items-center ${props.iconColor}`}>
          {props.icon}
        </span>
        <div className="select-none absolute left-1/2 transform -translate-x-1/2 mt-2 hidden w-max bg-gray-800 text-white text-xs rounded-lg px-3 py-2 group-hover:block">
          {props.description}
        </div>
      </div>
    </div>
  );
}
