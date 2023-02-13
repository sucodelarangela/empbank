import styles from './Dashboard.module.sass';
import { useState, useEffect } from 'react';
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { BsArrowDownCircle, BsArrowUpCircle, BsCurrencyDollar } from "react-icons/bs";
import { useRefreshValue } from '../../../context/RefreshContext';
import { api } from '../../../api/api';

interface ITransaction {
  id: string;
  title: string;
  value: number;
  category: string;
  type: string;
  createdAt: string;
  userId: string;
}

interface Props {
  userId: string;
}

export const Dashboard = ({ userId }: Props) => {
  const { refresh } = useRefreshValue(); // estado para controle de re-renderização
  // estado para o gerenciamento da dashboard
  const [values, setValues] = useState({
    income: 0,
    outcome: 0,
    total: 0
  });

  // faz o GET dos valores salvos por transação, fazendo os cálculos necessários para entradas, saídas e total e salvando tais valores no estado acima
  async function calcValues() {
    let income = 0;
    let outcome = 0;
    await fetch(`${api}/transactions/${userId}`)
      .then(res => res.json())
      .then(data => {
        data.forEach((transaction: ITransaction) => {
          if (transaction.type === 'income') {
            income += transaction.value;
          }
          if (transaction.type === 'outcome') {
            outcome += transaction.value;
          }
        });
        setValues({ income: income, outcome: outcome, total: income - outcome });
      });
  }

  // carrega os valores da dashboard no primeiro loading
  useEffect(() => {
    calcValues();
  }, []);

  // carrega os valores da dashboard ao salvar novos dados
  useEffect(() => {
    calcValues();
  }, [refresh]);

  return (
    <SimpleGrid cols={3} spacing='xl' className={styles.dashboard}>
      <Paper withBorder p='md' radius='md'>
        <Group position='apart'>
          <Text>Entradas</Text>
          <BsArrowUpCircle color="#00B37E" size={32} />
        </Group>
        <Group>
          <Text className={styles.value}>R$ {values.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </Group>
      </Paper>
      <Paper withBorder p='md' radius='md'>
        <Group position='apart'>
          <Text>Saídas</Text>
          <BsArrowDownCircle color="#F75A68" size={32} />
        </Group>
        <Group>
          <Text className={styles.value}>R$ {values.outcome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </Group>
      </Paper>
      <Paper withBorder p='md' radius='md'>
        <Group position='apart'>
          <Text>Total</Text>
          <BsCurrencyDollar color="#00B37E" size={32} />
        </Group>
        <Group>
          <Text className={styles.value}>R$ {values.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </Group>
      </Paper>
    </SimpleGrid>
  );
};
