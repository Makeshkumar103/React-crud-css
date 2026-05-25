// import React from 'react'
import './productdescription.css';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const ProductDescription = () => {
    const {id} = useParams();

    const { products } = useSelector((state) => state.products);
    // console.log(products);

    const navigate = useNavigate();

    const singleProduct = products.find(
    (item) => item.id === Number(id)
  );
    // console.log(singleProduct)
  if (!singleProduct) {
    return <p className="not-found">Product not found.</p>;
  }

  return (
    <>
     {/* <button onClick={() => navigate('/product')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button> */}
    <div className="disc-container">
     
      <div className="image" aria-hidden="true" />
      <div className="pdp">
        <h2>{singleProduct.name}</h2>
        <p>${singleProduct.price}</p>
        <p>{singleProduct.description || singleProduct.pro_dec}</p>
      </div>
      <div className='btn-grp'>
        <button type="button" className="btn">Add to cart</button>
        <button type="button" className="btn" onClick={() => navigate('/product')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      
    </div>

    </>
  )
}

export default ProductDescription


                //  <div key={item.id}>

                    {/* <img src={item.image} alt={item.name} /> */}

                {/* </div>  */}
