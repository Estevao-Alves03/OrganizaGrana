import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

type Items = {
  income: number;
  expense: number;
  id: number;
  month: string;
  balance: number
}

export default function BalanceRanking() {
  const items: Items[] = [
    {
      id: 1,
      month: "Março de 2026",
      income: 2500.0,
      expense: 1400.0,
      balance: 900.0,
    },
    {
      id: 2,
      month: "Abril de 2026",
      income: 2500.0,
      expense: 1400.0,
      balance: 1000.0,
    },
    {
      id: 3,
      month: "Maio de 2026",
      income: 2500.0,
      expense: 1400.0,
      balance: 1200.0,
    },
    {
      id: 4,
      month: "Junho de 2026",
      income: 2500.0,
      expense: 1400.0,
      balance: 800.0,
    },
  ];

  const sorted = [...items].sort((a, b) => b.balance - a.balance)

  return (
    <div className="mx-44">
      <Card className="rounded-xl bg-slate-900 border-slate-600 w-[1380px] mt-6 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-slate-300 font-bold">
            Ranking de Saldo
          </CardTitle>
          <CardDescription className="text-base text-slate-400 font-medium">
            Do melhor para o pior mes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sorted.map((item, index) => {
            return (
              <div key={item.id} className="mt-3 flex items-center justify-between border border-slate-600 p-3 rounded-xl">
              <section className="flex items-center gap-3">
                <span className="text-2xl border bg-slate-900/30 border-slate-700 text-white rounded-full w-16 h-16 flex items-center justify-center">
                   {index + 1}
                </span>
                <section className="">
                  <h1 className="text-white text-xl font-bold">
                    {item.month}
                  </h1>
                  <div className="flex gap-3">
                    <span className="text-slate-300">
                      <strong>Renda:</strong> R$ {item.income}
                    </span>
                    <span className="text-slate-300">
                      <strong>Despesas:</strong> R$ {item.expense}
                    </span>
                  </div>
                </section>
              </section>

              <section>
                <h1 className="text-2xl text-slate-400 font-semibold mr-4">
                  R$: {item.balance}
                </h1>
              </section>
            </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  );
}
