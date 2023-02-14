import styles from './Home.module.sass';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import { Button, Loader, TextInput } from '@mantine/core';
import { Modal } from './Modal';
import { Table } from './Table';
import { useRefreshValue } from '../../context/RefreshContext';
import { Dashboard } from './Dashboard';
import { useAuthValue } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../api/api';

interface IUser {
  id: string;
  uuid: string;
  email: number;
  name: string;
}

export const Home = () => {
  const { refresh } = useRefreshValue(); // estado para controle de re-renderização
  const { user }: any = useAuthValue(); // dados do usuário logado no Firebase
  const { logout } = useAuth();
  const [name, setName] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  async function getUserData() {
    await fetch(`${api}/user/${user.uid}`)
      .then(res => res.json())
      .then(data => setName(data.user.name));
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section className={styles.container}>
      <header>
        <img src={logo} alt='Sua carteira' />
        <Button color='dark' onClick={logout} variant='subtle'>Bem vindo(a), {name}. Clique aqui para sair.</Button>
        <Modal userId={user.uid} />
      </header>

      {/* DASHBOARD */}
      {refresh ? <Loader /> : <Dashboard userId={user.uid} />}

      {/* BUSCA */}
      <form className={styles.search}>
        <TextInput
          aria-label='Buscar transação'
          placeholder='Busque uma transação'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          radius='md'
          size='lg'
        />
        {/* Botão removido por ser desnecessário na busca ao se usar o onChange */}
        {/* <Button type='submit' leftIcon={<FiSearch />} variant='outline' radius='md' size='lg'>Buscar</Button> */}
      </form>;

      {/* TABELA DE TRANSAÇÕES E PAGINAÇÃO */}
      {refresh ? <Loader /> : <Table userId={user.uid} query={query} />}
    </section >
  );
};
