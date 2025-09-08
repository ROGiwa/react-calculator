import React, { useState } from "react";
import './app.css';


function App() {
  const [display, setDisplay] = useState("");

  const rows = [
    [
      { value: "AC", action: "clear" },
      { value: "DE", action: "delete" },
      { value: ".", valueKey: "." },
      { value: "/", valueKey: "/" },
    ],
    [
      { value: "7", valueKey: "7" },
      { value: "8", valueKey: "8" },
      { value: "9", valueKey: "9" },
      { value: "x", valueKey: "*" },
    ],
    [
      { value: "4", valueKey: "4" },
      { value: "5", valueKey: "5" },
      { value: "6", valueKey: "6" },
      { value: "-", valueKey: "-" },
    ],
    [
      { value: "1", valueKey: "1" },
      { value: "2", valueKey: "2" },
      { value: "3", valueKey: "3" },
      { value: "+", valueKey: "+" },
    ],
    [
      { value: "log", action: "log" },
      { value: "cos", action: "cos" },
      { value: "sin", action: "sin" },
      { value: "tan", action: "tan" },
    ],
    [
      { value: "√", action: "sqrt" },
      { value: "X²", action: "square" },
      { value: "π", action: "pi" },
      { value: "e", action: "exp" },
    ],
    [
      { value: "00", valueKey: "00" },
      { value: "0", valueKey: "0" },
      { value: "=", action: "calculate", className: "btn-op" },
    ],
  ];

  const handleAction = (action) => {
    try {
      switch (action) {
        case "clear":
          setDisplay("");
          break;
        case "delete":
          setDisplay(display.slice(0, -1));
          break;
        case "calculate":
          setDisplay(eval(display))
          break;
        case "log":
          setDisplay(Math.log(Number(display)));
          break;
        case "cos":
          setDisplay(Math.cos(Number(display)));
          break;
        case "sin":
          setDisplay(Math.sin(Number(display)));
          break;
        case "tan":
          setDisplay(Math.tan(Number(display)));
          break;
        case "sqrt":
          setDisplay(Math.sqrt(Number(display)));
          break;
        case "square":
          setDisplay(Math.pow(Number(display), 2));
          break;
        case "pi":
          setDisplay(Math.PI);
          break;
        case "exp":
          setDisplay(Math.exp(Number(display)));
          break;
        default:
          break;
      }
    } catch {
      setDisplay("Error");
    }
  };

  const handleClick = (btn) => {
    if (btn.valueKey) {
      setDisplay((prev) => prev + btn.valueKey);
    } else if (btn.action) {
      handleAction(btn.action);
    }
  };

  return (
    <div className="main-container">
      <div className="calculator">
        <div className="display">
          <input
            type="text"
            value={display}
            // readOnly
            className="form-control"
          />
        </div>
        <div className="buttons-container">
          {rows.map((row, i) => (
            <div key={i} className="row">
              {row.map((btn, j) => (
                <input
                  key={j}
                  type="button"
                  value={btn.value}
                  className={`btn ${btn.className || ""}`}
                  onClick={() => handleClick(btn)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
