import { Link } from "react-router-dom"


const Footer = () => {

  return (

    <>

      <div className="container-fluid mt-5 footer">

        <div className="footer-title">

          <div className="container-md d-flex justify-content-start">

            <h1 className="footer-page-h1">
              <span className="footer-life-etc fs-1">Euphoria.</span>
            </h1>

          </div>
         
          <div className="footer-links d-flex justify-content-center mt-5">

            <div className="navbar-links d-flex flex-column">

              <Link className="footer-link">Shop</Link>
              <Link className="footer-link">About</Link>
              <Link className="footer-link">Journal</Link>
              <Link className="footer-link">Contact</Link>

            </div>

            <div className="navbar-links d-flex flex-column">

              <Link className="footer-link">FAQ</Link>
              <Link className="footer-link">Shipping & Returns</Link>
              <Link className="footer-link">Store Policy</Link>
              <Link className="footer-link">Payments</Link>

            </div>

            <div className="navbar-links d-flex flex-column">

              <span>francesdonz23@gmail.com</span>
              <span>A. Soriano Jr Avenue</span>
              <span>Cebu City</span>
              <span>09318486829</span>
         
            </div>

            <div className="col-lg-2">

              <span>Sign up. Stay Stylish</span>

              <input className="signup-input col-lg-12 mt-1 pt-2 pb-2" placeholder="Enter your email here *" required/>
              <button className="sub-btn col-lg-12 mt-2 pb-2 pt-2">Subscribe Now</button>
           
           

            </div>
            
            
          </div>

        </div>

      </div>
    
    </>

  )

}

export default Footer