import { text } from "stream/consumers";
import { evalPasswordStrenghReturn } from "../helpers/evaluatePasswordStrength";

function StrengthIndicator({
    strength,
    }: {
    strength: "weak" | "medium" | "strong";
    }) {
    const color = {
        weak: "bg-red-500",
        medium: "bg-yellow-500",
        strong: "bg-green-500",
    };
        
    const textColor = {
        weak: "text-red-500",
        medium: "text-yellow-500",
        strong: "text-green-500",
    };

    const size = {
        weak: "30%",
        medium: "60%",
        strong: "100%",
    };
    return (
        <div className="mt-3">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
            className={`h-full  ${color[strength]} `}
            style={{ width: size[strength] }}
            ></div>
        </div>
        <p className={`text-sm ${textColor[strength]} mt-1`}>{strength}</p>
        </div>
    );
}

export default StrengthIndicator;
