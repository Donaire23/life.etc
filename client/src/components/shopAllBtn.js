import { Link } from "react-router-dom"

const ShopAllButton = () => {

  return (

    <>

      <div className="container-md d-flex justify-content-center mt-5">

       <Link to='/products' className="shop-all-btn">Shop All</Link>

      </div>
    
    </>

  )

}

export default ShopAllButton