// import React from 'react'
import './productdescription.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProductDescription = () => {
    const {id} = useParams();
    const { products } = useSelector((state) => state.products);
    // console.log(products);
    const singleProduct = products.find(
    (item) => item.id === Number(id)
  );
    // console.log(singleProduct)
  if (!singleProduct) {
    return <p className="not-found">Product not found.</p>;
  }

  return (
    <div className="disc-container">
      <div className="image" aria-hidden="true" />
      <div className="pdp">
        <h2>{singleProduct.name}</h2>
        <p>${singleProduct.price}</p>
        <p>{singleProduct.description || singleProduct.pro_dec}</p>
      </div>
      <button type="button" className="btn">Add to cart</button>
    </div>
  )
}

export default ProductDescription


                //  <div key={item.id}>

                    {/* <img src={item.image} alt={item.name} /> */}

                {/* </div>  */}
