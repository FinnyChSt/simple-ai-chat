import { FiLoader } from "react-icons/fi";
import { useChat } from "../store/ChatContext";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import QuestionChatContainer from "./QuestionChatContainer";
import ReasonBubble from "./ReasonChatContainer";
import AnswerChatContainer from "./AnswerChatContainer";

function ChatWindow() {
  const { messages, isLoadingAnswer } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="flex flex-1 flex-col bg-gray-950">
      <div className="w-full flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold">Hi, Chat with me</h2>
            <p className="text-gray-400">How can I help you today?</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className="w-full">
                <QuestionChatContainer question={msg.question} />
                {msg.reason && msg.reason.trim() !== "" && (
                  <ReasonBubble text={msg.reason} />
                )}
                {msg.answer && <AnswerChatContainer answer={msg.answer} />}
              </div>
            ))}
            {isLoadingAnswer && (
              <div className="flex w-full justify-start">
                <div className="m-2 flex max-w-xs items-center rounded-lg bg-gray-700 p-2 text-white">
                  <FiLoader size={20} className="mr-2 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <div className="flex justify-center p-4">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatWindow;
