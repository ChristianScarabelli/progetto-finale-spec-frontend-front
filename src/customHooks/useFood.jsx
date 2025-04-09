import { useState, useMemo } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export default function useFood() {

    // Stato per la lista dei Food
    const [food, setFood] = useState([])
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
        return storedFavorites ? JSON.parse(storedFavorites) : []; // con JSON.parse ritrasformo la stringa in un oggetto
    });

    // Funzione per aggiungere/rimuovere un cibo dai preferiti
    const toggleFavorite = (foodItem) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.id === foodItem.id);
            const updatedFavorites = isFavorite
                ? prevFavorites.filter((fav) => fav.id !== foodItem.id) // Rimuovi dai preferiti
                : [...prevFavorites, foodItem]; // Aggiungi ai preferiti

            // Aggiorna localStorage
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // trasformo in una stringa JSON perchè localStorage accetta solo stringhe
            return updatedFavorites;
        });
    };

    // Funzione per rimuovere un cibo dai preferiti
    const removeFavorite = (foodItem) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((fav) => fav.id !== foodItem.id);
            // Aggiorno localStorage
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    // Funzione per selezionare/deselezionare un cibo
    const toggleSelection = (foodId) => {
        setSelectedFoodIds((prev) => {
            const updatedSelection = prev.includes(foodId)
                ? prev.filter((id) => id !== foodId) // Rimuovi dalla selezione
                : [...prev, foodId]; // Aggiungi alla selezione
            // Salvo nel localStorage
            localStorage.setItem("selectedFoods", JSON.stringify(updatedSelection));
            return updatedSelection;
        });
    }

    // Funzione per ottenere i cibi selezionati
    // Con useMemo evito di ricalcolare la lista dei selezionati ad ogni render
    const selectedFoods = useMemo(() => {
        return food.filter((f) => selectedFoodIds.includes(f.id));
    }, [food, selectedFoodIds]);

    // Funzione di fetch Food e merge dei dettagli
    const fetchAndMergeFood = async () => {
        setIsLoading(true);
        try {
            // Fetch della lista di cibi
            const responseFood = await axios.get(`${API_URL}/foods`);
            const foodList = responseFood.data;

            // Fetch dei dettagli per ogni cibo in parallelo
            const detailedFoods = await Promise.all( // Aspetto che si risolvano tutte le promise
                foodList.map(async (foodItem) => {
                    const responseDetail = await axios.get(`${API_URL}/foods/${foodItem.id}`);
                    return { ...foodItem, ...responseDetail.data.food };
                })
            );

            // Aggiorna lo stato con i dati uniti
            setFood(detailedFoods);

            // Filtra preferiti e cibi selezionati basandosi sul localStorage
            const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const storedSelected = JSON.parse(localStorage.getItem("selectedFoods")) || [];
            setFavorites(detailedFoods.filter((food) => storedFavorites.some((fav) => fav.id === food.id)));
            setSelectedFoodIds(storedSelected.filter((id) => detailedFoods.some((food) => food.id === id)));
        } catch (err) {
            console.error("Errore nel fetch e merge dei dati:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        food,
        fetchAndMergeFood,
        isLoading,
        favorites,
        toggleFavorite,
        removeFavorite,
        selectedFoodIds,
        toggleSelection,
        selectedFoods,
    }
}