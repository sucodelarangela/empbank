import { useState, FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.sass';
import logo from '../../assets/logo.png';

export const Login = () => {
  const [error, setError] = useState<string>(''); // this is a front end error
  const [email, setEmail] = useState<string>(''); // this is a front end error
  const [password, setPassword] = useState<string>(''); // this is a front end error
  const { login } = useAuth();
  let { pathname } = useLocation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const user = {
      email,
      password,
    };
    const res = await login(user);
    return res;
  };

  console.log(email, password);

  return (
    <section className={styles.container}>
      <div className={styles.banner}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img src={logo} alt="Bem vindo a Empbank" />
        <legend>Faça seu {pathname === '/login' ? 'login' : 'cadastro'}</legend>
        {error && <p>{error}</p>}
        {pathname === '/register' && (
          <TextInput label='Nome completo' placeholder='Insira seu nome completo' radius="md" size="lg" />
        )}
        <TextInput
          label='Email'
          placeholder="Insira seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          radius="md"
          size="lg"
          required
        />
        <PasswordInput
          label="Senha"
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          radius="md"
          size="lg"
          required
        />
        <Button type="submit" radius="lg" size="xl" fullWidth uppercase>Fazer {pathname === '/login' ? 'login' : 'cadastro'}</Button>
        {pathname === '/login' ? (
          <Link to='/register'><Button color='dark' radius="lg" size="xl" fullWidth uppercase>Criar conta</Button></Link>
        ) : (
          <Link to='/login'><Button color='dark' radius="lg" size="xl" fullWidth uppercase>Já tenho cadastro</Button></Link>
        )}
      </form>
    </section>
  );
};
