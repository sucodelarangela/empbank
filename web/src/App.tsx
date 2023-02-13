import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { RefreshProvider } from "./context/RefreshContext";

function App() {
  const { auth } = useAuth();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <AuthProvider value={user}>
      <main className="App">
        <Router>
          <Routes>
            <Route path="/" element={<RefreshProvider><Home /></RefreshProvider>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
