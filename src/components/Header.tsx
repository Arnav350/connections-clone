import { Dispatch, SetStateAction } from "react";
import ap from "../assets/ap.png";

interface IProps {
  dark: boolean;
  setShowCreator: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ dark, setShowCreator }: IProps) => {
  return (
    <header className="header__container dark" style={dark ? { borderColor: "#222" } : {}}>
      <div className="header__left">
        <figure className="header__logo">
          <img src={ap} alt="logo" className="header__image" />
        </figure>
        <div className="header__line"></div>
        <h2 className="header__heading dark" style={dark ? { filter: "brightness(2)" } : {}}>
          Connections
        </h2>
      </div>
      <button
        className="header__create dark"
        style={dark ? { backgroundColor: "#fefef8", color: "#000" } : {}}
        onClick={() => setShowCreator(true)}
      >
        Create Your Own
      </button>
    </header>
  );
};
