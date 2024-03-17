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
      className="word__container"
      style={{ top: Math.floor(square.position / 4) * 88, left: (square.position % 4) * 128 }}
    >
      <button
        className="word__box"
        style={selected ? { backgroundColor: "#5a594e" } : selectedList.length === 4 ? { cursor: "default" } : {}}
        onClick={handleClick}
      >
        <h4 className="word__word" style={selected ? { color: "#fff" } : {}}>
          {square.word}
        </h4>
      </button>
    </div>
  );
};
