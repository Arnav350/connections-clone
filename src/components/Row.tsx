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
    <div className="row__container">
      <button className="row__icon" onClick={() => setDark(!dark)}>
        <FaMoon size={20} className={dark ? "row__mode row__dark" : "row__mode"} />
        <FaSun size={20} className={dark ? "row__mode" : "row__mode row__dark"} />
      </button>
      <button className="row__icon" onClick={() => setShowSettings(true)}>
        <FaGear size={20} />
      </button>
      <button className="row__icon" onClick={() => setShowHelp(true)}>
        <FaRegCircleQuestion size={20} />
      </button>
    </div>
  );
};
