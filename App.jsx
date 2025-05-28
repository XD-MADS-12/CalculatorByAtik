import React, { useState, useEffect } from "react";

export default function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Update theme
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle input
  const appendValue = (value) => {
    setExpression((prev) => prev + value);
  };

  // Evaluate expression
  const calculate = () => {
    try {
      const evalResult = eval(expression); // You can replace this with a safer parser like math.js
      setResult(evalResult);
      setHistory([{ exp: expression, res: evalResult }, ...history]);
    } catch (err) {
      setResult("Error");
    }
  };

  const clear = () => {
    setExpression("");
    setResult("");
  };

  const backspace = () => {
    setExpression(expression.slice(0, -1));
  };

  return (
    <div className="calculator mt-10 relative">
      {/* Theme toggle */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle Theme"
      >
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>

      {/* Display */}
      <div className="display">
        {expression || "0"}
        <div className="text-gray-500 dark:text-gray-400 text-sm">{result}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "+", "="].map((btn) => (
            <button
              key={btn}
              className={`button ${btn === "=" ? "equal" : ""}`}
              onClick={() => btn === "=" ? calculate() : appendValue(btn)}
            >
              {btn}
            </button>
          ))}
        <button className="button clear" onClick={clear}>C</button>
        <button className="button" onClick={() => appendValue("(")}>(</button>
        <button className="button" onClick={() => appendValue(")")}>)</button>
        <button className="button" onClick={backspace}>
          <i className="fas fa-backspace"></i>
        </button>
      </div>

      {/* History */}
      <div className="history-panel mt-4">
        <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
          <i className="fas fa-clock"></i> History
        </div>
        {history.length === 0 ? (
          <div className="text-gray-400">No history</div>
        ) : (
          history.map((h, i) => (
            <div key={i} className="flex justify-between text-xs mb-1">
              <span>{h.exp}</span>
              <span className="font-bold">{h.res}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
