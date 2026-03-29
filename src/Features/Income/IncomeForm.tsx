import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { PiPushPinDuotone } from "react-icons/pi";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { useFinanceStore } from "../../Store/FinanceStore";
import { showToast } from "../Warnings/ToastContainer";
import IncomeList from "./IncomeList";

export default function IncomeForm() {

  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const [isFixed, setIsFixed] = useState(false)


  function handleAddIncome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const nameIncome = formData.get("nameIncome") as string;
    const rawValue = formData.get("price") as string;
    const priceIncome = Number(rawValue.replace(",", "."));

    if (!nameIncome || !priceIncome) {
      showToast({
        type: "error",
        text: "Preencha nome e valor da renda",
      });
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      name: nameIncome,
      amount: priceIncome,
      type: "income",
      fixed: isFixed,
      category: "Renda",
      month: new Date().toISOString().slice(0, 7),
    });

    showToast({
      type: "success",
      text: `Renda "${nameIncome}" adicionada`,
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
                className="w-[400px] border rounded-lg px-4 py-3 text-left 
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
                  pl-12 pr-4 py-3 w-full
                  placeholder:text-gray-300 text-lg font-bold
                  focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-900 text-white"
              />
            </section>

            <section className="w-40 flex-auto border rounded-lg py-2">
              <div className="flex items-center justify-between">
                <h1 className="py-0.5 pl-4 text-lg text-gray-300 font-bold flex items-center gap-2">
                  <PiPushPinDuotone className="mb-0.5 text-green-500"/>
                  Fixar renda
                </h1>{" "}
                <Checkbox
                  checked={isFixed}
                  onCheckedChange={(checked) => setIsFixed(Boolean(checked))}
                  className="h-[20px] w-[20px] border-gray-300
            data-[state=checked]:bg-green-600
            data-[state=checked]:border-green-600
            data-[state=checked]:text-white mr-4"
                />
              </div>
            </section>

            <Button
              type="submit"
              className="bg-green-800 hover:bg-green-900 shrink-0 h-[45px] w-[45px] "
            >
              <IoAddOutline className="!h-[50px] !font-medium !text-white !font-extraligth" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
