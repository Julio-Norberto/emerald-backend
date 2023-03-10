import { Request, Response } from 'express'
import { User } from '../entities/user.js'
import { createUserToken } from '../helpers/create-user-token.js'
import { getToken } from '../helpers/get-token.js'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registerUser = async (req: Request, res: Response) => {
  const { name, login, password, confirmPassword } = req.body

  if(!name || !login || !password || !confirmPassword) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" })
  }

  if(password !== confirmPassword) {
    return res.status(422).json({ message: "as senhas divergem" })
  }

  const userExists = await User.findOne({ login: login })

  if(userExists) {
    return res.status(422).json({ message: "Este e-mail já está cadastrado!" })
  }

  // Create password
  const salt = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = new User({
    name,
    login,
    password: hashPassword
  })

  try {
    await user.save()
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" })
  }

  await createUserToken(user, req, res)
}

export const loginUser = async(req: Request, res: Response) => {
  const { login, password } = req.body

  if(!login || !password) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" })
  }

  const user = await User.findOne({ login: login })

  if(!user) {
    return res.status(404).json({ message: "Usuário não cadastrado" })
  }

  const checkIfPasswordMatch = await bcrypt.compare(password, user.password)

  if(!checkIfPasswordMatch) {
    return res.status(422).json({ message: "Senha ou login inválidos!" })
  }

  await createUserToken(user, req, res)
}
