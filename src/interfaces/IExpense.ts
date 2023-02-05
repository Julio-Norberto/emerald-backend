export interface IExpense {
  _id?: string,
  amount: number,
  type: string,
  expanseType: 'entrada' | 'saida'
  date: string,
  description?: string,
  userId: string
}
