import { useState } from "react";
function App() {
  const intValue = {
    a: 0,
    b: 0,
  };
  const intRes = 0;
  const [value, setValue] = useState({ ...intValue });
  const [result, setResult] = useState(intRes);
  const [histories, setHistories] = useState([]);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const clearHandler = () => {
    setValue({ ...intValue });
    setResult(intRes);
  };

  const opsHandler = (operator) => {
    let res = eval(`${value.a} ${operator} ${value.b}`);
    if (!Number.isInteger(res)) {
      res = res.toFixed(3);
    }
    let newRes = res;
    setResult(newRes);
    const history = {
      id: Date.now(),
      input: value,
      result: newRes,
      operator,
      timeFrame: new Date(),
    };
    setHistories([history, ...histories]);
  };

  const valueHandler = (e) => {
    if (e.target.name === "a") {
      setValue(value.b === "" ? { a: "", b: 0 } : { ...value, a: "" });
    } else if (e.target.name === "b") {
      setValue(value.a === "" ? { a: 0, b: "" } : { ...value, b: "" });
    }
  };

  const restoreHandler = (history) => {
    setValue({ a: history.input.a, b: history.input.b });
    setResult(history.result);

    const newHistories = histories.filter((value) => value.id != history.id);
    setHistories(newHistories);
  };

  return (
    <div>
      <h1>Result : {result}</h1>
      <input
        type="number"
        name="a"
        onChange={handleChange}
        value={value.a}
        onFocus={valueHandler}
      />
      <input
        type="number"
        name="b"
        onChange={handleChange}
        value={value.b}
        onFocus={valueHandler}
      />

      <h3>Operations</h3>
      <button onClick={() => opsHandler("+")}>+</button>
      <button onClick={() => opsHandler("-")}>-</button>
      <button onClick={() => opsHandler("*")}>*</button>
      <button onClick={() => opsHandler("/")}>/</button>
      <button onClick={clearHandler}>Clear</button>

      <div className="history">
        <h3>History</h3>
        {histories.length === 0 ? (
          <p>There is not history available</p>
        ) : (
          <ul>
            {histories.map((history) => {
              return (
                <li key={history.id}>
                  {history.input.a} {history.operator} {history.input.b} ,
                  Result = {history.result} :{" "}
                  {history.timeFrame.toLocaleTimeString()}
                  <button onClick={() => restoreHandler(history)}>
                    Restore
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
