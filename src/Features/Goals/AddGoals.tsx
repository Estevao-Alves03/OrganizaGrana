import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";

export default function AddGoals() {
  return (
    <div>
      <Card className="w-[600px] rounded-xl bg-slate-900 border-slate-600">
        <CardHeader>
          <CardTitle className="font-bold text-2xl flex items-center justify-between">
            <h1 className="text-white">Nova Meta Financeira</h1>
            <button className="text-base text-slate-500 mr-1">X</button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col">
              <label className="font-bold text-base text-slate-300 ml-1">Nome da meta</label>
              <input
                type="text"
                name="namegoal"
                placeholder="Ex: Viagem, Fundo de emergencia, Carro novo..."
                className="border rounded-xl px-3 py-2 w-full bg-slate-900 border-slate-600 mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <section>
                <label className="font-bold text-base text-slate-300 ml-1">Valor da neta (R$)</label>
                <input
                  type="text"
                  name="namegoal"
                  placeholder="10.000,00"
                  className="border rounded-xl px-3 py-2 w-full bg-slate-900 border-slate-600 mt-1"
                />
              </section>
              <section>
                <label className="font-bold text-base text-slate-300 ml-1">Já guardou (R$)</label>
                <input
                  type="text"
                  name="namegoal"
                  placeholder="0,00"
                  className="border rounded-xl px-3 py-2 w-full bg-slate-900 border-slate-600 mt-1"
                />
              </section>
            </div>
            <div className="mt-6">
              <label className="font-bold text-base text-slate-300 ml-1">Prazo</label>
              <input
                type="text"
                name="namegoal"
                placeholder="dd/mm/aaaa"
                className="border rounded-xl px-3 py-2 w-full bg-slate-900 border-slate-600 mt-1"
              />
            </div>
            <button className="w-full rounded-xl mt-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg">
                Criar Meta
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
