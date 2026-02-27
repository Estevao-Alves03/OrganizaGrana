import SummaryCard from "./Features/Dashboard/SummaryCard";
import ExpenseList from "./Features/Expenses/ExpenseList";
import ExpenseSection from "./Features/Expenses/ExpenseSection";
import GraphicsExpenses from "./Features/Expenses/GraphicsExpenses";
import DetailsDate from "./Features/Layout/DetailsDate";
import Navbar from "./Features/Layout/Navbar";
import General from "./Features/Observations/General";
import Tips from "./Features/Observations/Tips";

export default function App() {
  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <DetailsDate />
      <SummaryCard />
      <div className="grid grid-cols-3 gap-6 mx-44 mt-6">
        <div className="col-span-2">
          <ExpenseSection />
          <ExpenseList/>
          <GraphicsExpenses/>
        </div>
        <div className="col-span-1">
          <Tips/>
          <General/>
        </div>
      </div>
    </div>
  );
}
