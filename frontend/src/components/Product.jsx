import './product.css';

const Product = ({products}) => {
  if (!products) return null;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img className="product-image" src={products.img} alt={products.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{products.name}</h3>
        <p className="product-price">{products.$price}</p>
        <p className="product-description">{products.description}</p>
      </div>
    </div>
  );
};

export default Product;