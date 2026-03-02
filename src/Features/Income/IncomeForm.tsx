import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoAddOutline } from "react-icons/io5";
import IncomeList from "./IncomeList";
import type { Incomes } from "../../Types/Incomes";
import { IncomesMock } from "../../Mocks/IncomesExamples";

export default function IncomeForm() {
  // estado local do formulário
  const [incomes, setIncomes] = useState<Incomes[]>(IncomesMock);

  function handleAddIncome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nameIncome = formData.get("nameIncome") as string;
    const priceIncome = Number(formData.get("price") as string);

    if (!nameIncome || !priceIncome) return; // validação simples

    const newIncome: Incomes = {
      id: incomes.length + 1, // mock ID
      nameIncome,
      priceIncome,
    };

    setIncomes([...incomes, newIncome]); // atualiza o estado
    e.currentTarget.reset(); // limpa formulário
  }

  return (
    <div>
      {/* Listagem das rendas */}
      <IncomeList incomes={incomes} />

      {/* Card do formulário */}
      <Card className="border border-dashed border-zinc-300 mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-sans">
            Adicionar fonte de renda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex items-center gap-4 w-full" onSubmit={handleAddIncome}>
            <section className="flex-1">
              <input
                type="text"
                name="nameIncome"
                placeholder="Ex: Salário, Freelance, Aluguel..."
                className="w-full border border-zinc-300 rounded-lg px-4 py-2 text-left 
                  placeholder:text-gray-400 text-lg font-bold
                  focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </section>

            <section className="relative w-40 shrink-0">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                R$
              </span>

              <input
                type="number"
                name="price"
                placeholder="00,00"
                className="appearance-none border border-zinc-300 rounded-lg 
                  pl-12 pr-4 py-2 w-full
                  placeholder:text-gray-400 text-lg font-bold
                  focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </section>

            <Button type="submit" className="bg-green-700 hover:bg-green-800 shrink-0">
              <IoAddOutline/>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}