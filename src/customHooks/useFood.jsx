import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export default function useFood() {

    // Stato per le tasks
    const [food, setFood] = useState([])

    // Funzione di fetch delle tasks
    const fetchFood = async () => {
        try {
            const responseFood = await axios.get(`${API_URL}/foods`)
            console.log("Dati ricevuti dall'API:", responseFood.data)
            setFood(responseFood.data)
        }
        catch (err) {
            console.error("Errore nel fetch dei dati:", err)
        }
    }

    return { food, fetchFood }
}