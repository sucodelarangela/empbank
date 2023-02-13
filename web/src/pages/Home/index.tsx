import styles from './Home.module.sass';
import logo from '../../assets/logo.png';
import { Button, Loader, TextInput } from '@mantine/core';
import { FiSearch } from 'react-icons/fi';
import { Modal } from './Modal';
import { Table } from './Table';
import { useRefreshValue } from '../../context/RefreshContext';
import { Dashboard } from './Dashboard';

export const Home = () => {
  const { refresh } = useRefreshValue(); // estado para controle de re-renderização

  return (
    <section className={styles.container}>
      <header>
        <img src={logo} alt='Sua carteira' />
        <Modal />
      </header>

      {/* DASHBOARD */}
      {refresh ? <Loader /> : <Dashboard />}

      {/* BUSCA */}
      <form className={styles.search}>
        <TextInput aria-label='Buscar transação' placeholder='Busque uma transação' radius='md' size='lg' />
        <Button leftIcon={<FiSearch />} variant='outline' radius='md' size='lg'>Buscar</Button>
      </form>

      {/* TABELA DE TRANSAÇÕES E PAGINAÇÃO */}
      {refresh ? <Loader /> : <Table />}
    </section >
  );
};
