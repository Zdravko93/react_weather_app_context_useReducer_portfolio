import toggleThemeIcon from "../../../assets/toggle-theme-icon.png";

import classes from "./ThemeSwitcher.module.css";

import Button from "../Button";
import Image from "../Image";

import { useTheme } from "../../../context/ThemeContext";

function ThemeSwitcher({ className }) {
  const { toggleTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle theme"
      callback={toggleTheme}
      className={`${classes["theme-switcher-btn"]} ${className}`}
    >
      <Image
        imgSrc={toggleThemeIcon}
        altText="Toggle theme between light and dark"
      />
    </Button>
  );
}

export default ThemeSwitcher;
