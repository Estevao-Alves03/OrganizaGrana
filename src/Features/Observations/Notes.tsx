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
import { Button } from "../../components/ui/button";
import NotesItem from "./NotesItem";

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
              <CardTitle className="text-xl font-sans font-bold">
                Observações Gerais
              </CardTitle>
              <CardDescription className="text-base font-medium font-sans text-gray-500">
                Anote lembretes sobre este mês
              </CardDescription>
            </section>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Textarea
            placeholder="Ex: Lembrar de pagar o cartão até dia 15, renegociar internet no proximo mês, etc."
            className="rounded-xl border border-gray-200 
             placeholder:font-sans placeholder:text-base 
             !min-h-[120px] !text-base placeholder:font-medium font-medium
             focus:!ring-2 focus:!ring-green-500 focus:!outline-none
             "
          />
          <section className="text-right">
            <Button 
            className="w-[150px] mt-2 text-base font-bold bg-green-700 hover:bg-green-800 cursor-pointer"
            >
            Salvar</Button>
          </section>

         {/* <NotesItem/> */}
        </CardContent>
      </Card>
    </div>
  );
}
