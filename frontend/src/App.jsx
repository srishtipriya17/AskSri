
import "./App.css";

import { useContext } from "react";
import { MyContext } from "./context/MyContext";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Chat from "./components/Chat";

function App() {

  const { theme } = useContext(MyContext);

  return (
    <div className={`app ${theme}`}>
      <Sidebar />

      <div className="main-container">
        <ChatWindow />
        <Chat />
      </div>
    </div>
  );
}

export default App;
