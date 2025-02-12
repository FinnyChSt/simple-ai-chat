import { useState, ReactNode } from "react";
import { ChatContext } from "./ChatContext";
import { ChatMessage } from "./types";

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<ChatMessage>({
    question: "",
    answer: "",
    reason: "",
  });
  const [isLoadingAnswer, setIsLoadingAnswer] = useState<boolean>(false);
  const [model, setModel] = useState<string>("deepseek-r1:8b");
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
