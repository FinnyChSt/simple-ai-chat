import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

function ReasonBubble({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const collapsedLength = 50; 

  return (
    <div className="flex justify-start max-w-[70%] m-2">
      <span className="mr-2">🤔</span>
      <div className="bg-green-700 text-white p-2 rounded-lg  flex items-center">
        
        <span className="flex-1">
          {expanded ? text : `${text.substring(0, collapsedLength)}${text.length > collapsedLength ? '...' : ''}`}
        </span>
        {text.length > collapsedLength && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-xs bg-gray-600 px-2 py-1 rounded"
          >
            {expanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReasonBubble