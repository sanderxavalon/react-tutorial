import { useState, useRef } from "react";

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        用 setState 切換狀態
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}
      >
        用 DOM api 移除
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
