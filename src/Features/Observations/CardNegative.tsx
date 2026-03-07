// este arquivo vai mostrar quando o saldo final estiver negativo
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RiAlertLine } from "react-icons/ri";

export default function CardNegative() {
  return (
    <div>
      <Card className="shadow-xl border border-red-400">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-2xl border px-1.5 py-1.5 rounded-lg text-red-800 bg-red-200 border-red-400">
              <RiAlertLine />
            </div>

            <section>
              <CardTitle className="text-xl font-sans font-bold">
                  Atenção com suas Finanças
              </CardTitle>
              <CardDescription className="text-base font-sans font-medium text-gray-500">
                Você precisa ajustar seu orçamento.
              </CardDescription>
            </section>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <section className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1 border rounded-lg bg-red-200 border-red-400 p-1">
                <RiAlertLine className="text-red-700" />
              </span>
              <p className="text-base font-medium text-gray-500">
                Suas despesas ultrapassam sua renda. Revise urgentemente seus
                gastos e veja o que pode ser cortado ou reduzido.
              </p>
            </section>
            <section className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1 border rounded-lg bg-red-200 border-red-400 p-1">
                <RiAlertLine className="text-red-700" />
              </span>
              <p className="text-base font-medium text-gray-500">
                Considere buscar uma renda extra ou renegociar dividas para
                equilibrar seu orcamento.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
