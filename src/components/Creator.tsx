import { Dispatch, SetStateAction, useState } from "react";
import { ISolved, ISquare } from "./Main";

interface IProps {
  setSquares: Dispatch<SetStateAction<ISquare[]>>;
  setUnsolvedList: Dispatch<SetStateAction<ISolved[]>>;
  setShowCreator: Dispatch<SetStateAction<boolean>>;
}

export const Creator = ({ setSquares, setUnsolvedList, setShowCreator }: IProps) => {
  const [tempSquares, setTempSquares] = useState<ISquare[]>([]);
  const [tempList, setTempList] = useState<ISolved[]>([]);

  function handleSubmit() {
    setShowCreator(false);
    setSquares(tempSquares);
    setUnsolvedList(tempList);
  }

  return (
    <div className="creator__container">
      <h3 className="creator__heading">Create your own Connections</h3>
      {Array(4)
        .fill(null)
        .map((__, i) => (
          <div key={i} className="creator__box">
            <input
              type="text"
              placeholder={`Category #${i + 1}`}
              className={`creator__category creator__category${i}`}
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
                  />
                ))}
            </div>
          </div>
        ))}
      <div className="creator__buttons">
        <button className="creator__button creator__disgard" onClick={() => setShowCreator(false)}>
          Disgard
        </button>
        <button
          className="creator__button"
          style={4 === 4 ? { backgroundColor: "#000", borderColor: "#000", color: "#fff" } : { cursor: "default" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
