// React
import { memo, useState, useCallback } from "react";
import { Link } from "react-router";
// Components
import HealthRate from "./HealthRate";
import Modal from "./Modal";
import placeholder from "../assets/placeholder.png";

function Card({ food, onRemove, variant = "default" }) {
  const { id } = food;
  // Stato per la visione della modale
  const [isShow, setIsShow] = useState(false);

  // Funzione per rimuovere il cibo dai preferiti o dalla comparazione
  // con useCallback si ricrea la funzione solo al cambio dell'oggetto rimosso 
  const handleRemove = useCallback(() => {
    onRemove(food);
    setIsShow(false);
  }, [onRemove, food]);

  // Funzione per alternare la visione della modale (dallo stato precendente al suo contrario)
  // con useCallback si ricrea solo al cambio dello stato della modale
  const toggleModal = useCallback(() => {
    setIsShow((prev) => !prev);
  }, []);

  return (
    <div
      className={`rounded-lg p-4 shadow-md bg-green-100 hover:shadow-xl relative group ${variant === "compare" ? "bg-blue-100 w-64 flex-shrink-0" : "bg-green-100"
        }`}
    >
      <Link to={`/foods/${id}`}>
        <img
          src={food.image || placeholder}
          alt={food.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </Link>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-600">{food.title}</h2>
        {/* Variante di card e modale per i preferiti  */}
        {variant === "favorites" && (
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={toggleModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-600 hover:text-cyan-600"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        {variant === "favorites" && (
          <Modal
            title="Remove food"
            content={`Are you sure you want to remove "${food.title}" from your favorites?`}
            show={isShow}
            onClose={toggleModal}
            onConfirm={handleRemove}
            confirmText="Remove"
            confirmButtonClasses="bg-red-500 hover:bg-red-600"
          />
        )}
      </div>
      {/* Variante di card e modale per la comparazione  */}
      {variant === "compare" && (
        <div className="mt-2">
          <span className="text-sm text-gray-700">
            <strong>Category:</strong> <span className="text-xs">{food.category}</span>
          </span>
          <p className="text-sm text-gray-700 my-2">
            <strong>Health Rate</strong>
          </p>
          <div className="flex items-center justify-between">
            <HealthRate className="mt-2" rate={food.healthRate || 0} />
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={toggleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-gray-600 hover:text-cyan-600"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <Modal
            title="Remove food"
            content={`Are you sure you want to remove "${food.title}" from the comparison?`}
            show={isShow}
            onClose={toggleModal}
            onConfirm={handleRemove}
            confirmText="Remove"
            confirmButtonClasses="bg-red-500 hover:bg-red-600"
          />
        </div>
      )}
    </div>
  );
}

export default memo(Card);
