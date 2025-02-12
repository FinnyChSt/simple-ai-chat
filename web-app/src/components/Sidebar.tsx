import { useState } from "react";
import ProfileModal from "../modals/ProfileModal";

//ToDO: Add existing chats that can be rerendered again
function Sidebar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 p-4 text-white">
      <h1 className="text-xl font-bold">AI Chat</h1>
      <button className="mt-4 rounded bg-blue-600 p-2">New chat</button>
      <div className="mt-4 flex-1 text-gray-400"> Chats </div>
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
