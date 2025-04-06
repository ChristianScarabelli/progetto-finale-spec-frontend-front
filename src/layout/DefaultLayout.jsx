import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"


export default function DefaultLayout() {
    return (
        <main className="min-h-screen flex flex-col relative bg-gray-50">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}
