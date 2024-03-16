import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ISquare } from "./Main";

interface IProps {
  square: ISquare;
  selectedList: ISquare[];
  setSelectedList: Dispatch<SetStateAction<ISquare[]>>;
}

export const Square = ({ square, selectedList, setSelectedList }: IProps) => {
  const selected: boolean = useMemo(
    () => selectedList.some((selected) => selected.word === square.word),
    [selectedList]
  );

  function handleClick() {
    if (selected) {
      setSelectedList((prevSelectedList) => prevSelectedList.filter((selected) => selected.word !== square.word));
    } else if (selectedList.length < 4) {
      setSelectedList((prevSelectedList) => [...prevSelectedList, square]);
    }
  }

  return (
    <button className="word__container" style={selected ? { backgroundColor: "#544c43" } : {}} onClick={handleClick}>
      <h4 className="word__word" style={selected ? { color: "#fff" } : {}}>
        {square.word}
      </h4>
    </button>
  );
};
