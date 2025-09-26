import Todo from "../models/todo.model.js";

// Lấy danh sách
export const list = async (req, res) => {
  const { status = "all", page = 1, limit = 10, from, to } = req.query;
  const q = {};

  if (status !== "all") q.completed = status === "true";
  if (from) q.createdAt = { $gte: new Date(from) };
  if (to) q.createdAt = { ...q.createdAt, $lte: new Date(to) };

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Todo.find(q).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Todo.countDocuments(q)
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit)
  });
};

// Tạo mới
export const create = async (req, res) => {
  const { title, dueAt } = req.body;
  if (!title) {
    const error = new Error("Title is required");
    error.status = 400;
    throw error;
  }

  const todo = await Todo.create({ title, dueAt: dueAt ? new Date(dueAt) : null });
  res.status(201).json(todo);
};

// Cập nhật
export const update = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!todo) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(todo);
};

// Xoá
export const remove = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({ ok: true });
};

// Thống kê
export const stats = async (_, res) => {
  const byStatus = await Todo.aggregate([
    { $group: { _id: "$completed", count: { $sum: 1 } } }
  ]);

  const completed = byStatus.find(x => x._id === true)?.count || 0;
  const pending = byStatus.find(x => x._id === false)?.count || 0;

  res.json({ completed, pending });
};
