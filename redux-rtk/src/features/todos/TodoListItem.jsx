import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TimesSolid from "./times-solid.svg";

import { availableColors, capitalize } from "../filters/colors";
import {
  todoColorSelected,
  todoDeleted,
  todoToggled,
  selectTodoById,
} from "./todosSlice";

// 解構 `props.id`，因為我們只需要 ID 值
const TodoListItem = ({ id }) => {
  // 以 state 及 ID 值呼叫 `selectTodoById`
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleColorChanged = (e) => {
    const color = e.target.value;
    dispatch(todoColorSelected(todo.id, color));
  };

  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <img src={TimesSolid} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
