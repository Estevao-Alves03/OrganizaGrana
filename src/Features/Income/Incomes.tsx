// CARD EXTERNO PRINCIPAL QUE FALA SOBRE AS RENDAS. O FORMULÁRIO E A LISTAGEM DAS RENDAS 
// ESTÃO EM OUTROS DOIS ARQUIVOS


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { PiCurrencyDollar } from "react-icons/pi";
import IncomeForm from "./IncomeForm";

export default function Incomes() {
  return (
    <div className="">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 text-green-700 bg-green-200 rounded-lg text-2xl">
              <PiCurrencyDollar size={18} />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Suas Rendas</CardTitle>
              <CardDescription className="text-lg text-zinc-500 font-sans font-medium">
                Adicione suas fontes de renda do mês
              </CardDescription>
              {/* Total: R$ 00,00 de x fonte */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <IncomeForm/>
        </CardContent>
      </Card>
    </div>
  );
}
