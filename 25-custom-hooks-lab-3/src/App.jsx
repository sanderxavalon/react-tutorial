import "./App.css";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">USECOUNTDOWN</h1>

      <div className="countdownValue">{10}</div>

      <div className="buttonRow">
        <button className="timeBtn">+5s</button>
        <button className="timeBtn">+10s</button>
        <button className="timeBtn">+15s</button>
      </div>
    </div>
  );
}
