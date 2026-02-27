// arquivo que calcula o que fazer com o restante do dinheiro - arquivo que mostra quando nao tem nada
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FaRegLightbulb } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Distribution from "./Distribution";
import Alert from "./Alert";

export default function Tips() {
  return (
    <div>
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-2xl border px-1.5 py-1.5 rounded-lg text-green-700 bg-green-100">
              <FaRegLightbulb />
            </div>

            <section>
              <CardTitle className="text-lg font-sans font-bold">
                Dicas para o seu dinheiro
                {/* Atencao com suas Financas    */}
              </CardTitle>
              <CardDescription className="text-md font-sans text-gray-500">
                Preencha suas rendas e despesas
                {/* Você tem R$ 00,00 para distribuir */}
                {/* Voce precisa ajustar seu orcamento */}
              </CardDescription>
            </section>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 mt-1 border rounded-lg bg-green-200 p-0.5">
              <IoMdCheckmarkCircleOutline className="text-green-700" />
            </span>
            <p>
              Comece adicionando suas fontes de renda e depois cadastre as
              despesas do mes.
            </p>
          </div>
          {/* <Distribution/> */}
          {/* <Alert/> */}
        </CardContent>
      </Card>
    </div>
  );
}
