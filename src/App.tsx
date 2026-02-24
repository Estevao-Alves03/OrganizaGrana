import SummaryCard from "./Features/Dashboard/SummaryCard";
import DetailsDate from "./Features/Layout/DetailsDate";
import Navbar from "./Features/Layout/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <DetailsDate/>
      <SummaryCard />
    </div>
  );
}
