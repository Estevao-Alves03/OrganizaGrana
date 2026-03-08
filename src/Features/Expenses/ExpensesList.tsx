import { Card } from "../../components/ui/card";
import { FaTrash } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiPushPinDuotone } from "react-icons/pi";
import { categoryColors } from "../../Utils/categoryColors";
import { useFinanceStore } from "../../Store/FinanceStore";
import type { Transaction } from "../../Store/FinanceStore";
import { useState } from "react";

interface ExpensesListProps {
  expenses: Transaction[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  const removeTransactionByMonth = useFinanceStore((state) => state.removeTransactionByMonth);
  const updateTransactionAmountForMonth = useFinanceStore(
    (state) => state.updateTransactionAmountForMonth,
  );
  const updateTransactionName = useFinanceStore((state) => state.updateTransactionName);
  const toggleTransactionFixed = useFinanceStore((state) => state.toggleTransactionFixed);
  
  const currentMonth = useFinanceStore((state) => state.currentMonth);

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
  };

  const handleRemove = (expenseId: string) => {
    removeTransactionByMonth(expenseId, currentMonth);
  };

  const handleUpdateName = (expenseId: string, newName: string) => {
    if (newName.trim()) {
      updateTransactionName(expenseId, newName);
    }
    setEditingName(null);
  };

  const handleToggleFixed = (expenseId: string) => {
    toggleTransactionFixed(expenseId);
  };

  return (
    <div className="w-full grid grid-rows gap-3">
      {sortedExpenses.map((expense) => (
        <Card
          key={expense.id}
          className="hover:bg-slate-800/20 bg-slate-900 border-slate-600 w-full relative"
        >
          {/* Ícone de fixar - aparece apenas se for despesa fixa */}
          {expense.fixed && (
            <div className="absolute -top-4 -right-4 z-10">
              <div className="bg-green-900 border border-emerald-600 rounded-full p-1.5 shadow-md">
                <PiPushPinDuotone className="text-white rotate-20" size={16} />
              </div>
            </div>
          )}

          {/* Grid com 3 colunas: círculo, texto, valor+botão */}
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 p-4 w-full">
            {/* COLUNA 1: Círculo */}
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: categoryColors[expense.category],
              }}
            />

            {/* COLUNA 2: Texto (título + categoria + nota) */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center flex-wrap gap-1.5">
                {/* NOME EDITÁVEL */}
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
                <span className="text-sm font-medium font-sans border bg-gray-200 px-3 py-1 rounded-full text-gray-600 whitespace-nowrap flex-shrink-0">
                  {expense.category}
                </span>
              </div>

              {expense.notes && (
                <p className="text-base font-medium text-gray-300 mt-1 flex items-center gap-2 cursor-help w-full overflow-hidden">
                  <IoDocumentTextOutline size={16} className="flex-shrink-0 text-white font-bold mb-0.5 " />
                  <span title={expense.notes} className="truncate block">
                    {expense.notes}
                  </span>
                </p>
              )}
            </div>

            {/* COLUNA 3: Valor + botões */}
            <div className="flex items-center gap-4 flex-shrink-0 justify-self-end">
              {/* VALOR EDITÁVEL */}
              {editingAmount === expense.id ? (
                <div className="flex items-center border-2 text-white bg-slate-900 border-emerald-600 rounded-lg px-3 py-2 w-fit">
                  <span className="text-base font-bold text-gray-300 mr-1">R$</span>
                  <input
                    type="number"
                    value={tempAmount}
                    autoFocus
                    onChange={(e) => setTempAmount(e.target.value)}
                    onBlur={() => {
                      handleUpdateAmount(expense.id, Number(tempAmount) || 0);
                      setEditingAmount(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateAmount(expense.id, Number(tempAmount) || 0);
                        setEditingAmount(null);
                      }
                    }}
                    className="bg-transparent outline-none w-24 text-base font-bold"
                  />
                </div>
              ) : (
                <span
                  onClick={() => {
                    setEditingAmount(expense.id);
                    setTempAmount(String(expense.amount ?? ""));
                  }}
                  className="font-bold text-lg text-white hover:text-green-600 cursor-pointer transition-all duration-300 whitespace-nowrap"
                >
                  R${" "}
                  {(expense.amount ?? 0).toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}

              {/* 🟢 BOTÃO FIXAR/DESFIXAR - aparece sempre, com comportamento diferente */}
              <button
                onClick={() => handleToggleFixed(expense.id)}
                className={`
                  group p-2 rounded-lg border flex-shrink-0
                  transition-all duration-300
                  ${expense.fixed 
                    ? 'bg-emerald-900 border-emerald-400 hover:bg-emerald-800' 
                    : 'hover:bg-emerald-900 hover:border-emerald-400'
                  }
                `}
                title={expense.fixed ? "Desfixar despesa" : "Fixar despesa"}
              >
                <PiPushPinDuotone 
                  className={`
                    transition-all duration-300
                    ${expense.fixed 
                      ? 'opacity-100 scale-100 text-emerald-400' 
                      : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 text-white'
                    }
                  `} 
                  size={16} 
                />
              </button>

              {/* BOTÃO LIXEIRA */}
              <button
                onClick={() => handleRemove(expense.id)}
                className="group p-2 hover:bg-red-900 hover:border-red-400 rounded-lg border flex-shrink-0"
              >
                <FaTrash className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}