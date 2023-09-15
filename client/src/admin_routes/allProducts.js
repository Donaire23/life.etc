import  Axios  from "axios";
import { useState, useEffect } from "react"

const AllProducts = () => {

  const [getAllProd, setGetAllProd] = useState([]);

  useEffect(() => {

    Axios.get("http://localhost:3001/allProd").then((response) => {
      setGetAllProd(response.data)
    })

  }, [getAllProd])

  console.log(getAllProd)



  return (
    <>

      <div className="count-card col-lg-3 mt-5 pt-5 pb-5 d-flex align-items-center justify-content-center">
          <h1 className="orders-txt text-center">PRODUCTS</h1>
      </div>

      <div className="mt-5">

      <table className="prod-cont mt-5">

          <thead className="row">

            <th className="col-lg-2">Product Image</th>
            <th className="col-lg-2">Product Name</th>
            <th className="col-lg-2">Stock Keeping Unit</th>
            <th className="col-lg-2">Price</th>
            <th className="col-lg-2">Action</th>

          </thead>

            <hr/>
              
            <tbody>

              {getAllProd && getAllProd.length  === 0 ?

              <div className="col-lg-12" id="0" key='0'>

                <td colSpan={4} className="col-lg-1 text-center fs-2 pt-5 pb-5">No Orders</td> 
                <hr/>

              </div>



              : 

              <div>

              {getAllProd && getAllProd.map((val) => {

              return (
              <> 
                  
              <div id={val.cart_id} key={val.cart_id} className="row d-flex align-items-center">

                <td className="col-lg-2"> 

                  <img src={` http://localhost:3001/images/`+val.product_image} alt="product" className="col-lg-10"/> 

                </td>


                <td className="col-lg-2 text-center">

                <span className="span"> {val.product_name}</span>

                </td>

              
                <td className="col-lg-2  text-center">

                  <span className="span">{val.sku}</span>

                </td>

                <td className="col-lg-2">

                  <span className="span">${val.product_price}.00</span>

            
                </td>

                <td className="col-lg-2">

                
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
          </div>
    

        </>
      )


}

export default AllProducts