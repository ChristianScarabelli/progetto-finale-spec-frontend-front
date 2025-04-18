import { memo, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext.jsx";

function FoodRow({ data }) {
    const { favorites, toggleFavorite, selectedFoodIds, toggleSelection } = useContext(GlobalContext);
    const { title, category, id } = data;

    // Variabile che contiene il Food se è nei preferiti
    const isFavorite = favorites.some((fav) => fav.id === id);
    // Variabile che contiene il Food se è selezionato
    const isSelected = selectedFoodIds.includes(id);

    // Funzione per alternare il preferito
    const handleToggleFavorite = useCallback(() => {
        toggleFavorite(data);
    }, [toggleFavorite, data]);

    // Funzione per alternare la selezione
    const handleToggleSelection = useCallback(() => {
        toggleSelection(id);
    }, [toggleSelection, id]);

    return (
        <tr className="not-last:border-b border-green-600 hover:bg-green-100">
            {/* Checkbox per la selezione */}
            <td className="py-2 px-4 text-center">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isSelected}
                    onChange={handleToggleSelection}
                />
            </td>
            <td className="py-2 px-4 hover:underline hover:text-blue-400">
                <Link to={`/foods/${id}`}>{title}</Link>
            </td>
            <td className="py-2 px-4 text-sm text-gray-500">{category}</td>
            {/* Cuoricino per aggiungere ai preferiti */}
            <td className="py-2 px-4 text-center">
                <button
                    onClick={handleToggleFavorite} // Alterna preferito
                    className="text-gray-600 hover:text-cyan-600 transition"
                >
                    {isFavorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                    )}
                </button>
            </td>
        </tr>
    );
}

export default memo(FoodRow);