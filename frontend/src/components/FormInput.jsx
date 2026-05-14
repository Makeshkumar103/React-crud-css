import './formInput.css';
import { Link,useNavigate } from 'react-router-dom';
const FormInput = ({ details, handleChange, handleSubmit, editIndex}) => {
  const navigate = useNavigate();
  function onSubmitnav() {
    navigate('/')
  }

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
          <div className='btn-container'>
            <button className='btn'>  <Link to='/'>Cancel</Link></button>
            <button type='submit' className='btn' onClick={onSubmitnav} >       {editIndex !== null ? 'Update' : 'Submit'}     </button>
          {/* <button className='btn' onClick={() => setShowComponent(false)}>          Cancel           </button> */}
          {/* <button type='submit' className='btn' onClick={() => setShowComponent(true) }>          {editIndex !== null ? 'Update' : 'Submit'}
          {setShowComponent(false)}         </button> */}
        </div>
        

      </form>
    </div>
    
    </>
  )
}


export default FormInput;
