import { useState } from "react";
import "./styles.css";

export default function App() {
  const [on, setOn] = useState(true);

  const turnOn = () => setOn(true);
  const turnOff = () => setOn(false);
  const toggle = () => setOn((prev) => !prev);

  return (
    <div className="container">
      <h1 className="title">USETOGGLE</h1>

      <div className="links">
        <button className="linkBtn" onClick={turnOn}>
          Turn On
        </button>
        <button className="linkBtn" onClick={turnOff}>
          Turn Off
        </button>
        <button className="linkBtn" onClick={toggle}>
          Toggle
        </button>
      </div>

      <div className="toggleWrapper" onClick={toggle}>
        <div className={`toggle ${on ? "active" : ""}`}>
          <div className="indicator"></div>
        </div>
        <span className="statusText">{on ? "On" : "Off"}</span>
      </div>
    </div>
  );
}
