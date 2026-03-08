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
      <Card className="border border-dashed bg-slate-900 border-slate-400  mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-sans text-white">
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
                className="w-full border rounded-lg px-4 py-2 text-left 
                  placeholder:text-gray-300 text-lg font-bold
                  focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-900 text-white"
              />
            </section>

            <section className="relative w-40 shrink-0">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">
                R$
              </span>

              <input
                type="text"
                name="price"
                required
                inputMode="decimal"
                placeholder="00,00"
                className="appearance-none border rounded-lg 
                  pl-12 pr-4 py-2 w-full
                  placeholder:text-gray-300 text-lg font-bold
                  focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-900 text-white"
              />
            </section>

            <Button
              type="submit"
              className="bg-green-800 hover:bg-green-900 shrink-0 h-[45px] w-[45px] "
            >
              <IoAddOutline className="!h-[50px] !font-medium !text-white !font-extraligth"/>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
