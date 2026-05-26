import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Register from './layouts/Register';
import Login from './layouts/Login';
import Profile from './layouts/Profile';

import FormInput from './components/formInput/FormInput';
import Table from './components/table/Table';
import Product from './components/product/Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';

import { fetchUsers } from './slices/userSlice';
import { fetchProducts as fetchProductsAction } from './slices/productSlice';
import { fetchProfile, logout } from './slices/authSlice';
import Productsform from './components/productform/Productsform';
import ProductDescription from './components/productdescription/ProductDescription'
function App() {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers());
      dispatch(fetchProductsAction());
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard">
        <nav className="sidebar">
          {!isAuthenticated ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <ul>
              <li>
                <NavLink to="/profile" className="nav-link">
                  <FontAwesomeIcon icon={faCircleUser} />
                  Profile
                </NavLink>
              </li>
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
                <NavLink to="/table" end className="nav-link">
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
              <li>
                <button type="button" className="nav-link logout-link" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faCircleUser} />
                  Logout
                </button>
              </li>
            </ul>
          )}
        </nav>

        {/* {isAuthenticated && (
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
                <NavLink to="/table" end className="nav-link">
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
        )} */}

        <main className="main-content">
                  
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/profile" replace />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/profile" replace />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/product"
              element={isAuthenticated ? <Product /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/forminput"
              element={isAuthenticated ? <FormInput /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/table"
              element={isAuthenticated ? <Table /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/productsform"
              element={isAuthenticated ? <Productsform /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/product/:id"
              element={isAuthenticated ? <ProductDescription /> : <Navigate to="/login" replace />}
            />
            <Route 
              path='*'
                element={<Navigate to={isAuthenticated ? "/profile" : "/login"} 
                replace
                />
              }
            />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
