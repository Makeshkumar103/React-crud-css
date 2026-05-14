import {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';


import FormInput from './components/FormInput';
import Table from './components/Table';
import Product from './components/Product';
// import Home from './components/Home';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [details, setDetails] = useState({name:"", age:"", email:"", id:null});
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  // const [showComponent, setShowComponent] = useState(false);
  const [products, setProducts]= useState([]);

  const navigate = useNavigate();
  
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const resetForm = () => {
    setDetails({name:"", age:"", email:"", id:null});
    setEditIndex(null);
    // setShowComponent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.name || !details.age || !details.email) {
      alert("Please fill in all fields.");
      return;
    }

    if (details.id) {
      try {
        const response = await axios.patch(`http://localhost:8000/users/${details.id}`, details);
        const updatedData = users.map((user) =>
          user.id === details.id ? response.data : user
        );
        setUsers(updatedData);
        resetForm();
        // navigate('/');


      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8000/users', details);
        setUsers([...users, response.data]);
        resetForm();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) return;
    setDetails(user);
    setEditIndex(id);
    // onSubmitnav();
    navigate('/forminput');
  };

  const handleChange = (e) => {
    setDetails({...details,[e.target.name]:e.target.value});
    // setShowComponent(false);
  };

  return (
    <>
        <div className='container'>
            <div className='header'>        
              <h1>Admin Dashboard</h1>
            </div>
            <div className='nav'>  
              <ul>
                <li><FontAwesomeIcon icon={ faUser} /><Link to='/forminput'>Customers</Link></li>
                <li><FontAwesomeIcon icon={ faBox } /><Link to='/product'>Products</Link></li>
                <li><FontAwesomeIcon icon={ faUser} /><Link to='/'>Table</Link></li>
                {/* <li><FontAwesomeIcon icon={ faBox } />Order</li> */}
              </ul>
            </div>
            <div className='main'>
                  <button className='btn'>
                    <Link to='/forminput'>+ Add New</Link>
                  </button>
                <Routes>
                      {/* <Route 
                        path='/'
                        element={<Home />}
                        /> */}
                      <Route 
                        path= '/product' 
                        element={<Product products={products} /> 
                        } />
                      <Route 
                      path= '/forminput' 
                      element={<FormInput details={details} handleChange={handleChange} handleSubmit={handleSubmit} editIndex={editIndex} /> } />
                      <Route 
                      path= '/' 
                      element={<Table users={users} handleDelete={handleDelete} handleEdit={handleEdit}/> } />
                    </Routes>

            </div>
        </div>

            
                    
                    
    
    </>
  );
}

export default App;