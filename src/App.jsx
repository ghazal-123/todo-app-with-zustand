import "./App.css";
import { useTodoStore } from "./store/useTodoStore";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

function App() {
  const { todos, filter, setFilter, clearCompleted } = useTodoStore();

  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.filter((t) => !t.completed).length;

  const filters = ["All", "Active", "Completed"];

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="app-title">
        <header className="app-header">
          <div className="eyebrow">A LITTLE MORE CLARITY</div>
          <h1 id="app-title">
            My tasks
            <span className="title-sparkle" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="task-summary">
            <span>{remainingCount} to do</span>
            <span className="summary-divider" aria-hidden="true">
              ·
            </span>
            <span>{completedCount} done</span>
          </p>
        </header>

        <TodoInput />

        <nav className="filter-group" aria-label="Filter tasks">
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              type="button"
              className={`filter-button smooth-transition${filter === filterOption ? " is-selected" : ""}`}
              onClick={() => setFilter(filterOption)}
              aria-pressed={filter === filterOption}
            >
              {filterOption}
            </button>
          ))}
        </nav>

        <TodoList />

        {completedCount > 0 && (
          <button
            className="clear-button smooth-transition"
            onClick={clearCompleted}
          >
            Clear completed <span>{completedCount}</span>
          </button>
        )}
      </section>
      <p className="page-note">One thing at a time. You’ve got this.</p>
    </main>
  );
}

export default App;
