import ap from "../assets/ap.png";

export const Header = () => {
  return (
    <div className="header__container">
      <div className="header__left">
        <figure className="header__logo">
          <img src={ap} alt="logo" className="header__image" />
        </figure>
        <div className="header__line"></div>
        <h1 className="header__heading">Connections</h1>
      </div>
      <button className="header__create">Create Your Own</button>
    </div>
  );
};
