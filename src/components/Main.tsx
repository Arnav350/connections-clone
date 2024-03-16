import { useState } from "react";
import { Square } from "./Square";
import { FaCircle } from "react-icons/fa6";

export interface ISquare {
  word: string;
  color: "yellow" | "green" | "blue" | "purple";
}

export const Main = () => {
  const arr: ISquare[] = [
    { word: "Dirty", color: "yellow" },
    { word: "Stand", color: "yellow" },
    { word: "Up", color: "yellow" },
    { word: "Tell", color: "yellow" },
    { word: "Live", color: "yellow" },
    { word: "Serious", color: "yellow" },
    { word: "That", color: "yellow" },
    { word: "Realize", color: "yellow" },
    { word: "Champion", color: "yellow" },
    { word: "Eyes", color: "yellow" },
  ];
  const [selectedList, setSelectedList] = useState<ISquare[]>([]);
  const [mistakes, setMistakes] = useState<number>(4);

  function handleClick() {}

  const [test, setTest] = useState<number[]>([1, 2, 3]);

  return (
    <div className="main__container">
      <h4 className="main__heading">Create four groups of four!</h4>
      <div onClick={() => setTest((prevTest) => prevTest.slice().sort(() => Math.random() - 0.5))}>
        {test.map((elem, i) => (
          <p key={i} className="test" style={{ top: elem * 64, left: elem * 64 }}>
            {elem}
          </p>
        ))}
      </div>
      <div className="main__words">
        {arr.map((square, i) => (
          <Square
            key={i}
            square={{ ...square, word: square.word.toUpperCase() }}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        ))}
      </div>
      <div className="main__mistakes">
        <p className="main__remaining">Mistakes remaining:</p>
        {[...Array(mistakes)].map((__, i) => (
          <FaCircle key={i} color="#544c43" />
        ))}
      </div>
      <div className="main__buttons">
        <button className="main__button main__shuffle">Shuffle</button>
        <button
          className="main__button main__deselect"
          style={selectedList.length ? {} : { borderColor: "#544c43", color: "#544c43", cursor: "default" }}
          onClick={() => setSelectedList([])}
        >
          Deselect All
        </button>
        <button
          className="main__button main__submit"
          style={
            selectedList.length === 4
              ? { backgroundColor: "#000", borderColor: "#000", color: "#fff" }
              : { cursor: "default" }
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};
