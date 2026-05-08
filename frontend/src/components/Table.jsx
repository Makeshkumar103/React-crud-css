import './table.css';

const Table = ({ users, handleEdit, handleDelete }) => {
  return (
    <>
    <div className='table-wrapper'>
        <h2 className='h2'>List of Users</h2>
         {users.length > 0 && (
          <table border="1" className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                   <td className="action-buttons">
                    <button
                      className='edit-btn'
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>

                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        )}
        {users.length === 0 && <p>No users found.</p>}

    </div>
    </>
  )
}

export default Table
