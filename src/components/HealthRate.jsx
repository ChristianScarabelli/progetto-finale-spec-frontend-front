import { memo } from "react";
import broccoliFull from "../assets/broccoli-full.svg";
import broccoliEmpty from "../assets/broccoli-empty.svg";

function HealthRate({ rate = 0 }) {
    const icons = Array.from({ length: 5 }, (_, i) => (i < rate ? broccoliFull : broccoliEmpty));

    return (
        <div className="opacity-60">
            {icons.map((icon, index) => (
                <img key={index} src={icon} alt="health icon" />
            ))}
        </div>
    );
}

export default memo(HealthRate);
