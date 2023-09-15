import { Link } from "react-router-dom"
import Axios from 'axios'

const Card = () => {

  return (

    <>
      
      <div className="card-div">

          <Link className="ms-2 text-decoration-none fs-6 order-link pt-3" to='/orders'>
            <span className="me-2 fs-6">
              <i class="fa-solid fa-box-open"></i>
            </span>  
            Orders 
        </Link>

        <Link className="ms-2 text-decoration-none fs-6  logout-link pb-3 mt-2" 

        onClick={() => {
  
           Axios.get("http://localhost:3001/userLogout").then(() => {

            window.location.reload()

            }).catch(() => {

            console.log("error")

            })

        }}>

          <span className="fs-6 me-2">

            <i class="fa-solid fa-right-from-bracket fa-rotate-180"></i> 

          </span>Logout


        </Link>
       
       
      </div>
     
    
    </>

  )

}

export default Card