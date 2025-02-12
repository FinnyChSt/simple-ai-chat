import { createContext, useContext } from "react";
import { ChatContextType } from "./types";

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
