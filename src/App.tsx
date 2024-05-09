import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [isMentionExists, setIsMentionExists] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(false);
  const [offsetPosition, setoffsetPosition] = useState({});
  const inputRef = useRef(false);
  const selectRef = useRef();
  const textareaRef = useRef();
  const mirrorDivRef = useRef();

  useEffect(() => {
    if (isMentionExists) {
      setIsMentionExists(false);
      inputRef.current = true;
    }
  }, [isMentionExists]);

  const handleOnChangeSelect = (e) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
    inputRef.current = false;
    setInputValue(prev => prev?.slice(0,-1) + e.target.value)
  };

  const handleOnChange = (e) => {
    let val = e.target.value;

    inputRef.current = isMentionExists;

    for (let i = 0; i <= val.length; i++) {
      setInputValue(val);
      if (val.slice(-1) == "@") {
        setIsMentionExists(true);
        break;
      }
    }
  };

  function getCursorPosition(textarea) {
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    return { start, end };
  }

  // if(mirrorDivRef.current){

  //   mirrorDivRef.current.style.fontSize = window.getComputedStyle(textareaRef.current).fontSize
  //   mirrorDivRef.current.style.fontFamily = window.getComputedStyle(textareaRef.current).fontFamily
  //   mirrorDivRef.current.style.whiteSpace = 'pre-wrap'
  //   mirrorDivRef.current.style.wordWrap = 'break-word'
  // }

  // let mentionTextArea = document.getElementById("textArea");
  textareaRef.current?.addEventListener("keyup", updateCss);
  textareaRef.current?.addEventListener("click", updateCss);
  

  function updateCss() {
    let temp = textareaRef.current.value;

    console.log("TEMP", typeof temp);

    let text = temp
      .substring(0, textareaRef.current?.selectionEnd)
      .replace(/\n/g, '<br>');
    mirrorDivRef.current.innerHTML = text + '<span id="caret">|</span>';
    console.log("TEXT AREA ", text);

    let caretSpan = document.getElementById("caret");

    console.log({
      left: caretSpan?.offsetLeft,
      top: caretSpan?.offsetTop,
      right: caretSpan?.offsetHeight,
      width: caretSpan?.offsetWidth,
      parent: caretSpan?.offsetParent,
    });

    if(selectRef.current){
      selectRef.current.style.left = `${caretSpan?.offsetLeft}px`
      selectRef.current.style.top = `${caretSpan?.offsetTop}px`
    }
  }

  return (
    <div className="mention-container">
      <div
        id="mirrorDiv"
        ref={mirrorDivRef}
        style={{ position: "absolute", visibility: "hidden" }}
      ></div>
      <label>Input:</label>
      <textarea
        id="textArea"
        ref={textareaRef}
        value={inputValue}
        rows={5}
        onChange={handleOnChange}
      />
      {inputRef.current && (
        <>
          <select
            id="mySelect"
            ref={selectRef}
            className="mention-dropdown"
            onChange={handleOnChangeSelect}
          >
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Volvo">Volvo</option>
          </select>
        </>
      )}
    </div>
  );
}

export default App;
