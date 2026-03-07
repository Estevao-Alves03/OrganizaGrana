import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoAddOutline } from "react-icons/io5";
import IncomeList from "./IncomeList";
import { useFinanceStore } from "../../Store/FinanceStore";

export default function IncomeForm() {
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  function handleAddIncome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const nameIncome = formData.get("nameIncome") as string;
    const rawValue = formData.get("price") as string;
    const priceIncome = Number(rawValue.replace(",", "."));

    if (!nameIncome || !priceIncome) return;
    addTransaction({
      id: crypto.randomUUID(),
      name: nameIncome,
      amount: priceIncome,
      type: "income",
      category: "Renda",
      month: new Date().toISOString().slice(0, 7),
    });

    e.currentTarget.reset();
  }

  return (
    <div>
      {/* Listagem das rendas */}
      <IncomeList />

      {/* Card do formulário */}
      <Card className="border border-dashed border-zinc-300 mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-sans">
            Adicionar fonte de renda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex items-center gap-4 w-full"
            onSubmit={handleAddIncome}
          >
            <section className="flex-1">
              <input
                type="text"
                name="nameIncome"
                required
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
                type="text"
                name="price"
                required
                inputMode="decimal"
                placeholder="00,00"
                className="appearance-none border border-zinc-300 rounded-lg 
                  pl-12 pr-4 py-2 w-full
                  placeholder:text-gray-400 text-lg font-bold
                  focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </section>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 shrink-0 h-[45px] w-[45px] "
            >
              <IoAddOutline />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
