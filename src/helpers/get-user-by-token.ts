import { Response } from 'express'
import  jwt from 'jsonwebtoken'

import { config } from 'dotenv'
config()

export const getUserByToken = async(token, res: Response) => {
  if(!token) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  const secret: string | undefined = process.env.TOKEN

  const decoded: any = jwt.verify(token, secret!)

  const userId = decoded.id

  return userId
}
