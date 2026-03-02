import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import type { Expense, Category } from "../../Types/Expense";

interface AddExpensesProps {
  onCloseCard: () => void;
  addExpenses: (newExpense: Expense) => void;
}

export default function AddExpenses({
  onCloseCard,
  addExpenses,
}: AddExpensesProps) {
  const [category, setCategory] = useState<Category>("Moradia");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      nameExpense: formData.get("nameExpense") as string,
      priceExpense: Number((formData.get("price") as string).replace(",", ".")),
      category,
      observation: formData.get("observation") as string,
    };

    addExpenses(newExpense);
    onCloseCard();
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 backdrop-blur-sm bg-black/90 z-50">
      {" "}
      <Card className="w-[540px] border-4 border-green-600">
        <CardHeader className="mx-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold font-sans">
              Adicionar Despesa
            </CardTitle>
            <button onClick={onCloseCard} className="mt-1">
              <IoCloseOutline size={24} />
            </button>
          </div>
          <CardDescription className="text-base font-sans font-medium text-zinc-500 pr-4">
            Preencha os dados da despesa deste mês.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-lg">Nome da despesa</label>
              <input
                type="text"
                name="nameExpense"
                required
                placeholder="Ex: Aluguel, Internet..."
                className="border px-3 py-2 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
              />
            </div>

            {/* Valor */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-lg">
                Valor deste mês (R$)
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  R$
                </span>

                <input
                  type="number"
                  name="price"
                  required
                  placeholder="00,00"
                  className="appearance-none border border-zinc-300 rounded-lg 
                  pl-10 pr-4 py-2 w-full
                  placeholder:text-gray-400 text-lg font-semibold
                  focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-base"
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-base">Categoria</label>

              <Select
                value={category}
                onValueChange={(value: string) =>
                  setCategory(value as Category)
                }
              >
                <SelectTrigger className="w-[250px] font-medium text-md">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Moradia" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Moradia</SelectItem>
                    <SelectItem value="Transporte" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Transporte</SelectItem>
                    <SelectItem value="Alimentação" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Alimentação</SelectItem>
                    <SelectItem value="Saúde" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Saúde</SelectItem>
                    <SelectItem value="Educação" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Educação</SelectItem>
                    <SelectItem value="Lazer" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Lazer</SelectItem>
                    <SelectItem value="Serviços" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Serviços</SelectItem>
                    <SelectItem value="Outros" className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm">Outros</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Observação */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-base">
                Observação
                <span className="text-sm text-gray-500 ml-1 font-medium">(opcional)</span>
              </label>

              <Textarea
                name="observation"
                placeholder="Anotações sobre essa despesa..."
                className="rounded-xl border border-gray-200 
             placeholder:font-sans placeholder:text-base 
             !min-h-[120px] !text-base placeholder:font-medium font-semibold
             focus:!ring-2 focus:!ring-green-500 focus:!outline-none"
              />
            </div>

            {/* Botões */}
            <div className="flex items-center justify-end gap-3 mt-3">
              <Button
                type="button"
                onClick={onCloseCard}
                className="bg-white text-black hover:bg-gray-100 border px-6 py-4 font-semibold text-base"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-4 font-semibold text-base"
              >
                Adicionar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
