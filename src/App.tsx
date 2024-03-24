import { useState } from "react";
import { Header } from "./components/Header";
import { Row } from "./components/Row";
import { Settings } from "./components/Settings";
import { Help } from "./components/Help";
import { Results } from "./components/Results";
import { Main } from "./components/Main";
import "./App.css";

function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  return (
    <div className="App">
      <Header />
      <Row dark={dark} setDark={setDark} setShowSettings={setShowSettings} setShowHelp={setShowHelp} />
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      {showHelp && <Help setShowHelp={setShowHelp} />}
      {showResults && <Results result={result} setShowResults={setShowResults} />}
      <Main result={result} setResult={setResult} />
    </div>
  );
}

export default App;
