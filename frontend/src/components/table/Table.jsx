import './table.css';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setDetails, setEditIndex } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);

  const handleEdit = (user) => {
    dispatch(setDetails(user));
    dispatch(setEditIndex(user.id));
    // console.log(user.id);
    navigate('/forminput');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
      console.log(deleteUser(id));
    }
  };

  return (
    <>
    <div className='table-wrapper'>
      <div className='table-header'>
        <h2>List of Record</h2>
        <button className='btn'>
            <Link to='/forminput'>+ Add New</Link>
        </button> 
      </div>
         {users.length > 0 && (
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Age</th> */}
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  {/* <td>{item.age}</td> */}
                  <td>{item.email}</td>
                   <td className="action-buttons">
                    <button
                      className='edit-btn'
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete user
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        )}
        {users.length === 0 && <p className="empty-state">No users found. Add your first customer to get started.</p>}

    </div>
    </>
  )
}

export default Table
