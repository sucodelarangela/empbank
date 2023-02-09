import { useLocation, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';

import styles from './Login.module.sass';
import logo from '../../assets/logo.png';

export const Login = () => {
  let { pathname } = useLocation();

  return (
    <section className={styles.container}>
      <div className={styles.banner}></div>
      <form className={styles.form}>
        <img src={logo} alt="Bem vindo a Empbank" />
        <legend>Faça seu {pathname === '/login' ? 'login' : 'cadastro'}</legend>
        {pathname === '/register' && (
          <TextInput label='Nome completo' placeholder='Insira seu nome completo' radius="md" size="lg" />
        )}
        <TextInput label='Email' placeholder="Insira seu email" radius="md" size="lg" />
        <PasswordInput placeholder="Insira sua senha" label="Senha" radius="md" size="lg" />
        <Link to='/'><Button type="submit" radius="lg" size="xl" fullWidth uppercase>Fazer {pathname === '/login' ? 'login' : 'cadastro'}</Button></Link>
        {pathname === '/login' ? (
          <Link to='/register'><Button color='dark' radius="lg" size="xl" fullWidth uppercase>Criar conta</Button></Link>
        ) : (
          <Link to='/login'><Button color='dark' radius="lg" size="xl" fullWidth uppercase>Já tenho cadastro</Button></Link>
        )}
      </form>
    </section>
  );
};
