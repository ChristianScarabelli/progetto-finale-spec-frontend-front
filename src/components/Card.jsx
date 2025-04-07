import placeholder from "../assets/placeholder.png";
import { Link } from "react-router";
import HealthRate from "./HealthRate";
import { memo } from "react";

function Card({ food }) {
  const { id } = food;

  return (
    <div className="rounded-lg p-4 shadow-md bg-green-100 hover:shadow-xl">
      <Link to={`/foods/${id}`}>
        <img
          src={food.img || placeholder}
          alt={food.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </Link>
      <h2 className="text-xl font-bold text-green-600 mb-2">{food.title}</h2>
      <span className="text-sm text-gray-700 mt-2">
        <strong>Category:</strong> <span className="text-xs">{food.category}</span>
      </span>
      <p className="text-sm text-gray-700 mt-2">
        <strong>Description:</strong> <span className="text-xs">{food.description}</span>
      </p>
      <div className="flex items-center justify-between gap-1 pt-5">
        <HealthRate rate={food.healthRate || 0} />
        <button className="cursor-pointer">
          <img
            width="32"
            height="32"
            className="text-gray-700 hover:text-cyan-600"
            src="https://img.icons8.com/wired/64/trash.png"
            alt="trash"
          />
        </button>
      </div>
    </div>
  );
}

export default memo(Card);
