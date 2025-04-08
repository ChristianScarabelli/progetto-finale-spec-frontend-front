import { useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react'
import GlobalContext from '../contexts/GlobalContext.jsx'
import FoodRow from '../components/FoodRow.jsx'
import Loader from '../components/Loader.jsx'
import NavBar from '../components/NavBar.jsx'
import CompareSidebar from '../components/CompareSidebar';


// Freccine ordinamento
const chevronUp = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>

const chevronDown = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function FoodList() {
    const {
        food,
        fetchFood,
        isLoading,
        favorites,
        toggleFavorite,
        selectedFoods,
        toggleSelection
    } = useContext(GlobalContext)

    // Stato per criterio/colonna di ordinamento
    const [sortBy, setSortBy] = useState('');
    // Stato per la direzione di ordinamento
    const [sortOrder, setSortOrder] = useState(1);
    // Stato per la ricerca
    const [searchQuery, setSearchQuery] = useState('');
    // Stato per la categoria selezionata
    const [selectedCategory, setSelectedCategory] = useState('');
    // Stati per gestire il tooltip
    const [tooltip, setTooltip] = useState({ visible: false, content: '', position: { x: 0, y: 0 } });
    const [tooltipTimeout, setTooltipTimeout] = useState(null);
    // Stato per il ref della ricerca per autofocus
    const inputRef = useRef(null)
    // Stato per la sidebar di comparazione
    const [showCompareSidebar, setShowCompareSidebar] = useState(false);

    useEffect(() => {
        fetchFood();
        window.scrollTo(0, 0); // Scroll all'inzio al montaggio del componente
        inputRef.current?.focus();
    }, [])

    // Funzione per gestire l'ordine
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    // Funzione per ottenere categorie uniche
    const uniqueCategories = useMemo(() => {
        if (!food) return []
        return [...new Set(food.map((f) => f.category))]
    }, [food])

    // Funzione per filtrare e ordinare i cibi
    const filteredFood = useMemo(() => {
        if (!food) return []

        // Filtro per categoria selezionata
        const filteredByCategory = selectedCategory
            ? food.filter((f) => f.category === selectedCategory)
            : food

        // Filtro per query di ricerca
        const filteredBySearch = filteredByCategory.filter((f) =>
            f.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Ordino Food
        const sortedFood = [...filteredBySearch]
        sortedFood.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title) * sortOrder
            } else if (sortBy === 'category') {
                return a.category.localeCompare(b.category) * sortOrder
            }
            return 0
        })
        return sortedFood
    }, [food, selectedCategory, searchQuery, sortBy, sortOrder])

    // Funzione per la ricerca con debounce
    const handleDebouncedSearch = useCallback(debounce(setSearchQuery, 500), [])



    // Funzione per mostrare il tooltip
    const showTooltip = (content, event) => {
        const { pageX, pageY } = event; // Ottengo la posizione del mouse rispetto alla pagina
        setTooltipTimeout(
            setTimeout(() => {
                setTooltip({
                    visible: true,
                    content,
                    position: { x: pageX, y: pageY },
                });
            }, 300)
        );
    };

    // Funzione per nascondere il tooltip
    const hideTooltip = () => {
        clearTimeout(tooltipTimeout); // Cancello il timeout se l'utente lascia prima
        setTooltip({ visible: false, content: '', position: { x: 0, y: 0 } });
    };

    return (
        <>
            <NavBar favorites={favorites} /> {/* Passa favorites come prop */}
            <section className="pt-[82px] p-5 bg-green-200">
                {/* Mostra il loader */}
                {isLoading && <Loader />}
                {/* Bottone Compare */}
                {selectedFoods.length > 0 && (
                    <button
                        className="fixed bottom-5 right-5 bg-green-600 text-gray-50 cursor-pointer px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
                        onClick={() => setShowCompareSidebar(true)}
                    >
                        Compare
                    </button>
                )}
                {/* Sidebar per il confronto */}
                <CompareSidebar
                    isOpen={showCompareSidebar}
                    onClose={() => setShowCompareSidebar(false)}
                    selectedFoods={selectedFoods}
                    toggleSelection={toggleSelection}
                />
                <div className='container mx-auto'>
                    <h1 className="text-5xl text-green-800 py-5 text-center">Food List</h1>
                    <p className="text-gray-700 mb-5 text-center">
                        Here's the complete list of Vegan food! Search your favourite, sort them and add them to your wish list!
                    </p>
                    <div className="flex justify-center gap-1 my-5">
                        <img
                            src="https://images.unsplash.com/photo-1580910365203-91ea9115a319?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3BpbmFjaXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Placeholder 1"
                            className="w-1/12 aspect-square object-cover rounded-md"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1656918828529-345b77bb06e9?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFycm98ZW58MHx8MHx8fDA%3D"
                            alt="Placeholder 2"
                            className="w-1/12 aspect-square object-cover rounded-md"
                        />
                        <img
                            src="https://plus.unsplash.com/premium_photo-1674347954785-7604a0220776?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2VtaSUyMGRpJTIwenVjY2F8ZW58MHx8MHx8fDA%3D"
                            alt="Placeholder 3"
                            className="w-1/12 aspect-square object-cover rounded-md"
                        />
                        <img
                            src="https://plus.unsplash.com/premium_photo-1664648005366-8737ef6043d5?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9mdXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Placeholder 4"
                            className="w-1/12 aspect-square object-cover rounded-md"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1730591857303-0fa44be3f677?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVudGljY2hpZSUyMHJvc3NlfGVufDB8fDB8fHww"
                            alt="Placeholder 5"
                            className="w-1/12 aspect-square object-cover rounded-md"
                        />
                    </div>
                    <div className="my-5 pt-10 p-5 text-center">
                        <input
                            type="text"
                            ref={inputRef}
                            className="text-gray-800 bg-gray-50 rounded-xl px-5 py-3 w-2/3"
                            placeholder="Search food for name..."
                            onChange={(e) => handleDebouncedSearch(e.target.value)}
                        />
                    </div>
                </div>
                <section className="container mx-auto">
                    {/* Select per il filtro */}
                    <div className="flex justify-end max-w-4xl mx-auto pb-5">
                        <select
                            className="text-gray-700 text-xs bg-gray-50 rounded-lg px-3 py-2"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Filter by Category...</option>
                            {uniqueCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Tabella */}
                    <div className="overflow-x-auto mt-10">
                        <table className="bg-gray-50 max-w-4xl mx-auto w-full shadow-md rounded-lg overflow-hidden text-gray-700 mb-10">
                            <thead className="bg-green-800 text-gray-50">
                                <tr>
                                    <th className="py-2 px-4 text-left text-xs w-15">Check to Compare</th>
                                    <th
                                        onClick={() => handleSort('title')}
                                        onMouseEnter={(e) => showTooltip('Click to sort by Title', e)}
                                        onMouseLeave={hideTooltip}
                                        className="py-2 px-4 text-left text-xl cursor-pointer hover:bg-cyan-600"
                                    >
                                        <div className="flex justify-between items-center">
                                            Title
                                            {sortBy === 'title' && (sortOrder === 1 ? chevronDown : chevronUp)}
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('category')}
                                        onMouseEnter={(e) => showTooltip('Click to sort by Category', e)}
                                        onMouseLeave={hideTooltip}
                                        className="py-2 px-4 text-left text-xl cursor-pointer hover:bg-cyan-600"
                                    >
                                        <div className="flex justify-between items-center">
                                            Category
                                            {sortBy === 'category' && (sortOrder === 1 ? chevronDown : chevronUp)}
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left text-xs w-15">Add to Favorites</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFood.map((food) => {
                                    const isFavorite = favorites.some((fav) => fav.id === food.id);
                                    return (
                                        <FoodRow
                                            key={food.id}
                                            data={food}
                                            isFavorite={isFavorite}
                                            onClick={() => toggleFavorite(food)}
                                            checked={false}
                                            onToggle={() => { }}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* Tooltip */}
                        {tooltip.visible && (
                            <div
                                className="absolute bg-gray-700 text-gray-50 text-xs rounded-lg px-3 py-2 shadow-lg"
                                style={{
                                    top: tooltip.position.y + 10, // Tooltip leggermente sotto il mouse
                                    left: tooltip.position.x + 10,
                                    zIndex: 1000,
                                }}
                            >
                                {tooltip.content}
                            </div>
                        )}
                    </div>
                </section>
            </section>
        </>
    )
}