import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <section className="pt-[82px]">
            <div className="bg-gray-50 p-8">
                <h1 className="text-5xl text-green-800 py-5">Discover Vegan food!</h1>
                <p className="text-gray-700 mb-5">Discover a world of delicious and nutritious vegan food. With VeganBites, you can easily search for plant-based recipes, explore ingredients, and analyze nutritional values to make informed choices.
                    Whether you're a seasoned vegan or just curious, our platform helps you find the perfect meal tailored to your taste and health goals. Dive into a world of fresh, wholesome flavors – because eating well should be simple and exciting!
                    Start exploring now and fuel your body with the best plant-powered options!
                </p>
                <div className="my-10 text-center">
                    <Link
                        to="/foods"
                        className="bg-green-600 text-gray-50 px-15 py-3 rounded-xl hover:bg-cyan-600 transition inline-flex items-center gap-2"
                    >
                        <span>Click here to search Food!</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 pb-5 p-5 bg-green-200">
                <div className="flex-1 p-3">
                    <h2 className="text-2xl font-bold mb-5 text-green-800">Vegan Nutrition</h2>
                    <p className='text-gray-700'>
                        All this said, there’s no clear evidence that vegans live longer than omnivores. But lifespan should not be confused with quality of life. You can probably move towards a vegan diet that is substantially more nutrient-rich than your current diet. But you should follow expert advice for any major dietary change.
                        The best place to start is by reading our vegan nutrition guide, written by Virginia Messina MPH, RD. Messina is arguably the top expert in the field of vegan nutrition. She has cowritten or reviewed several of the Academy of Nutrition and Dietetics’ landmark reviews assessing the healthfulness of vegetarian and vegan diets.
                    </p>
                </div>
                <figure className="flex-1 p-3">
                    <img className="w-[50vw] h-[50vh] aspect-square object-cover rounded-lg" src="https://images.unsplash.com/photo-1601039641847-7857b994d704?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZvY2Fkb3xlbnwwfHwwfHx8MA%3D%3D" alt="Vegan Nutrition" />
                </figure>
            </div>
            <div className="flex items-center justify-between gap-5 pb-5 p-5 bg-gray-50">
                <figure className="flex-1 p-3">
                    <img className="w-[50vw] h-[50vh] aspect-square object-cover rounded-lg" src="https://images.unsplash.com/photo-1580910365203-91ea9115a319?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3BpbmFjaXxlbnwwfHwwfHx8MA%3D%3D" alt="Vegan Diet" />
                </figure>
                <div className="flex-1 p-3">
                    <h2 className="text-2xl font-bold mb-5 text-green-800">Is a Vegan Diet Healthy?</h2>
                    <p className='text-gray-700'>
                        When it comes to nutrition, a well-planned vegan diet offers substantial health advantages.
                        That said, every sort of diet has proponents exaggerating its benefits. No matter what type of diet you consider, you’ll find stacks of books promoting it as the best way to eat. If you want to be told that a vegan diet will make you live forever, you’ll find no shortage of so-called experts telling you exactly what you want to hear. But that doesn’t make it true.
                        Ditto for movies. “What the Health,” is among the most popular films suggesting a vegan is the healthiest way to eat. Unfortunately, the movie is brimming with false and misleading claims. Integrity matters, and at Vegan.com we seek to make the case for veganism without resorting to specious claims.
                        That said, a well-planned vegan diet indeed offers compelling advantages. So let’s run through some of the strongest health benefits associated with plant-based and vegan diets.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 pb-5 p-5 bg-green-200">
                <div className="flex-1 p-3">
                    <h2 className="text-2xl font-bold mb-5 text-green-800">Potential health benefits of being vegan</h2>
                    <p className='text-gray-700'>
                        A nuanced grasp of the diet’s connection to health can only come from years of graduate-level study. Moreover, nutrition is a young science and we don’t yet have definitive answers to many key questions. But let’s boil down to just a few paragraphs what we do know about the health benefits of going vegan.
                        In developed countries, heart disease and cancer are the two top causes of death. Let’s look at how each relates to diet.
                        .</p>
                </div>
                <figure className="flex-1 p-3">
                    <img className="w-[50vw] h-[50vh] aspect-square object-cover rounded-lg" src="https://plus.unsplash.com/premium_photo-1675237625091-e40de414b510?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFnaW9saSUyMG5lcml8ZW58MHx8MHx8fDA%3D" alt="Vegan Benefits" />
                </figure>
            </div>
        </section>
    )
}