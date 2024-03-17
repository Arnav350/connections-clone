import { useState } from "react";
import { Square } from "./Square";
import { FaCircle } from "react-icons/fa6";

type TColor = "yellow" | "green" | "blue" | "purple";

export interface ISquare {
  word: string;
  color: TColor;
  position: number;
}

export const Main = () => {
  const [squares, setSquares] = useState<ISquare[]>([
    { word: "Dirty", color: "blue", position: 0 },
    { word: "Stand", color: "yellow", position: 1 },
    { word: "Up", color: "purple", position: 2 },
    { word: "Tell", color: "blue", position: 3 },
    { word: "Live", color: "yellow", position: 4 },
    { word: "Serious", color: "green", position: 5 },
    { word: "That", color: "purple", position: 6 },
    { word: "Realize", color: "purple", position: 7 },
    { word: "Champion", color: "green", position: 8 },
    { word: "Eyes", color: "yellow", position: 9 },
    { word: "Book", color: "green", position: 10 },
    { word: "Mouse", color: "blue", position: 11 },
    { word: "Screen", color: "green", position: 12 },
    { word: "Circle", color: "blue", position: 13 },
    { word: "Bulb", color: "purple", position: 14 },
    { word: "Sticky", color: "yellow", position: 15 },
  ]);
  const [selectedList, setSelectedList] = useState<ISquare[]>([]);
  const [mistakes, setMistakes] = useState<number>(4);

  function handleShuffle() {
    const positions: number[] = squares.map(({ position }) => position);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    setSquares((prevSquares) => prevSquares.map((elem, i) => ({ ...elem, position: positions[i] })));
  }

  function handleSubmit() {
    const colorSet: Set<TColor> = new Set(selectedList.map((selected) => selected.color));

    if (colorSet.size === 1) {
      const swapList = squares.filter((square) => square.position > 3 && square.color === selectedList[0].color);
      // setSquares((prevSquares) => prevSquares.map(())

      // );
    } else {
      if (mistakes === 1) {
      } else {
        setMistakes(mistakes - 1);
      }
    }
  }

  return (
    <div className="main__container">
      <h4 className="main__heading">Create four groups of four!</h4>
      <div className="main__words">
        {squares.map((square, i) => (
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
          <FaCircle key={i} color="#5a594e" />
        ))}
      </div>
      <div className="main__buttons">
        <button className="main__button main__shuffle" onClick={handleShuffle}>
          Shuffle
        </button>
        <button
          className="main__button main__deselect"
          style={selectedList.length ? { borderColor: "#000", color: "#000" } : { cursor: "default" }}
          disabled={selectedList.length === 0}
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
          disabled={selectedList.length !== 4}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
