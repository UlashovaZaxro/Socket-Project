import { Dispatch, SetStateAction } from "react";
import PasswordInput from "./PasswordInput";
import RequirementList from "./RequirementList";
import StrengthIndicator from "./StrengthIndicator";
import { evalPasswordStrengh } from "../helpers/evaluatePasswordStrength";

type PasswordCheckerPropsType = {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    };

    function PasswordChecker({ password, setPassword }: PasswordCheckerPropsType) {
    const strength = evalPasswordStrengh(password);

    return (
        <div className="flex flex-col gap-2">
        <PasswordInput password={password} setPassword={setPassword} />
        <StrengthIndicator strength={strength} />
        <RequirementList password={password}/>
        </div>
    );
}

export default PasswordChecker;
