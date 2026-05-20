// import React from 'react'
import './productdescription.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProductDescription = () => {
    const {id} = useParams();
    const { products } = useSelector((state) => state.products);
    console.log(products);
    const singleProduct = products.find(
    (item) => item.id === Number(id)
  );
    console.log(singleProduct)
  if (!singleProduct) {
    return <h1>Product Not Found</h1>;
  }


  return (
    <div className='disc-container'>
      <div className='image'>
          <img src="{item.image}" alt="" />
      </div>               
      <div className='pdp' key={singleProduct.id}>
          <h2>{singleProduct.name}</h2>
          <p>{singleProduct.price}</p>
          <p>{singleProduct.description}</p>
      </div>
      <button>Buy</button>
    </div>
  )
}

export default ProductDescription


                //  <div key={item.id}>

                    {/* <img src={item.image} alt={item.name} /> */}

                {/* </div>  */}
