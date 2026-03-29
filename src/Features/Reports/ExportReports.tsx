import { GrDocumentText, GrDownload } from "react-icons/gr";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function ExportReports() {
  return (
    <div className="mt-8 mx-44">
      <Card className="rounded-xl bg-slate-900 border-slate-600">
        <CardHeader>
          <CardTitle className="text-xl text-white font-bold">
            Exportar Dados
          </CardTitle>
          <CardDescription className="text-base font-medium text-slate-300">
            Selecione o formato e os meses para exportar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Formatos de exportaçao */}
          <h1 className="text-base text-white font-bold mb-3 mt-3">Formato</h1>
          <div className="grid grid-cols-2 gap-6">
            <Button className="h-auto p-6 rounded-xl border bg-slate-900 border-slate-600 hover:border-slate-400 hover:bg-transparent">
              <div className="flex flex-col items-center gap-1">
                <GrDocumentText className="!w-8 !h-8 shrink-0" />
                <h1 className="text-xl mt-3">CSV</h1>
                <span className="text-base font-medium text-slate-300">
                  Para Excel e Planilhas
                </span>
              </div>
            </Button>
            <Button className="h-auto p-6 rounded-xl border bg-slate-900 border-slate-600 hover:border-slate-400 hover:bg-transparent">
              <div className="flex flex-col items-center gap-1">
                <GrDocumentText className="!w-8 !h-8 shrink-0" />
                <h1 className="text-xl mt-3">TXT</h1>
                <span className="text-base font-medium text-slate-300">
                  Texto formatado
                </span>
              </div>
            </Button>
          </div>

          {/* Meses escolhidos */}
          <h1 className="text-base text-white font-bold mb-3 mt-6">Meses</h1>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Button className="h-auto p-4 font-medium text-base rounded-xl border bg-slate-900 border-slate-600 hover:border-slate-400 hover:bg-transparent">
              Todos os meses (0)
            </Button>
            <Button className="h-auto p-4 font-medium text-base rounded-xl border bg-slate-900 border-slate-600 hover:border-slate-400 hover:bg-transparent">
              Selecionar mês
            </Button>
          </div>
          <span className="text-slate-300 text-lg font-medium">Selecione os meses (0 selecionados)</span>
          <Button className="text-lg font-medium py-6 w-full mt-4 bg-green-700 hover:bg-green-800 rounded-xl">
            <GrDownload/>
            Exportar CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
