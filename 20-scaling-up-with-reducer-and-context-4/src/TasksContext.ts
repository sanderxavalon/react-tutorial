import { createContext, type Dispatch } from "react";
import type { Task } from "./TaskList";
import type { Action } from "./App";

export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<Dispatch<Action> | null>(null);
