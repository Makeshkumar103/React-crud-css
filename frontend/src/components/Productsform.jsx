import { useDispatch } from 'react-redux';
import './productform.css';
import { useNavigate, useSelector } from 'react-router-dom';
import { createProduct,updateProduct } from '../slices/productSlice';


const Productsform = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {details, editIndex, loading } = useSelector((state) => state.products);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     dispatch(updateDetailsField({ name, value }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!details.name || !details.price || !details.description) {
            alert("Please fill in all fields.");
            return;
        }

        if (editIndex) {
              await dispatch(updateProduct({ id: editIndex, details }));
            } else {
              await dispatch(createProduct(details));
            }
        
            navigate('/');
    };


    // const handleCancel = () => {
    //     dispatch(resetDetails());
    //     navigate('/');
    // };

  return (
    <>
    <div className="form-container">
        <h3>Product Details</h3>

        <form className="flex" onSubmit={handleSubmit}>
            <input type="text"
                name="product_name"
                placeholder="Product Name"
                value={"Keyboard"}
                // onChange={handleChange}
            />
            <input type="number"
                name="Price"
                placeholder="$Price"
                value={300}
                // onChange={handleChange}
            />
            <input type="text" 
                name="Description"
                placeholder="Product Description"
                value={"lorem ipsum dolor sime"}
                // onChange={handleChange}
                />
            <div className='btn-container'>
            {/* <button type='button' className='btn' onClick={handleCancel}> */}
            <button>
              Cancel
            </button>
            <button type='submit' className='btn' >
              {loading ? 'Processing...' : editIndex ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
        
    </div>
    </>
  )
}

export default Productsform
