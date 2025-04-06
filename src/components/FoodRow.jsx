import { memo } from "react"
import { Link } from "react-router-dom"
function FoodRow({ data, checked, onToggle }) {

    const { title, category, id } = data

    console.log("Dati ricevuti in FoodRow:", data); // Debug


    return (
        <tr className="not-last:border-b border-green-600 hover:bg-green-100">
            <td className="py-2 px-4 hover:underline hover:text-blue-400">
                <div className="flex gap-5 items-center">
                    <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
                    <Link to={`/foods/${id}`}>{title}</Link>
                </div>
            </td>
            <td className="py-2 px-4 text-sm text-gray-500">{category}</td>
        </tr>
    )
}

export default memo(FoodRow)