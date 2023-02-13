import styles from './Home.module.sass';
import logo from '../../assets/logo.png';
import { Button, Group, Paper, SimpleGrid, Text, TextInput } from '@mantine/core';
import { BsArrowUpCircle, BsArrowDownCircle, BsCurrencyDollar } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { Modal } from './Modal';
import { Table } from './Table';
import { calcValues } from '../../utils/calcValues';
import { useRefreshValue } from '../../context/RefreshContext';

export const Home = () => {
  // const { refresh } = useRefreshValue();
  const { income, outcome, total } = calcValues();

  return (
    <section className={styles.container}>
      <header>
        <img src={logo} alt='Sua carteira' />
        <Modal />
      </header>

      {/* DASHBOARD */}
      <SimpleGrid cols={3} spacing='xl' className={styles.dashboard}>
        <Paper withBorder p='md' radius='md'>
          <Group position='apart'>
            <Text>Entradas</Text>
            <BsArrowUpCircle color="#00B37E" size={32} />
          </Group>
          <Group>
            <Text className={styles.value}>R$ {income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </Group>
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Group position='apart'>
            <Text>Saídas</Text>
            <BsArrowDownCircle color="#F75A68" size={32} />
          </Group>
          <Group>
            <Text className={styles.value}>R$ {outcome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </Group>
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Group position='apart'>
            <Text>Total</Text>
            <BsCurrencyDollar color="#00B37E" size={32} />
          </Group>
          <Group>
            <Text className={styles.value}>R$ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </Group>
        </Paper>
      </SimpleGrid>

      {/* BUSCA */}
      <form className={styles.search}>
        <TextInput aria-label='Buscar transação' placeholder='Busque uma transação' radius='md' size='lg' />
        <Button leftIcon={<FiSearch />} variant='outline' radius='md' size='lg'>Buscar</Button>
      </form>

      {/* TABELA DE TRANSAÇÕES E PAGINAÇÃO */}
      <Table />
    </section >
  );
};
