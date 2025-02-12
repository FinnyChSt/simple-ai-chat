function QuestionChatContainer({ question }: { question: string }) {
  return (
    <div className="flex justify-start">
      <div className="m-2 max-w-[70%] rounded-lg bg-blue-600 p-2 text-white">
        {question}
      </div>
    </div>
  );
}
export default QuestionChatContainer;
