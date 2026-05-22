import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css';

import FormInput from './components/formInput/FormInput';
import Table from './components/table/Table';
import Product from './components/product/Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, NavLink } from 'react-router-dom';

import { fetchUsers } from './slices/userSlice';
import { fetchProducts as fetchProductsAction } from './slices/productSlice';
import Productsform from './components/productform/Productsform';
import ProductDescription from './components/productdescription/ProductDescription'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProductsAction());
    console.log
  }, [dispatch]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink to="/forminput" className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className="nav-link">
                <FontAwesomeIcon icon={faBox} />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/" end className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                Records
              </NavLink>
            </li>
            <li>
              <NavLink to="/productsform" className="nav-link">
                <FontAwesomeIcon icon={faBox} />
                Add Product
              </NavLink>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/product" element={<Product />} />
            <Route path="/forminput" element={<FormInput />} />
            <Route path="/" element={<Table />} />
            <Route path="/productsform" element={<Productsform />} />
            <Route path="/product/:id" element={<ProductDescription />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
