import { memo } from "react";
import broccoliFull from "../assets/broccoli-full.svg";
import broccoliEmpty from "../assets/broccoli-empty.svg";

function HealthRate({ rate = 0 }) {
    const icons = Array.from({ length: 5 }, (_, i) => (i < rate ? broccoliFull : broccoliEmpty));

    return (
        <div className="flex gap-1 opacity-50">
            {icons.map((icon, index) => (
                <img className="h-7 w-7" key={index} src={icon} alt="health icon" />
            ))}
        </div>
    );
}

export default memo(HealthRate);
