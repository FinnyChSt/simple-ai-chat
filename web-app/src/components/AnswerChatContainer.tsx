import ReactMarkdown from "react-markdown";

function AnswerChatContainer({ answer }: { answer: string }) {
  return (
    <div className="flex justify-start">
      <div className="m-2 max-w-[70%] rounded-lg bg-gray-700 p-2 text-white">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
    </div>
  );
}
export default AnswerChatContainer;
