//ToDO: Add existing chats that can be rerendered again
function Sidebar(){
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
          <h1 className="text-xl font-bold">AI Chat</h1>
          <button className="mt-4 bg-blue-600 p-2 rounded">New chat</button>
          <div className="flex-1 mt-4 text-gray-400"> Chats </div>
          <button className="bg-gray-700 p-2 rounded mt-2">My Profile</button>
        </div>
      );
}

export default Sidebar