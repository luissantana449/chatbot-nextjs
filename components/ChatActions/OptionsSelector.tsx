// OptionSelector.jsx
import React from "react";

type Option = {
  id: number;
  label: string;
  icon: React.ElementType;
  iconClass: string;
};

type OptionSelectorProps = {
  options: Option[];
  onOptionClick: (id: number) => void;
};

const OptionSelector = ({ options, onOptionClick }: OptionSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center text-zinc-500 mb-8 text-sm">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => onOptionClick(option.id)}
          className="p-2 border rounded-lg px-4 flex items-center gap-2 cursor-pointer hover:bg-white hover:text-zinc-900 hover:shadow-md shadow-sm transition-all"
        >
          {React.createElement(option.icon, {
            size: 20,
            className: option.iconClass,
          })}
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default OptionSelector;
