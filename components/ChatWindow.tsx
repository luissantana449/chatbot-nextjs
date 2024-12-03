"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 } from "uuid";

import { useChat } from "ai/react";
import { useRef, useState, ReactElement } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import { FaArrowUp } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";

import loadingChat from "./loading-chat.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import {
  ChatContent,
  ChatContentResponse,
  HistoryChat,
} from "@/app/(private)/chat/types/type";

interface IChatWindow {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  titleText?: string;
  emoji?: string;
  showIngestForm?: boolean;
  showIntermediateStepsToggle?: boolean;
  historyChat?: HistoryChat[];
}

export function ChatWindow(props: IChatWindow) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { endpoint, emptyStateComponent, placeholder, emoji } = props;
  const [sessionId, setSessionId] = useState<string>("");

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: endpoint,
    headers: {
      "x-uuid": sessionId,
    },
    onResponse(response: any) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    streamMode: "text",
    onError: (e: any) => {
      toast(e.message, {
        theme: "dark",
      });
    },
  });

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      return;
    }

    handleSubmit(e);
  }

  const handleSetTextInput = (option?: number) => {
    inputRef.current?.focus();
    switch (option) {
      case 1:
        return setInput("Resuma o texto: ");

      case 2:
        return setInput("Conselhos sobre: ");

      case 3:
        return setInput("Ajude a escrever: ");

      default:
        break;
    }
  };

  async function handleMessagesToChat(chatId: string) {
    try {
      const response = await fetch(
        `https://syzmrjv2me.execute-api.sa-east-1.amazonaws.com/dev/Defensor_1/${chatId}/chat`,
      );

      if (messageContainerRef.current) {
        messageContainerRef.current.classList.add("grow");
      }

      if (response.ok) {
        const chatContent = (await response.json()) as ChatContentResponse;
        const newMessages = chatContent.Messages.map((msg: ChatContent) => ({
          id: msg.messageId.toString(),
          content: msg.content,
          role: msg.role,
        }));

        setMessages([...newMessages]);

        const jsonPayload = JSON.stringify(newMessages);

        setInput(jsonPayload);
        setInput("");

        handleSubmit({
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>);
        handleSubmit();
      } else {
        toast.error("Erro ao carregar mensagens");
        console.error("Erro ao carregar mensagens:", response.status);
      }
    } catch (error) {
      toast.error("Erro ao processar mensagens");
      console.error("Erro ao processar mensagens:", error);
    }
  }

  const newChat = () => {
    setMessages([]);
    setSessionId(v4());
    console.log(sessionId);
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.remove("grow");
    }
  };

  return (
    <>
      {messages.length > 0 && (
        <div className="container mx-auto py-4">
          <FiEdit
            size={20}
            className="cursor-pointer hover:brightness-150 transition-all"
            aria-label="Novo chat"
            title="Novo chat"
            onClick={newChat}
          />
        </div>
      )}
      <div className="flex h-[89%] bg-slate-100">
        {/* <Sidebar
        historyChat={props.historyChat}
        callBackFunction={handleMessagesToChat}
      /> */}
        <div
          className={`flex flex-col justify-center items-center p-4 pt-0 rounded overflow-hidden w-full container mx-auto`}
        >
          {messages.length === 0 ? (
            <>
              {emptyStateComponent}
              <div className="flex flex-wrap gap-5 justify-center items-center text-zinc-500 mb-8 text-sm">
                <div
                  onClick={() => handleSetTextInput(1)}
                  className="p-2 border rounded-lg px-4 flex items-center gap-2 cursor-pointer hover:bg-white hover:text-zinc-900 hover:shadow-md shadow-sm  transition-all"
                >
                  <IoDocumentTextOutline
                    size={20}
                    className="text-purple-500"
                  />
                  Resumir textos
                </div>
                <div
                  onClick={() => handleSetTextInput(2)}
                  className="p-2 border rounded-lg px-4 flex items-center gap-2 cursor-pointer hover:bg-white hover:text-zinc-900 hover:shadow-md shadow-sm  transition-all"
                >
                  <HiOutlineAcademicCap size={20} className="text-blue-500" />
                  Aconselhar
                </div>
                <div
                  onClick={() => handleSetTextInput(3)}
                  className="p-2 border rounded-lg px-4 flex items-center gap-2 cursor-pointer hover:bg-white hover:text-zinc-900 hover:shadow-md shadow-sm  transition-all"
                >
                  <TfiWrite size={18} className="text-orange-500" />
                  Ajudar a escrever
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div
            className="flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out"
            ref={messageContainerRef}
          >
            {messages.length > 0
              ? [...messages].reverse().map((m, i) => {
                  const sourceKey = (messages.length - 1 - i).toString();
                  return (
                    <ChatMessageBubble
                      key={m.id}
                      message={m}
                      aiEmoji={emoji}
                      sources={sourcesForMessages[sourceKey]}
                    />
                  );
                })
              : ""}
            {chatEndpointIsLoading && (
              <div className="absolute">
                <div>
                  <Lottie
                    key={1}
                    animationData={loadingChat}
                    className="bg-white rounded-md w-14"
                  />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="flex w-full flex-col">
            <div className="flex items-center justify-center ">
              <input
                ref={inputRef}
                className={` ${
                  messages.length === 0 && "lg:w-1/2"
                } w-full p-4 pr-14 bg-white rounded-xl shadow-md placeholder:text-sm`}
                value={input}
                placeholder={
                  placeholder ?? "Vamos conversar! O que você quer saber?"
                }
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="absolute right-5 sm:relative sm:right-12 bg-zinc-500 rounded-full w-10 h-10 text-white flex items-center justify-center hover:bg-opacity-70 transition-all"
              >
                <div className={`${chatEndpointIsLoading ? "" : "hidden"} `}>
                  <ImSpinner8 className="w-4 h-4 text-white animate-spin dark:text-white fill-zinc-200" />
                </div>
                <span className={chatEndpointIsLoading ? "hidden" : ""}>
                  <FaArrowUp className="text-xl" />
                </span>
              </button>
            </div>
          </form>
          <div className="flex items-center gap-1">
            <FaInfoCircle className="text-xs" />
            <p className="text-xs opacity-75">
              O Chat pode cometer erros. Considere verificar informações
              importantes.
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
