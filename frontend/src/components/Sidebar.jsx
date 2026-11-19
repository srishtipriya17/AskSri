
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import "./Sidebar.css";

function Sidebar({
  chats = [],
  activeThreadId,
  onNewChat,
  onSelectChat
}) {

  const { theme, toggleTheme } = useContext(MyContext);

  return (
    <div className={`sidebar ${theme}`}>

      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">AskSri</h2>
        <span className="logo-icon">✦</span>
      </div>

      {/* New Chat Button */}
      <button
        className="new-chat-btn"
        onClick={onNewChat}
      >
        <span>+</span>
        New Chat
      </button>

      {/* Chat History */}
      <div className="chat-history">
        <h4 className="history-heading">
          Recent Chats
        </h4>

        {chats.length === 0 ? (
          <p className="empty-history">
            No conversations yet
          </p>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.threadId}
              className={`chat-item ${
                activeThreadId === chat.threadId ? "active" : ""
              }`}
              onClick={() => onSelectChat(chat.threadId)}
            >
              <span className="chat-icon">◷</span>
              <span className="chat-title">{chat.title}</span>
            </button>
          ))
        )}
      </div>

      {/* Theme Toggle */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-avatar">AS</div>

        <div className="user-info">
          <h4>AskSri User</h4>
          <p>Personal Account</p>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
