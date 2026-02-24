// arquivo que contem um campo de anotaçoes, facil memorizaçao de custos monetarios mensais
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RiFilePaper2Line } from "react-icons/ri";
import { Textarea } from "../../components/ui/textarea";

export default function General() {
  return (
    <div className="mt-6">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-2xl border px-1.5 py-1.5 rounded-lg text-amber-700 bg-amber-100">
              <RiFilePaper2Line />
            </div>
            <section>
              <CardTitle className="text-lg font-sans font-bold">
                Observações Gerais
              </CardTitle>
              <CardDescription className="text-md font-sans text-gray-500">
                Anote lembretes sobre este mês
              </CardDescription>
            </section>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ex: Lembrar de pagar o cartão até dia 15, renegociar internet no proximo mês, etc."
            className="rounded-xl border border-gray-200 
             placeholder:font-sans placeholder:text-base 
             !h-[90px] !text-base placeholder:font-semibold font-semibold
             focus:!ring-2 focus:!ring-green-500 focus:!outline-none
             "
          />
        </CardContent>
      </Card>
    </div>
  );
}
