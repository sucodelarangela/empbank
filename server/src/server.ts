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

app.get('/transactions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const transactions = await prisma.transactions.findMany({
    where: {
      userId: id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return res.status(200).json(transactions);
});

app.get('/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      uuid: id
    }
  });
  return res.json({ user });
});

app.post('/transactions', async (req: Request, res: Response) => {
  const body = req.body;
  const transactions = await prisma.transactions.create({
    data: {
      title: body.title,
      value: body.value,
      category: body.category,
      type: body.type,
      userId: body.userId
    }
  });
  return res.status(201).json(transactions);
});

app.listen(port, () => {
  console.log('Database connected');
});