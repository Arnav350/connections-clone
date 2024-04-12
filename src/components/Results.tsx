import { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";
import { ISquare } from "./Main";

interface IProps {
  dark: boolean;
  result: string;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  attemptList: ISquare[][];
}

export const Results = ({ dark, result, setShowResults, attemptList }: IProps) => {
  return (
    <div className="results__container">
      <div className="results__box dark" style={dark ? { backgroundColor: "#121212" } : {}}>
        <FaXmark size={32} className="results__close" onClick={() => setShowResults(false)} />
        <h3 className="results__heading dark" style={dark ? { color: "#fefef8" } : {}}>
          {result}
        </h3>
        <p className="dark" style={dark ? { color: "#fefef8" } : {}}>
          Attempts:
        </p>
        <div className="results__attempts">
          {attemptList.map((attempt, i) => (
            <div key={i} className="results__attempt">
              {attempt.map((square, j) => (
                <div key={j} className={`results__square results__square${square.level}`}>
                  {square.word}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
