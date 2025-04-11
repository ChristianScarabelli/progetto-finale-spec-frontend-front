import { NavLink } from "react-router-dom";
import { useState, useCallback } from "react";
import logo from '../assets/broccolo.svg';
import Sidebar from './Sidebar';

export default function NavBar({ favorites = [] }) { // Aggiunto valore predefinito per evitare undefined

    // Stato per l'apertura della sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Memorizza le funzioni per aprire e chiudere la sidebar
    const handleSidebarOpen = useCallback(() => setIsSidebarOpen(true), []);
    const handleSidebarClose = useCallback(() => setIsSidebarOpen(false), []);

    return (
        <section className="fixed top-0 left-0 w-full">
            <nav className="flex items-center justify-between px-5 py-4 bg-gray-50 transition-colors duration-300 border-y-1 border-green-200">
                {/* Logo */}
                <figure>
                    <img src={logo} alt="Logo" style={{ height: '50px' }} />
                </figure>
                {/* Links */}
                <div className="flex gap-5 flex-grow justify-center">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'text-gray-600 hover:text-cyan-600 border-b-2'
                                : 'text-green-600 hover:text-cyan-600'
                        }
                        to='/'
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'text-gray-600 hover:text-cyan-600 border-b-2'
                                : 'text-green-600 hover:text-cyan-600'
                        }
                        to='/foods'
                    >
                        Food list
                    </NavLink>
                </div>

                {/* Heart Icon */}
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-gray-600 hover:text-cyan-600 transition-colors duration-300 cursor-pointer"
                        onClick={handleSidebarOpen}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                </div>
            </nav>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleSidebarClose}
                favoriteFoods={favorites} // Passo favorites come prop
            />
        </section>
    );
}