// importando express e cors
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

// importando prisma client
import { PrismaClient } from '@prisma/client';

// criando o server
const app: Express = express();
app.use(express.json());
app.use(cors());

// definindo uma porta para rodar o servidor
const port = process.env.PORT || 8000;

// conectando ao banco de dados com uma instância do Prisma Client
const prisma = new PrismaClient();

app.get('/transactions', async (req: Request, res: Response) => {
  const transactions = await prisma.transactions.findMany();
  return res.status(200).json(transactions);
});

app.listen(port, () => {
  console.log('Database connected');
});