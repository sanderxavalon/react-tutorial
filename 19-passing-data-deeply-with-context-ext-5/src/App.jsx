import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({ name: "John", age: 30 });

function NameDisplay() {
  const { name } = useContext(AppContext);
  console.log("🔁 NameDisplay render");
  return <p>名字：{name}</p>;
}

function AgeDisplay() {
  const { age } = useContext(AppContext);
  console.log("🔁 AgeDisplay render");
  return <p>年齡：{age}</p>;
}

function App() {
  const [user, setUser] = useState({ name: "John", age: 30 });

  return (
    <AppContext.Provider value={user}>
      <NameDisplay />
      <AgeDisplay />
      <button onClick={() => setUser({ ...user, name: "Jane" })}>
        修改名字
      </button>
    </AppContext.Provider>
  );
}

export default App
