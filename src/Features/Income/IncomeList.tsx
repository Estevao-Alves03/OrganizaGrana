import { useState } from "react";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";
import { PiPushPinDuotone } from "react-icons/pi";
import { Card } from "../../components/ui/card";
import { useFinanceStore } from "../../Store/FinanceStore";
import { showToast } from "../Warnings/ToastContainer";

interface ConfirmDeletionProps {
  onCloseWarning: () => void;
  onConfirm: () => void;
}

function ConfirmDeletion({ onCloseWarning, onConfirm }: ConfirmDeletionProps) {
  return (
    <div className="flex items-center justify-center fixed inset-0 backdrop-blur-sm bg-black/90 z-50">
      <div className="bg-slate-900 border border-slate-600 rounded-3xl shadow-2xl w-[520px] overflow-hidden">
        {/* Barra superior */}
        <div className="bg-gray-700 flex items-center gap-3 px-6 py-3">
          <FaExclamationTriangle className="text-white" size={20} />
          <h1 className="text-white text-xl font-bold">Confirmar exclusão</h1>
        </div>

        {/* Conteúdo */}
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-gray-200 text-lg font-serif">
            Este item será removido permanentemente. Realmente deseja
            prosseguir?
          </h2>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onCloseWarning}
              className="bg-zinc-500 hover:bg-zinc-500 transition-colors duration-200 text-white px-4 py-2 rounded-xl font-medium shadow-md"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-700 hover:bg-red-600 transition-colors duration-200 text-white px-4 py-2 rounded-xl font-medium shadow-md"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IncomeList() {
  const transactions = useFinanceStore((state) => state.transactions);
  const incomes = transactions.filter((t) => t.type === "income");

  // const fixedIncomes = incomes.filter((i) => i.fixed)
  // const variableIncomes = incomes.filter((i) => !i.fixed)

  const removeTransaction = useFinanceStore((state) => state.removeTransaction);
  const updateTransactionAmount = useFinanceStore(
    (state) => state.updateTransactionAmount,
  );
  const updateTransactionName = useFinanceStore(
    (state) => state.updateTransactionName,
  );
  const toggleTransactionFixed = useFinanceStore(
    (state) => state.toggleTransactionFixed,
  );

  const [showWarning, setShowWarning] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState<string | null>(null);

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

  const handleToggleFixed = (incomeId: string) => {
    toggleTransactionFixed(incomeId);

    const income = incomes.find((e) => e.id === incomeId);

    showToast({
      type: "success",
      text: income?.fixed ? "Renda desfixada" : "Renda fixada",
    });
  };

  const sortedIncomes = [...incomes].sort((a, b) => {
    if (a.fixed && !b.fixed) return -1;
    if (!a.fixed && b.fixed) return 1;
    return (b.amount ?? 0) - (a.amount ?? 0);
  });

  return (
    <div className="grid gap-3">
      {showWarning && incomeToDelete && (
        <ConfirmDeletion
          onCloseWarning={() => {
            setShowWarning(false);
            setIncomeToDelete(null);
          }}
          onConfirm={() => {
            if (!incomeToDelete) return;
            handleRemove(incomeToDelete);
            setShowWarning(false);
            null;
          }}
        />
      )}

      {sortedIncomes.map((income) => (
        <Card
          key={income.id}
          className="hover:bg-slate-800/20 bg-slate-900 border-slate-600 relative"
        >
          {income.fixed && (
            <div className="absolute -top-4 -right-4 z-10">
              <div className="bg-green-900 border border-emerald-600 rounded-full p-1.5 shadow-md">
                <PiPushPinDuotone className="text-white rotate-20" size={16} />
              </div>
            </div>
          )}
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
                onClick={() => handleToggleFixed(income.id)}
                className={`p-2 rounded-lg border ${
                  income.fixed
                    ? "bg-emerald-900 border-emerald-400"
                    : "hover:bg-emerald-900 hover:border-emerald-400"
                }`}
              >
                <PiPushPinDuotone
                  className={
                    income.fixed
                      ? "text-emerald-400"
                      : "opacity-0 group-hover:opacity-100 text-white"
                  }
                />
              </button>

              <button
                onClick={() => {
                  setIncomeToDelete(income.id);
                  setShowWarning(true);
                }}
                disabled={income.fixed}
                className={`p-2 rounded-lg border ${
                  income.fixed
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-red-900 hover:border-red-400"
                }`}
              >
                <FaTrash className="text-white" />
              </button>
            </section>
          </div>
        </Card>
      ))}
    </div>
  );
}
