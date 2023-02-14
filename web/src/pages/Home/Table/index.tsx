import styles from './Table.module.sass';
import { useEffect, useState } from 'react';
import { Group, Pagination, Stack, Text } from "@mantine/core";
import { FaCircle } from 'react-icons/fa';
import { api } from '../../../api/api';
import { useRefreshValue } from '../../../context/RefreshContext';

// tipagem do data retornado do fetch
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
  query: string;
}

export const Table = ({ userId, query }: Props) => {
  const { refresh } = useRefreshValue(); // estado para controle de re-renderização
  // estados para controle de paginação:
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIndex, setFirstIndex] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(10);
  // estado para renderização da tabela
  const [transactions, setTransactions] = useState([]);

  // usando a query do input de busca para filtrar em tempo real as transações do banco de dados e mostrar na tabela
  const filteredTransactions = transactions.filter((transaction: ITransaction) => {
    const title = transaction.title.toLowerCase();
    const category = transaction.category.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    return title.includes(normalizedQuery) || category.includes(normalizedQuery);
  });

  // faz o GET do banco de dados e alimenta o estado acima
  async function fetchData() {
    await fetch(`${api}/transactions/${userId}`)
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
      });
  }

  // carrega os dados pela primeira vez na tela
  useEffect(() => {
    fetchData();
  }, []);

  // recarrega os dados quando houver atualização
  useEffect(() => {
    fetchData();
  }, [refresh, userId]);

  // lidando com índices para listagem de paginação
  useEffect(() => {
    if (currentPage > 1) {
      setFirstIndex(currentPage * 10 - 10);
      setLastIndex(currentPage * 10);
    } else {
      setFirstIndex(0);
      setLastIndex(10);
    }
  }, [currentPage]);

  return (
    <>
      <Stack justify="flex-start" className={styles.table}>
        {!refresh && transactions.length === 0 && <Text ta='center'>Não há transações cadastradas</Text>}
        {!refresh && filteredTransactions && filteredTransactions.slice(firstIndex, lastIndex).map((transaction: ITransaction) => (
          <Group key={transaction.id} position='center' className={styles.transaction}>
            <Text className={styles.title}>
              <FaCircle size={18} color={transaction.type === 'income' ? '#00B37E' : '#F75A68'} />
              {transaction.title}
            </Text>
            <Text color={transaction.type === 'income' ? '#00B37E' : '#F75A68'} className={styles.title}>
              {transaction.type === 'income' ? `R$ ${transaction.value}` : `- R$ ${transaction.value}`}
            </Text>
            <Text className={styles.title}>
              {transaction.category}
            </Text>
            <Text className={styles.title}>
              {new Date(transaction.createdAt).toLocaleString().split(' ')[0]}
            </Text>
          </Group>
        ))}
      </Stack>

      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        total={Math.ceil(transactions ? transactions.length / 10 : 1)}
        color="dark"
        withControls={false}
      />
    </>
  );
};
