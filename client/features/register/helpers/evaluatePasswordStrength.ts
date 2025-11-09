import { hasLength, hasMixedCase, hasNumber, hasSymbol } from "../utils/validateInput"


export type evalPasswordStrenghReturn = "weak" | "medium" | "strong"

export const evalPasswordStrengh = (password: string): evalPasswordStrenghReturn => {
    const strength = [hasNumber(password), hasMixedCase(password), hasLength(password), hasSymbol(password)]
    
    const trueValues = strength.filter(s => s === true)

    if(trueValues.length <= 1) return 'weak'
    if(trueValues.length <= 3) return "medium"
    return 'strong'
}