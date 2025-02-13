export interface AiMessage {
  answer: string;
  reason: string;
}

export interface ChatMessage extends AiMessage {
  question: string;
}
