export type Category = 
| "Moradia"
| "Transporte"
| "Alimentação"
| "Saúde"
| "Educação"
| "Lazer"
| "Serviços"
| "Outros"

export type Expense = {
    id: string;
    nameExpense: string;
    priceExpense: number;
    category: Category;
    observation?: string
}