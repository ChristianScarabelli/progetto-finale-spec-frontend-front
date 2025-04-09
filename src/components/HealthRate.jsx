import { memo } from "react";
// Icone
import broccoliFull from "../assets/broccoli-full.svg";
import broccoliEmpty from "../assets/broccoli-empty.svg";

function HealthRate({ rate = 0 }) {

    // Creo un array di 5 elementi contenenti l'icona 'full' se i è inferiore a "rate", altrimenti l'icona 'empty' (Es. rate = 3, 3 full + 2 empty)
    const icons = Array.from({ length: 5 }, (_, i) => (i < rate ? broccoliFull : broccoliEmpty));
    // _ è l'elemento corrennte, vuoto perchè riempio dopo con le icone

    return (
        <div className="flex gap-1 opacity-50">
            {icons.map((icon, index) => (
                <img className="h-7 w-7" key={index} src={icon} alt="health icon" />
            ))}
        </div>
    );
}

export default memo(HealthRate) // Con memo evito il re-render se le props non cambiano
