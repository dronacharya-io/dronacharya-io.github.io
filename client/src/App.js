import { createContext, useState } from "react";
import "./App.css";
import { HomePage } from "./pages/home/HomePage.jsx";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div id="body">
          <HomePage theme={theme} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
