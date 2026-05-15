import './product.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Product = () => {
  const { products } = useSelector((state) => state.products);

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
          <table border="1">
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
                  <td>{item.pro_dec}</td>
                   <td>
                    <button>
                      Edit
                    </button>

                    <button>
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