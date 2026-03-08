import SummaryCard from "./Features/Dashboard/SummaryCard";
import Expenses from "./Features/Expenses/Expenses";
import Incomes from "./Features/Income/Incomes";
import DetailsDate from "./Features/Layout/DetailsDate";
import Navbar from "./Features/Layout/Navbar";
import Notes from "./Features/Observations/Notes";
import MoneyCard from "./Features/Observations/MoneyCard";
import { ToastContainer } from "./Features/Layout/ToastContainer";

export default function App() {
  return (
    <div className="min-h-screen pb-20">
      <ToastContainer/>
      <Navbar />
      <DetailsDate />
      <SummaryCard />
      <div className="grid grid-cols-3 gap-6 mx-44 mt-6">
        <div className="col-span-2">
          <Incomes />
          <Expenses/>
        </div>
        <div className="col-span-1">
          <MoneyCard/>
          <Notes/>
        </div>
      </div>
    </div>
  );
}
