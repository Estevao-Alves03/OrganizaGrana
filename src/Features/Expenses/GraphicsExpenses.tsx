// esse arquivo é onde vou fazer o card dos graficos sobre as despesas
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export default function GraphicsExpenses() {
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold font-sans">Visão geral dos gastos</CardTitle>
          <CardDescription className="text-base text-gray-500">Total: R$ 0,00 em X depesas</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="category" className="w-full">
            {/* Tabs */}
            <TabsList className="border p-1 rounded-lg w-full">
              <TabsTrigger
                value="category"
                className="flex-1 rounded-md"
              >
                Por Categoria
              </TabsTrigger>

              <TabsTrigger
                value="expense"
                className="flex-1 rounded-md"
              >
                Por Despesa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="category" className="mt-6">
              <div className="flex gap-10 items-center">
                {/* Aqui entra o gráfico */}
                <div className="w-[250px] h-[250px]">
                  {/* Recharts PieChart aqui */}
                </div>

                {/* Lista lateral */}
                <div className="flex flex-col gap-3 text-sm">
                  {/* <Item
                    legenda="Outros"
                    valor="R$ 2.000,00"
                    porcentagem="31%"
                    cor="bg-gray-400"
                  />
                  <Item
                    legenda="Transporte"
                    valor="R$ 1.000,00"
                    porcentagem="16%"
                    cor="bg-blue-500"
                  />
                  <Item
                    legenda="Alimentação"
                    valor="R$ 1.000,00"
                    porcentagem="16%"
                    cor="bg-orange-500"
                  /> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
