// este arquivo esta mostrando a distribuiçao de atendimento quando o saldo é positivo
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FaArrowTrendUp, FaRegLightbulb } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useFinanceStore } from "../../Store/FinanceStore";

export default function CardPositive() {

  const getTotals = useFinanceStore(state => state.getTotals)
  const getDistribuition = useFinanceStore(state => state.getDistribuition)

  const { balance } = getTotals()
  const {emergency, education, invest, costs, leisure} = getDistribuition()

    const formatCurrency = (valeu: number) => 
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valeu)


  return (
    <div>
      <Card className="bg-slate-900 border-slate-600 ">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-2xl border px-1.5 py-1.5 rounded-lg bg-green-950 text-emerald-600 border-emerald-600">
              <FaRegLightbulb />
            </div>

            <section>
              <CardTitle className="text-xl font-sans font-bold text-white">
                Dicas para o seu dinheiro
              </CardTitle>
              <CardDescription className="text-md font-sans font-medium text-gray-300">
                Você tem <span><strong>{formatCurrency(balance)}</strong></span> para distribuir
              </CardDescription>
            </section>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-3">
              <section className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-1 border rounded-lg bg-green-950 text-emerald-600 border-emerald-600 p-1">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                </span>
                <p className="text-base font-medium text-gray-300 mt-1">
                  Parabêns! Você mantem um bom controle dos gastos fixos.
                  Continue assim!
                </p>
              </section>
              <section className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-1 border rounded-lg bg-green-950 text-emerald-600 border-emerald-600 p-1">
                  <IoMdCheckmarkCircleOutline className="text-green-600" />
                </span>
                <p className="text-base font-medium text-gray-300 mt-1">
                  Use a distribuição sugerida abaixo para otimizar cada real do
                  seu saldo restante.
                </p>
              </section>
            </div>

            {/* INFORMAÇOES DE COMO DISTRIBUIR O MONEY */}
            <div className="mt-6">
              <section className="flex items-center gap-2">
                <div>
                  <FaArrowTrendUp className="text-green-800 text-xl" />
                </div>
                <h1 className="text-base font-medium text-gray-300"> Distribuição sugerida do saldo</h1>
              </section>
            </div>

            {/* Reserva de Emergencia */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-white">
                  Reserva de Emergencia
                </h3>
                <div className="flex gap-3">
                  <span className="font-semibold text-white text-lg">{formatCurrency(emergency)}</span>
                  <span className="text-gray-200 border border-gray-100 rounded-lg px-1.5">
                    30,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full w-[30%]" />
              </div>

              <p className="text-sm text-gray-300 font-semibold">
                Guarde para imprevistos e segurança financeira
              </p>
            </div>

            {/* Investimentos */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-white">Investimentos</h3>
                <div className="flex gap-3">
                  <span className="font-semibold text-white text-lg">{formatCurrency(invest)}</span>
                  <span className="text-gray-200 border border-gray-100 rounded-lg px-1.5">
                    20,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full w-[20%]" />
              </div>

              <p className="text-sm text-gray-300 font-semibold">
                Faca seu dinheiro trabalhar para voce
              </p>
            </div>

            {/* Lazer e Bem-estar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-white">Lazer e Bem-estar</h3>
                <div className="flex gap-3">
                  <span className="font-semibold text-white text-lg">{formatCurrency(leisure)}</span>
                  <span className="text-gray-200 border border-gray-100 rounded-lg px-1.5">
                    20,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full w-[20%]" />
              </div>

              <p className="text-sm text-gray-300 font-semibold">
                Cuide de voce, saia, divirta-se
              </p>
            </div>

            {/* Educacao e Desenvolvimento */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-white">
                  Educacao e Desenvolvimento
                </h3>
                <div className="flex gap-3">
                  <span className="font-semibold text-white text-lg">{formatCurrency(education)}</span>
                  <span className="text-gray-200 border border-gray-100 rounded-lg px-1.5">
                    15,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full w-[15%]" />
              </div>

              <p className="text-sm text-gray-300 font-semibold">
                Cursos, livros e habilidades novas
              </p>
            </div>

            {/* Gastos Pessoais */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-white">Gastos Pessoais</h3>
                <div className="flex gap-3">
                  <span className="font-semibold text-white text-lg">{formatCurrency(costs)}</span>
                  <span className="text-gray-200 border border-gray-100 rounded-lg px-1.5">
                    15,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-red-500 rounded-full w-[15%]" />
              </div>

              <p className="text-sm text-gray-300 font-semibold">
                Compras e necessidades do dia a dia
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
