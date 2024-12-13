import React from "react";
import { ChatListItem } from "./ChatListItem";
import { ChatListProps } from "./types";

export const ChatHistoryList = ({ items, onItemSelect }: ChatListProps) => {
  const dataAtual = new Date();
  return (
    <div className="flex flex-col gap-2 flex-1 mt-20 overflow-auto max-h-[90%]">
      <div className="font-bold text-sm">{`Ontem`}</div>
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
