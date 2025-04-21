import { useState } from 'react'
import './App.css'

function App() {
  // 定義計算機的狀態
  // display: 顯示在計算機螢幕上的數字
  // firstNumber: 儲存第一個輸入的數字
  // operator: 儲存選擇的運算符號（+、-、*、/）
  // waitingForSecondNumber: 標記是否正在等待輸入第二個數字
  const [display, setDisplay] = useState<string>('0')
  const [firstNumber, setFirstNumber] = useState<string>('')
  const [operator, setOperator] = useState<string>('')
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState<boolean>(false)

  // 處理數字按鈕點擊
  // 當點擊數字按鈕時：
  // 1. 如果正在等待輸入第二個數字（waitingForSecondNumber 為 true）：
  //    - 直接將新數字設為顯示值
  //    - 將 waitingForSecondNumber 設為 false
  // 2. 如果沒有在等待輸入第二個數字：
  //    - 如果當前顯示為 "0"，則直接顯示新數字
  //    - 否則將新數字追加到當前顯示的數字後面
  const handleNumberClick = (number: string) => {

  }

  // 處理運算符號點擊
  // 當點擊運算符號按鈕時：
  // 1. 將當前顯示的數字儲存為第一個數字
  // 2. 儲存選擇的運算符號
  // 3. 設定等待輸入第二個數字的狀態為 true
  const handleOperatorClick = (op: string) => {
    
  }

  // 處理等號點擊
  // 當點擊等號按鈕時：
  // 1. 將儲存的第一個數字和當前顯示的數字轉換為浮點數
  // 2. 根據選擇的運算符號進行相應的計算
  // 3. 將計算結果顯示在螢幕上
  // 4. 重置所有狀態（清空第一個數字、運算符號，並取消等待第二個數字的狀態）
  const handleEqualsClick = () => {
    const num1 = parseFloat(firstNumber)
    const num2 = parseFloat(display)

  }

  // 處理清除按鈕點擊
  // 當點擊清除按鈕時：
  // 1. 將顯示重置為 "0"
  // 2. 清空第一個數字
  // 3. 清空運算符號
  // 4. 取消等待第二個數字的狀態
  const handleClearClick = () => {

  }

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {/* 數字按鈕區域 */}
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>

        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>

        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>

        {/* 底部按鈕區域 */}
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleClearClick}>C</button>
        <button onClick={handleEqualsClick}>=</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
      </div>
    </div>
  )
}

export default App 