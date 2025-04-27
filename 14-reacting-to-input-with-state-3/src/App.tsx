import './App.css'

// 定義表單組件，接收一個可選的 status 參數，預設值為 'empty'
// 可以嘗試不同的狀態值：'submitting'（提交中）、'error'（錯誤）、'success'（成功）
function Form({
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
        {/* 當狀態為 'submitting' 時，禁用文字輸入區域 */}
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        {/* 當狀態為 'empty' 或 'submitting' 時，禁用提交按鈕 */}
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          提交
        </button>
        {/* 當狀態為 'error' 時，顯示錯誤訊息 */}
        {status === 'error' &&
          <p className="Error">
            猜得不錯，但答案不對。請再試一次！
          </p>
        }
      </form>
    </>
  );
}

// 導出表單組件
export default Form
