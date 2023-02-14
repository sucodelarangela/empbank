import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { RefreshProvider } from "./context/RefreshContext";

interface IUser {
  id: string;
  uuid: string;
  email: number;
  name: string;
}

function App() {
  const { auth } = useAuth();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <AuthProvider value={{ user }}>
      <main className="App">
        <Router>
          <Routes>
            <Route path="/" element={user ? <RefreshProvider><Home /></RefreshProvider> : <Navigate to='/login' />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path="/register" element={!user ? <Login /> : <Navigate to='/' />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
