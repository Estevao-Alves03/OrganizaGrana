import { Card, CardContent } from "../../components/ui/card";
import { FaEdit, FaTrash } from "react-icons/fa";


export default function NotesItem() {
  return (
    <Card className="mt-3 border">
      <CardContent className="flex flex-col gap-2 px-2.5 py-2 border border-amber-500 bg-amber-100 rounded-lg">
        {/* Texto da nota */}
        <p className="text-gray-700 font-semibold text-base font-sans line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        
        {/* Rodapé com data e botões */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-900 font-bold text-sm">01/03/2026</span>

          <div className="flex gap-2">
            <button
              className="p-1 text-zinc-500 hover:text-zinc-800"
              aria-label="Editar nota"
            >
              <FaEdit />
            </button>
            <button
              className="p-1 text-red-600 hover:text-red-500"
              aria-label="Excluir nota"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}