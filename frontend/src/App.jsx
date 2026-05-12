import {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';
import FormInput from './components/FormInput';
import Table from './components/Table';

function App() {
  const [details, setDetails] = useState({name:"", age:"", email:"", id:null});
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
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
      <div>
        <h1>Form</h1>
        <div className='btn-container'>
          {/* <button className='btn' onClick={() => setShowComponent(false)}>
          Cancel
          </button> */}
          <button className='btn' onClick={() => setShowComponent(true)}>
          + Add New
          </button>
        </div>
      </div>

      <div>
        {
          showComponent !== true ? <Table users={users} handleDelete={handleDelete} handleEdit={handleEdit} setShowComponent={setShowComponent}/> : <FormInput details={details} handleChange={handleChange} handleSubmit={handleSubmit} editIndex={editIndex} setShowComponent={setShowComponent}/>
        }
        {/* <Table users={users} handleDelete={handleDelete} handleEdit={handleEdit} />
         {showComponent && <FormInput details={details} handleChange={handleChange} handleSubmit={handleSubmit} editIndex={editIndex}/>} */}
      </div>
    
    </div>
  );
}

export default App;