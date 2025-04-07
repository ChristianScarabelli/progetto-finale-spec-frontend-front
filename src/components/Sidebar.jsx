import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext.jsx";
import Card from '../components/Card.jsx';

export default function Sidebar({ isOpen, onClose }) {
    const { favorites, removeFavorite } = useContext(GlobalContext); // Ottieni preferiti e funzione di rimozione

    return (
        <div
            className={`fixed z-50 top-0 right-0 h-full w-80 bg-gray-50 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300`}
        >
            <div className="flex justify-between items-center p-4 bg-green-800">
                <h2 className="text-xl font-semibold text-gray-50">Favourites List</h2>
                <button
                    onClick={onClose}
                    className="text-gray-50 hover:text-cyan-600 cursor-pointer transition"
                >
                    ✕
                </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
                {favorites.length > 0 ? (
                    favorites.map((food) => (
                        <Card
                            key={food.id}
                            food={food}
                            onRemove={removeFavorite} // Usa la funzione di rimozione dal context
                        />
                    ))
                ) : (
                    <p className="text-gray-600">No food added in favourites list.</p>
                )}
            </div>
        </div>
    );
}