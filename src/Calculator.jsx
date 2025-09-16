import React, { useState } from "react";
import './App.css';

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
      { value: "log", valueKey: "log" },
      { value: "cos", valueKey: "cos" },
      { value: "sin", valueKey: "sin" },
      { value: "tan", valueKey: "tan" },
    ],
    [
      { value: "√", valueKey: "√" },
      { value: "X²", action: "square" },
      { value: "π", valueKey: "π" },
      { value: "e", valueKey: "e" },
    ],
    [
      { value: "00", valueKey: "00" },
      { value: "0", valueKey: "0" },
      { value: "=", action: "calculate", className: "btn-op" },
    ],
  ];

  
  const parseExpression = (expr) => {
    return expr
      .replace(/x/g, "*")                      
      .replace(/√(\d+)/g, "Math.sqrt($1)")     
      .replace(/sin(\d+)/g, "Math.sin($1*Math.PI/180)") 
      .replace(/cos(\d+)/g, "Math.cos($1*Math.PI/180)") 
      .replace(/tan(\d+)/g, "Math.tan($1*Math.PI/180)") 
      .replace(/log(\d+)/g, "Math.log($1)")
      .replace(/(\d+)π/g, "$1*Math.PI")    
      .replace(/π(\d+)/g, "Math.PI*$1")    
      .replace(/π/g, "Math.PI") 
      .replace(/(\d+)e/g, "$1*Math.E")    
      .replace(/e(\d+)/g, "Math.E*$1")                
      .replace(/e/g, "Math.E")                 
      // .replace(/\^2/g, "**2");                 
  };

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
          const expr = parseExpression(display);
          
          setDisplay(eval(expr));
          break;
        case "square":
          if (!display) return;
          try {
              const squared = Math.pow(Number(display), 2);
              setDisplay(squared.toString()); // show only result
          } catch {
              setDisplay("Error");
          }
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
