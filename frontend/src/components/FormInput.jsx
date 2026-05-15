import './formInput.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, resetDetails, updateDetailsField } from '../slices/userSlice';

const FormInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { details, editIndex, loading } = useSelector((state) => state.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDetailsField({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.name || !details.age || !details.email) {
      alert("Please fill in all fields.");
      return;
    }

    if (editIndex) {
      await dispatch(updateUser({ id: editIndex, details }));
    } else {
      await dispatch(createUser(details));
    }

    navigate('/');
  };

  const handleCancel = () => {
    dispatch(resetDetails());
    navigate('/');
  };

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
            <button type='button' className='btn' onClick={handleCancel}>
              Cancel
            </button>
            <button type='submit' className='btn' disabled={loading}>
              {loading ? 'Processing...' : editIndex ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormInput;
