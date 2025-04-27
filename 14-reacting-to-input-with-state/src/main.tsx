// 處理表單提交的異步函數
async function handleFormSubmit(e: Event) {
  e.preventDefault(); // 阻止表單默認提交行為
  // 檢查所有必需的DOM元素是否存在
  if (!textarea || !button || !loadingMessage || !errorMessage || !form || !successMessage) {
    return;
  }
  // 禁用輸入框和按鈕，顯示加載消息，隱藏錯誤消息
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);
  try {
    // 提交表單並等待結果
    await submitForm(textarea.value);
    // 如果成功，顯示成功消息並隱藏表單
    show(successMessage);
    hide(form);
  } catch (err) {
    // 如果出錯，顯示錯誤消息
    show(errorMessage);
    errorMessage.textContent = (err as Error).message;
  } finally {
    // 無論成功或失敗，都隱藏加載消息並重新啟用輸入框和按鈕
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
}

// 處理文本區域內容變化的函數
function handleTextareaChange() {
  // 檢查必需的DOM元素是否存在
  if (!textarea || !button) {
    return;
  }
  // 根據輸入內容的長度來啟用或禁用按鈕
  if (textarea.value.length === 0) {
    disable(button);
  } else {
    enable(button);
  }
}

// 隱藏元素的工具函數
function hide(el: HTMLElement) {
  el.style.display = 'none';
}

// 顯示元素的工具函數
function show(el: HTMLElement) {
  el.style.display = '';
}

// 啟用元素（按鈕或文本區域）的工具函數
function enable(el: HTMLButtonElement | HTMLTextAreaElement) {
  el.disabled = false;
}

// 禁用元素（按鈕或文本區域）的工具函數
function disable(el: HTMLButtonElement | HTMLTextAreaElement) {
  el.disabled = true;
}

// 模擬表單提交的函數，返回一個Promise
function submitForm(answer: string): Promise<void> {
  // 模擬網絡請求
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // 檢查答案是否為"istanbul"（不區分大小寫）
      if (answer.toLowerCase() === 'istanbul') {
        resolve(); // 答案正確，解決Promise
      } else {
        // 答案錯誤，拒絕Promise並返回錯誤信息
        reject(new Error('錯囉！再試試看吧！'));
      }
    }, 1500); // 模擬1.5秒的網絡延遲
  });
}

// 獲取DOM元素並進行類型斷言
let form = document.getElementById('form') as HTMLFormElement;
let textarea = document.getElementById('textarea') as HTMLTextAreaElement;
let button = document.getElementById('button') as HTMLButtonElement;
let loadingMessage = document.getElementById('loading') as HTMLElement;
let errorMessage = document.getElementById('error') as HTMLElement;
let successMessage = document.getElementById('success') as HTMLElement;

// 確保表單和文本區域存在後再添加事件監聽器
if (form && textarea) {
  form.onsubmit = handleFormSubmit;
  textarea.oninput = handleTextareaChange;
}
