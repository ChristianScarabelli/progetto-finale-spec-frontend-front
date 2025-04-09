import { useState, useMemo } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export default function useFood() {

    // Stato per la lista dei Food
    const [food, setFood] = useState([])
    // Stato per i dettagli di un singolo Food
    const [foodDetail, setFoodDetail] = useState(null);
    // Stato per il caricamento
    const [isLoading, setIsLoading] = useState(false);

    // Stato per i cibi selezionati per il comparatore
    const [selectedFoodIds, setSelectedFoodIds] = useState(() => {
        const storedSelected = localStorage.getItem("selectedFoods");
        return storedSelected ? JSON.parse(storedSelected) : [];
    })

    // Stato per i preferiti
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    // Funzione per aggiungere/rimuovere un cibo dai preferiti
    const toggleFavorite = (foodItem) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.id === foodItem.id);
            const updatedFavorites = isFavorite
                ? prevFavorites.filter((fav) => fav.id !== foodItem.id) // Rimuovi dai preferiti
                : [...prevFavorites, foodItem]; // Aggiungi ai preferiti

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Aggiorna localStorage
            return updatedFavorites;
        });
    };

    // Funzione per rimuovere un cibo dai preferiti
    const removeFavorite = (foodItem) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((fav) => fav.id !== foodItem.id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Aggiorna localStorage
            return updatedFavorites;
        });
    };

    // Funzione per selezionare/deselezionare un cibo
    const toggleSelection = (foodId) => {
        setSelectedFoodIds((prev) => {
            const updatedSelection = prev.includes(foodId)
                ? prev.filter((id) => id !== foodId) // Rimuovi dalla selezione
                : [...prev, foodId]; // Aggiungi alla selezione

            localStorage.setItem("selectedFoods", JSON.stringify(updatedSelection)); // Salva nel localStorage
            return updatedSelection;
        });
    }

    // Funzione per ottenere i cibi selezionati
    const selectedFoods = useMemo(() => {
        return food.filter((f) => selectedFoodIds.includes(f.id));
    }, [food, selectedFoodIds]);

    // Funzione di fetch di Food
    const fetchFood = async () => {
        setIsLoading(true)
        try {
            const responseFood = await axios.get(`${API_URL}/foods`)
            setFood(responseFood.data)
        }
        catch (err) {
            console.error("Errore nel fetch dei dati:", err)
        }
        finally {
            setIsLoading(false)
        }
    }

    // Funzione di fetch del Food specifico
    const fetchFoodDetail = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${API_URL}/foods/${id}`)
            setFoodDetail(response.data)
        } catch (err) {
            console.error(`Errore nel fetch del Food con id: ${id}`, err)
        }
        finally {
            setIsLoading(false)
        }
    }

    return {
        food,
        fetchFood,
        fetchFoodDetail,
        foodDetail,
        isLoading,
        favorites,
        toggleFavorite,
        removeFavorite,
        selectedFoodIds,
        toggleSelection,
        selectedFoods,
    }
}