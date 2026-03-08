import { useEffect, useState } from "react";
// componentes
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "../../components/ui/select";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
// zustand
import type { Transaction } from "../../Store/FinanceStore"; 
import { useFinanceStore } from "../../Store/FinanceStore";
// types
import type { Category } from "../../Types/Category";
// react icons
import { IoCloseOutline } from "react-icons/io5";
// paginas
import { showToast } from "../Layout/ToastContainer";


interface AddExpensesProps {
  onCloseCard: () => void;
}

export default function AddExpenses({ onCloseCard }: AddExpensesProps) {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const [category, setCategory] = useState<Category>("Moradia");
  const [isFixed, setIsFixed] = useState(false);
  const currentMonth = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      name: formData.get("nameExpense") as string,
      amount: Number((formData.get("price") as string)?.replace(",", ".") || 0),
      type: "expense",
      category,
      notes: (formData.get("observation") as string) || "",
      fixed: isFixed, // checkbox
      month: currentMonth,
    };

    addTransaction(transaction);

    showToast({type: "success", text: `Depesa ${transaction.name} adicionada com sucesso!`})

    onCloseCard();
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 backdrop-blur-sm bg-black/90 z-50">
      {" "}
      <Card className="w-[540px] border bg-slate-900 border-slate-600 ">
        <CardHeader className="mx-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold font-sans text-white">
              Adicionar Despesa
            </CardTitle>
            <button onClick={onCloseCard} className="mt-1 text-white">
              <IoCloseOutline size={24} />
            </button>
          </div>
          <CardDescription className="text-base font-sans font-medium text-zinc-300 pr-4">
            Preencha os dados da despesa deste mês.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-lg text-white">
                Nome da despesa
              </label>
              <input
                type="text"
                name="nameExpense"
                required
                placeholder="Ex: Aluguel, Internet..."
                className="border px-3 py-2 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-green-600 font-semibold bg-slate-900 text-white"
              />
            </div>

            {/* Valor */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-lg text-white">
                Valor deste mês (R$)
               <span className="text-sm text-gray-300 ml-1 font-medium">
                  (Pode ser alterado depois)
                </span>
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 font-bold">
                  R$
                </span>

                <input
                  type="text"
                  name="price"
                  inputMode="decimal"
                  placeholder="00,00"
                  className="appearance-none border border-zinc-300 rounded-lg 
                  pl-9 pr-4 py-2 w-full
                  placeholder:text-gray-400 text-lg font-semibold
                  focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-base bg-slate-900 text-white"
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-base text-white">Categoria</label>

              <Select
                value={category}
                onValueChange={(value: string) =>
                  setCategory(value as Category)
                }
              >
                <SelectTrigger className="w-[250px] font-medium text-md text-white">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Moradia"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Moradia
                    </SelectItem>
                    <SelectItem
                      value="Transporte"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Transporte
                    </SelectItem>
                    <SelectItem
                      value="Alimentação"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Alimentação
                    </SelectItem>
                    <SelectItem
                      value="Saúde"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Saúde
                    </SelectItem>
                    <SelectItem
                      value="Educação"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Educação
                    </SelectItem>
                    <SelectItem
                      value="Lazer"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Lazer
                    </SelectItem>
                    <SelectItem
                      value="Serviços"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Serviços
                    </SelectItem>
                    <SelectItem
                      value="Outros"
                      className="cursor-pointer data-[highlighted]:bg-green-600 data-[highlighted]:text-white font-bold text-sm"
                    >
                      Outros
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Observação */}
            <div className="flex flex-col gap-2">
              <label className="font-bold font-sans text-base text-white">
                Observação
                <span className="text-sm text-gray-300 ml-1 font-medium">
                  (opcional)
                </span>
              </label>

              <Textarea
                name="observation"
                placeholder="Anotações sobre essa despesa..."
                className="rounded-xl border border-gray-200 
             placeholder:font-sans placeholder:text-base placeholder:text-gray-300
             !min-h-[120px] !text-base placeholder:font-medium font-semibold
             focus:!ring-2 focus:!ring-green-600 focus:!outline-none bg-slate-900 text-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <h1 className="font-bold font-sans text-base text-white">
                É uma despesa fixa?
              </h1>
              <Checkbox
                checked={isFixed}
                onCheckedChange={(checked) => setIsFixed(Boolean(checked))}
                className="h-[20px] w-[20px] border-gray-300
            data-[state=checked]:bg-green-600
            data-[state=checked]:border-green-600
            data-[state=checked]:text-white"
              />
            </div>

            {/* Botões */}
            <div className="flex items-center justify-end gap-3 mt-3">
              <Button
                type="button"
                onClick={onCloseCard}
                className="bg-slate-300 text-black hover:bg-gray-200 border border-slate-600 px-7 py-5 font-bold text-base"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                className="bg-green-800 border border-emerald-600 hover:bg-green-900 text-white px-7 py-5 font-bold text-base"
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
