import React, { useState } from "react";
import "./App.css";

function App() {
  const [expression, setexpression] = useState("");
  const [answer, setanswer] = useState(expression);

  function display(symbol) {

    setexpression((prevValue) => {
      if (/[+*-/]/.test(symbol) && /[+*-/]/.test(prevValue[prevValue.length - 1])) {
        let newValue;
        if (/[-]/.test(symbol)) {
          newValue = prevValue.slice(0, prevValue.length) + symbol;
        } else {
          let count = 0;
          for (let i = 0; i < prevValue.length; i++) {
            if (isNaN(+prevValue[i])) {
              count++;
            } else {
              count = 0;
            }
          }
          newValue = prevValue.slice(0, prevValue.length - count) + symbol;
        }

        setexpression(newValue);
      } else {
        if (prevValue) {
          prevValue = prevValue + "";
          let valArr = prevValue.split(/[+/*-]/g);
          console.log("valArr" + JSON.stringify(valArr));
          let lastnumber = valArr[valArr.length - 1];
          if (!isNaN(lastnumber) && /[.]/.test(lastnumber) && symbol === ".") {
            console.log("symbol = empty");
            symbol = "";
          }
        }

        setexpression(
          (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
      }
    });

    setanswer((prevValue) =>
      (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
    );
  }


  function calculate() {
    setanswer(eval(expression));
    setexpression(eval(expression));
  }

  function allClear() {
    setexpression("");
    setanswer(0);
  }

  function backspace() {
    setexpression((prev) => {
      setanswer(0);
      console.log(prev);
      prev = prev + "";
      return prev.split("").slice(0, prev.length - 1).join("");
    });
  }


  return (
    <>
      <div className="cont">

        <div className="show">
          <input value={expression} placeholder="0" disabled className="expression" ></input>
          <input id="display" value={answer} disabled ></input>
        </div>

        <div className="container">

          <button id="clear" onClick={allClear}>AC</button>
          <button id="back" onClick={backspace}>C</button>
          <button id="divide" onClick={() => display("/")}>
            /
          </button>

          <button id="seven" onClick={() => display("7")}>
            7
          </button>
          <button id="eight" onClick={() => display("8")}>
            8
          </button>
          <button id="nine" onClick={() => display("9")}>
            9
          </button>
          <button id="multiply" onClick={() => display("*")}>
            x
          </button>

          <button id="four" onClick={() => display("4")}>
            4
          </button>
          <button id="five" onClick={() => display("5")}>
            5
          </button>
          <button id="six" onClick={() => display("6")}>
            6
          </button>
          <button id="subtract" onClick={() => display("-")}>
            -
          </button>

          <button id="one" onClick={() => display("1")}>
            1
          </button>
          <button id="two" onClick={() => display("2")}>
            2
          </button>
          <button id="three" onClick={() => display("3")}>
            3
          </button>
          <button id="add" onClick={() => display("+")}>
            +
          </button>

          <button id="decimal" onClick={() => display(".")}>
            .
          </button>
          <button id="zero" onClick={() => display("0")}>
            0
          </button>
          <button id="equals" onClick={calculate}>=</button>
        </div>
      </div>
      <p id="by">by kygoskyrus</p>
    </>
  );
}

export default App;
