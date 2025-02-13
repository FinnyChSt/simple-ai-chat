import { ChatMessage } from "../../../types/message.types";
import { ChatsResponse } from "../api/api.types";

export interface ChatContextType {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  currentMessage: ChatMessage;
  setCurrentMessage: (message: ChatMessage) => void;
  isLoadingAnswer: boolean;
  setIsLoadingAnswer: (isLoading: boolean) => void;
  model: string;
  setModel: (model: string) => void;
  currentChatId: number;
  setCurrentChatId: (id: number) => void;
  chats: ChatsResponse[];
  setChats: (chats: ChatsResponse[]) => void;
}
