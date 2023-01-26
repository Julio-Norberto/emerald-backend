import mongoose from "mongoose";
import { config } from 'dotenv'

config()

mongoose.set("strictQuery", false);

async function main() {
  const dbUser = process.env.DB_USER
  const dbPassword = process.env.DB_PASS

  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@emeralddatabase.fmkyh8d.mongodb.net/?retryWrites=true&w=majority`)
  console.log('Banco de dados conectado com sucesso!')
}

main().catch((err) => console.log(err))
