import { useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { Solved } from "./Solved";
import { Square } from "./Square";
import connections from "../connections.json";

type TLevel = 0 | 1 | 2 | 3;

export interface ISquare {
  word: string;
  level: TLevel;
  position: number;
}

export interface ISolved {
  category: string;
  words: string;
  level: TLevel;
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
  }));

  const [squares, setSquares] = useState<ISquare[]>(initSquares);
  const [selectedList, setSelectedList] = useState<ISquare[]>([]);
  const [mistakes, setMistakes] = useState<number>(4);
  const [unsolvedList, setUnsolvedList] = useState<ISolved[]>(initSolved);
  const [solvedList, setSolvedList] = useState<ISolved[]>([]);

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
      const curSquares = squares.map((square) => ({ ...square }));

      const swapList = curSquares
        .map(({ level, position }, index) => ({ level, position, index }))
        .filter(({ level, position }) => level === selectedList[0].level && position > 3);

      for (let i = 0; i < 4; i++) {
        const swapSquare = curSquares.findIndex(
          (curSquare) => curSquare.position === i && curSquare.level !== selectedList[0].level
        );

        if (swapSquare !== -1) {
          curSquares[swapList[0].index].position = curSquares[swapSquare].position;
          curSquares[swapSquare].position = swapList[0].position;
          swapList.shift();
        }
      }

      setSquares(curSquares);

      setTimeout(() => {
        setSquares((prevSquares) =>
          prevSquares
            .filter((prevSquare) => prevSquare.position > 3)
            .map((prevSquare) => ({ ...prevSquare, position: prevSquare.position - 4 }))
        );

        setSolvedList((prevSolveds) => [
          ...prevSolveds,
          unsolvedList[unsolvedList.findIndex((unsolved) => unsolved.level === selectedList[0].level)],
        ]);

        setUnsolvedList((prevUnsolveds) =>
          prevUnsolveds.filter((prevUnsolved) => prevUnsolved.level !== selectedList[0].level)
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
          <Solved key={i} solved={solved} />
        ))}
        <div className="main__words">
          {squares.map((square, i) => (
            <Square
              key={i}
              square={{ ...square, word: square.word }}
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
