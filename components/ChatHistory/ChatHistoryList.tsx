import React from "react";
import { ChatListItem } from "./ChatListItem";
import { ChatListProps } from "./types";

export const ChatHistoryList = ({ items, onItemSelect }: ChatListProps) => {
  return (
    <div className="flex flex-col gap-4 flex-1 mt-10 overflow-auto max-h-[90%]">
      {items.map((item) => (
        <ChatListItem
          key={item.id}
          title={item.title}
          onClick={() => onItemSelect(item.id)}
        />
      ))}
    </div>
  );
};
