import { useState } from "react";
import { Header } from "./components/Header";
import { Row } from "./components/Row";
import { Settings } from "./components/Settings";
import { Help } from "./components/Help";
import { Results } from "./components/Results";
import { ISquare, Main } from "./components/Main";
import "./App.css";

function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [attemptList, setAttemptList] = useState<ISquare[][]>([]);
  const [result, setResult] = useState<string>("");
  const [showCreator, setShowCreator] = useState<boolean>(false);

  return (
    <div className="App">
      <Header setShowCreator={setShowCreator} />
      <Row dark={dark} setDark={setDark} setShowSettings={setShowSettings} setShowHelp={setShowHelp} />
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      {showHelp && <Help setShowHelp={setShowHelp} />}
      {showResults && <Results result={result} setShowResults={setShowResults} attemptList={attemptList} />}
      <Main
        result={result}
        setResult={setResult}
        setShowResults={setShowResults}
        setAttemptList={setAttemptList}
        showCreator={showCreator}
        setShowCreator={setShowCreator}
      />
    </div>
  );
}

export default App;
