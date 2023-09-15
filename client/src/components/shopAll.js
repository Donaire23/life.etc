import Axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';



const ShopAll = () => {


  const [products, setProducts] = useState([])

  const [show, setShow] = useState(false);

  const [showItem, setShowItem] = useState()
  const [selectSize, setSelectSize] = useState("")
  const [qty, setQty] = useState(1)
  const [isDisabled, setDisabled] = useState(true)
  const [orig, setOrig] = useState()
  const [price, setPrice] = useState(orig)
  

  const sizeA = "Small";
  const sizeB = "Medium";
  const sizeC = "Large";


 
  useEffect(() => {

    Axios.get("http://localhost:3001/products").then((response) => {
      setProducts(response.data)
    })
    
  }, [products])


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

    <div className='container-md mt-5 pb-5'>  

      <div className='row d-flex justify-content-center mb-5'>

            {products.map((val) => {

                return (
                
                  <div className='product-img col-lg-3 mb-5  me-1'>

                    <img src={`http://localhost:3001/images/`+val.product_image} className='col-lg-12' />

                    
                    <div className='mt-3'>
                      <p className='text-center'>{val.product_name}</p>
                      <p className='text-center'>${val.product_price}.00</p>
                  </div>

                    <div className='d-flex justify-content-center'>
                        <button className='to-cart-btn col-lg-10 pt-1 pb-1' onClick={() => {
                          setShow(true)
                          setShowItem(val.product_id)
                          setOrig(val.product_price)
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

          {products.map((val) => {

            if(val.product_id === showItem) {

              return (

                <>

                  <div className='d-flex'>

                    <div className='col-lg-6'>
                      <img src={`http://localhost:3001/images/`+val.product_image}  className='modal-img '/>
                    </div>

                    <div className='ms-5 mt-1 col-lg-5'>

                      <p className='fs-3'>{val.product_name}</p>
                      <p>${val.product_price}.00</p>
                      <p>SKU: {val.sku}</p> 

                  
                     

                     <div className='d-flex flex-column'>

                      <label>Size</label>
                        <select  value={selectSize} onChange={(e) => setSelectSize(e.target.value)} className='mt-2 col-lg-12 pt-2 pb-2'>

                          <option disabled selected value="" >Select</option>
                          <option value={sizeA}>Small</option>
                          <option value={sizeB}>Medium</option>
                          <option value={sizeC}>Large</option>
                          
                      </select>

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

                     
                     <button className='addCart-btn  mt-5 col-lg-12 pt-2 pb-2'>Add to Cart</button>

                  
          
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

export default ShopAll