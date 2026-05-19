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
            singleProduct.map((item) => (
               
                <div className='pdp' key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                </div>
            ))
      ): (<p>No Product Found</p>)}
    </div>
  )
}

export default ProductDescription


                //  <div key={item.id}>

                    {/* <img src={item.image} alt={item.name} /> */}

                {/* </div>  */}
