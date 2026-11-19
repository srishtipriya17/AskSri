
import { useState, useContext } from "react";
import "./Chat.css";
import { MyContext } from "../context/MyContext";

function Chat() {
  const [message, setMessage] = useState("");

  const { messages, setMessages } = useContext(MyContext);

  const handleSend = () => {
    if (message.trim() === "") {
      return;
    }

    const newMessage = {
      role: "user",
      content: message
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage
    ]);

    setMessage("");
  };

  return (
    <div className="chat-input-container">
      <div className="input-box">
        <input
          type="text"
          placeholder="Message AskSri..."
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <span className="voice-icon" title="Voice input">
          🎙️
        </span>

        <button
          className="send-btn"
          title="Send message"
          onClick={handleSend}
        >
          ↑
        </button>
      </div>
    </div>
  );
}

export default Chat;
