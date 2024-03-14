import { useState } from "react";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { Row } from "./components/Row";
import { Settings } from "./components/Settings";
import { Help } from "./components/Help";
import "./App.css";

function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />
      <Title />
      <Row dark={dark} setDark={setDark} setShowSettings={setShowSettings} setShowHelp={setShowHelp} />
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      {showHelp && <Help setShowHelp={setShowHelp} />}
    </div>
  );
}

export default App;
