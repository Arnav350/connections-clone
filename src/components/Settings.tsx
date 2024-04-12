import { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";

interface IProps {
  dark: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

export const Settings = ({ dark, setShowSettings }: IProps) => {
  return (
    <div className="settings__container">
      <div className="settings__box dark" style={dark ? { backgroundColor: "#121212", color: "#fefef8" } : {}}>
        <FaXmark size={32} className="settings__close" onClick={() => setShowSettings(false)} />
        <h3 className="settings__heading">SETTINGS</h3>
        <div className="settings__row">
          <h3>Feedback</h3>
          <a href="mailto:patelarnavm@gmail.com" className="settings__link">
            Email
          </a>
        </div>
        <div className="settings__row">
          <h3>Report a Bug</h3>
          <a href="mailto:patelarnavm@gmail.com" className="settings__link">
            Email
          </a>
        </div>
      </div>
    </div>
  );
};
