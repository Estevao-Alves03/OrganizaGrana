import { Card } from "../../components/ui/card";
import { FaTrash } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiPushPinDuotone } from "react-icons/pi";
import { categoryColors } from "../../Utils/categoryColors";
import { useFinanceStore } from "../../Store/FinanceStore";
import type { Transaction } from "../../Store/FinanceStore";
import { useState } from "react";
import { showToast } from "../Layout/ToastContainer";

interface ExpensesListProps {
  expenses: Transaction[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  const removeTransactionByMonth = useFinanceStore(
    (state) => state.removeTransactionByMonth,
  );

  const updateTransactionAmountForMonth = useFinanceStore(
    (state) => state.updateTransactionAmountForMonth,
  );

  const updateTransactionName = useFinanceStore(
    (state) => state.updateTransactionName,
  );

  const toggleTransactionFixed = useFinanceStore(
    (state) => state.toggleTransactionFixed,
  );

  const currentMonth = useFinanceStore((state) => state.currentMonth);
  const transactions = useFinanceStore((state) => state.transactions);

  const hiddenTransactions = transactions.filter(
    (t) => t.fixed && t.hiddenMonths?.includes(currentMonth),
  );

  const restoreTransaction = useFinanceStore(
    (state) => state.restoreTransactionByMonth,
  );

  const [editingAmount, setEditingAmount] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState("");

  const [editingName, setEditingName] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a.fixed && !b.fixed) return -1;
    if (!a.fixed && b.fixed) return 1;
    return 0;
  });

  const handleUpdateAmount = (expenseId: string, newAmount: number) => {
    updateTransactionAmountForMonth(expenseId, currentMonth, newAmount);

    showToast({
      type: "success",
      text: "Valor atualizado com sucesso",
    });
  };

  const handleRemove = (expenseId: string) => {
    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) return;

    if (expense.fixed) {
      showToast({
        type: "error",
        text: "Despesas fixas não podem ser excluídas",
      });
      return;
    }

    removeTransactionByMonth(expenseId, currentMonth);

    showToast({
      type: "success",
      text: `Despesa "${expense.name}" removida`,
    });
  };

  const handleUpdateName = (expenseId: string, newName: string) => {
    if (newName.trim()) {
      updateTransactionName(expenseId, newName);

      showToast({
        type: "success",
        text: "Nome da despesa atualizado",
      });
    }

    setEditingName(null);
  };

  const handleToggleFixed = (expenseId: string) => {
    toggleTransactionFixed(expenseId);

    const expense = expenses.find((e) => e.id === expenseId);

    showToast({
      type: "success",
      text: expense?.fixed ? "Despesa desfixada" : "Despesa fixada",
    });
  };

  return (
    <div className="w-full grid grid-rows gap-3">
      {/* DESPESAS NORMAIS */}
      {sortedExpenses.map((expense) => (
        <Card
          key={expense.id}
          className="hover:bg-slate-800/20 bg-slate-900 border-slate-600 w-full relative"
        >
          {expense.fixed && (
            <div className="absolute -top-4 -right-4 z-10">
              <div className="bg-green-900 border border-emerald-600 rounded-full p-1.5 shadow-md">
                <PiPushPinDuotone className="text-white rotate-20" size={16} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 p-4 w-full">
            {/* CATEGORIA */}
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: categoryColors[expense.category],
              }}
            />

            {/* TEXTO */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center flex-wrap gap-1.5">
                {editingName === expense.id ? (
                  <input
                    type="text"
                    value={tempName}
                    autoFocus
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => handleUpdateName(expense.id, tempName)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateName(expense.id, tempName);
                      }
                    }}
                    className="bg-slate-800 text-white font-bold text-lg px-2 py-1 rounded border border-emerald-600 outline-none w-[200px]"
                  />
                ) : (
                  <h2
                    onClick={() => {
                      setEditingName(expense.id);
                      setTempName(expense.name);
                    }}
                    className="font-bold text-lg truncate max-w-[200px] text-white cursor-pointer hover:text-green-600 transition-colors duration-300"
                  >
                    {expense.name}
                  </h2>
                )}

                <span className="text-sm font-medium border bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                  {expense.category}
                </span>
              </div>

              {expense.notes && (
                <p className="text-base font-medium text-gray-300 mt-1 flex items-center gap-2">
                  <IoDocumentTextOutline size={16} />
                  <span className="truncate">{expense.notes}</span>
                </p>
              )}
            </div>

            {/* VALOR + BOTÕES */}
            <div className="flex items-center gap-4">
              {editingAmount === expense.id ? (
                <div className="flex items-center border-2 text-white bg-slate-900 border-emerald-600 rounded-lg px-3 py-2">
                  <span className="mr-1">R$</span>
                  <input
                    type="number"
                    value={tempAmount}
                    autoFocus
                    onChange={(e) => setTempAmount(e.target.value)}
                    onBlur={() => {
                      handleUpdateAmount(expense.id, Number(tempAmount) || 0);
                      setEditingAmount(null);
                    }}
                    className="bg-transparent outline-none w-24"
                  />
                </div>
              ) : (
                <span
                  onClick={() => {
                    setEditingAmount(expense.id);
                    setTempAmount(String(expense.amount ?? ""));
                  }}
                  className="font-bold text-lg text-white cursor-pointer"
                >
                  R${" "}
                  {(expense.amount ?? 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}

              {/* FIXAR */}
              <button
                onClick={() => handleToggleFixed(expense.id)}
                className={`p-2 rounded-lg border ${
                  expense.fixed
                    ? "bg-emerald-900 border-emerald-400"
                    : "hover:bg-emerald-900 hover:border-emerald-400"
                }`}
              >
                <PiPushPinDuotone
                  className={
                    expense.fixed
                      ? "text-emerald-400"
                      : "opacity-0 group-hover:opacity-100 text-white"
                  }
                />
              </button>

              {/* REMOVER */}
              <button
                onClick={() => handleRemove(expense.id)}
                disabled={expense.fixed}
                className={`p-2 rounded-lg border ${
                  expense.fixed
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-red-900 hover:border-red-400"
                }`}
              >
                <FaTrash className="text-white" />
              </button>
            </div>
          </div>
        </Card>
      ))}

      {/* TRANSAÇÕES OCULTAS */}
      {hiddenTransactions.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-gray-400 font-semibold text-sm uppercase">
            Transações ocultas neste mês
          </h2>

          {hiddenTransactions.map((expense) => (
            <Card
              key={expense.id}
              className="bg-slate-900 border-slate-700 opacity-70"
            >
              <div className="flex justify-between items-center p-4">
                <div>
                  <h2 className="text-white font-bold">{expense.name}</h2>

                  <p className="text-gray-400 text-sm">
                    R${" "}
                    {(expense.amount ?? 0).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <button
                  onClick={() => {
                    restoreTransaction(expense.id, currentMonth);

                    showToast({
                      type: "success",
                      text: "Despesa restaurada",
                    });
                  }}
                  className="text-green-400 hover:text-green-300 font-semibold"
                >
                  Restaurar
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
