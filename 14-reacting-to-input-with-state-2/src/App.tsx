import './App.css'

// 定義 App 組件，接收一個可選的 status 參數，預設值為 'empty'
function App({
  status = 'empty'
}) {
  // 如果狀態為 'success'，顯示答對訊息
  if (status === 'success') {
    return <h1>答對了！</h1>
  }
  // 預設情況下，顯示城市問答表單
  return (
    <>
      <h2>城市問答</h2>
      <p>
        在哪個城市有一個可以將空氣轉換成飲用水的廣告看板？
      </p>
      <form>
        <textarea />
        <br />
        <button>
          提交
        </button>
      </form>
    </>
  )
}

export default App
