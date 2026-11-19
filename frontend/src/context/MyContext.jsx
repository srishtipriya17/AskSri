
import { createContext, useState } from "react";

// Create Context
export const MyContext = createContext();

function MyContextProvider({ children }) {

  // Theme state
  const [theme, setTheme] = useState("light");

  // Messages state
  const [messages, setMessages] = useState([]);

  // Function to change theme
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <MyContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        messages,
        setMessages
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
