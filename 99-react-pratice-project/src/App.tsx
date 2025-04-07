import { useState } from 'react'
import { Todo } from './types/todo'
import { TodoItem } from './components/Todo'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [nextId, setNextId] = useState(1)

  /**
   * 新增待辦事項
   * 步驟：
   * 1. 檢查輸入是否為空，如果為空則直接返回
   * 2. 創建一個新的待辦事項對象，包含：
   *    - id: 使用 nextId 作為唯一標識
   *    - text: 用戶輸入的待辦事項內容（去除首尾空格）
   *    - completed: 初始狀態設為未完成（false）
   * 3. 將新的待辦事項添加到 todos 陣列中
   * 4. 清空輸入框
   * 5. 更新 nextId，為下一個待辦事項做準備
   */
  const handleAddTodo = () => {
    // 在這裡實現新增待辦事項的功能
  }

  /**
   * 切換待辦事項的完成狀態
   * 步驟：
   * 1. 檢查 todos 陣列中的每個待辦事項
   * 2. 找到 id 符合的待辦事項
   * 3. 複製該待辦事項，但改變其完成狀態
   * 4. 其他待辦事項保持原樣
   * 5. 用更新後的陣列替換原來的 todos
   */
  const handleToggle = (id: number) => {
    // 在這裡實現切換完成狀態的功能
  }

  /**
   * 刪除待辦事項
   * 步驟：
   * 1. 從 todos 陣列中篩選出要保留的待辦事項
   * 2. 只保留 id 不符合的待辦事項
   * 3. 移除 id 符合的待辦事項
   * 4. 用篩選後的陣列替換原來的 todos
   */
  const handleDelete = (id: number) => {
    // 在這裡實現刪除待辦事項的功能
  }

  /**
   * 編輯待辦事項的內容
   * 步驟：
   * 1. 檢查 todos 陣列中的每個待辦事項
   * 2. 找到 id 符合的待辦事項
   * 3. 複製該待辦事項，但更新其內容
   * 4. 其他待辦事項保持原樣
   * 5. 用更新後的陣列替換原來的 todos
   */
  const handleEdit = (id: number, newText: string) => {
    // 在這裡實現編輯待辦事項的功能
  }

  return (
    <div className="container">
      <h1>待辦事項清單</h1>
      
      <div className="add-todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新增待辦事項"
          className="todo-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo()
            }
          }}
        />
        <button 
          onClick={handleAddTodo}
          className="add-button"
        >
          新增
        </button>
      </div>

      <div className="todo-table-container">
        <table className="todo-table">
          <thead>
            <tr>
              <th>待辦事項</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
