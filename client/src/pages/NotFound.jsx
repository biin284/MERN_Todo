import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl text-red-500">404 - Not Found</h1>
      <Link to="/" className="text-blue-500 mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  );
}