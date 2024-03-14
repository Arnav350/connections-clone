export const Title = () => {
  const date = new Date();

  return (
    <div className="title__container">
      <h1 className="title__title">Connections</h1>
      <h4 className="title__date">
        {date.toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" })}
      </h4>
    </div>
  );
};
