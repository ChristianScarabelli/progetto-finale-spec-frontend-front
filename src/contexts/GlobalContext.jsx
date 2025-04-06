import { createContext } from "react";
import useFood from '../customHooks/useFood.jsx';

const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    // Variabile che contiene tutto il return di useFood()
    const foodData = useFood()

    return (
        <GlobalContext.Provider value={{ ...foodData }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext

