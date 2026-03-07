import { useState } from "react";
import { Card } from "../../components/ui/card";
import { FaTrash } from "react-icons/fa";
import { useFinanceStore } from "../../Store/FinanceStore";

export default function IncomeList() {
  const transactions = useFinanceStore((state) => state.transactions);
  const incomes = transactions.filter((t) => t.type === "income");

  const removeTransaction = useFinanceStore((state) => state.removeTransaction);
  const updateTransactionAmount = useFinanceStore(
    (state) => state.updateTransactionAmount
  );

  const [editingAmount, setEditingAmount] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState("");

  return (
    <div className="grid gap-3">
      {incomes.map((income) => (
        <Card
          key={income.id}
          className="bg-zinc-50 hover:bg-zinc-100 shadow-md"
        >
          <div className="flex items-center justify-between m-4">
            <section className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-600" />
              <h2 className="font-bold font-sans text-lg">{income.name}</h2>
            </section>

            <section className="flex items-center gap-4 mr-4">
              {editingAmount === income.id ? (
                <div className="flex items-center border-2 border-green-500 rounded-lg px-3 py-2 w-fit bg-green-50">
                  <span className="text-base font-bold text-gray-600 mr-1">R$</span>

                  <input
                    type="number"
                    value={tempAmount}
                    autoFocus
                    onChange={(e) => setTempAmount(e.target.value)}
                    onBlur={() => {
                      updateTransactionAmount(
                        income.id,
                        Number(tempAmount) || 0
                      );
                      setEditingAmount(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateTransactionAmount(
                          income.id,
                          Number(tempAmount) || 0
                        );
                        setEditingAmount(null);
                      }
                    }}
                    className="bg-transparent outline-none w-24 text-base font-bold"
                  />
                </div>
              ) : (
                <span
                  onClick={() => {
                    setEditingAmount(income.id);
                    setTempAmount(String(income.amount ?? ""));
                  }}
                  className="font-bold text-lg hover:text-green-600 cursor-pointer transition-all duration-300"
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(income.amount ?? 0)}
                </span>
              )}

              <button
                onClick={() => removeTransaction(income.id)}
                className="group p-2 hover:bg-red-500 rounded-lg border"
              >
                <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white" />
              </button>
            </section>
          </div>
        </Card>
      ))}
    </div>
  );
}