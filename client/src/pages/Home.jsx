import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../service/api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // số item mỗi trang
  const [totalPages, setTotalPages] = useState(1);

  // Load data từ API
  const loadData = async () => {
    try {
      const params = { page, limit };
      if (from) params.from = from;
      if (to) params.to = to;

      const { data } = await api.get("/todos", { params });

      // tuỳ backend trả về, điều chỉnh lại
      setTodos(data.todos || data.items || []);
      setTotalPages(data.pages || Math.ceil((data.total || 1) / limit));
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [from, to, page]); // fetch lại khi đổi filter hoặc page

  // Thêm mới
  const add = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Tiêu đề không được rỗng!");
    try {
      await api.post("/todos", { title });
      setTitle("");
      setPage(1); // về trang 1 sau khi thêm
      loadData();
    } catch (err) {
      console.error("Lỗi khi thêm:", err);
    }
  };

  // Toggle completed
  const toggle = async (id, completed) => {
    try {
      await api.put(`/todos/${id}`, { completed: !completed });
      loadData();
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  // Xoá
  const remove = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá?")) return;
    try {
      await api.delete(`/todos/${id}`);
      loadData();
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Todo App</h1>

      {/* Form thêm mới */}
      <form onSubmit={add} className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </form>

      {/* Bộ lọc ngày */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={() => setPage(1)} // reset về page 1 khi lọc
          className="bg-green-500 text-white px-4 rounded"
        >
          Lọc
        </button>
      </div>

      {/* Danh sách todos */}
      <ul className="divide-y">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-2"
          >
            <span
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => toggle(todo._id, todo.completed)}
            >
              {todo.title}
            </span>
            <button
              onClick={() => remove(todo._id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Link
        to="/not-found"
        className="text-blue-500 mt-4 inline-block"
      >
        Go to Not Found
      </Link>
    </div>
  );
}
