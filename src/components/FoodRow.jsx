import { memo } from "react"
import { Link } from "react-router-dom"
function FoodRow({ data, checked, onToggle }) {

    const { title, category, id } = data

    return (
        <tr className="not-last:border-b border-blue-300 hover:bg-gray-100">
            <td className="py-2 px-4 hover:underline hover:text-blue-400">
                <div className="flex gap-5 items-center">
                    <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
                    <Link to={`/food/${id}`}>{title}</Link>
                </div>
            </td>
            <td className="py-2 px-4">{category}</td>
        </tr>
    )
}

export default memo(FoodRow)