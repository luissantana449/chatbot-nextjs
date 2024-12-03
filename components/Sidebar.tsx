"use client";
import {
  ChatContentResponse,
  HistoryChat,
} from "@/app/(private)/chat/types/type";
import { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";

interface ISideBarProps {
  historyChat: HistoryChat[];
  callBackFunction(param: string): Promise<void>;
}

export default function Sidebar(props: ISideBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed top-0 md:relative flex h-full overflow-y-auto overflow-x-hidden ${
        isExpanded && "bg-zinc-100"
      } ${!isExpanded && "z-50 h-full lg:z-0 lg:static"}  text-sm`}
    >
      {/* Sidebar */}
      <div
        className={`text-white transition-all ease-in-out ${
          isExpanded ? "w-96" : "w-16"
        }`}
      >
        {/* Header with Toggle Button */}
        <div
          className={`flex items-center gap-2 p-4 text-zinc-700 ${
            isExpanded && "border-b-2"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="text-zinc-700 focus:outline-none hover:opacity-50 p-1 rounded-md transition-opacity"
          >
            {!isExpanded ? (
              <RiMenu2Line size={24} className="text-white md:text-zinc-700" />
            ) : (
              <IoMdClose size={24} />
            )}
          </button>
          <h1
            className={`text-base font-bold ${
              isExpanded
                ? "opacity-100 max-h-40 delay-300"
                : "opacity-0 max-h-0 delay-300 overflow-hidden"
            } delay-75 transition-all`}
          >
            Histórico
          </h1>
        </div>

        {/* Sidebar Content */}
        <div
          className={` ${
            isExpanded
              ? "opacity-100 max-h-40 delay-150"
              : "opacity-0 max-h-0 delay-150 hidden"
          } delay-75 transition-all text-zinc-700`}
        >
          <ul className="flex items-center justify-center flex-col">
            {props.historyChat?.map((chat, i) => {
              return (
                !!chat.subject && (
                  <li
                    onClick={() => props.callBackFunction(chat.chatID)}
                    key={i}
                    className="p-4 hover:bg-zinc-200 rounded-md ease-in-out transition-colors cursor-pointer truncate w-72 m-1"
                  >
                    {chat.subject}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
