import { useState, useEffect } from "react"
import Axios from 'axios'
import {Link} from 'react-router-dom'
import PaypalCheckOut from "./paypalButton"


const Orders = () => {


  const [orderList, setOrderList] = useState()
  const [total, setTotal] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState('');

  useEffect(() => {

    Axios.get("http://localhost:3001/GetOrderList").then((response) => {

      setOrderList(response.data)
    
     
      
    
    }).catch((error) => {

      console.log(error)

    })

  }, [orderList])

  useEffect(() => {

    if (orderList && orderList.length > 0) {

      const totalPrice = orderList.reduce((accumulator, val) => {
        return accumulator + val.product_price;
      }, 0); 
  
      setTotal(totalPrice);

    } else {

      setTotal(0)

    }

  }, [orderList])


  const product = {
    price: total
  }

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };


  return (

    <>
      <div className="container-md mt-5 pb-5">

        <h1 className="fs-2 fw-bold">Shopping Cart.</h1>

          <div className="d-flex">

            <div className="col-lg-10">

              <table className="col-lg-12 mt-5">

                <thead className="row head">

                  <th className="col-lg-2">Product Image</th>
                  <th className="col-lg-2">Product Name</th>
                  <th className="col-lg-2">Quantity</th>
                  <th className="col-lg-2">Size</th>
                  <th className="col-lg-4">Price</th>

                </thead>

                  <hr/>
                    
                  <tbody>

                    {orderList && orderList.length === 0 ?

                    <div className="col-lg-12" id="0" key='0'>

                      <td colSpan={4} className="col-lg-1 text-center fs-2 pt-5 pb-5">No Orders</td> 
                      <hr/>

                    </div>



                    : 

                    <div>

                    {orderList && orderList.map((val) => {

                    return (
                    <> 
                        
                    <div id={val.cart_id} key={val.cart_id}>

                      <td className="col-lg-2"> 

                        <img src={` http://localhost:3001/images/`+val.product_image} alt="product" className="col-lg-10"/> 

                      </td>


                      <td className="col-lg-2">

                       <span className="span"> {val.product_name}</span>

                      </td>

                      <td className="col-lg-2">

                        <span className="span"> {val.qty}</span>

                      </td>

                      <td className="col-lg-2">

                        <span className="span">{val.sizes}</span>

                      </td>

                      <td className="col-lg-4">

                        <span className="span">${val.product_price}.00</span>

                      <button className="ms-5 remove-item" onClick={(deleteId) => {

                       deleteId = val.cart_id
                            
                        Axios.delete(`http://localhost:3001/deleteCart/${deleteId}`).then(() => {

                          console.log("delete success")

                          }).catch((error) => {

                          console.log(error)

                        })

                        }}>


                        <i class="fa-solid fa-xmark"></i>

                      </button>



                      </td>

                        <hr/>

                      </div>



                        </>
                      )

                    })}

                    </div>

                    }

                    </tbody>


                    </table>

                    {/* section 2 */}

                <div className="col-lg-10">

                    
                  <div className="d-flex justify-content-end ">

                   <p className="me-3">Subtotal:</p>
                    <p className="me-5">${total}.00</p>

                  </div>

                  <div className="d-flex justify-content-end">

                    <p  className="me-5">Shipping:</p>
                    <p className="me-5">Free</p>

                  </div>

                  <div className="d-flex justify-content-end"> 

                    <hr className="col-lg-3"/>

                  </div>


                    <div className="d-flex">

                      <span className="me-2"> 
                      <i class="fa-solid fa-chevron-left"></i> 
                      </span>

                      <Link to='/products' className="col-lg-10 text-decoration-none continue-btn fw-bold">Continue Shopping</Link>

                      <div className="d-flex">

                        <p className="me-3">Total:</p>
                        <p className="me-5">${total}.00</p>

                      </div>



                    </div>




                </div>

            </div>

              <div className="col-lg-3 payment-container">

                <h1 className="fw-bold ps-2 pe-2 pt-2 ">Payment Info.</h1>

                

                <div className="payment-div ps-2 pe-2 justify-content-center flex-column">

                <p className="mt-5">Payment Method: </p>

                  <div className="mt-5  ">
                    
                    <div>

                    <input
                      type="radio"
                      id="cod"
                      value="Cash On Delivery"
                      name="payment"
                      onChange={handlePaymentChange}
                      checked={selectedPayment === 'Cash On Delivery'}
                    />
                      <label className="ms-3">Cash On Delivery</label>

                    </div>

                    <div>

                    <input
                      type="radio"
                      id="cod"
                      value="GCASH"
                      name="payment"
                      onChange={handlePaymentChange}
                      checked={selectedPayment === 'GCASH'}
                    />
                      <label className="ms-3">GCASH</label>

                    </div>
                    
                  </div>
                
                  <div className="mt-5  ">
                    
                  <PaypalCheckOut product={product}/>

                  </div>

                </div>

              </div>

            </div>

      </div>
    </>

  )
}

export default Orders