import { SlCalender } from "react-icons/sl";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button } from "../../components/ui/button";

export default function DetailsDate() {
  return (
    <div className="mx-44 mt-6">
      <div className="flex justify-between items-center">
        <section className="flex items-center">
          <div className="bg-green-200 text-green-800 px-2 py-2 rounded-lg mr-3">
            <SlCalender className="text-lg" />
          </div>
          <section>
            <h1 className="text-2xl font-bold">Fevereiro de 2026</h1>
            <p className="text-base font-medium text-gray-500">Mês atual</p>
          </section>
        </section>
        <section className="flex items-center gap-2">
          <Button className="bg-white text-black border hover:bg-green-600 hover:text-white">
            <IoChevronBack />
          </Button>
          <Button className="bg-white text-black border hover:bg-green-600 hover:text-white">
            <IoChevronForward />
          </Button>
          <span className="text-lg font-semibold border px-2 py-1 bg-green-600 rounded-lg text-white">23/02</span>
        </section>
      </div>
    </div>
  );
}
