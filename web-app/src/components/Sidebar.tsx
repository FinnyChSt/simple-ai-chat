import { useEffect, useState } from "react";
import ProfileModal from "../modals/ProfileModal";
import { useChat } from "../store/ChatContext";
import {
  GetChat,
  GetChats,
  StartChat,
  UpdateChatTitle,
} from "../api/message.service";
import { ChatsResponse } from "../api/api.types";
import { FiLoader } from "react-icons/fi";
import { FaPen } from "react-icons/fa6";

function Sidebar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { setCurrentChatId, setMessages, setChats, chats } = useChat();
  const onNewChat = async () => {
    const { chatId } = await StartChat();
    setCurrentChatId(chatId);
    setMessages([]);
  };
  const [isLoadinChats, setIsLoadingChats] = useState(false);
  const [editChatTitle, setEditChatTitle] = useState<
    { id: number; title: string } | undefined
  >();
  useEffect(() => {
    const CallGetChats = async () => {
      setIsLoadingChats(true);
      let upChats: ChatsResponse[] = [];
      upChats = await GetChats();
      console.log(upChats);
      setChats(upChats);
      setIsLoadingChats(false);
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
        {isLoadinChats ? (
          <FiLoader size={20} className="mr-2 animate-spin" />
        ) : (
          chats.map((chat) => (
            <div key={chat.chatId} className="my-2 flex justify-between">
              {editChatTitle?.id === chat.chatId ? (
                <input
                  type="text"
                  value={editChatTitle.title}
                  onChange={(e) =>
                    setEditChatTitle({
                      ...editChatTitle,
                      title: e.target.value,
                    })
                  }
                  onKeyDown={async (e) => {
                    if (e.key === "Enter" || e.key === "Tab") {
                      await UpdateChatTitle(editChatTitle);
                      const index = chats.findIndex(
                        (item) => item.chatId === chat.chatId,
                      );
                      chats[index] = {
                        ...chat,
                        title: editChatTitle.title,
                      };
                      setChats(chats);
                      setEditChatTitle(undefined);
                    }
                  }}
                  className="flex-1 border-b border-gray-600 bg-transparent text-white outline-none"
                  autoFocus
                />
              ) : (
                <div
                  className="flex cursor-pointer items-center hover:text-gray-300"
                  onClick={async () => {
                    const chatUpdate = await GetChat(chat.chatId);
                    setCurrentChatId(chat.chatId);
                    setMessages(
                      chatUpdate.map((chat) => {
                        return {
                          question: chat.question,
                          answer: chat.answer,
                          reason: chat.reason,
                        };
                      }),
                    );
                  }}
                >
                  {chat.title}
                </div>
              )}
              <button
                style={{ backgroundColor: "unset" }}
                className="mr-2 border-0 bg-transparent p-0 hover:bg-transparent focus:outline-none active:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditChatTitle({ id: chat.chatId, title: chat.title });
                }}
              >
                <FaPen className="cursor-pointer text-gray-400 hover:text-gray-300" />
              </button>
            </div>
          ))
        )}
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
