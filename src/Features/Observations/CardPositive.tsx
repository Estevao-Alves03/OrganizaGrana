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

export default function CardPositive() {
  return (
    <div>
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-2xl border px-1.5 py-1.5 rounded-lg text-green-700 bg-green-100">
              <FaRegLightbulb />
            </div>

            <section>
              <CardTitle className="text-xl font-sans font-bold">
                Dicas para o seu dinheiro
              </CardTitle>
              <CardDescription className="text-md font-sans font-medium text-gray-500">
                Você tem <span><strong>R$ 0,00</strong></span> para distribuir
              </CardDescription>
            </section>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-3">
              <section className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-1 border rounded-lg bg-green-200 p-0.5">
                  <IoMdCheckmarkCircleOutline className="text-green-700" />
                </span>
                <p className="text-base font-medium text-gray-500 mt-1">
                  Parabêns! Voce mantem um bom controle dos gastos fixos.
                  Continue assim!
                </p>
              </section>
              <section className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-1 border rounded-lg bg-green-200 p-0.5">
                  <IoMdCheckmarkCircleOutline className="text-green-700" />
                </span>
                <p className="text-base font-medium text-gray-500 mt-1">
                  Use a distribuicao sugerida abaixo para otimizar cada real do
                  seu saldo restante.
                </p>
              </section>
            </div>

            {/* INFORMAÇOES DE COMO DISTRIBUIR O MONEY */}
            <div className="mt-6">
              <section className="flex items-center gap-2">
                <div>
                  <FaArrowTrendUp className="text-green-700 text-xl" />
                </div>
                <h1 className="text-base font-medium text-gray-500"> Distribuicao sugerida do saldo</h1>
              </section>
            </div>

            {/* Reserva de Emergencia */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">
                  Reserva de Emergencia
                </h3>
                <div className="flex gap-3">
                  <span className="font-semibold">R$ 93,60</span>
                  <span className="text-gray-500 border border-gray-300 rounded-lg px-1">
                    30,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full w-[30%]" />
              </div>

              <p className="text-sm text-gray-500 font-medium">
                Guarde para imprevistos e segurança financeira
              </p>
            </div>

            {/* Investimentos */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Investimentos</h3>
                <div className="flex gap-3">
                  <span className="font-semibold">R$ 62,40</span>
                  <span className="text-gray-500 border border-gray-300 rounded-lg px-1">
                    20,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full w-[20%]" />
              </div>

              <p className="text-sm text-gray-500 font-medium">
                Faca seu dinheiro trabalhar para voce
              </p>
            </div>

            {/* Lazer e Bem-estar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Lazer e Bem-estar</h3>
                <div className="flex gap-3">
                  <span className="font-semibold">R$ 62,40</span>
                  <span className="text-gray-500 border border-gray-300 rounded-lg px-1">
                    20,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full w-[20%]" />
              </div>

              <p className="text-sm text-gray-500 font-medium">
                Cuide de voce, saia, divirta-se
              </p>
            </div>

            {/* Educacao e Desenvolvimento */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">
                  Educacao e Desenvolvimento
                </h3>
                <div className="flex gap-3">
                  <span className="font-semibold">R$ 46,80</span>
                  <span className="text-gray-500 border border-gray-300 rounded-lg px-1">
                    15,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full w-[15%]" />
              </div>

              <p className="text-sm text-gray-500 font-medium">
                Cursos, livros e habilidades novas
              </p>
            </div>

            {/* Gastos Pessoais */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Gastos Pessoais</h3>
                <div className="flex gap-3">
                  <span className="font-semibold">R$ 46,80</span>
                  <span className="text-gray-500 border border-gray-300 rounded-lg px-1">
                    15,0%
                  </span>
                </div>
              </div>

              {/* BARRA VAZIA - apenas visual */}
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-red-500 rounded-full w-[15%]" />
              </div>

              <p className="text-sm text-gray-500 font-medium">
                Compras e necessidades do dia a dia
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
