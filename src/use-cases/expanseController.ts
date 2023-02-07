import { Request, Response } from 'express'
import { Expanse } from '../entities/expanse.js'
import { getToken } from '../helpers/get-token.js'
import { getUserByToken } from '../helpers/get-user-by-token.js'

export const registerExpanse = async(req: Request, res: Response) => {
  const { amount, type, expanseType, date, description } = req.body

  // Validations
  if(!amount || !type || !date || !expanseType) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" })
  }

  const token = getToken(req)
  const objectUser = getUserByToken(token, res)

  const id: any = (await objectUser).valueOf()

  const expanse = new Expanse({
    amount,
    date,
    type,
    expanseType,
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

export const searchUserExpanses = async(req: Request, res: Response) => {
  const id = req.params.id

  // Collects the id of the logged-in user through the token
  const token = getToken(req)
  const userToken = getUserByToken(token, res)

  // Extracts the id from the object resulting from the previous operation
  const userData: any = (await userToken).valueOf()
  const userIdToken = userData.id

  if(id !== userIdToken) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  const userExpanses = await Expanse.find({ userId: id })

  try {
    return res.status(200).json({ data: userExpanses })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" })
  }
}

export const updateUserExpanse = async(req: Request, res: Response) => {
  const id = req.params.id
  const { amount, type, date, description } = req.body

  if(!amount || !type || !date) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" })
  }

  const token = getToken(req)
  const userToken = getUserByToken(token, res)

  // Extracts the id from the object resulting from the previous operation
  const userData: any = (await userToken).valueOf()
  const userIdToken = userData.id

  const idTokenChecked = await Expanse.findOne({ userId: userIdToken })

  if(!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try {
    await Expanse.updateOne({ _id: id, userId: userIdToken }, { amount: amount, type: type, date: date, description: description })
    return res.status(200).json({ message: "Dados atualizados com sucesso!" })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" })
  }
}

export const removeUserExpanse = async(req: Request, res: Response) => {
  const id = req.params.id

  const token = getToken(req)
  const userToken = getUserByToken(token, res)

  // Extracts the id from the object resulting from the previous operation
  const userData: any = (await userToken).valueOf()
  const userIdToken = userData.id

  const idTokenChecked = await Expanse.findOne({ userId: userIdToken })

  if(!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try {
    await Expanse.deleteOne({ _id: id, userId: userIdToken })
    return res.status(200).json({ message: "Dados deletados com sucesso!" })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" })
  }

}

export const fetchUserExpansesById = async(req: Request, res: Response) => {
  const token = getToken(req)
  const userToken = getUserByToken(token, res)

  // Extracts the id from the object resulting from the previous operation
  const userData: any = (await userToken).valueOf()
  const userIdToken = userData.id

  const idTokenChecked = await Expanse.findOne({ userId: userIdToken })

  if(!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try {
    const data = await Expanse.find({ userId: userIdToken }).sort({ createdAt: -1 })
    return res.status(200).json(data)
  } catch(err) {

  }
}
