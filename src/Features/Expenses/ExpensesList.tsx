// ARQUIVO QUE FAZ O MAPEAMENTO DAS DESPESAS ADICIONADAS
import { Card } from "../../components/ui/card";
import { FaTrash } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
// import { ExpensesMock } from "../../Mocks/ExpensesExamples";
import { categoryColors } from "../../Utils/categoryColors";
import type { Expense } from "../../Types/Expense";

interface ExpensesListProps {
  expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <div className="w-full grid grid-rows gap-3">
      {expenses.map((expense) => (
        <Card
          key={expense.id}
          className="bg-zinc-50 hover:bg-zinc-100 shadow-md w-full"
        >
          <div className="flex items-center justify-between p-4">
            <section className="flex items-center gap-3">
              {/* CÍRCULO */}
              <span
                className="h-3 w-3 rounded-full self-center"
                style={{
                  backgroundColor: categoryColors[expense.category],
                }}
              />

              {/* BLOCO DE TEXTO */}
              <div className="flex items-start flex-col">
                <h2 className="font-bold text-lg">
                  {expense.nameExpense}
                  <span className="text-sm ml-1.5 border bg-gray-200 px-2 py-1 rounded-full text-gray-700">
                    {expense.category}
                  </span>
                </h2>

                {expense.observation && (
                  <p className="text-sm text-gray-500 mt-1 max-w-[900px] flex items-center gap-2 cursor-help">
                    <IoDocumentTextOutline size={16} className="shrink-0" />
                    <span title={expense.observation} className="truncate">
                      {expense.observation}
                    </span>
                  </p>
                )}
              </div>
            </section>

            <section className="flex items-center gap-4">
              <span className="font-bold text-lg hover:text-green-600 cursor-pointer transition-all duration-300">
                R${" "}
                {expense.priceExpense.toLocaleString("pt-BT", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>

              <button className="group p-2 hover:bg-red-400 rounded-lg border">
                <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white" />
              </button>
            </section>
          </div>
        </Card>
      ))}
    </div>
  );
}
