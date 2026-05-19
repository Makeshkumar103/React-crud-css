// import React from 'react'
import './productdescription.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProductDescription = () => {
    // const dispatch = useDispatch();
    const {id} = useParams();
    const { products } = useSelector((state) => state.products);
    const singleProduct = products.find(
    (item) => item.id === Number(id)
  );

  if (!singleProduct) {
    return <h1>Product Not Found</h1>;
  }


  return (
    <div className='disc-container'>
        {singleProduct.length > 0 ? (
            // singleProduct.map((item) => (
               
                <div className='pdp' key={singleProduct.id}>
                    <h2>{singleProduct.name}</h2>
                    <p>{singleProduct.price}</p>
                    <p>{singleProduct.description}</p>
                </div>
            // ))
      ): (<p>No Product Found</p>)}
    </div>
  )
}

export default ProductDescription


                //  <div key={item.id}>

                    {/* <img src={item.image} alt={item.name} /> */}

                {/* </div>  */}
