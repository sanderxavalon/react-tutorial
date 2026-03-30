import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import "./api/server";

import store from "./store";
import { fetchTodos } from "./features/todos/todosSlice";

store.dispatch(fetchTodos());

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
