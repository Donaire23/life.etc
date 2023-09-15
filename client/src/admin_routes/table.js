import  Axios  from "axios";
import { useEffect, useState } from "react"


const Table = () => {

  const [userDetails, setUserDetails] = useState([]);
  
  useEffect(() => {

    Axios.get("http://localhost:3001/countOrders").then((response) => {

    setUserDetails(response.data)
   

    })

  }, [userDetails])

  return (

    <>

<table className="HALO mt-5">

<thead className="row">

  <th className="col-lg-2">Customer Name</th> 
  <th className="col-lg-2">Customer Address</th> 
  <th className="col-lg-2">Customer Phone Number</th> 
  <th className="col-lg-1">Product Image</th>
  <th className="col-lg-1">Product Name</th>
  <th className="col-lg-1">Quantity</th>
  <th className="col-lg-1">Size</th>
  <th className="col-lg-1">Price</th>
  <th className="col-lg-1">Action</th>

</thead>

  <hr/>
    
  <tbody>

    {userDetails && userDetails.length === 0 ?

    <div className="col-lg-12" id="0" key='0'>

      <td colSpan={4} className="col-lg-1 text-center fs-2 pt-5 pb-5">No Orders</td> 
      <hr/>

    </div>



    : 

    <div>

    {userDetails && userDetails.map((val) => {

    return (
    <> 
        
    <div id={val.cart_id} key={val.cart_id} className="row d-flex align-items-center">

      <td className="col-lg-2">

        <span className="span">{val.full_name}</span>

      </td>

      <td className="col-lg-2">

        <span className="span border">{val.user_address}</span>

      </td>

      <td className="col-lg-2">

        <span className="span">{val.phone_number}</span>

      </td>

      <td className="col-lg-1"> 

        <img src={` http://localhost:3001/images/`+val.product_image} alt="product" className="col-lg-10"/> 

      </td>


      <td className="col-lg-1">

       <span className="span"> {val.product_name}</span>

      </td>

      <td className="col-lg-1 text-center">

        <span className="span"> {val.qty}</span>

      </td>

      <td className="col-lg-1">

        <span className="span">{val.sizes}</span>

      </td>

      <td className="col-lg-1">

        <span className="span">${val.product_price}.00</span>

  
      </td>

      <td className="col-lg-1">

      
        <button className="delete-btn">Delete</button>

  
      </td>

      
        <hr className="mt-2"/>

      </div>



      </>
      )

      })}

      </div>

      }

    </tbody>


     </table>


    </>

  )

}

export default Table