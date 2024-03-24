import { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";

interface IProps {
  setShowResults: Dispatch<SetStateAction<boolean>>;
  result: string;
}

export const Results = ({ setShowResults, result }: IProps) => {
  return (
    <div className="results__container">
      <div className="results__box">
        <FaXmark size={32} className="results__close" onClick={() => setShowResults(false)} />
        <h3 className="results__heading">{result}</h3>
      </div>
    </div>
  );
};
