import SummaryCard from "./Features/Dashboard/SummaryCard";
import ExpenseSection from "./Features/Expenses/ExpenseSection";
import DetailsDate from "./Features/Layout/DetailsDate";
import Navbar from "./Features/Layout/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <DetailsDate />
      <SummaryCard />
      <div className="grid grid-cols-3 gap-6 mx-44 mt-6">
        <div className="col-span-2">
          <ExpenseSection />
        </div>
      </div>
    </div>
  );
}
