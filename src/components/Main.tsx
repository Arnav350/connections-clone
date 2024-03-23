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
  words: string[];
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
    words: members,
    level: level as TLevel,
  }));

  const [squares, setSquares] = useState<ISquare[]>(initSquares);
  const [unsolvedList, setUnsolvedList] = useState<ISolved[]>(initSolved);
  const [solvedList, setSolvedList] = useState<ISolved[]>([]);
  const [selectedList, setSelectedList] = useState<ISquare[]>([]);
  const [mistakes, setMistakes] = useState<number>(4);
  const [win, setWin] = useState<string>("");
  const [showAway, setShowAway] = useState<boolean>(false);
  const [showNext, setShowNext] = useState<boolean>(false);

  function handleNew() {
    let newConnections = connections[Math.floor(Math.random() * connections.length)].answers;
    while (newConnections === initConnections) {
      newConnections = connections[Math.floor(Math.random() * connections.length)].answers;
    }
    const newSquares: ISquare[] = newConnections
      .map((newConnection) =>
        newConnection.members.map((member) => ({
          position: 0,
          level: newConnection.level as TLevel,
          word: member,
        }))
      )
      .flat()
      .sort(() => 0.5 - Math.random())
      .map((square, index) => ({ ...square, position: index }));
    const newSolved: ISolved[] = newConnections.map(({ group, members, level }) => ({
      category: group,
      words: members,
      level: level as TLevel,
    }));

    setSelectedList([]);
    setSolvedList([]);
    setSquares(newSquares);
    setUnsolvedList(newSolved);
    setMistakes(4);
    handleShuffle();
  }

  function handleShuffle() {
    const positions: number[] = squares.map(({ position }) => position);
    for (let i = positions.length - 1; i >= solvedList.length * 4; i--) {
      const j = Math.floor(Math.random() * (i + 1 - solvedList.length * 4) + solvedList.length * 4);
      [positions[i], positions[j]] = [positions[j], positions[i]];

      console.log(i + " " + j);
    }

    setSquares((prevSquares) =>
      prevSquares.map((prevSquare) => ({ ...prevSquare, position: positions[prevSquare.position] }))
    );
  }

  function handleSubmit() {
    const levelCount: Record<number, number> = {};

    selectedList.forEach((selected) => {
      levelCount[selected.level] = (levelCount[selected.level] || 0) + 1;
    });

    const counts = Object.values(levelCount);

    if (counts.includes(4)) {
      const curSquares = squares.map((square) => ({ ...square }));

      const swapList = curSquares
        .map(({ level, position }, index) => ({ level, position, index }))
        .filter(({ level, position }) => level === selectedList[0].level && position > solvedList.length * 4 + 3);

      for (let i = solvedList.length * 4; i < solvedList.length * 4 + 4; i++) {
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
        setSolvedList((prevSolveds) => [
          ...prevSolveds,
          unsolvedList[unsolvedList.findIndex((unsolved) => unsolved.level === selectedList[0].level)],
        ]);

        setUnsolvedList((prevUnsolveds) =>
          prevUnsolveds.filter((prevUnsolved) => prevUnsolved.level !== selectedList[0].level)
        );

        setSelectedList([]);
      }, 250);

      if (solvedList.length === 3) {
        let text: string = "";

        switch (mistakes) {
          case 4:
            text = "Perfect";
            break;
          case 3:
            text = "Great";
            break;
          case 2:
            text = "Solid";
            break;
          case 1:
            text = "Phew";
            break;
          default:
            break;
        }

        setWin(text);
      }
    } else {
      if (counts.includes(3)) {
        setShowAway(true);
        setTimeout(() => setShowAway(false), 1000);
      }
      if (mistakes === 1) {
        setShowNext(true);
        setTimeout(() => setShowNext(false), 1000);

        setSelectedList([]);

        const curSquares = squares.map((square) => ({ ...square }));

        unsolvedList.forEach((unsolved, i) => {
          const swapList = curSquares
            .map(({ level, position }, index) => ({ level, position, index }))
            .filter(({ level, position }) => level === unsolved.level && position > (solvedList.length + i) * 4 + 3);

          for (let j = (solvedList.length + i) * 4; j < (solvedList.length + i) * 4 + 4; j++) {
            const swapSquare = curSquares.findIndex(
              (curSquare) => curSquare.position === j && curSquare.level !== unsolved.level
            );

            if (swapSquare !== -1) {
              curSquares[swapList[0].index].position = curSquares[swapSquare].position;
              curSquares[swapSquare].position = swapList[0].position;
              swapList.shift();
            }
          }
        });

        setSquares(curSquares);

        unsolvedList.forEach(({ level }, i) => {
          setTimeout(() => {
            setSolvedList((prevSolveds) => [
              ...prevSolveds,
              unsolvedList[unsolvedList.findIndex((unsolved) => unsolved.level === level)],
            ]);

            setUnsolvedList((prevUnsolveds) => prevUnsolveds.filter((prevUnsolved) => prevUnsolved.level !== level));
          }, 1000 * i);
        });
      } else {
        setMistakes(mistakes - 1);
      }
    }
  }

  return (
    <div className="main__container">
      <h4 className="main__heading">Create four groups of four!</h4>
      <div className="main__box">
        {showAway && <div className="main__away">One Away...</div>}
        {showNext && <div className="main__next">Next Time</div>}
        {win && <div className="main__win">{win}</div>}
        {solvedList.map((solved, i) => (
          <Solved key={i} solved={solved} />
        ))}
        {squares.map((square, i) => (
          <Square
            key={i}
            square={{ ...square, word: square.word }}
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
        <button className="main__button main__new" onClick={handleNew}>
          New Game
        </button>
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
