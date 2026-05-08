import React from 'react'
import './table.css';

const Table = ({submitted,handleDelete,handleEdit}) => {
  return (
    <div className='table-wrapper'>
        <h2 className='h2'>Form Output</h2>
         {submitted.length > 0 && (
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
              {submitted.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                   <td className="action-buttons">
                    <button
                      onClick={() => handleEdit(index)}
                      className='edit-btn'
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className='delete-btn'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default Table
