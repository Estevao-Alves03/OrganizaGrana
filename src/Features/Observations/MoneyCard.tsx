import CardEmpty from "./CardEmpty"
import CardPositive from "./CardPositive"
import CardNegative from "./CardNegative"

interface MoneyCardProps {
    remaining?: number;
}

export default function MoneyCard( {remaining} : MoneyCardProps) {
    // card neutro
    if(remaining === undefined || remaining === 0) {
        return <CardEmpty/>
    }

    if(remaining > 0){
        return (
            <CardPositive/>
        )
    }

    return <CardNegative/>
}
