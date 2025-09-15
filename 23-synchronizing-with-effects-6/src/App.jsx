import { useRef, useState, useEffect } from "react";
import { createConnection } from "./chat.js";

export default function ChatRoom() {
  const [text, setText] = useState("");
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      const connection = createConnection();
      connection.connect();
      ref.current = true;
    }
  }, []);
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <h1>Welcome to the chat!</h1>
    </>
  );
}
