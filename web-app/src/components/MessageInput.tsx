import { FiSend } from 'react-icons/fi';
//TODO: sent message to the local ollama service and return message to the chat window
function MessageInput(){
    return (
        <div className="bg-gray-800 p-4 rounded w-1/2 mt-4 flex items-center">
          <input
            type="text"
            placeholder="Type a question for me"
            className="flex-1 bg-transparent outline-none text-white"
          />
          <button className="bg-gray-700 p-2 rounded ml-2"><FiSend size={20} /></button>
        </div>
      );
}

export default MessageInput