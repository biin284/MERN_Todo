import mongoose from "mongoose";

// Định nghĩa schema
const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false, index: true },
    dueAt: { type: Date }
  },
  {
    timestamps: true // Đặt timestamps ở đây, trong options
  }
);

// Thêm index
TodoSchema.index({ createdAt: 1 });

// Xuất model
export default mongoose.model("Todo", TodoSchema);