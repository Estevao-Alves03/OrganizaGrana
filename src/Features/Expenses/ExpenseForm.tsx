// arquivo que adiciona e mostra as rendas atuais do mẽs - este arquivo esta dentro de expense section

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoAddOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export default function ExpenseForm() {
  return (
    <div>
      <Card className="bg-zinc-50 hover:bg-zinc-100 shadow-md">
        <div className="flex items-center justify-between m-4">
          <section className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-600" />
            <h2 className="font-bold font-sans text-lg">Salario</h2>
          </section>
          <section className="flex items-center gap-4 mr-4">
            <span className="font-bold text-lg hover:text-green-600 cursor-pointer transition-all duration-300">R$ 2.500,00</span>
            <button className="group p-2 hover:bg-red-500 rounded-lg border">
              <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white"/>
            </button>
          </section>
        </div>
      </Card>

      <Card className="border border-dashed border-zinc-300 mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-sans">
            Adicionar fonte de renda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex items-center gap-4">
            <section>
              <input
                type="text"
                placeholder="Ex: Salário, Freelance, Aluguel..."
                className="border border-zinc-300 rounded-lg px-4 py-2 text-left w-[530px] placeholder:text-gray-400 texl-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </section>
            <section className="relative w-[180px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                R$
              </span>
              <input
                type="number"
                placeholder="00,00"
                className="appearance-none border border-zinc-300 rounded-lg px-12 py-2 w-full placeholder:text-gray-400 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-400 no-spin"
              />
            </section>
            <Button className="bg-green-700 hover:bg-green-800">
              <IoAddOutline />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
