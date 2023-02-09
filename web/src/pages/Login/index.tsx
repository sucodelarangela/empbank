import { useLocation, Link } from 'react-router-dom';

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
          <>
            <label htmlFor="fullname">Nome completo</label>
            <input
              type="text"
              id="fullname"
              placeholder='Insira seu nome completo'
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder='Insira seu email'
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder='Insira sua senha'
        />
        <button type="submit">Fazer {pathname === '/login' ? 'login' : 'cadastro'}</button>
        {pathname === '/login' ? (
          <Link to='/register' className={styles.redirect}>Criar conta</Link>
        ) : (
          <Link to='/login' className={styles.redirect}>Já tenho cadastro</Link>
        )}
      </form>
    </section>
  );
};
