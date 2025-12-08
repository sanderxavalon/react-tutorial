import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">USETOGGLE</h1>

      <div className="links">
        <button className="linkBtn">Turn On</button>
        <button className="linkBtn">Turn Off</button>
        <button className="linkBtn">Toggle</button>
      </div>

      <div className="toggleWrapper">
        <div className={`toggle ${true ? "active" : ""}`}>
          <div className="indicator"></div>
        </div>
        <span className="statusText">{true ? "On" : "Off"}</span>
      </div>
    </div>
  );
}
