import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { LuWallet } from "react-icons/lu";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";


export default function SummaryCard() {
  return (
    <div className="mx-44 pt-6">
      <div className="grid grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-xl">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex items-center gap-4">
              {/* Ícone */}
              <div className="p-3 text-green-700 bg-green-200 rounded-lg text-2xl">
                <LuWallet size={18} />
              </div>
              {/* Textos */}
              <div>
                <CardTitle className="text-xl text-zinc-500 font-sans font-medium">
                  Renda Total
                </CardTitle>
                <h1 className="text-2xl font-bold font-sans">R$ 00,00</h1>
                <CardDescription className="text-lg text-zinc-500 font-sans font-medium">
                  Soma de todas as fontes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="rounded-xl shadow-xl">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex items-center gap-4">
              {/* Ícone */}
              <div className="p-3 text-red-700 bg-red-200 rounded-lg text-2xl">
                <FaArrowTrendDown size={18} />
              </div>
              {/* Textos */}
              <div>
                <CardTitle className="text-xl text-zinc-500 font-sans font-medium">
                  Total de Despesas
                </CardTitle>
                <h1 className="text-2xl font-bold font-sans">R$ 00,00</h1>
                <CardDescription className="text-lg text-zinc-500 font-sans font-medium">
                  0.0% da renda
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="rounded-xl shadow-xl">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex items-center gap-4">
              {/* Ícone */}
              <div className="p-3 text-green-700 bg-green-200 rounded-lg text-2xl">
                <FaArrowTrendUp size={18} />
              </div>
              {/* Textos */}
              <div>
                <CardTitle className="text-xl text-zinc-500 font-sans font-medium">
                  Saldo Restante
                </CardTitle>
                <h1 className="text-2xl font-bold font-sans">R$: 00,00</h1>
                <CardDescription className="text-lg text-zinc-500 font-sans font-medium">
                  Disponivel para uso
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
