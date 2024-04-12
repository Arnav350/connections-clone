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
    <div className="App dark" style={dark ? { backgroundColor: "#121212" } : {}}>
      <Header dark={dark} setShowCreator={setShowCreator} />
      <Row dark={dark} setDark={setDark} setShowSettings={setShowSettings} setShowHelp={setShowHelp} />
      {showSettings && <Settings dark={dark} setShowSettings={setShowSettings} />}
      {showHelp && <Help dark={dark} setShowHelp={setShowHelp} />}
      {showResults && <Results dark={dark} result={result} setShowResults={setShowResults} attemptList={attemptList} />}
      <Main
        dark={dark}
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
