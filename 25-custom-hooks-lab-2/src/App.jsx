import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">USECOUNTER</h1>
      <p className="subtitle">with optional min / max</p>

      <div className="links">
        <button className="linkBtn">Increment</button>
        <button className="linkBtn">Decrement</button>
        <button className="linkBtn">Set to 6</button>
        <button className="linkBtn">Reset</button>
      </div>

      <div className="counterValue">{count}</div>
    </div>
  );
}
