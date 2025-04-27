// 定義表單狀態的型別
export type FormStatus = 'empty' | 'typing' | 'submitting' | 'success' | 'error';

// 定義表單組件的屬性介面
interface FormProps {
  status: FormStatus;
}

// 表單組件
export default function Form({ status }: FormProps) {
  // 如果狀態為 'success'，顯示答對訊息
  if (status === 'success') {
    return <h1>答對了！</h1>
  }
  // 預設情況下，顯示表單
  return (
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
  );
}