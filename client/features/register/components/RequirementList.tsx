import { hasLength, hasMixedCase, hasNumber, hasSymbol } from "../utils/validateInput";

function RequirementList({password}: {password: string}) {
    const Requirements = [
        {
            label: "at least one number",
            met: hasNumber(password),
        },
        {
            label: "at least one lowercase and uppercase",
            met: hasMixedCase(password),
        },
        {
            label: "at least 8 characters",
            met: hasLength(password),
        },
        {  
            label: "at least one symbol",
            met: hasSymbol(password),
        },
    ]


    return (
        <div>    
            {Requirements.map((req, index) => (
                <p
                key={index}
                className={`text-sm ${req.met ? "text-green-500" : "text-red-500"}`}
                >
                {req.met ? "✔" : "✖"} {req.label}
                </p>
            ))}
        </div>
    
    );
}

export default RequirementList;
