import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Product from './Components/ProductDetail';
import Button from './Components/Button';
import AllProducts from './Components/AllProducts';
import AuthRoute from './Routes/AuthRoute';
import ProtectedRoutes from './Routes/ProtectedRoutes';

function App() {
  return (
    <>
      <Routes>
        {/* Authentiction Routes */}
        <Route element={<AuthRoute />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/body" element={<Body />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/button" element={<Button />} />
          <Route path="/allproducts" element={<AllProducts />} />
        </Route>
        <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>} ></Route>
      </Routes>
    </>
  );
}

export default App;
