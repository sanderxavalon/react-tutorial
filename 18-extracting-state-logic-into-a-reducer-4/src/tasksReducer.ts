export default function tasksReducer(tasks: { id: number; text: string; done: boolean }[], action: { type: string; id?: number; text?: string; task?: { id: number; text: string; done: boolean } }) {
    switch (action.type) {
      case 'added': {
        return [
          ...tasks,
          {
            id: action.id!,
            text: action.text!,
            done: false,
          },
        ];
      }
      case 'changed': {
        return tasks.map((t) => {
          if (t.id === action.task!.id) {
            return action.task!;
          } else {
            return t;
          }
        });
      }
      case 'deleted': {
        return tasks.filter((t) => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }