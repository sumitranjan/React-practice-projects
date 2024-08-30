import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./theme.css";

const Theme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`themeContainer ${theme}`}>
      <h1>React Theme Switcher</h1>
      <button className={`theme-button ${theme}-button`} onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} Theme
      </button>
    </div>
  );
};

export default Theme;
