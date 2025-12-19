import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Help from './routes/Help';
import Users from './routes/Users';
import Login from './routes/Login';
import Product from './components/Product';
import { AuthProvider } from './context/AuthContext';
import { HashRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="help" element={<Help />} />
            <Route path="users" element={<Users />} />
            <Route path="login" element={<Login />} />
            <Route path="product" element={<Product />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
