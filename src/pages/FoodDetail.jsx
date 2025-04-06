import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function FoodDetail() {
    const { id } = useParams(); // Ottieni l'id dalla URL
    const navigate = useNavigate();

    const [food, setFood] = useState(null); // Stato per il cibo

    // Effettua il fetch del cibo specifico
    useEffect(() => {
        const fetchFoodDetail = async () => {
            try {
                const response = await axios.get(`${API_URL}/foods/${id}`);
                setFood(response.data); // Salva i dati del cibo
            } catch (err) {
                console.error(err);
            }
        };

        fetchFoodDetail();
    }, [id]);

    // Mostra i dettagli del cibo
    return (
        <section className="mx-auto p-4 pt-[82px] pb-10 bg-green-200" >
            {food ? (
                <div className="flex flex-col gap-3 text-gray-800 bg-gray-50 shadow-lg p-5 rounded-lg mt-10">
                    <h2>
                        <strong>Name:</strong> {food.title}
                    </h2>
                    <p>
                        <strong>Description:</strong> {food.description}
                    </p>
                    <span>
                        <strong>Category:</strong> {food.category}
                    </span>
                    <figure>
                        <img
                            src={food.image}
                            alt={food.title}
                            className="rounded-lg"
                        />
                    </figure>
                    <span>
                        <strong>Health Rate:</strong> {food.healthRate}
                    </span>
                </div>
            ) : (
                <div className="flex flex-col gap-3 text-gray-800 bg-gray-200 shadow-lg p-5 mt-[92px] rounded-lg">
                    <h2>Food not found</h2>
                </div>
            )}
        </section>
    );
}