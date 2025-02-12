import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'
import { ChatProvider } from '../store/ContextProvider'


function App() {
  

  return (
    <ChatProvider>
      <>
      <div className="flex h-screen w-screen bg-gray-950">
        <Sidebar />
        <ChatWindow />
      </div>
      </>
    </ChatProvider>
  )
}

export default App
