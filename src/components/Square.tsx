import { Dispatch, SetStateAction, useMemo } from "react";
import { ISquare } from "./Main";

interface IProps {
  square: ISquare;
  selectedList: ISquare[];
  setSelectedList: Dispatch<SetStateAction<ISquare[]>>;
}

export const Square = ({ square, selectedList, setSelectedList }: IProps) => {
  const selected: boolean = useMemo(
    () => selectedList.some((selected) => selected.word === square.word),
    [selectedList, square.word]
  );

  function handleClick() {
    if (selected) {
      setSelectedList((prevSelectedList) => prevSelectedList.filter((selected) => selected.word !== square.word));
    } else if (selectedList.length < 4) {
      setSelectedList((prevSelectedList) => [...prevSelectedList, square]);
    }
  }

  return (
    <div
      className={`square__container square__${square.display}`}
      style={{ top: Math.floor(square.position / 4) * 88, left: (square.position % 4) * 158 }}
    >
      <button
        className="square__box"
        style={selected ? { backgroundColor: "#5a594e" } : selectedList.length === 4 ? { cursor: "default" } : {}}
        onClick={handleClick}
      >
        {square.level === 0 && <p>0</p>}
        {square.level === 1 && <p>1</p>}
        {square.level === 2 && <p>2</p>}
        {square.level === 3 && <p>3</p>}
        <h4 className="square__word" style={selected ? { color: "#fff" } : {}}>
          {square.word}
        </h4>
        {square.position}
      </button>
    </div>
  );
};
