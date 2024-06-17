import { useEffect, useRef, useState } from "react";
import styles from '@/assets/css/terminal.input.module.css'


const TerminalInput = ({ initData, inputValue, inputFocus, handleInputChange, handleSubmit }) => {
  const inputRef = useRef(null);
  // create a history of commands when pressing up and down arrows , a command from the history will be displayed in the current input value
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex === -1) {
        setHistoryIndex(0);
        inputRef.current.value = history[0];
      } else if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        inputRef.current.value = history[historyIndex - 1];
      }
    }
    else if (e.key === 'Enter') handleSubmit(e)
    }
// useEffect to store the history array of commands in local storage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history'));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputFocus]);
  const handleInputChangeLocal = (e) => {
    handleInputChange(e.target.value);
  };
  const identity = initData.username.replaceAll('\\n', "").replaceAll('"', "")+'@'+initData.hostname.replaceAll('\n', "").replaceAll('"', "")
  const path = initData.path.replaceAll('\\n', "").replaceAll('"', "");


  return (
    <>
    <div className="relative">
      <ul className="bg-black text-white font-mono" style={{display: 'flex', flexWrap: 'wrap'}}>
        <li className="text-green-500">{identity}</li><li className="text-blue-500">{'~' + path}</li><li className="text-white">$</li>{inputValue}<li className={styles.blinking+" text-green-500"}>{'_'}</li>
      </ul>
      <form onSubmit={handleSubmit} className="absolute top-0 left-0 right-0 bottom-0">
        <input
          autoFocus
          id="terminalInput"
          ref={inputRef}
          className={"bg-transparent border-none w-full text-white outline-none "+styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChangeLocal}
          onFocus={() => inputRef?.current?.selectionStart ? inputRef.current.selectionStart = inputValue.length : null}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
    <div style={{ backgroundColor: 'black', flexGrow: 1}}/>
    </>
  );
};
export default TerminalInput
