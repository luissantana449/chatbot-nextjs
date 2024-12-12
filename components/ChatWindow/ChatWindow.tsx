"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useChat } from "ai/react";
import { useState } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import { FaArrowUp } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { BiFoodMenu, BiMenu } from "react-icons/bi";

import loadingChat from "../loading-chat.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import {
  ChatContent,
  ChatContentResponse,
} from "@/app/(private)/chat/types/type";
import { ChatHistoryList } from "../ChatHistory/ChatHistoryList";
import { ChatItem } from "../ChatHistory/types";
import { useChatWindowForm } from "./useChatWindow";
import { IChatWindow } from "./types";
import OptionSelector from "../ChatActions/OptionsSelector";
import { OPTIONS } from "../ChatActions/constants";

export function ChatWindow(props: IChatWindow) {
  const {
    inputRef,
    messageContainerRef,
    sessionId,
    setSourcesForMessages,
    sourcesForMessages,
    newChat,
  } = useChatWindowForm();
  const [isExpanded, setIsExpanded] = useState(true);

  const { endpoint, emptyStateComponent, placeholder, emoji } = props;

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

  const [chatItems, setChatItems] = useState<ChatItem[]>([
    { id: "1", title: "Histórico de Chat 1" },
    { id: "2", title: "Histórico de Chat 2" },
    { id: "3", title: "Histórico de Chat 3" },
  ]);

  const handleItemSelect = (id: string) => {
    console.log(`Selecionado item com ID: ${id}`);
  };

  const handleNewChat = () => {
    setMessages([]);
    newChat();
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

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    console.log(isExpanded);
  };

  return (
    <>
      <div className="flex h-full bg-slate-100">
        {messages.length >= 0 && (
          <div
            className={`flex w-2/12 flex-col p-4 border-r border shadow-md transition-all`}
          >
            <div className="flex gap-2">
              <button
                onClick={toggleSidebar}
                className="flex gap-2 cursor-pointer transition-all hover:bg-zinc-200 rounded-md p-2"
              >
                <BiFoodMenu
                  size={20}
                  aria-label="Novo chat"
                  title="Novo chat"
                />
                <span className="text-sm">
                  {!isExpanded ? "Exibir Histórico" : "Ocultar Histórico"}
                </span>
              </button>
              <button
                onClick={handleNewChat}
                className=" flex gap-2 cursor-pointer transition-all hover:bg-zinc-200 rounded-md p-2"
              >
                <FiEdit size={20} aria-label="Novo chat" title="Novo chat" />
                <span className="text-sm">Novo chat</span>
              </button>
            </div>
            {
              <div
                className={`${
                  isExpanded ? "opacity-100 block" : "opacity-0"
                }  opacity-0 transition-opacity ease-in-out`}
              >
                <ChatHistoryList
                  items={chatItems}
                  onItemSelect={handleItemSelect}
                />
              </div>
            }
          </div>
        )}
        <div
          className={`flex flex-col justify-center items-center p-4 pt-0 rounded overflow-hidden w-full container mx-auto`}
        >
          {messages.length === 0 ? (
            <>
              {emptyStateComponent}
              <OptionSelector
                onOptionClick={handleSetTextInput}
                options={OPTIONS}
              />
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
            <div className="flex items-center justify-center">
              <input
                ref={inputRef}
                className={` ${
                  messages.length === 0 && "lg:w-1/2"
                } w-full p-4 pr-14 rounded-xl shadow-md placeholder:text-sm`}
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
