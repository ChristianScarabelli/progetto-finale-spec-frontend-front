import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import GlobalContext from '../contexts/GlobalContext.jsx';
import Loader from "../components/Loader.jsx";
import HealthRate from "../components/HealthRate.jsx";

export default function FoodDetail() {
    // Ottengo l'id dal URL
    const { id } = useParams();

    const { food, fetchAndMergeFood, isLoading, favorites, toggleFavorite } = useContext(GlobalContext);

    // Effettuo il fetch dei dati al montaggio del componente
    useEffect(() => {
        fetchAndMergeFood();
        window.scrollTo(0, 0);
    }, []);

    // Trovo il cibo specifico dall'elenco
    const selectedFood = food.find((item) => item.id === Number(id)); // Converto id in numero

    if (isLoading) {
        return <Loader />;
    }

    const isFavorite = selectedFood && favorites.some((fav) => fav.id === selectedFood.id);

    return (
        <section className="flex justify-center mx-auto p-4 pt-[82px] pb-10 bg-green-200 z-0">
            {selectedFood ? (
                <div className="flex flex-col sm:flex-row w-2/3 gap-6 text-gray-800 bg-gray-50 shadow-lg p-5 rounded-lg mt-10">
                    <figure className="flex-shrink-0 sm:w-1/3 w-full">
                        <img
                            src={selectedFood.image}
                            alt={selectedFood.title}
                            className="w-full h-auto rounded-lg object-contain"
                        />
                    </figure>
                    <div className="flex flex-col sm:w-2/3 w-full gap-4">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold">
                                Name: <span className="font-normal text-gray-600">{selectedFood.title}</span>
                            </h2>
                            {/* Cuoricino Favoriti */}
                            <button
                                onClick={() => toggleFavorite(selectedFood)}
                                className="text-gray-600 cursor-pointer hover:text-cyan-600 transition"
                            >
                                {isFavorite ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-8 h-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">
                            <strong className="text-gray-800">Description:</strong> {selectedFood.description}
                        </p>
                        <span className="text-sm text-gray-600">
                            <strong className="text-gray-800">Category:</strong> {selectedFood.category}
                        </span>
                        <span className="flex flex-col gap-3 text-sm text-gray-600">
                            <strong className="text-gray-800">Health Rate:</strong> <HealthRate rate={selectedFood.healthRate} />
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-3 text-gray-800 bg-gray-50 shadow-lg p-5 mt-[92px] rounded-lg">
                    <h2>Food not found</h2>
                </div>
            )}
        </section>
    );
}