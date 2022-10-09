import { createContext, useState } from "react";
import "./App.css";
import { Home } from "./pages/home/home.jsx";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div id="body">
          <Home theme={theme} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
