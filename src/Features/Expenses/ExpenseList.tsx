// arquivo que serve para listar todas as despensas do mês (importando o arquivo add expenses)
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoAddOutline } from "react-icons/io5";
import { GoTag } from "react-icons/go";
import { useState } from "react";
import AddExpenses from "./AddExpenses";
import { FaTrash } from "react-icons/fa6";

export default function ExpenseList() {
  const [showCard, setShowCard] = useState(false);

  const isOpenCard = () => {
    setShowCard(true);
  };

  const onCloseCard = () => {
    setShowCard(false);
  };

  return (
    <div className="mt-6">
      <Card className="px-3 pb-6 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <section>
              <CardTitle className="text-xl font-bold">
                Depesas do mês
              </CardTitle>
              <CardDescription className="text-lg font-sans text-zinc-500">
                {/* Nenhuma despesa cadatrada nesse mẽs */}
              3 depesas - Os valores podem mudar todo mes
              </CardDescription>
            </section>
            <section>
              <Button
                onClick={isOpenCard}
                className="px-4 py-6 text-lg bg-green-700 hover:bg-green-800"
              >
                <IoAddOutline />
                Nova despesa
              </Button>
            </section>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mt-9 text-center px-4">
          {/* <span className="bg-zinc-200 rounded-xl p-5 mb-4 inline-block">
            <GoTag className="text-4xl text-gray-600" />
          </span>
          <div className="space-y-1">
            <h1 className="font-medium text-gray-800">
              Sem despesas neste mês
            </h1>
            <p className="text-md text-gray-500 max-w-[300px]">
              Adicione uma despesa nova ou copie do mes anterior
            </p>
          </div> */}
          <div className="w-full grid grid-rows gap-3">
            <Card className="bg-zinc-50 hover:bg-zinc-100 shadow-md w-full">
            <div className="flex items-center justify-between p-4">
              <section className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gray-600" />
                <h2 className="font-bold text-lg">Cartão</h2>
              </section>

              <section className="flex items-center gap-4">
                <span className="font-bold text-lg hover:text-green-600 cursor-pointer transition-all duration-300">
                  R$ 1.000,00
                </span>

                <button className="group p-2 hover:bg-red-500 rounded-lg border">
                  <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white" />
                </button>
              </section>
            </div>
          </Card>
          <Card className="bg-zinc-50 hover:bg-zinc-100 shadow-md w-full">
            <div className="flex items-center justify-between p-4">
              <section className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                <h2 className="font-bold text-lg">Plano de saude</h2>
              </section>

              <section className="flex items-center gap-4">
                <span className="font-bold text-lg hover:text-green-600 cursor-pointer transition-all duration-300">
                  R$ 300,00
                </span>

                <button className="group p-2 hover:bg-red-500 rounded-lg border">
                  <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white" />
                </button>
              </section>
            </div>
          </Card>
          <Card className="bg-zinc-50 hover:bg-zinc-100 shadow-md w-full">
            <div className="flex items-center justify-between p-4">
              <section className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-600" />
                <h2 className="font-bold text-lg">Faculdade</h2>
              </section>

              <section className="flex items-center gap-4">
                <span className="font-bold text-lg hover:text-green-600 cursor-pointer transition-all duration-300">
                  R$ 300,00
                </span>

                <button className="group p-2 hover:bg-red-500 rounded-lg border">
                  <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white" />
                </button>
              </section>
            </div>
          </Card>
          </div>
        </CardContent>
        {showCard && <AddExpenses onCloseCard={onCloseCard} />}
      </Card>
    </div>
  );
}
