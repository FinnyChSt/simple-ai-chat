import { useLayoutEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { ListOfOllamaModels } from "../../../utils/ollama";
import { useChat } from "../store/ChatContext";

interface ProfileModalProps {
  onClose: () => void;
}

function ProfileModal({ onClose }: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<string[]>([]);
  const { setModel } = useChat();
  useLayoutEffect(() => {
    const getList = async () => {
      const newList = await ListOfOllamaModels();
      setList(newList);
    };
    getList();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const Options = list.map((model) => {
    return (
      <option value={model} onClick={() => setModel(model)}>
        {model}
      </option>
    );
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative min-w-100 rounded-lg bg-gray-800 p-6"
      >
        <div className="flex justify-end pb-4">
          <button onClick={onClose} className="shrink text-white">
            <FiX size={24} />
          </button>
        </div>
        <h2 className="mb-4 flex justify-center text-xl text-white">
          Select AI Client
        </h2>
        <select className="w-full rounded bg-gray-700 p-2 text-white">
          {Options}
        </select>
      </div>
    </div>
  );
}

export default ProfileModal;
