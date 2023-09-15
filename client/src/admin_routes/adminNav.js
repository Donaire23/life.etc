import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import OrderAdmin from "./ordersAdmin"
import AllProducts from "./allProducts"
import AdminPage from "./addProduct"
import AddFeatureItem from "./addFeaturedItem"
import AddPost from "./addPost"
import { useState } from "react"


const AdminNavBar = () => {

  const [orderAdmin, setShowOrderAdmin] = useState(true)
  const [allProducts, setShowAllProducts] = useState(false)
  const [addProduct, setAddProduct] = useState(false)
  const [addFeaturedItem, setAddFeaturedItem] = useState(false)
  const [addPost, setAddPost] = useState(false)

  return (
    <>
    
    <div className="d-flex row admin-nav container-md">
        <div className="col-lg-2 d-flex flex-column nav-container">

          <Link className="nav-links mt-5" onClick={() => {

            setShowOrderAdmin(true)
            setShowAllProducts(false)
            setAddProduct(false)
            setAddFeaturedItem(false)
            setAddPost(false)

          }}>Orders</Link>
          <Link className="nav-links mt-3" onClick={() => {

            setShowAllProducts(true)
            setShowOrderAdmin(false)
            setAddProduct(false)
            setAddFeaturedItem(false)
            setAddPost(false)

          }}>Products</Link>


          <Link className="nav-links mt-3" onClick={() => {

            setShowOrderAdmin(false)
            setShowAllProducts(false)
            setAddProduct(true)
            setAddFeaturedItem(false)
            setAddPost(false)

          }}>Add Products</Link>


          <Link className="nav-links mt-3" onClick={() => {

          setShowOrderAdmin(false)
          setShowAllProducts(false)
          setAddProduct(false)
          setAddFeaturedItem(true)
          setAddPost(false)

          }}>Add Featured Item</Link>

          <Link className="nav-links mt-3" onClick={() => {

          setShowOrderAdmin(false)
          setShowAllProducts(false)
          setAddProduct(false)
          setAddPost(true)
          setAddFeaturedItem(false)
           

          }}>Add Post</Link>




          
    
        </div>


      <div className="col-lg-10">

        {orderAdmin ? <OrderAdmin/> : null}
        {allProducts ? <AllProducts/> : null}
        {addProduct ? <AdminPage/> : null}
        {addFeaturedItem ? <AddFeatureItem/> : null}
        {addPost ? <AddPost/> : null}

      </div>
        
    </div>

    <div>
      
         
          
    </div>
    
    </>
  )


}

export default AdminNavBar