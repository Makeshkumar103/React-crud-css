import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import './App.css';

import FormInput from './components/formInput/FormInput';
import Table from './components/table/Table';
import Product from './components/product/Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, Link } from 'react-router-dom';

import { fetchUsers } from './slices/userSlice';
import { fetchProducts as fetchProductsAction } from './slices/productSlice';
import Productsform from './components/productform/Productsform';
import ProductDescription from './components/productdescription/ProductDescription'

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  // Select state from Redux
  // const { users, details, editIndex } = useSelector((state) => state.users);
  // const { products } = useSelector((state) => state.products);

  // Fetch users and products on mount
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProductsAction());
  }, [dispatch]);

  // const handleEdit = (id) => {
  //   navigate('/forminput');
  // };

  return (
    <>
        <div className='container'>
        <h1 className='header'>Admin Dashboard</h1>
          <div className='grid-container'>
              {/* <h1 className='header'>Admin Dashboard</h1> */}

              <div className='nav'>  
                <ul>
                  <li><FontAwesomeIcon icon={ faUser} /><Link to='/forminput'>Customers</Link></li>
                  <li><FontAwesomeIcon icon={ faBox } /><Link to='/product'>Products</Link></li>
                  <li><FontAwesomeIcon icon={ faUser} /><Link to='/'>Table</Link></li>
                  <li><FontAwesomeIcon icon={ faBox} /><Link to='/productsform'>Product Input</Link></li>
                  <li><Link>Discription</Link></li>
                
                </ul>
              </div>

              <div className='main'>
                <Routes>
                    <Route 
                        path= '/product' 
                        element={<Product /> } />
                    <Route 
                        path= '/forminput' 
                        element={<FormInput /> } />
                    <Route 
                        path= '/' 
                        element={<Table /> } />
                    <Route
                        path='/productsform'
                        element={<Productsform /> } />
                    <Route
                        path='/product/:id'
                        element={<ProductDescription /> } />

                </Routes>
              </div>
          </div>
        </div>
    </>
  );
}

export default App;