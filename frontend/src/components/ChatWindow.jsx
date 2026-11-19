import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import "./ChatWindow.css";

function ChatWindow() {
  const { messages } = useContext(MyContext);
  return (
    <div className="chat-window">

      <div className="chat-header">
        <h3>AskSri</h3>
        <span>New Chat</span>
      </div>

      
<div className="welcome-section">
  {messages.length === 0 ? (
    <>
      <div className="welcome-icon">✦</div>

      <h1>What can I help you with?</h1>

      <p>Ask anything. Let's figure it out together.</p>

      <div className="suggestion-grid">
        <div className="suggestion-card">
          <span>⌘</span>
          <h4>Write code</h4>
          <p>Build and debug your projects</p>
        </div>

        <div className="suggestion-card">
          <span>✎</span>
          <h4>Improve writing</h4>
          <p>Write and refine your ideas</p>
        </div>

        <div className="suggestion-card">
          <span>◈</span>
          <h4>Learn something</h4>
          <p>Understand new concepts</p>
        </div>

        <div className="suggestion-card">
          <span>⌕</span>
          <h4>Explore ideas</h4>
          <p>Brainstorm and discover</p>
        </div>
      </div>
    </>
  ) : (
    <div className="messages-list">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.role}`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  )}
</div>


    </div>
  );
}

export default ChatWindow;
