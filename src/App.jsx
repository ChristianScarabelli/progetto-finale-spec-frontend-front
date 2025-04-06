import { BrowserRouter, Route, Routes } from "react-router-dom"
// Layout
import DefaultLayout from "./layout/DefaultLayout"
import BlankLayout from "./layout/BlankLayout"
// Pages
import NotFound from "./pages/NotFound"
import HomePage from "./pages/HomePage.jsx"
import FoodList from "./pages/FoodList"
import FoodDetail from './pages/FoodDetail.jsx'

// Context
import { GlobalProvider } from "./contexts/GlobalContext"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* DefaultLayout per la home e le altre pagine principali */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/foods" element={<FoodList />} />
            <Route path="/foods/:id" element={<FoodDetail />} />
          </Route>
          {/* BlankLayout per pagina 404 */}
          <Route element={<BlankLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
