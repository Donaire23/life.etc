import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
 
const PaypalCheckOut = (props) => {

  const { product } = props;

  const [paid, setPaid] = useState(false);
  const [error ,setError] = useState(null);

  const handleApprove = (orderID) => {

    setPaid(true)

  }

  
  return (
    <>

      <PayPalButtons
      
      onClick={(data, actions) => {

        console.log(actions)
        const hasAlreadyBought = false

        if(hasAlreadyBought) {
          setError("You Already Bought the products")
          return actions.reject()
        } else {

          return actions.resolve()
        }
       
        
      }}
      
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: product.price
              }
            }
          ]
        })
      }}
      
      onApprove={ async(data, actions) => {
        
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove(data.orderID);

      }}
      
      onError={(err) => {
        setError(err);
        console.log(' Paypal Checkout onError',err)
       
      }}

      onCancel={() => {

      }}
      
      />




    </>
  )

}

export default PaypalCheckOut