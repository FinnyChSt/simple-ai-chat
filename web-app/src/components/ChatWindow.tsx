import MessageInput from "./MessageInput";
//ToDo: render current Converstation above the Message input
function ChatWindow (){
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold">Hi, Chat with me</h2>
          <p className="text-gray-400">How can I help you today?</p>
          <MessageInput />
        </div>
      );
}

export default ChatWindow