export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}
