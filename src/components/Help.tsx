import { Dispatch, SetStateAction } from "react";
import { FaArrowDownLong, FaXmark } from "react-icons/fa6";

interface IProps {
  dark: boolean;
  setShowHelp: Dispatch<SetStateAction<boolean>>;
}

export const Help = ({ dark, setShowHelp }: IProps) => {
  return (
    <div className="help__container">
      <div className="help__box dark" style={dark ? { backgroundColor: "#121212", color: "#fefef8" } : {}}>
        <FaXmark size={32} className="help__close" onClick={() => setShowHelp(false)} />
        <h4 className="help__heading">How to Play</h4>
        <h5 className="help__subheading">Find groups of four items that share something in common.</h5>
        <ul className="help__list">
          <li>
            Select four items and tap <b>'Submit'</b> to check if your guess is correct.
          </li>
          <li>Find the groups without making 4 mistakes!</li>
        </ul>
        <h6 className="help__subheading">Category Examples</h6>
        <ul className="help__list">
          <li>FISH: Bass, Flounder, Salmon, Trout</li>
          <li>FIRE ___: Ant, Drill, Island, Opal</li>
        </ul>
        <p className="help__para">Categories will always be more specific than "5-LETTER-WORDS," "NAMES" or "VERBS."</p>
        <p className="help__para">
          Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!
        </p>
        <p className="help__para">Each group is assigned a color, which will be revealed as you solve:</p>
        <div className="help__groups">
          <div className="help__colors">
            <div className="help__color help__yellow"></div>
            <div className="help__color help__green"></div>
            <div className="help__color help__blue"></div>
            <div className="help__color help__purple"></div>
          </div>
          <div className="help__text">
            <p>Straightforward</p>
            <FaArrowDownLong size={20} />
            <p>Tricky</p>
          </div>
        </div>
      </div>
    </div>
  );
};
