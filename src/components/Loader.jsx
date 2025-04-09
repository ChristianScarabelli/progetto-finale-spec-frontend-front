import { createPortal } from "react-dom"

export default function Loader() {
    return createPortal( // Con Portal appendo il loader al body, renderizzandolo sopra a tutto il resto
        <section className="fixed top-0 left-0 w-screen h-screen bg-green-100 bg-opacity-30 z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-36 w-36 border-t-4 border-b-4 border-cyan-600">
            </div>
        </section>,
        document.body
    )
}