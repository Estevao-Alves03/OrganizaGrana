// ARQUIVO QUE MOSTRA OS CARDS (PIXXA E BARRA)
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../components/ui/chart";
import { Pie, PieChart, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";
// import { ExpensesMock } from "../../Mocks/ExpensesExamples";
import { categoryColors } from "../../Utils/categoryColors";
import type { Expense } from "../../Types/Expense";

interface GraphicsExpensesProps {
  expenses: Expense[];
}

export default function GraphicsExpenses({ expenses }: GraphicsExpensesProps) {
  const chartData = Object.values(
    expenses.reduce(
      (acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = {
            category: expense.category,
            value: 0,
            fill: categoryColors[expense.category] ?? "#999",
          };
        }

        acc[expense.category].value += expense.priceExpense;

        return acc;
      },
      {} as Record<string, { category: string; value: number; fill: string }>,
    ),
  );

  const chartConfig = {
    value: {
      label: "Valor",
    },
  } satisfies ChartConfig;

  return (
    <div className="mt-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-sans">
            Visão geral dos gastos
          </CardTitle>
          <CardDescription className="text-base font-sans font-medium text-gray-500">
            Total: R$ 0,00 em X depesas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="category" className="w-full">
            {/* Tabs */}
            <TabsList className="border p-1 rounded-lg w-full h-[45px]">
              <TabsTrigger value="category" className="flex-1 rounded-md text-lg font-semibold">
                Por Categoria
              </TabsTrigger>

              <TabsTrigger value="expense" className="flex-1 rounded-md text-lg font-semibold">
                Por Despesa
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="category"
              className="grid grid-cols-2 gap-8 items-center mt-6"
            >
              {(() => {
                // cria uma cópia e ordena do maior para o menor
                const sortedChartData = chartData
                  .slice()
                  .sort((a, b) => b.value - a.value);
                const total = sortedChartData.reduce(
                  (acc, curr) => acc + curr.value,
                  0,
                );

                return (
                  <>
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-[350px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={sortedChartData}
                          dataKey="value"
                          nameKey="category"
                          innerRadius={30}
                          outerRadius={120}
                          paddingAngle={1}
                          label={({ percent }) =>
                            `${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {sortedChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>

                    <div className="flex flex-col gap-3 w-full">
                      {sortedChartData.map((item, index) => {
                        const percentage = ((item.value / total) * 100).toFixed(
                          1,
                        );
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <span
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: item.fill }}
                            />
                            <span className="flex-1 text-base text-gray-700 font-medium">
                              {item.category}
                            </span>
                            <span className="font-mono text-base text-gray-700">
                              R$ {item.value.toLocaleString("pt-BR")}
                            </span>
                            <span className="w-14 text-right font-mono font-medium text-gray-800 text-sm text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </TabsContent>
            
            <TabsContent value="expense" className="w-full mt-6">
              {/* cria uma cópia do chartData e ordena do maior para o menor */}
              {(() => {
                const sortedChartData = chartData
                  .slice()
                  .sort((a, b) => b.value - a.value);
                return (
                  <ChartContainer
                    config={chartConfig}
                    className="h-[350px] w-full"
                  >
                    <BarChart
                      data={sortedChartData}
                      layout="vertical"
                      barCategoryGap={17}
                      margin={{ left: 20, right: 20 }}
                    >
                      <YAxis
                        dataKey="category"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                      />
                      <XAxis
                        type="number"
                        tickFormatter={(valeu: number) =>
                          `R$ ${valeu.toLocaleString("pt-BR")}`
                        }
                      />
                      <ChartTooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;

                          const data = payload[0].payload;

                          return (
                            <div className="bg-white border rounded-md p-2 shadow-sm text-sm">
                              <p className="font-medium">{data.category}</p>
                              <p className="font-mono">
                                R$ {data.value.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="value"
                        layout="vertical"
                        radius={5}
                        barSize={30}
                      >
                        {sortedChartData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                );
              })()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
