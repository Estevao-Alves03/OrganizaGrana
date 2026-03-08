import { SlCalender } from "react-icons/sl";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button } from "../../components/ui/button";
import { useFinanceStore } from "../../Store/FinanceStore";
import {
  formatMonth,
  changeMonth,
  getToday,
  isCurrentMonth,
  getCurrentMonth,
} from "../../Utils/Date";

export default function DetailsDate() {
  const { currentMonth, setCurrentMonth } = useFinanceStore();

  const realCurrentMonth = getCurrentMonth();
  const showCurrentButton = currentMonth !== realCurrentMonth;
  

  const monthLabel = isCurrentMonth(currentMonth)
    ? "Mês atual"
    : "Mês anterior";

  function hasDataInMonth(month: string) {
    const { transactions, notes } = useFinanceStore.getState();

    const hasTransaction = transactions.some((t) => t.month === month);
    const hasNotes = notes.some((n) => n.month === month);

    return hasTransaction || hasNotes;
  }

  function goToCurrentMonth() {
    setCurrentMonth(realCurrentMonth);
  }

  function handleNext() {
    const next = changeMonth(currentMonth, 1);

    console.log("current:", currentMonth);
    console.log("next:", next);

    setCurrentMonth(next);
  }

  function handlePrev() {
    let prev = changeMonth(currentMonth, -1);

    let attempts = 0;

    while (!hasDataInMonth(prev) && attempts < 24) {
      prev = changeMonth(prev, -1);
      attempts++;
    }

    if (hasDataInMonth(prev)) {
      setCurrentMonth(prev);
    }
  }
  return (
    <div className="mx-44 mt-6">
      <div className="flex justify-between items-center">
        <section className="flex items-center">
          <div className="bg-green-950 text-emerald-600 border border-emerald-600 px-2 py-2 rounded-lg mr-3">
            <SlCalender className="text-lg" />
          </div>
          <section>
            <h1 className="text-2xl font-bold text-white">{formatMonth(currentMonth)}</h1>
            <p className="text-base font-medium text-gray-300">{monthLabel}</p>
          </section>
        </section>
        <section className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            className="bg-green-800 text-white border border-emerald-600 hover:bg-green-900"
          >
            <IoChevronBack />
          </Button>

          {showCurrentButton && (
            <Button
              onClick={goToCurrentMonth}
              className="bg-green-800 text-white border border-emerald-600 hover:bg-green-900"
            >
              Mês atual
            </Button>
          )}

          <Button
            disabled={isCurrentMonth(currentMonth)}
            onClick={handleNext}
            className="bg-green-800 text-white border border-emerald-600 hover:bg-green-900 hover:text-white"
          >
            <IoChevronForward />
          </Button>
          <span className="text-lg font-semibold border border-emerald-600 px-2 py-1 bg-green-800 rounded-lg text-white">
            {getToday()}
          </span>
        </section>
      </div>
    </div>
  );
}
