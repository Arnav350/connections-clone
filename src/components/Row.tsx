import { Dispatch, SetStateAction } from "react";
import { FaGear, FaMoon, FaRegCircleQuestion, FaSun } from "react-icons/fa6";

interface IProps {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
  setShowHelp: Dispatch<SetStateAction<boolean>>;
}

export const Row = ({ dark, setDark, setShowSettings, setShowHelp }: IProps) => {
  return (
    <div className="row__container dark" style={dark ? { borderColor: "#222" } : {}}>
      <button className="row__icon" onClick={() => setDark(!dark)}>
        <FaMoon
          size={20}
          color={dark ? "#efefe6" : ""}
          className={dark ? "row__mode row__dark dark" : "row__mode dark"}
        />
        <FaSun
          size={20}
          color={dark ? "#efefe6" : ""}
          className={dark ? "row__mode dark" : "row__mode row__dark dark"}
        />
      </button>
      <button className="row__icon" onClick={() => setShowSettings(true)}>
        <FaGear size={20} color={dark ? "#efefe6" : ""} className="dark" />
      </button>
      <button className="row__icon" onClick={() => setShowHelp(true)}>
        <FaRegCircleQuestion color={dark ? "#efefe6" : ""} size={20} className="dark" />
      </button>
    </div>
  );
};
