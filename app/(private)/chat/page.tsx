import { ChatWindow } from "@/components/ChatWindow/ChatWindow";
import { HistoryChat, HistoryChatResponse } from "./types/type";
import { Suspense } from "react";

async function fetchHistoryChat(): Promise<HistoryChat[]> {
  const historyChat = await fetch(
    "https://syzmrjv2me.execute-api.sa-east-1.amazonaws.com/dev/Defensor_1/chats",
  );

  if (historyChat.ok) {
    const response = (await historyChat.json()) as HistoryChatResponse;

    return response.Chats;
  } else {
    console.error("Failed to fetch chat history");
    return [];
  }
}

export default async function Chat() {
  // const responseChat = await fetchHistoryChat();

  const InfoCard = (
    <div className="p-4 rounded-sm w-full overflow-hidden flex justify-center items-center text-primary ">
      <div>
        <p className="text-center font-bold text-3xl">Como posso ajudar?</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<p></p>}>
      <ChatWindow
        endpoint="api/chat"
        emoji=""
        titleText="Chat Bedrock"
        placeholder="Digite sua mensagem aqui..."
        emptyStateComponent={InfoCard}
      />
    </Suspense>
  );
}
