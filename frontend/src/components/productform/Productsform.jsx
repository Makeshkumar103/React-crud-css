import { useDispatch, useSelector } from 'react-redux';
import './productform.css';
import { useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, resetDetails, updateDetailsField } from '../../slices/productSlice';

const Productsform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { details, editIndex, loading } = useSelector((state) => state.products);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDetailsField({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.name || !details.price || !details.description) {
      alert('Please fill in all fields.');
      return;
    }

    if (editIndex) {
      await dispatch(updateProduct({ id: editIndex, details }));
    } else {
      await dispatch(createProduct(details));
    }

    navigate('/product');
  };

  const handleCancel = () => {
    dispatch(resetDetails());
    navigate('/product');
  };

  // const handleImageUpload = (e) => {
  //   e.target.file

  // }



  return (
    <>
      <div className="form-container">
        <h3>Product Details</h3>

        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={details.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="$Price"
            value={details.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={details.description}
            onChange={handleChange}
          />
          {/* <input 
            type="file"
            // className='file-input'
            name="product image"
            value={details.image}
            onChange={handleImageUpload}
          /> */}

          <div className='btn-container'>
            <button type='button' className='btn btn-secondary' onClick={handleCancel}>
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

export default Productsform
