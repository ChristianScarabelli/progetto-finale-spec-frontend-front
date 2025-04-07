import placeholder from "../assets/placeholder.png";
import { Link } from "react-router";
import HealthRate from "./HealthRate";
import { memo, useState } from "react";
import Modal from "./Modal";

function Card({ food, onRemove }) {
  const { id } = food;

  // Stato per la modale
  const [isShow, setIsShow] = useState(false);

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
        <button
          className="cursor-pointer"
          onClick={() => setIsShow(true)} // Mostro la modale
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-gray-600 hover:text-cyan-600 cursor-pointer">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
          </svg>

        </button>
      </div>
      <Modal
        title="Remove food"
        content={`Are you sure you want to remove "${food.title}" from your favorites?`}
        show={isShow}
        onClose={() => setIsShow(false)} // Chiudo la modale
        onConfirm={() => {
          onRemove(food); // Rimuovo il cibo dai preferiti
          setIsShow(false); // Chiudo la modale
        }}
        confirmText="Remove"
        confirmButtonClasses="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}

export default memo(Card);
