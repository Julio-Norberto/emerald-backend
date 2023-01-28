export interface IExpense {
  _id?: string,
  amount: number,
  type: string,
  date: Date,
  description?: string
}
