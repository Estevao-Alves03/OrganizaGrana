import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RiFilePaper2Line } from "react-icons/ri";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import NotesItem from "./NotesItem";
import { useFinanceStore } from "../../Store/FinanceStore";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";

export default function Notes() {
  const [newNote, setNewNote] = useState("");
  const [page, setPage] = useState(1);

  const NOTES_PER_PAGE = 3;
  const currentMonth = useMemo(() => new Date().toISOString().slice(0, 7), []);

  const allNotes = useFinanceStore((state) => state.notes);

  const notes = useMemo(() => {
    return allNotes.filter((note) => note.month === currentMonth);
  }, [allNotes, currentMonth]);

  const addNote = useFinanceStore((state) => state.addNote);
  const removeNote = useFinanceStore((state) => state.removeNote);
  const togglePinNote = useFinanceStore((state) => state.togglePinNote);
  const updateNote = useFinanceStore((state) => state.updateNote);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }, [notes]);

  const pinnedNotes = sortedNotes.filter((note) => note.pinned);
  const normalNotes = sortedNotes.filter((note) => !note.pinned);

  const totalPages = Math.ceil(normalNotes.length / NOTES_PER_PAGE);

  const paginatedNotes = useMemo(() => {
    const start = (page - 1) * NOTES_PER_PAGE;
    const end = start + NOTES_PER_PAGE;
    return normalNotes.slice(start, end);
  }, [normalNotes, page]);

  const handleSaveNote = () => {
    if (!newNote.trim()) return;

    addNote({
      id: crypto.randomUUID(),
      content: newNote,
      date: new Date().toLocaleDateString("pt-BR"),
      pinned: false,
      month: currentMonth,
    });

    setNewNote("");
  };

  return (
    <div className="mt-6 space-y-6">
      {/* CARD 1 - Criar nota */}
      <Card className="shadow-xl bg-slate-900 border-slate-600">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="text-2xl px-1.5 py-1.5 rounded-lg bg-amber-950 text-amber-600 border border-amber-600">
              <RiFilePaper2Line />
            </div>

            <section>
              <CardTitle className="text-xl font-sans font-bold text-white">
                Observações Gerais
              </CardTitle>
              <CardDescription  className="text-md font-sans font-medium text-gray-300">Anote lembretes sobre este mês</CardDescription>
            </section>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Ex: Lembrar de pagar o cartão até dia 15..."
            className="rounded-xl border border-gray-500 !min-h-[120px] text-white placeholder:text-gray-300 placeholder:text-lg !text-lg !font-medium focus:!ring-2 focus:!ring-green-600 focus:!outline-none"
          />

          <section className="text-right">
            <Button
              onClick={handleSaveNote}
              className="w-[150px] mt-2 bg-green-800 hover:bg-green-900 border border-green-600 font-bold px-5 py-3 text-base"
            >
              Salvar
            </Button>
          </section>
        </CardContent>
      </Card>

      {/* CARD 2 - Lista de notas (só aparece se houver notas) */}
      {sortedNotes.length > 0 && (
        <Card className="shadow-xl overflow-hidden bg-slate-900 border-slate-600 ">
          <CardContent className="p-6 space-y-6">
            {/* NOTAS FIXADAS */}
            {pinnedNotes.length > 0 && (
              <div className="space-y-3 ">
                <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                  <span>📌</span> Fixadas
                </p>
                <div className="space-y-3">
                  {pinnedNotes.map((note) => (
                    <NotesItem
                      key={note.id}
                      id={note.id}
                      content={note.content}
                      date={note.date}
                      pinned={note.pinned}
                      onDelete={removeNote}
                      onTogglePin={togglePinNote}
                      onUpdate={updateNote}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* NOTAS NORMAIS */}
            {normalNotes.length > 0 && (
              <div className="space-y-3 ">
                {pinnedNotes.length > 0 && (
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-2 pt-2 border-t">
                    <span>📄</span> Outras
                  </p>
                )}
                <div className="space-y-3">
                  {paginatedNotes.map((note) => (
                    <NotesItem
                      key={note.id}
                      id={note.id}
                      content={note.content}
                      date={note.date}
                      pinned={note.pinned}
                      onDelete={removeNote}
                      onTogglePin={togglePinNote}
                      onUpdate={updateNote}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* PAGINAÇÃO (FORA DO CARD DAS NOTAS) */}
            {totalPages > 1 && (
              <div className="pt-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className={page === 1 ? "pointer-events-none text-white font-bold" : "cursor-pointer text-white hover:bg-white/10"}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      const isActive = page === pageNumber;

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={isActive}
                            onClick={() => setPage(pageNumber)}
                            className={
                              isActive
                                ? "bg-green-600 text-white hover:bg-green-700 border-green-600"
                                : "hover:bg-green-100 hover:text-green-700 cursor-pointer text-white"
                            }
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className={page === totalPages ? "pointer-events-none text-white font-bold" : "cursor-pointer text-white hover:bg-white/10"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}