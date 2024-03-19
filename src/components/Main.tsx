import { useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { Square } from "./Square";
import connections from "../connections.json";

type TLevel = 0 | 1 | 2 | 3;

export interface ISquare {
  word: string;
  level: TLevel;
  position: number;
}

interface ISolved {
  category: string;
  words: string;
  level: TLevel;
  solved: boolean;
}

export const Main = () => {
  const initConnections = connections[Math.floor(Math.random() * connections.length)].answers;
  const initSquares: ISquare[] = initConnections
    .map((initConnection) =>
      initConnection.members.map((member) => ({
        position: 0,
        level: initConnection.level as TLevel,
        word: member,
      }))
    )
    .flat()
    .sort(() => 0.5 - Math.random())
    .map((square, index) => ({ ...square, position: index }));
  const initSolved: ISolved[] = initConnections.map(({ group, members, level }) => ({
    category: group,
    words: members.join(", "),
    level: level as TLevel,
    solved: false,
  }));

  const [squares, setSquares] = useState<ISquare[]>(initSquares);
  const [selectedList, setSelectedList] = useState<ISquare[]>([]);
  const [mistakes, setMistakes] = useState<number>(4);
  const [solvedList, setSolvedList] = useState<ISolved[]>(initSolved);

  function handleShuffle() {
    const positions: number[] = squares.map(({ position }) => position);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    setSquares((prevSquares) => prevSquares.map((prevSquare, i) => ({ ...prevSquare, position: positions[i] })));
  }

  function handleSubmit() {
    const colorSet: Set<TLevel> = new Set(selectedList.map((selected) => selected.level));

    if (colorSet.size === 1) {
      const swapList = selectedList.filter((selected) => selected.position > 3).map((selected) => selected.position);
      const squaresList = squares.map((square) => ({ ...square }));

      for (let i = 0; i < 4; i++) {
        if (squaresList[i].level !== selectedList[0].level) {
          const squareIndex = squaresList.findIndex((square) => square.position === swapList[0]);

          if (squareIndex !== -1) {
            squaresList[squareIndex].position = squaresList[i].position;
          }

          squaresList[i].position = swapList[0];
          swapList.shift();
        }
      }

      setSquares(squaresList);

      setTimeout(() => {
        setSquares((prevSquares) =>
          prevSquares
            .filter((prevSquare) => prevSquare.position > 3)
            .map((prevSquare) => ({ ...prevSquare, position: prevSquare.position - 4 }))
        );

        setSolvedList((prevSolveds) =>
          prevSolveds
            .map((prevSolved) =>
              prevSolved.level === selectedList[0].level ? { ...prevSolved, solved: true } : prevSolved
            )
            .sort((prevSolved) => (prevSolved.solved ? -1 : 1))
        );

        setSelectedList([]);
      }, 250);
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
      <div className="main__box">
        {solvedList.map((solved, i) => (
          <div
            key={i}
            className={`main__solved main__solved${solved.level}`}
            style={solved.solved ? {} : { display: "none" }}
          ></div>
        ))}
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
