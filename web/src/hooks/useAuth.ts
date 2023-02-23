import { api } from './../api/api';
// eslint-disable-next-line no-unused-vars
import { app, secondaryApp } from '../firebase/config'; // instância do firebase em config
// import { api } from '../api/api'; // url do backend
import { useState, useEffect } from 'react';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

interface IData {
  displayName?: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [alert, setAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [cancelled, setCancelled] = useState(false); // CLEANUP

  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  // CADASTRANDO NOVO USUÁRIO
  const createUser = async (data: IData) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(secondaryApp),
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      })
        .then(() => {
          fetch(`${api}/user/${user.uid}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: user.email, name: user.displayName })
          });
          setAlert(true);
        })
        .catch((error) => {
          setError(error);
        });

      setLoading(false);
      setTimeout(() => {
        setAlert(false);
      }, 4000);

      return user;
    } catch (error: any) {
      console.error(error.message);
      console.error(typeof error.message);

      let sysErrMsg;

      if (error.message.includes('Password')) {
        sysErrMsg = 'A senha precisa conter, pelo menos, 6 caracteres.';
      } else if (error.message.includes('email-already')) {
        sysErrMsg = 'E-mail já cadastrado. Faça seu login.';
      } else if (error.message.includes('invalid-email')) {
        sysErrMsg = 'E-mail inválido.';
      } else {
        sysErrMsg = 'Ocorreu um erro. Tente novamente mais tarde.';
      }

      setLoading(false);
      setError(sysErrMsg);
    }
  };

  // LOG OUT
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // LOG IN
  const login = async (data: IData) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      let sysErrMsg;

      if (error.message.includes('user-not-found')) {
        sysErrMsg = 'Usuário não encontrado.';
      } else if (error.message.includes('wrong-password')) {
        sysErrMsg = 'Senha incorreta.';
      } else {
        sysErrMsg = 'Ocorreu um erro. Tente novamente mais tarde.';
      }

      setError(sysErrMsg);
      setLoading(false);
    }
  };

  // CLEANUP
  useEffect(() => {
    setCancelled(true);
  }, []);

  return {
    auth,
    alert,
    setAlert,
    createUser,
    error,
    loading,
    logout,
    login,
    // deleteAccount
  };
};
