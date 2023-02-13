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

export const Table = () => {
  const { refresh } = useRefreshValue(); // estado para controle de re-renderização
  // estados para controle de paginação:
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIndex, setFirstIndex] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(10);
  // estado para renderização da tabela
  const [transactions, setTransactions] = useState([]);

  // faz o GET do banco de dados e alimenta o estado acima
  async function fetchData() {
    await fetch(`${api}/transactions`)
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
  }, [refresh]);

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
        {!refresh && transactions && transactions.slice(firstIndex, lastIndex).map((transaction: ITransaction) => (
          <Group key={transaction.id} position='center' className={styles.transaction}>
            <Text>
              <FaCircle size={18} color={transaction.type === 'income' ? '#00B37E' : '#F75A68'} />
              {transaction.title}
            </Text>
            <Text color={transaction.type === 'income' ? '#00B37E' : '#F75A68'}>
              {transaction.type === 'income' ? `R$ ${transaction.value}` : `- R$ ${transaction.value}`}
            </Text>
            <Text>
              {transaction.category}
            </Text>
            <Text>
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
