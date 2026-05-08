import './formInput.css';

const FormInput = ({ details, handleChange, handleSubmit, editIndex }) => {

  return (
    <>
    <div className='form-container'>
        <h2 className='h2'>Register Form</h2>
        <form className='flex' onSubmit={handleSubmit}>
       <input
            name="name"
            placeholder="Name"
            value={details.name}
            onChange={handleChange}
          />
        <input
            name="age"
            placeholder="Age"
            value={details.age}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={details.email}
            onChange={handleChange}
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
