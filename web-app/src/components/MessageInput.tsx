import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../store/ChatContext";

import {
  AskQuestion,
  StartChat,
  UpdateChatTitle,
} from "../api/message.service";
function MessageInput() {
  const {
    messages,
    setMessages,
    setIsLoadingAnswer,
    isLoadingAnswer,
    model,
    setCurrentChatId,
    currentChatId,
  } = useChat();
  const [question, setQuestion] = useState("");
  const onSubmit = async () => {
    let id = currentChatId;
    if (!id) {
      const res = await StartChat(question);
      setCurrentChatId(res.chatId);
      id = res.chatId;
    }

    if (messages.length === 0) {
      UpdateChatTitle({ id, title: question });
    }
    setIsLoadingAnswer(true);
    setMessages([...messages, { question, answer: "", reason: "" }]);
    setQuestion("");
    const { answer, reason } = await AskQuestion({
      id,
      question,
      model,
    });
    setMessages([...messages, { question, answer, reason }]);
    setIsLoadingAnswer(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="mt-4 flex w-1/2 items-center rounded bg-gray-800 p-4">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={
          isLoadingAnswer ? "Waiting for answer..." : "Type a question for me"
        }
        className="flex-1 bg-transparent text-white outline-none"
      />
      <button className="ml-2 rounded bg-gray-700 p-2" onClick={onSubmit}>
        <FiSend size={20} aria-disabled={isLoadingAnswer} />
      </button>
    </div>
  );
}

export default MessageInput;
