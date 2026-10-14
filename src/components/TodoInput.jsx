import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

function withViewTransition(update) {
  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

export default function TodoInput() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    withViewTransition(() => {
      addTodo(text);
      setText("");
    });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-entry smooth-transition"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task"
      />
      <button className="add-button smooth-transition" type="submit">
        <span aria-hidden="true">+</span> Add task
      </button>
    </form>
  );
}
