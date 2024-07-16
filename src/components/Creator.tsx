import { Dispatch, SetStateAction, useState } from "react";
import { ISolved, ISquare } from "./Main";

interface IProps {
  dark: boolean;
  setSquares: Dispatch<SetStateAction<ISquare[]>>;
  setUnsolvedList: Dispatch<SetStateAction<ISolved[]>>;
  setShowCreator: Dispatch<SetStateAction<boolean>>;
}

const initSquares: ISquare[] = [
  { word: "", level: 0, position: 0 },
  { word: "", level: 0, position: 1 },
  { word: "", level: 0, position: 2 },
  { word: "", level: 0, position: 3 },
  { word: "", level: 1, position: 4 },
  { word: "", level: 1, position: 5 },
  { word: "", level: 1, position: 6 },
  { word: "", level: 1, position: 7 },
  { word: "", level: 2, position: 8 },
  { word: "", level: 2, position: 9 },
  { word: "", level: 2, position: 10 },
  { word: "", level: 2, position: 11 },
  { word: "", level: 3, position: 12 },
  { word: "", level: 3, position: 13 },
  { word: "", level: 3, position: 14 },
  { word: "", level: 3, position: 15 },
];

const initCategories: ISolved[] = [
  { category: "", words: [], level: 0 },
  { category: "", words: [], level: 1 },
  { category: "", words: [], level: 2 },
  { category: "", words: [], level: 3 },
];

export const Creator = ({ dark, setSquares, setUnsolvedList, setShowCreator }: IProps) => {
  const [tempSquares, setTempSquares] = useState<ISquare[]>(initSquares);
  const [tempCategories, setTempCategories] = useState<ISolved[]>(initCategories);
  const [completed, setCompleted] = useState<boolean>(false);

  function handleSquaresChange(value: string, position: number) {
    setTempSquares((prevTempSquares) => {
      const newTempSquares = prevTempSquares.map((prevTempSquare) =>
        prevTempSquare.position === position ? { ...prevTempSquare, word: value } : prevTempSquare
      );

      setCompleted(
        newTempSquares.every(({ word }) => word !== "") && tempCategories.every(({ category }) => category !== "")
      );

      return newTempSquares;
    });
  }

  function handleCategoryChange(value: string, level: number) {
    setTempCategories((prevTempCategories) => {
      const newTempCategories = prevTempCategories.map((prevTempCategory) =>
        prevTempCategory.level === level ? { ...prevTempCategory, category: value } : prevTempCategory
      );

      setCompleted(
        tempSquares.every(({ word }) => word !== "") && newTempCategories.every(({ category }) => category !== "")
      );

      return newTempCategories;
    });
  }

  function handleSubmit() {
    setShowCreator(false);
    setSquares(tempSquares);
    setUnsolvedList(tempCategories);
  }

  return (
    <div className="creator__container">
      <h3 className="creator__heading dark" style={dark ? { color: "#fefef8" } : {}}>
        Create your own Connections
      </h3>
      {Array(4)
        .fill(null)
        .map((__, i) => (
          <div key={i} className="creator__box">
            <input
              type="text"
              placeholder={`Category #${i + 1}`}
              className={`creator__category creator__category${i}`}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCategoryChange(event.target.value, i)}
            />
            <div className="creator__squares">
              {Array(4)
                .fill(null)
                .map((__, j) => (
                  <input
                    key={j}
                    type="text"
                    placeholder={`Word ${j + 1}`}
                    className={`creator__square creator__square${i}`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleSquaresChange(event.target.value, i * 4 + j)
                    }
                  />
                ))}
            </div>
          </div>
        ))}
      <div className="creator__buttons">
        <button
          className="creator__button creator__disgard dark"
          style={dark ? { borderColor: "#fefef8", color: "#fefef8" } : {}}
          onClick={() => setShowCreator(false)}
        >
          Disgard
        </button>
        <button
          className="creator__button dark"
          disabled={!completed}
          style={
            completed
              ? dark
                ? { backgroundColor: "#fefef8", borderColor: "#fefef8", color: "#000" }
                : { backgroundColor: "#000", borderColor: "#000", color: "#fff" }
              : { cursor: "default" }
          }
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
