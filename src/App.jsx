import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Help from './routes/Help';
import Users from './routes/Users';
import Login from './routes/Login';
import Product from './components/Product';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="help" element={<Help />} />
          <Route path="users" element={<Users />} />
          <Route path="login" element={<Login />} />
          <Route path="product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
