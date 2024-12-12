import { useRef, useState } from "react";
import { v4 } from "uuid";

export const useChatWindowForm = () => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const [sessionId, setSessionId] = useState<string>("");

  const newChat = () => {
    setSessionId(v4());
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.remove("grow");
    }
  };

  return {
    setSessionId,
    newChat,
    setSourcesForMessages,
    sessionId,
    messageContainerRef,
    inputRef,
    sourcesForMessages,
  };
};
