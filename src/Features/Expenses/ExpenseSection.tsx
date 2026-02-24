// Card principal (parte externa do card "suas rendas") - vinculado ao expense form

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { PiCurrencyDollar } from "react-icons/pi";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseSection() {
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
              <CardDescription className="text-lg text-zinc-500 font-sans">
                Adicione suas fontes de renda do mês
              </CardDescription>
              {/* Total: R$ 00,00 de x fonte */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ExpenseForm/>
        </CardContent>
      </Card>
    </div>
  );
}
