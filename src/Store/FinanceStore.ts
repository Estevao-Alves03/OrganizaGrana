import {create} from "zustand"

interface Transaction {
    id: string;
    name: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    notes?: string;
}

interface FinanceState {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    removeTransaction: (id: string) => void

    getTotals: () => {
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }
    getExpensePercentage: () => number;
    getDistribuition: () => {
        emergency: number;
        invest: number;
        leisure: number;
        education: number;
        costs: number;
    }
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
    transactions:[],

    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [...state.transactions, transaction],
        })),
    removeTransaction: (id) => 
        set((state) => ({
            transactions: state.transactions.filter(t => t.id !== id),
        })),

    getTotals: () => {
        const { transactions } = get()

        const totals = transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === "income") {
                    acc.income += transaction.amount
                } else {
                    acc.expense += transaction.amount
                }
                return acc
            },
            {income: 0, expense: 0}
        )

        return {
            totalIncome: totals.income,
            totalExpense: totals.expense,
            balance: totals.income - totals.expense
        }
    },

    getExpensePercentage: () => {
        const {totalExpense, totalIncome} = get().getTotals()

        if (totalIncome === 0 ) return 0

        return (totalExpense / totalIncome ) * 100
    },

    getDistribuition: () => {
        const {balance} = get().getTotals()

        return {
            emergency: balance * 0.3,
            invest: balance * 0.2,
            leisure: balance * 0.2,
            education: balance * 0.15,
            costs: balance * 0.15,
        }
    },
}))
