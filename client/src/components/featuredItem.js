import Axios from "axios"
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Outlet } from "react-router-dom";

const FeaturedItem = () => {


  const [fProducts, setFProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showItem, setShowItem] = useState()
  const [selectSize, setSelectSize] = useState("")
  const [qty, setQty] = useState(1)
  const [isDisabled, setDisabled] = useState(true)
  const [orig, setOrig] = useState()
  const [price, setPrice] = useState(orig)


  const [invalidFeedBack, setInvalidFeedBack] = useState()

  const [cart, setCart] = useState()
  const [userID, setUserID] = useState()

  const sizeA = "Small";
  const sizeB = "Medium";
  const sizeC = "Large";


  useEffect(() => {

    Axios.get("http://localhost:3001/featuredItem").then((response) => {

      setFProducts(response.data)

    }).catch(() => {
      console.log(Error)
    })

  }, [])

  const handleClose = () => {

    setShow(false);
   
  }


  useEffect(() => {

    setPrice(orig)

  }, [orig]);

  useEffect(() => {

    setPrice(orig * qty)  

  }, [qty])

 

 

  return (

    
    <>

      <div className="container-md mt-5">


        <div className='row d-flex justify-content-center'>

          {fProducts.map((val) => {


            return (
               
              <div className="featured-img1 col-lg-3">

                <img src={` http://localhost:3001/images/`+val.featured_product_img} alt="product"/>

                <div className='mt-3'>

                  <p className="text-center">{val.featured_product_name}</p>
                  <p className="text-center">${val.featured_product_price}.00</p>

                </div>

                <div className='d-flex justify-content-center'>
                  <button className='to-cart-btn col-lg-10 pt-1 pb-1' onClick={() => {

                    setShowItem(val.featured_id)
                    setShow(true)
                    setOrig(val.featured_product_price)


                  }}>Add to Cart</button>
                </div>

              </div>
            
            )

          })}

        </div>

      </div>


      <Modal show={show} onHide={handleClose}  
          
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>

        <Modal.Body >

          {fProducts.map((val) => {

            if(val.featured_id === showItem) {

              return (

                <>

                  <div className='d-flex'>

                    <div className='col-lg-6'>
                      <img src={`http://localhost:3001/images/`+val.featured_product_img}  className='modal-img '/>
                    </div>

                    <div className='ms-5 mt-1 col-lg-5'>

                      <p className='fs-3'>{val.featured_product_name}</p>
                      <p>${val.featured_product_price}.00</p>
                     

                  
                     <div className='d-flex flex-column'>

                      <label>Size</label>
                        <select  value={selectSize} onChange={(e) => setSelectSize(e.target.value)} className='mt-2 col-lg-12 pt-2 pb-2'>

                          <option disabled selected value="None" >Select</option>
                          <option value={sizeA}>Small</option>
                          <option value={sizeB}>Medium</option>
                          <option value={sizeC}>Large</option>
                          
                      </select>

                      <div className="mt-2">
                        {invalidFeedBack}
                      </div>

                     </div>

                     <label className='mt-5'>Quantity</label>

                     <div className='mt-2 d-flex justify-content-around col-lg-3'> 
                      
                      <button className='minusBtn' disabled={qty === 1 ? isDisabled : !isDisabled} onClick={() => {
                        
                        setQty(qty - 1)

                      }}>  <i class="fa-solid fa-minus"> </i></button>

                      <span>{qty}</span>

                      <button className='plusBtn' disabled={qty === 10 ? isDisabled : !isDisabled} onClick={() => {

                        setQty(qty + 1)

                      }}> <i class="fa-solid fa-plus"></i> </button>

                     </div>

                     
                     <button className='addCart-btn  mt-5 col-lg-12 pt-2 pb-2' onClick={() => {

                        

                        Axios.get("http://localhost:3001/loggedinID").then((response) => {

                        if(selectSize === "") {

                          setInvalidFeedBack("Please select sizes")
                          
                           
                        } else {

                          setInvalidFeedBack("")

                          const cart = {
                               
                            product_image: val.featured_product_img,
                            product_name: val.featured_product_name,
                            product_price: price,
                            qty: qty,
                            sizes: selectSize,
                            cart_user_id: response.data.id
                            
  
                          }
                          
                          Axios.post("http://localhost:3001/addToCart", cart).then(() => {
                            
                           console.log("add to cart success")
  
                          }).catch((error) => {
  
                            console.log(error)
  
                          })
                          
                        }
                        

                        


                        })

                     }}>Add to Cart</button>

                    
          
                    </div>

                  </div>

                </>

              )

            }

          })}
     
            
        </Modal.Body>
        
      </Modal>
       
    </>

  )

}

export default FeaturedItem