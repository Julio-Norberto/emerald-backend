import { Schema, model } from 'mongoose'
import { IExpense } from '../interfaces/IExpense'

const expanse = new Schema<IExpense>({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  expanseType: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: false },
  userId: { type: String, required: true }
}, {
  timestamps: true
})

export const Expanse = model<IExpense>('expanse', expanse)
