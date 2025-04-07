import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export default function useFood() {

    // Stato per la lista dei Food
    const [food, setFood] = useState([])
    // Stato per i dettagli di un singolo Food
    const [foodDetail, setFoodDetail] = useState(null);

    // Funzione di fetch delle tasks
    const fetchFood = async () => {
        try {
            const responseFood = await axios.get(`${API_URL}/foods`)
            setFood(responseFood.data)
        }
        catch (err) {
            console.error("Errore nel fetch dei dati:", err)
        }
    }

    // Funzione di fetch del Food specifico
    const fetchFoodDetail = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/foods/${id}`)
            setFoodDetail(response.data)
        } catch (err) {
            console.error(`Errore nel fetch del Food con id: ${id}`, err)
        }
    }

    return { food, fetchFood, fetchFoodDetail, foodDetail }
}