import { useRef, useState } from "react";

export default function TimerExample() {
  const [count, setCount] = useState(0);
  const timerIdRef = useRef(null); // 用來存 timer ID

  const startTimer = () => {
    if (timerIdRef.current !== null) return; // 避免重複啟動

    timerIdRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
