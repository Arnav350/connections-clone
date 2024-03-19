import { ISolved } from "./Main";

interface IProps {
  solved: ISolved;
}

export const Solved = ({ solved }: IProps) => {
  return (
    <div className={`solved__container solved__container${solved.level}`}>
      <h3 className="solved__category">{solved.category}</h3>
      <p className="solved__words">{solved.words}</p>
    </div>
  );
};
