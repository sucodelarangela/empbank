import styles from './Table.module.sass';
import { Group, Loader, Stack, Text } from "@mantine/core";
import { FaCircle } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
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

export const Table = () => {
  const { data: transactions, loading, error } = useFetch(`${api}/transactions`);

  return (
    <Stack justify="flex-start" className={styles.table}>
      {loading && <Loader style={{ margin: '0 auto' }} />}
      {error && <p>{error}</p>}
      {transactions && transactions.map((transaction: ITransaction) => (
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
  );
};
