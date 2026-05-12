import {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';
import FormInput from './components/FormInput';
import Table from './components/Table';
import Product from './components/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [details, setDetails] = useState({name:"", age:"", email:"", id:null});
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
  const [products, setProducts]= useState([]);
  // const [list, setList] = useState(null);

  // const getAllUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/users');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  // useEffect(() => {
  //   getAllUsers();
  // }, []);


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
    setShowComponent(false);
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
  };

  const handleChange = (e) => {
    setDetails({...details,[e.target.name]:e.target.value});
    // setShowComponent(false);
  };

  return (
    <div className='container'>
      <div className='header'>        
        <h1>Admin Dashboard</h1>
      </div>
      <div className='in-container'>
        <div className='nav'>  
          <ul>
            <li><FontAwesomeIcon icon={ faUser} />Customers</li>
            <li><FontAwesomeIcon icon={ faBox } />Product</li>
            <li>Order</li>
            {/* <li><FaInfoCircle />About</li> */}
          </ul>
          {/* <button className='btn' onClick={() => setShowComponent(false)}>
          Cancel
          </button>
          <button className='btn' onClick={() => setShowComponent(true)}>
          + Add New
          </button>
          <button className='btn' onClick={() => setShowComponent(true)}>
            Product
          </button> */}
        </div>

        <div className='main'>
              <button className='btn' onClick={() => setShowComponent(true)}>
                + Add New
              </button>
              {
            showComponent !== true ? <Table users={users} handleDelete={handleDelete} handleEdit={handleEdit} setShowComponent={setShowComponent}/> : <FormInput details={details} handleChange={handleChange} handleSubmit={handleSubmit} editIndex={editIndex} setShowComponent={setShowComponent}/>
              }

              <Product products={products}/>
        </div>
      
      </div>
      
    
    </div>
  );
}

export default App;