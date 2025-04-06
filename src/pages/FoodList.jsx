import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import GlobalContext from '../contexts/GlobalContext.jsx'
import FoodRow from '../components/FoodRow.jsx'


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

    const { food, fetchFood } = useContext(GlobalContext)
    // Stato per criterio/colonna di ordinamento
    const [sortBy, setSortBy] = useState('createdAt')
    // Stato per la direzione di ordinamento
    const [sortOrder, setSortOrder] = useState(1)
    // Stato per la ricerca
    const [searchQuery, setSearchQuery] = useState('')
    // Stato per memorizzare le task selezionate
    const [selectedFoodIds, setSelectedFoodIds] = useState([])
    // const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        fetchFood()
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

    // Funzione per la logica di ordinamento e filtraggio
    const foodSort = useMemo(() => {
        if (!food) return []

        // Food filtrate secondo la query di riferimento
        const filteredFood = food.filter(food =>
            food.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        // Food filtrate da ordinare
        const sortedFood = [...filteredFood]

        sortedFood.sort((a, b) => {
            if (sortBy === 'title') {       // Se la colonna di riferimento è 'title, ordine alfabetico secondo la direzione
                return a.title.localeCompare(b.title) * sortOrder
            } else if (sortBy === 'category') {
                return a.category.localeCompare(b.category) * sortOrder
            }
            return 0    // Se il campo/nome della colonna da ordinare non è nessuno, lascio l'ordine invariato
        })
        return sortedFood   // Ritorno Food ordinato
    }, [food, sortBy, sortOrder, searchQuery])

    // Funzione per la ricerca con debounce
    const handleDebouncedSearch = useCallback(
        debounce(setSearchQuery, 500)
        , [])

    // Funzione per la selezione di task
    const toggleSelection = (foodId) => {
        setSelectedFoodIds(prev => {
            if (prev.includes(foodId)) {
                return prev.filter(id => id !== foodId)
            } else {
                return [...prev, foodId]
            }
        })
    }

    return (
        <section className=" pt-[82px] p-5 bg-green-200">
            <h1 className='text-5xl text-green-800 py-5'>Food List</h1>
            <p className="text-gray-700 mb-5">Here's the complete list of Vegan food! Search your favourite, sort them and add them to your wish list! </p>
            <div className='my-5 pt-10 p-5 text-center'>
                <input
                    type="text"
                    className='text-gray-800 bg-gray-50 rounded-xl px-5 py-3 w-2/3'
                    placeholder='Search food for name...'
                    onChange={(e) => handleDebouncedSearch(e.target.value)}
                />
            </div>
            <section className='container mx-auto'>
                <div className='flex justify-end max-w-4xl mx-auto pb-5'>
                    <select
                        className='text-gray-800 bg-gray-50 rounded-lg px-3 py-2'
                        name=""
                        id=""
                    >
                        <option value="">Filter by Category...</option>
                        <option value="category"></option>
                        {/* fare un map delle categorie */}
                    </select>
                </div>
                <div className="overflow-x-auto mt-10">
                    <table className="bg-gray-200 max-w-4xl mx-auto w-full shadow-md rounded-lg overflow-hidden text-gray-800 mb-10">
                        <thead className="bg-gray-800 text-gray-300 ">
                            <tr>
                                <th onClick={() => handleSort('title')} className="py-2 px-4 text-left cursor-pointer hover:bg-gray-700">
                                    <div className="flex justify-between items-center">
                                        Title
                                        {sortBy === 'title' && (sortOrder === 1 ? chevronDown : chevronUp)}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('category')} className="py-2 px-4 text-left cursor-pointer hover:bg-gray-700">
                                    <div className="flex justify-between items-center">
                                        Category
                                        {sortBy === 'category' && (sortOrder === 1 ? chevronDown : chevronUp)}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodSort &&
                                foodSort.map((food) => {
                                    return <FoodRow
                                        key={food.id}
                                        data={food}
                                        checked={selectedFoodIds.includes(food.id)}
                                        onToggle={toggleSelection} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    )
}