import { useState, ReactNode } from "react";
import { ChatContext } from "./ChatContext";
import { ChatsResponse } from "../api/api.types";
import { ChatMessage } from "../../../types/message.types";

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<ChatMessage>({
    question: "",
    answer: "",
    reason: "",
  });
  const [isLoadingAnswer, setIsLoadingAnswer] = useState<boolean>(false);
  const [model, setModel] = useState<string>("deepseek-r1:8b");
  const [currentChatId, setCurrentChatId] = useState<number>(0);
  const [chats, setChats] = useState<ChatsResponse[]>([]);
  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        currentMessage,
        setCurrentMessage,
        isLoadingAnswer,
        setIsLoadingAnswer,
        model,
        setModel,
        currentChatId,
        setCurrentChatId,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
