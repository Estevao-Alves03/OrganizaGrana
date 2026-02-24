// este arquivo vai mostrar quando o saldo final estiver negativo 
import { RiAlertLine } from "react-icons/ri";


export default function Alert() {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <section className="flex items-start gap-2">
          <span className="flex-shrink-0 mt-1 border rounded-lg bg-red-200 p-0.5">
            <RiAlertLine className="text-red-600" />
          </span>
          <p>
            Suas despesas ultrapassam sua renda. Revise urgentemente seus gastos
            e veja o que pode ser cortado ou reduzido.
          </p>
        </section>
        <section className="flex items-start gap-2">
          <span className="flex-shrink-0 mt-1 border rounded-lg bg-red-200 p-0.5">
            <RiAlertLine className="text-red-600" />
          </span>
          <p>
            Considere buscar uma renda extra ou renegociar dividas para
            equilibrar seu orcamento.
          </p>
        </section>
      </div>
    </div>
  );
}
