import { useState, FormEvent, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Text, LoadingOverlay } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.sass';
import logo from '../../assets/logo.png';

export const Login = () => {
  const [error, setError] = useState<string>(''); // this is a front end error
  const [displayName, setDisplayName] = useState<string>(''); // this is a front end error
  const [email, setEmail] = useState<string>(''); // this is a front end error
  const [password, setPassword] = useState<string>(''); // this is a front end error
  const { login, createUser, error: authError, loading } = useAuth();
  let { pathname } = useLocation();
  const navigate = useNavigate();

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

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const user = { displayName, email, password };

    await createUser(user);
    navigate('/login');
  };

  // mostra erros de autenticação
  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  return (
    <section className={styles.container}>
      {loading && <LoadingOverlay visible />}
      <div className={styles.banner}></div>
      <form className={styles.form} onSubmit={pathname === '/login' ? handleSubmit : handleRegister}>
        <img src={logo} alt="Bem vindo a Empbank" />
        <legend>Faça seu {pathname === '/login' ? 'login' : 'cadastro'}</legend>
        {error && <Text fz='md' fw='bold' color='red' ta='center' className={styles.error}>{error}</Text>}
        {pathname === '/register' && (
          <TextInput
            label='Nome completo'
            placeholder='Insira seu nome completo'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            radius="md"
            size="lg"
          />
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
