import './product.css';

const Product = ({products}) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="product-card">
      {/* <div className="product-image-wrapper">
        <img className="product-image" src={product.img} alt={product.name} />
      </div> */}
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
                    <button
                      // onClick={() => handleEdit(item.id)}
                      // onClick={() => { handleEdit(item.id); setShowComponent(true); }}

                    >
                      Edit
                    </button>

                    <button
                      // onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        )}
        {products.length === 0 && <p>No products found.</p>}

    </div>
  );
};

export default Product;