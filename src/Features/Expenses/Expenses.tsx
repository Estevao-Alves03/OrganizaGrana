// CARD EXTERNO PRINCIPAL QUE FALA SOBRE AS DESPESAS. O FORMULÁRIO DE ADIÇÃO DE DESPESAS E A LISTAGEM DAS DESPESAS
// ESTÃO EM OUTROS DOIS ARQUIVOS
// ADDEXPENSES -> POP UP VISUAL PARA ADICIONAR DESPESAS
// GRAPHICSEXPENSES -> ARQUIVO ONDE MOSTRA OS DADOS POR GRAFICOS
// EXPENSELIST -> MAPAMENTO DAS DESPESAS ADICIONADAS

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
import { ExpensesMock } from "../../Mocks/ExpensesExamples";
import type { Expense } from "../../Types/Expense";
import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";
import GraphicsExpenses from "./GraphicsExpenses";

export default function Expenses() {
  const [showCard, setShowCard] = useState(false);
  const [expenses, setExpenses] = useState(ExpensesMock)

  const addExpenses = (newExpense: Expense) => {
    setExpenses(prev => [...prev, newExpense])
  }

  const isOpenCard = () => {
    setShowCard(true);
  };

  const onCloseCard = () => {
    setShowCard(false);
  };

  return (
    <div className="mt-6">
      <Card className="px-3 pb-6 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <section>
              <CardTitle className="text-xl font-bold">
                Depesas do mês
              </CardTitle>
              <CardDescription className="text-lg font-sans text-zinc-500 font-medium">
                Nenhuma despesa cadatrada nesse mẽs valores podem mudar todo mes
                {/* 3 depesas - Os */}
              </CardDescription>
            </section>
            <section>
              {/* botão que aciona o arquivo - addexpenses */}
              <Button
                onClick={isOpenCard}
                className="px-4 py-6 text-lg bg-green-700 hover:bg-green-800"
              >
                <IoAddOutline />
                Nova despesa
              </Button>
            </section>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mt-9 text-center px-4">
          {expenses.length > 0 ? (
            <ExpensesList expenses={expenses}/>
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
                  Adicione uma despesa nova ou copie do mes anterior
                </p>
              </div>
            </div>
          )}
        </CardContent>
        {showCard && <AddExpenses onCloseCard={onCloseCard} addExpenses={addExpenses}/>}
      </Card>
      {expenses.length > 0 && <GraphicsExpenses expenses={expenses}/>}
    </div>
  );
}
