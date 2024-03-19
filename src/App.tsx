import { useState } from "react";
import { Header } from "./components/Header";
import { Row } from "./components/Row";
import { Settings } from "./components/Settings";
import { Help } from "./components/Help";
import "./App.css";
import { Main } from "./components/Main";

function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />
      <Row dark={dark} setDark={setDark} setShowSettings={setShowSettings} setShowHelp={setShowHelp} />
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      {showHelp && <Help setShowHelp={setShowHelp} />}
      <Main />
    </div>
  );
}

export default App;
