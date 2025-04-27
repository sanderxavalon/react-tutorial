import { useState, FormEvent } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>感謝您的回饋！</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>您在躍馬旅店的住宿體驗如何？</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        發送
      </button>
      {isSending && <p>發送中...</p>}
    </form>
  );
}

// 模擬發送訊息
function sendMessage(text: string): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
