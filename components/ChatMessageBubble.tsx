import type { Message } from "ai/react";

import Image from "next/image";
import logoDpe from "@/public/images/logo-dpe.png";

export function ChatMessageBubble(props: {
  message: Message;
  aiEmoji?: string;
  sources: any[];
}) {
  const colorClassName =
    props.message.role === "user"
      ? "bg-primary text-white shadow-md"
      : "bg-white shadow-md text-zinc-700";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";

  return (
    <div className={`${alignmentClassName} max-w-[80%] mb-8 flex flex-col`}>
      {props.message.role !== "user" && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg font-bold text-white mb-2">
          <Image src={logoDpe} alt="logo-avatar" />
        </div>
      )}
      <div
        className={`${colorClassName} text-sm rounded px-4 py-2 leading-relaxed flex`}
      >
        {/* <div className="mr-2">{prefix}</div> */}
        <div className="whitespace-pre-wrap flex flex-col">
          <span>{props.message.content.replace(/^"(.*)"$/, "$1")}</span>
        </div>
      </div>
    </div>
  );
}
