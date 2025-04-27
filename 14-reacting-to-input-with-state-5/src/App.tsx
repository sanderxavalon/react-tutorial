import { useState, FormEvent, ChangeEvent } from 'react'

// 定義表單狀態的型別
type FormStatus = 'typing' | 'submitting' | 'success';

// 表單組件
function Form() {
  // 使用 useState 管理表單狀態
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<FormStatus>('typing');

  // 如果狀態為 'success'，顯示答對訊息
  if (status === 'success') {
    return <h1>答對了！</h1>
  }

  // 處理表單提交
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err as Error);
    }
  }

  // 處理文字輸入區域的變化
  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>城市問答</h2>
      <p>
        在哪個城市有一個可以將空氣轉換成飲用水的廣告看板？
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          提交
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

// 模擬表單提交的函數
function submitForm(answer: string): Promise<void> {
  // 模擬網路請求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('猜得不錯，但答案不對。請再試一次！'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

// 主應用程式組件
function App() {
  return <Form />;
}

export default App
