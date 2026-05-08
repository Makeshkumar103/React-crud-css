import React from 'react'
import './formInput.css';

const FormInput = ({details, handleChange, handleSubmit,editIndex}) => {

  return (
    <>
    <div className='form-container'>
        <h2 className='h2'>Form Input</h2>
        <form onSubmit={handleSubmit} className='flex'>
       <input
            name="name"
            value={details.name}
            placeholder="Name"
            onChange={(e) => handleChange(e)}
            className='outline px-2'
          />
        <input
            name="age"
            value={details.age}
            placeholder="Age"
            onChange={(e) => handleChange(e)}
            className='outline px-2'
          />
          <input
            name="email"
            value={details.email}
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            className='outline px-2'
          />
        <button type='submit' className='btn'>
          {editIndex !== null ? 'Update' : 'Submit'}
        </button>

      </form>
    </div>
    
    </>
  )
}


export default FormInput;
