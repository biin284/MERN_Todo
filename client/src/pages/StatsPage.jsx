import { useEffect, useState } from "react";
import { getStats } from "../api/todoApi";

export default function StatsPage() {
  const [stats, setStats] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    getStats().then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Thống kê</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>✅ Hoàn thành: {stats.completed}</p>
        <p>⏳ Chưa hoàn thành: {stats.pending}</p>
      </div>
    </div>
  );
}
