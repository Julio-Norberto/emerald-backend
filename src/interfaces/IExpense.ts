export interface IExpense {
  _id?: string,
  amount: number,
  type: string,
  date: string,
  description?: string,
  userId: string
}
