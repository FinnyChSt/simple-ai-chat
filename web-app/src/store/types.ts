export interface AiMessage {
  answer: string;
  reason: string;
}

export interface ChatMessage extends AiMessage {
  question: string;
}

export interface ChatContextType {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  currentMessage: ChatMessage;
  setCurrentMessage: (message: ChatMessage) => void;
  isLoadingAnswer: boolean;
  setIsLoadingAnswer: (isLoading: boolean) => void;
  model: string;
  setModel: (model: string) => void;
}
