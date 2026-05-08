import {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';
import FormInput from './components/FormInput';
import Table from './components/Table';

function App() {
  const [details, setDetails] = useState({name:"", age:"", email:"", id:null});
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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

  const resetForm = () => {
    setDetails({name:"", age:"", email:"", id:null});
    setEditIndex(null);
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
  };

  return (
    <div className='conatiner mx-auto'>
      <div>
        <h1 className='text-3xl font-bold text-center p-5'>Form</h1>
      </div>
      <div>
        <FormInput details={details} handleChange={handleChange} handleSubmit={handleSubmit} editIndex={editIndex}/>
      </div>
      <div>
        <Table users={users} handleDelete={handleDelete} handleEdit={handleEdit}/>
      </div>
    </div>
  );
}

export default App;