import { useState } from 'react';

export default function App() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <>
      <h3>
        等待中: {pending}
      </h3>
      <h3>
        已完成: {completed}
      </h3>
      <button onClick={handleClick}>
        掛號  
      </button>
    </>
  );
}

function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
