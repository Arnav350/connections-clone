import ap from "../assets/ap.png";

export const Header = () => {
  return (
    <header className="header__container">
      <div className="header__left">
        <figure className="header__logo">
          <img src={ap} alt="logo" className="header__image" />
        </figure>
        <div className="header__line"></div>
        <h2 className="header__heading">Connections</h2>
      </div>
      <button className="header__create">Create Your Own</button>
    </header>
  );
};
