import Card from './Card.jsx'

export default function CompareSidebar({ isOpen, onClose, selectedFoods, toggleSelection }) {
    return (
        <div
            className={`fixed z-50 bottom-0 left-0 w-full bg-gray-50 shadow-lg transform ${isOpen ? 'translate-y-0' : 'translate-y-full'
                } transition-transform duration-300`}
        >
            <div className="flex justify-between items-center p-4 bg-green-800">
                <h2 className="text-xl font-semibold text-gray-50">Compare Foods</h2>
                <button
                    onClick={onClose}
                    className="text-gray-50 hover:text-cyan-600 cursor-pointer transition"
                >
                    ✕
                </button>
            </div>
            <div className="p-4 flex gap-4 overflow-x-auto whitespace-nowrap flex-nowrap">
                {selectedFoods.length > 0 ? (
                    selectedFoods.map((food) => (
                        <Card
                            key={food.id}
                            food={food}
                            onRemove={() => toggleSelection(food.id)}
                            variant="compare" // Specifico la variante di card
                        />
                    ))
                ) : (
                    <p className="text-gray-600">No foods selected for comparison.</p>
                )}
            </div>
        </div>
    );
}