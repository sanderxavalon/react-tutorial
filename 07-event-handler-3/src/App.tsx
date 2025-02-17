function App() {
  function handleClick() {
    alert("You clicked me!");
  }

  return (
    <>
      {/* 正確的寫法 */}
      <button onClick={handleClick}>Click me</button>
      {/* 錯誤的寫法 */}
      {/* <button onClick={handleClick()}>Click me</button> */}

      {/* 正確的寫法 */}
      <button onClick={() => { alert('You clicked me!') }}/>
      {/* 錯誤的寫法 */}
      {/* <button onClick={alert('You clicked me!')}/> */}
    </>
  );
}

export default App;