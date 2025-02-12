import { useEffect, useState } from "react";
import ProfileModal from "../modals/ProfileModal";
import { useChat } from "../store/ChatContext";
import { GetChats, StartChat } from "../api/message.service";
import { ChatsResponse } from "../api/api.types";

function Sidebar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { setCurrentChatId, setMessages, setChats, chats } = useChat();
  const onNewChat = async () => {
    const { chatId } = await StartChat();
    setCurrentChatId(chatId);
    setMessages([]);
  };

  useEffect(() => {
    const CallGetChats = async () => {
      let upChats: ChatsResponse[] = [];
      upChats = await GetChats();
      console.log(upChats);
      setChats(upChats);
    };
    CallGetChats();
  }, [setChats]);
  console.log("Chats state:", chats);
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 p-4 text-white">
      <h1 className="text-xl font-bold">AI Chat</h1>
      <button className="mt-4 rounded bg-blue-600 p-2" onClick={onNewChat}>
        New chat
      </button>
      <div className="flex-1">
        <h2 className="mt-4 text-2xl font-bold text-gray-400"> Chats </h2>
        {chats.map((chat) => (
          <div key={chat.chatId} className="cursor-pointer hover:text-gray-300">
            {chat.title}
          </div>
        ))}
      </div>
      <button
        className="mt-2 rounded bg-gray-700 p-2"
        onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
      >
        My Profile
      </button>
      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}
    </div>
  );
}

export default Sidebar;
