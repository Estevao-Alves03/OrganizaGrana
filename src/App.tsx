import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import SummaryCard from "./Features/Dashboard/SummaryCard";
import Expenses from "./Features/Expenses/Expenses";
import Incomes from "./Features/Income/Incomes";
import DetailsDate from "./Features/Navbar/DetailsDate";
import MoneyCard from "./Features/Observations/MoneyCard";
import Notes from "./Features/Observations/Notes";
import AppSideBar from "./Features/SideBar/AppSideBar";
import { ToastContainer } from "./Features/Warnings/ToastContainer";

export default function App() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSideBar/>
        <div className="flex-1 pb-20">
          <ToastContainer />
          <div className="px-4 mt-2">
            <SidebarTrigger className="bg-slate-900 border-slate-600 text-slate-300"/>
          </div>
          {/* <Navbar /> */}
          <DetailsDate />
          <SummaryCard />
          <div className="grid grid-cols-3 gap-6 mx-44 mt-6">
            <div className="col-span-2">
              <Incomes />
              <Expenses />
            </div>
            <div className="col-span-1">
              <MoneyCard />
              <Notes />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
