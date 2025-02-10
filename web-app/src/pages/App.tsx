import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'


function App() {
  

  return (
    <>
      <div className="flex h-screen w-screen bg-gray-950">
        <Sidebar />
        <ChatWindow />
      </div>
    </>
  )
}

export default App
