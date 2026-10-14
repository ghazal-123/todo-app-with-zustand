import { useTodoStore } from "../store/useTodoStore";

function withViewTransition(update) {
  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

export default function TodoList() {
  const { todos, filter, toggleTodo, editTodo, deleteTodo } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const handleEdit = (id, currentText) => {
    const newText = prompt("Edit todo:", currentText);
    if (newText && newText.trim()) {
      withViewTransition(() => editTodo(id, newText.trim()));
    }
  };

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state" aria-live="polite">
        <span className="empty-mark" aria-hidden="true">
          ✦
        </span>
        <p>
          {todos.length === 0 ? "A fresh start." : "Nothing here right now."}
        </p>
        <span>
          {todos.length === 0
            ? "Add a task to get your day moving."
            : "Try another filter to find your tasks."}
        </span>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li
          className="todo-row smooth-transition"
          key={todo.id}
          style={{ viewTransitionName: `task-${todo.id}` }}
        >
          <label className="todo-content">
            <input
              type="checkbox"
              className="todo-checkbox smooth-transition"
              checked={todo.completed}
              onChange={() => withViewTransition(() => toggleTodo(todo.id))}
              aria-label={`Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`}
            />
            <span
              key={todo.text}
              className={`todo-text smooth-transition${todo.completed ? " is-completed" : ""}`}
            >
              {todo.text}
            </span>
          </label>

          <div className="todo-actions">
            <button
              className="icon-button smooth-transition"
              type="button"
              onClick={() => handleEdit(todo.id, todo.text)}
              aria-label={`Edit ${todo.text}`}
              title="Edit task"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>

            <button
              className="icon-button delete-button smooth-transition"
              type="button"
              onClick={() => withViewTransition(() => deleteTodo(todo.id))}
              aria-label={`Delete ${todo.text}`}
              title="Delete task"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
