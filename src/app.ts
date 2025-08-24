import express from 'express'
import { PrismaClient } from '@prisma/client'
import { AppError } from '../utils/AppError'
import { errorHandling } from '../middleware/errorHandling'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.post("/users", async (request, response) => {
  const { name, email, profession } = request.body

  const existUser = await prisma.user.findUnique({ where: { email } })
  if (existUser) {
    throw new AppError("User with same email already exists")
  }

  const user = await prisma.user.create({ data: { name, email, profession } })

  response.status(201).json(user)
})

app.get("/users", async (request, response) => {
  const users = await prisma.user.findMany()

  response.status(200).json(users)
})

app.put("/users/:id", async (request, response) => {
  const { id } = request.params
  const { name, email, profession } = request.body

  const existUser = await prisma.user.findUnique({ where: { id: Number(id) } })
  if (!existUser) {
    throw new AppError("User not found")
  }

  const existEmail = await prisma.user.findUnique({ where: { email } })
  if (existEmail) {
    throw new AppError("User with same email already exists")
  }


  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email, profession }
  })

  response.status(200).json(user)

})

app.delete("/users/:id", async (request, response) => {
  const { id } = request.params

  const existUser = await prisma.user.findUnique({ where: { id: Number(id) } })
  if (!existUser) {
    throw new AppError("user not found")
  }

  await prisma.user.delete({ where: { id: Number(id) } })

  response.status(200).json({ message: "user deleted" })
})

app.use(errorHandling)

export { app }
