export type HistoryChat = {
  chatID: string;
  subject: string;
  startTime: string;
  endTime: string;
  endDate: string;
};

export type HistoryChatResponse = {
  Chats: HistoryChat[];
};

export type ChatContent = {
  content: string;
  messageId: string;
  role: "user" | "assistant";
  timestamp: "";
};

export type ChatContentResponse = {
  Messages: ChatContent[];
};
