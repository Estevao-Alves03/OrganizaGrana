// Arquivo que serve para adicionar uma nova despesa a lista (arquivo vinculado ao expense list)
import { Textarea } from "@/components/ui/textarea";
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
import { useEffect } from "react";

type WarningNewExpense = {
  onCloseCard: () => void;
};

export default function AddExpenses({ onCloseCard }: WarningNewExpense) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center fixed inset-0 backdrop-blur-sm bg-black/90 ">
      <Card className="w-[540px]">
        <CardHeader className="mx-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold font-sans">
              Adicionar Despesa
            </CardTitle>
            <button onClick={onCloseCard} className="mt-1">
              <IoCloseOutline size={24} />
            </button>
          </div>
          <CardDescription className="text-lg font-sans text-zinc-500 pr-4">
            Preencha os dados da despesa deste mes. O valor pode variar a cada
            mes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-base">Nome da despesa</label>
              <input
                type="text"
                placeholder="Ex: Aluguel, Internet, Luz..."
                className="border px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-base">
                Valor deste mês (R$)
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  R$
                </span>

                <input
                  type="text"
                  placeholder="0,00"
                  className="w-full pl-10 pr-3 py-2 border rounded-xl 
                 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 font-bold"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-base">Categoria</label>
              <Select defaultValue="Moradia">
                <SelectTrigger className="w-[180px] text-gray-400 font-semibold font-sans">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent >
                  <SelectGroup >
                    <SelectItem
                      value="Moradia"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Moradia
                    </SelectItem>
                    <SelectItem
                      value="Transporte"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Transporte
                    </SelectItem>
                    <SelectItem
                      value="Alimentação"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Alimentação
                    </SelectItem>
                    <SelectItem
                      value="Saúde"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Saúde
                    </SelectItem>
                    <SelectItem
                      value="Educação"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Educação
                    </SelectItem>
                    <SelectItem
                      value="Lazer"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Lazer
                    </SelectItem>
                    <SelectItem
                      value="Serviços"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Serviços
                    </SelectItem>
                    <SelectItem
                      value="Outros"
                      className="cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white font-semibold text-sm"
                    >
                      Outros
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-base">
                Observação{" "}
                <span className="text-sm text-gray-500">(opcional)</span>
              </label>
              <Textarea
                placeholder="Anotações sobre essa despesa deste mês..."
                className="rounded-xl border border-gray-200 
                placeholder:font-sans placeholder:text-base placeholder:text-gray-400
                !h-[90px] !text-base placeholder:font-semibold font-semibold
                focus:!ring-2 focus:!ring-green-500 focus:!outline-none
                "
                />
            </div>
            <div className="flex items-center justify-end gap-3 mt-3">
                <Button 
                onClick={onCloseCard}
                className="bg-white text-black hover:bg-gray-100 border shadow-md px-6 py-4 text-base font-semibold">
                    Cancelar
                </Button>
                <Button className="bg-green-700 hover:bg-green-800 text-white boder shadow-md px-6 py-4 text-base font-semibold">
                    Adicionar
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
