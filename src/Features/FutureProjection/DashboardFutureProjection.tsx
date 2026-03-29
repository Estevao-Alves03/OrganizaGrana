import { BsGraphUp } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FaArrowTrendUp, FaWallet } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export default function DashboardFutureProjection() {
  return (
    <div className="mx-44 mt-6 w-[1600px]">
      <div className="flex items-center justify-between">
        <section>
          <h1 className="text-3xl font-bold text-white">Projecao Futura</h1>
          <p className="text-xl font-medium text-gray-300">
            Visualize seus proximos meses com base nas rendas e despesas fixas
          </p>
        </section>
        <section>
          <Tabs defaultValue="bars" className="w-[420px]">
            <TabsList className="border p-1 rounded-lg  h-[40px] bg-slate-900 border-slate-600 ">
              <TabsTrigger
                value="bars"
                className="flex-1 rounded-md text-base font-semibold gap-2"
              >
                <VscGraph />
                Barras
              </TabsTrigger>
              <TabsTrigger
                value="lines"
                className="flex-1 rounded-md text-base font-semibold gap-2"
              >
                <BsGraphUp />
                Linhas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bars"></TabsContent>
            <TabsContent value="lines"></TabsContent>
          </Tabs>
        </section>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-6 w-[1380px]">
        {/* Meses registrados */}
        <Card className="rounded-xl bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="mt-4">
              <div className="flex items-center gap-6">
                <div className="border rounded-xl p-3 bg-green-900 text-green-600 border-green-600">
                  <FaWallet className="text-2xl" />
                </div>
                <section>
                  <h1 className="text-base text-slate-400 font-medium">
                    Renda fixa mensal
                  </h1>
                  <p className="text-2xl text-white font-bold">R$00,00</p>
                </section>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* total da receita */}
        <Card className="rounded-xl bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="mt-4">
              <div className="flex items-center gap-6">
                <div className="border rounded-xl p-3 bg-red-900 text-red-300 border-red-600">
                  <FaArrowTrendUp className="text-xl" />
                </div>
                <section>
                  <h1 className="text-base text-slate-400 font-medium">
                    Despesas fixas
                  </h1>
                  <p className="text-2xl text-white font-bold">R$: 00,00</p>
                </section>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* total da despesa */}
        <Card className="rounded-xl bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="mt-4">
              <div className="flex items-center gap-6">
                <div className="border rounded-xl p-3 bg-green-900 text-green-300 border-green-600">
                  <IoMdCheckmarkCircleOutline className="text-xl" />
                </div>
                <section>
                  <h1 className="text-base text-slate-400 font-medium">
                    Saldo projetado total
                  </h1>
                  <p className="text-2xl text-white font-bold">R$: 00,00</p>
                </section>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* total da despesa */}
        <Card className="rounded-xl bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="mt-4">
              <div className="flex items-center gap-6">
                <div className="border rounded-xl p-3 bg-blue-900 text-blue-300 border-blue-600">
                  <CiCalendar className="text-xl" />
                </div>
                <section>
                  <h1 className="text-base text-slate-400 font-medium">
                    Meses projetados
                  </h1>
                  <p className="text-2xl text-white font-bold">6 meses</p>
                </section>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-xl bg-slate-900 border-slate-600 w-[1380px]">
          <CardHeader>
            <div className="flex items-center justify-between mt-10">
              <CardTitle className="text-slate-400">
                Projetar para os proximos:
              </CardTitle>
              <div className="text-slate-400 flex items-center gap-4">
                <button className="border rounded-md p-2">
                  <MdOutlineKeyboardArrowLeft />
                </button>
                <h1 className="text-slate-400 font-bold">6 meses</h1>
                <button className="border rounded-md p-2">
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
