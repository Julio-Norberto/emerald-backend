import { Request, Response } from 'express'
import { Expanse } from '../entities/expanse.js'

export const registerExpanse = (req: Request, res: Response) => {
  const { amount, type, date, description } = req.body

  // Validations
  if(!amount || !type || !date) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" })
  }


}
