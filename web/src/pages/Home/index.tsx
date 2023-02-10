import styles from './Home.module.sass';
import logo from '../../assets/logo.png';
import { Button, Group, Pagination, Paper, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { FiSearch } from 'react-icons/fi';
import { BsArrowUpCircle, BsArrowDownCircle, BsCurrencyDollar } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

export const Home = () => {
  return (
    <section className={styles.container}>
      <header>
        <img src={logo} alt='Sua carteira' />
        <Button radius='md' size='lg'>Nova transação</Button>
      </header>

      {/* DASHBOARD */}
      <SimpleGrid cols={3} spacing='xl' className={styles.dashboard}>
        <Paper withBorder p='md' radius='md'>
          <Group position='apart'>
            <Text>Entradas</Text>
            <BsArrowUpCircle color="#00B37E" size={32} />
          </Group>
          <Group>
            <Text className={styles.value}>R$ 10.000,00</Text>
          </Group>
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Group position='apart'>
            <Text>Saídas</Text>
            <BsArrowDownCircle color="#F75A68" size={32} />
          </Group>
          <Group>
            <Text className={styles.value}>R$ 4.000,00</Text>
          </Group>
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Group position='apart'>
            <Text>Total</Text>
            <BsCurrencyDollar color="#00B37E" size={32} />
          </Group>
          <Group>
            <Text className={styles.value}>R$ 6.000,00</Text>
          </Group>
        </Paper>
      </SimpleGrid>

      {/* BUSCA */}
      <form className={styles.search}>
        <TextInput aria-label='Buscar transação' placeholder='Busque uma transação' radius='md' size='lg' />
        <Button leftIcon={<FiSearch />} variant='outline' radius='md' size='lg'>Buscar</Button>
      </form>

      {/* TABELA */}
      <Stack justify="flex-start" className={styles.table}>
        <Group position='center' className={styles.transaction}>
          <Text><FaCircle size={18} color='#F75A68' />Título da Saída</Text>
          <Text color='red'>- R$ 1.000,00</Text>
          <Text>Categoria da Saída</Text>
          <Text>01/01/2023</Text>
        </Group>
        <Group position='center' className={styles.transaction}>
          <Text><FaCircle size={18} color='#00B37E' />Título da Entrada</Text>
          <Text color='green'>R$ 1.000,00</Text>
          <Text>Categoria da Entrada</Text>
          <Text>01/01/2023</Text>
        </Group>
        <Group position='center' className={styles.transaction}>
          <Text><FaCircle size={18} color='#F75A68' />Título da Saída</Text>
          <Text color='red'>- R$ 1.000,00</Text>
          <Text>Categoria da Saída</Text>
          <Text>01/01/2023</Text>
        </Group>
        <Group position='center' className={styles.transaction}>
          <Text><FaCircle size={18} color='#00B37E' />Título da Entrada</Text>
          <Text color='green'>R$ 1.000,00</Text>
          <Text>Categoria da Entrada</Text>
          <Text>01/01/2023</Text>
        </Group>
        <Group position='center' className={styles.transaction}>
          <Text><FaCircle size={18} color='#F75A68' />Título da Saída</Text>
          <Text color='red'>- R$ 1.000,00</Text>
          <Text>Categoria da Saída</Text>
          <Text>01/01/2023</Text>
        </Group>
        <Group position='center' className={styles.transaction}>
          <Text><FaCircle size={18} color='#00B37E' />Título da Entrada</Text>
          <Text color='green'>R$ 1.000,00</Text>
          <Text>Categoria da Entrada</Text>
          <Text>01/01/2023</Text>
        </Group>
      </Stack>

      {/* PAGINAÇÃO */}
      <Pagination total={10} color="dark" withControls={false}></Pagination>
    </section >
  );
};
