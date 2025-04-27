import './App.css'
import Form from './Form'
import { FormStatus } from './Form'

// 定義所有可能的表單狀態
const statuses: FormStatus[] = [
  'empty',     // 空狀態
  'typing',    // 輸入中
  'submitting', // 提交中
  'success',   // 成功
  'error',     // 錯誤
];

// 主應用程式組件
function App() {
  return (
    <>
      {/* 遍歷所有狀態，顯示對應的表單 */}
      {statuses.map(status => (
        <section key={status}>
          <h4>表單狀態 ({status}):</h4>
          <Form status={status} />
        </section>
      ))}
    </>
  );
}

export default App
