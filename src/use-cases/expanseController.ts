import { Request, Response } from 'express'
import { Expanse } from '../entities/expanse.js'
import { getToken } from '../helpers/get-token.js'
import { getUserByToken } from '../helpers/get-user-by-token.js'

export const registerExpanse = async(req: Request, res: Response) => {
  const { amount, type, date, description } = req.body

  // Validations
  if(!amount || !type || !date) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" })
  }

  const token = getToken(req)
  const objectUser = getUserByToken(token, res)

  const id: any = (await objectUser).valueOf()

  const expanse = new Expanse({
    amount,
    date,
    type,
    description,
    userId: id.id
  })

  try{
    await expanse.save()
    return res.status(201).json({ message: "sucesso!" })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" })
  }

}
