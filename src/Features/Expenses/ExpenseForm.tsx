import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoAddOutline } from "react-icons/io5";

export default function ExpenseForm() {
  return (
    <div>
      <Card className="border border-dashed border-zinc-300">
        <CardHeader>
          <CardTitle>Adicionar fonte de renda</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex items-center gap-4">
            <section>
              <input
                type="text"
                placeholder="Ex: Salário, Freelance, Aluguel..."
                className="border border-zinc-300 rounded-lg px-4 py-2 text-left w-[480px] placeholder:text-gray-400 texl-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </section>
            <section>
              <input
                type="number"
                placeholder="R$ 0,00"
                className="border border-zinc-300 rounded-lg px-4 py-2 text-left w-[180px] placeholder:text-gray-400 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </section>
            <Button className="bg-green-600 hover:bg-green-700">
              <IoAddOutline/>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
