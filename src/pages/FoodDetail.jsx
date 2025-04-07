import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import GlobalContext from '../contexts/GlobalContext.jsx';
import Loader from "../components/Loader.jsx";

export default function FoodDetail() {
    // Ottengo l'id dal URL
    const { id } = useParams();

    const { foodDetail, fetchFoodDetail, isLoading } = useContext(GlobalContext);

    // Rifaccio il fetch per id ad ogni cambio id
    useEffect(() => {
        fetchFoodDetail(id)
        window.scrollTo(0, 0)
    }, [id])

    if (isLoading) {
        return <Loader />
    }
    console.log(foodDetail)

    return (
        <section className="mx-auto p-4 pt-[82px] pb-10 bg-green-200">
            {foodDetail ? (
                <div className="flex flex-col gap-3 text-gray-800 bg-gray-50 shadow-lg p-5 rounded-lg mt-10">
                    <h2 className="">
                        <strong>Name:</strong> {foodDetail.title}
                    </h2>
                    <p>
                        <strong>Description:</strong> {foodDetail.description}
                    </p>
                    <span>
                        <strong>Category:</strong> {foodDetail.category}
                    </span>
                    <figure>
                        <img
                            src={foodDetail.image}
                            alt={foodDetail.title}
                            className="rounded-lg"
                        />
                    </figure>
                    <span>
                        <strong>Health Rate:</strong> {foodDetail.healthRate}
                    </span>
                </div>
            ) : (
                <div className="flex flex-col gap-3 text-gray-800 bg-gray-50 shadow-lg p-5 mt-[92px] rounded-lg">
                    <h2>Food not found</h2>
                </div>
            )}
        </section>
    );
}