import React from "react";
import { ChatItemProps } from "./types";

export const ChatListItem = ({ title, onClick }: ChatItemProps) => (
  <div
    className="text-sm p-2 rounded-md hover:bg-zinc-300 transition-colors cursor-pointer truncate"
    onClick={onClick}
  >
    {title}
  </div>
);
