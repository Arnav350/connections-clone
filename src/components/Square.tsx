import { Dispatch, SetStateAction, useMemo } from "react";
import { ISquare } from "./Main";

interface IProps {
  dark: boolean;
  square: ISquare;
  selectedList: ISquare[];
  setSelectedList: Dispatch<SetStateAction<ISquare[]>>;
}

export const Square = ({ dark, square, selectedList, setSelectedList }: IProps) => {
  const selected: boolean = useMemo(
    () => selectedList.some((selected) => selected.position === square.position),
    [selectedList, square.position]
  );

  function handleClick() {
    if (selected) {
      setSelectedList((prevSelectedList) =>
        prevSelectedList.filter((selected) => selected.position !== square.position)
      );
    } else if (selectedList.length < 4) {
      setSelectedList((prevSelectedList) => [...prevSelectedList, square]);
    }
  }

  return (
    <div
      className="square__container dark"
      style={{ top: Math.floor(square.position / 4) * 88, left: (square.position % 4) * 158 }}
    >
      <button
        className="square__box"
        style={
          selected
            ? dark
              ? { backgroundColor: "#555" }
              : { backgroundColor: "#5a594e" }
            : selectedList.length === 4
            ? dark
              ? { backgroundColor: "#282828", cursor: "default" }
              : { cursor: "default" }
            : dark
            ? { backgroundColor: "#282828" }
            : {}
        }
        onClick={handleClick}
      >
        <h4 className="square__word" style={dark ? { color: "#fefef8" } : selected ? { color: "#fff" } : {}}>
          {square.word}
        </h4>
      </button>
    </div>
  );
};
