import { create } from "zustand";
import type { Category } from "../Types/Category";

export interface Note {
  id: string;
  content: string;
  date: string; // formato ISO ou DD/MM/YYYY
  pinned: boolean;
  month: string; // "2026-03" para março/2026
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: "income" | "expense";
  category: Category;
  notes?: string;
  fixed?: boolean;
  month: string;
  hiddenMonths?: string[];
}

interface FinanceState {
  transactions: Transaction[];
  notes: Note[];
  
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransactionAmount: (id: string, amount: number) => void;
  
  // Métodos para notas
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  togglePinNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;
  getNotesByMonth: (month: string) => Note[];

  getTransactionsByMonth: (month: string) => Transaction[];
  removeTransactionByMonth: (id: string, month: string) => void;

  getTotals: () => {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
  getExpensePercentage: () => number;
  getDistribuition: () => {
    emergency: number;
    invest: number;
    leisure: number;
    education: number;
    costs: number;
  };
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],
  notes: [],

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  // ✅ AGORA ESTÁ DENTRO DO OBJETO
  updateTransactionAmount: (id, amount) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, amount } : t
      ),
    })),

  // Métodos para notas
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),

  togglePinNote: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      ),
    })),

  updateNote: (id, content) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, content } : n
      ),
    })),

  getNotesByMonth: (month) => {
    const { notes } = get();
    return notes.filter((n) => n.month === month);
  },

  getTotals: () => {
    const { transactions } = get();

    const totals = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount;
        } else {
          acc.expense += transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return {
      totalIncome: totals.income,
      totalExpense: totals.expense,
      balance: totals.income - totals.expense,
    };
  },

  getExpensePercentage: () => {
    const { totalExpense, totalIncome } = get().getTotals();
    if (totalIncome === 0) return 0;
    return (totalExpense / totalIncome) * 100;
  },

  getDistribuition: () => {
    const { balance } = get().getTotals();
    return {
      emergency: balance * 0.3,
      invest: balance * 0.2,
      leisure: balance * 0.2,
      education: balance * 0.15,
      costs: balance * 0.15,
    };
  },

  getTransactionsByMonth: (month: string) => {
    const { transactions } = get();
    return transactions.filter((t) => {
      if (t.fixed) {
        return !t.hiddenMonths?.includes(month);
      }
      return t.month === month;
    });
  },

  removeTransactionByMonth: (id, month) =>
    set((state) => ({
      transactions: state.transactions
        .map((t) => {
          if (t.id !== id) return t;
          if (t.fixed) {
            return {
              ...t,
              hiddenMonths: [...(t.hiddenMonths || []), month],
            };
          }
          return null;
        })
        .filter(Boolean) as Transaction[],
    })),
}));
