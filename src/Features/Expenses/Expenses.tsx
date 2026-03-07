import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoAddOutline } from "react-icons/io5";
import { GoTag } from "react-icons/go";
import { useState } from "react";

import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";
import GraphicsExpenses from "./GraphicsExpenses";

import { useFinanceStore } from "../../Store/FinanceStore";

export default function Expenses() {
  const [showCard, setShowCard] = useState(false);

  // pega todas transações do zustand
  const transactions = useFinanceStore((state) => state.transactions);

  // filtra apenas despesas
  const expenses = transactions.filter((t) => t.type === "expense");

  const openCard = () => {
    setShowCard(true);
  };

  const closeCard = () => {
    setShowCard(false);
  };

  return (
    <div className="mt-6">
      <Card className="px-3 pb-6 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <section>
              <CardTitle className="text-xl font-bold">
                Despesas do mês
              </CardTitle>

              <CardDescription className="text-lg font-sans text-zinc-500 font-medium">
                {expenses.length} despesas cadastradas
              </CardDescription>
            </section>

            <Button
              onClick={openCard}
              className="px-4 py-6 text-lg bg-green-600 hover:bg-green-700"
            >
              <IoAddOutline />
              Nova despesa
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center mt-9 text-center px-4">
          {expenses.length > 0 ? (
            <ExpensesList expenses={expenses} />
          ) : (
            <div>
              <span className="bg-zinc-200 rounded-xl p-5 mb-4 inline-block">
                <GoTag className="text-4xl text-gray-600" />
              </span>

              <div className="space-y-1">
                <h1 className="font-bold text-gray-800 text-lg mb-3">
                  Sem despesas neste mês
                </h1>

                <p className="text-md text-gray-500 max-w-[320px] font-medium">
                  Adicione uma nova despesa para começar
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {showCard && <AddExpenses onCloseCard={closeCard} />}
      </Card>

      {expenses.length > 0 && <GraphicsExpenses />}
    </div>
  );
}