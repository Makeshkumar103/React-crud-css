import './product.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { setDetails, setEditIndex } from '.../slices/productSlice';
import { setDetails, setEditIndex } from '../../slices/userSlice'; 

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  const handleEdit = (item) => {
    dispatch(setDetails({
      name: item.name,
      price: item.price,
      description: item.description || item.pro_dec || '',
      id: item.id,
    }));
    dispatch(setEditIndex(item.id));
    navigate('/productsform');
  };

  if (!products || products.length === 0) {
    return (
      <div className="product-card">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-card">
      <button className='btn'>
        <Link to='/productsform'>+ Add New</Link>
      </button>
      {products.length > 0 && (
        <table border="1" className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description || item.pro_dec}</td>
                <td className='action-buttons'>
                  <button type='button'
                    className='btn'
                    onClick={() => navigate(`/product/${item.id}`) }
                  >
                      open
                    </button>
                  <button type="button" 
                    className='edit-btn'
                    onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button type="button"
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
  );
};

export default Product;