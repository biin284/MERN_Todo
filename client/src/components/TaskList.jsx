export default function TaskList({ todos, onToggle, onDelete }) {
  return (
    <ul className="divide-y">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center p-2"
        >
          <div>
            <span
              onClick={() => onToggle(todo)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            {todo.dueAt && (
              <span className="ml-2 text-sm text-gray-400">
                (Due: {new Date(todo.dueAt).toLocaleDateString()})
              </span>
            )}
          </div>
          <button
            onClick={() => onDelete(todo._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
