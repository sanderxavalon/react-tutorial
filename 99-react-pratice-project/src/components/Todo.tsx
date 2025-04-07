import { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  /**
   * 處理編輯待辦事項
   * 步驟：
   * 1. 檢查編輯後的內容是否為空
   * 2. 如果不為空，則：
   *    - 呼叫父組件的 onEdit 方法，傳入待辦事項的 id 和新的內容
   *    - 關閉編輯模式
   * 3. 如果為空，則不做任何操作
   */
  const handleEdit = () => {
    // 在這裡實現編輯待辦事項的功能
  };

  return (
    <tr className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <td className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
        ) : (
          <span>{todo.text}</span>
        )}
      </td>
      <td className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="edit-button">保存</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">取消</button>
          </>
        ) : (
          <>
            <button 
              onClick={() => onToggle(todo.id)}
              className={todo.completed ? 'completed-button' : 'complete-button'}
            >
              {todo.completed ? '已完成' : '完成'}
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              編輯
            </button>
            <button 
              onClick={() => onDelete(todo.id)}
              className="delete-button"
            >
              刪除
            </button>
          </>
        )}
      </td>
    </tr>
  );
}; 