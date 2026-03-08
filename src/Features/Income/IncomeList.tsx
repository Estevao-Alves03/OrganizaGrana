import { useState } from "react";
import { Card } from "../../components/ui/card";
import { FaTrash } from "react-icons/fa";
import { useFinanceStore } from "../../Store/FinanceStore";
import { showToast } from "../Layout/ToastContainer";

export default function IncomeList() {
  const transactions = useFinanceStore((state) => state.transactions);
  const incomes = transactions.filter((t) => t.type === "income");

  const removeTransaction = useFinanceStore((state) => state.removeTransaction);
  const updateTransactionAmount = useFinanceStore(
    (state) => state.updateTransactionAmount,
  );
  const updateTransactionName = useFinanceStore(
    (state) => state.updateTransactionName,
  );

  const [editingAmount, setEditingAmount] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState("");

  const [editingName, setEditingName] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  const handleRemove = (incomeId: string) => {
    const income = incomes.find((i) => i.id === incomeId);

    removeTransaction(incomeId);

    showToast({
      type: "success",
      text: `Renda "${income?.name}" removida`,
    });
  };

  const handleUpdateAmount = (incomeId: string, newAmount: number) => {
    updateTransactionAmount(incomeId, newAmount);

    showToast({
      type: "success",
      text: "Valor da renda atualizado",
    });
  };

  const handleUpdateName = (incomeId: string, newName: string) => {
    if (!newName.trim()) return;

    updateTransactionName(incomeId, newName);

    showToast({
      type: "success",
      text: "Nome da renda atualizado",
    });
  };

  return (
    <div className="grid gap-3">
      {incomes.map((income) => (
        <Card
          key={income.id}
          className="hover:bg-slate-800/20 bg-slate-900 border-slate-600"
        >
          <div className="flex items-center justify-between m-4">
            <section className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-600" />

              {editingName === income.id ? (
                <input
                  type="text"
                  value={tempName}
                  autoFocus
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => {
                    if (tempName.trim()) {
                      handleUpdateName(income.id, tempName);
                    }
                    setEditingName(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (tempName.trim()) {
                        handleUpdateName(income.id, tempName);
                      }
                      setEditingName(null);
                    }
                  }}
                  className="bg-slate-800 text-white font-bold text-lg px-2 py-1 rounded border border-green-600 outline-none w-[200px]"
                />
              ) : (
                <h2
                  onClick={() => {
                    setEditingName(income.id);
                    setTempName(income.name);
                  }}
                  className="font-bold font-sans text-lg text-white cursor-pointer hover:text-green-600 transition-colors duration-300"
                >
                  {income.name}
                </h2>
              )}
            </section>

            <section className="flex items-center gap-4 mr-4">
              {/* VALOR EDITÁVEL */}
              {editingAmount === income.id ? (
                <div className="flex items-center text-white border-2 bg-slate-900 border-emerald-600 rounded-lg px-3 py-2 w-fit">
                  <span className="text-base font-bold text-gray-300 mr-1">
                    R$
                  </span>
                  <input
                    type="number"
                    value={tempAmount}
                    autoFocus
                    onChange={(e) => setTempAmount(e.target.value)}
                    onBlur={() => {
                      handleUpdateAmount(income.id, Number(tempAmount) || 0);
                      setEditingAmount(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateAmount(income.id, Number(tempAmount) || 0);
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
                  className="font-bold text-lg text-white hover:text-green-600 cursor-pointer transition-all duration-300"
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(income.amount ?? 0)}
                </span>
              )}

              <button
                onClick={() => handleRemove(income.id)}
                className="group p-2 hover:bg-red-900 hover:border-red-400 rounded-lg border"
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
