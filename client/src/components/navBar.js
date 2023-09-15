import { Link, Outlet } from "react-router-dom"
import BrandName from "./brandName"
import LoginButton from "./loginBtn"


const NavBar = () => {

  return (

    <>

      <div className="container-md mt-5">

        <div className="d-flex justify-content-end">

          <LoginButton/>


        </div>

        <p className="text-center"><BrandName/></p>

          <div className="d-flex justify-content-center">

            <ul className="nav-ul d-flex col-lg-5 justify-content-around mt-5">

                <li className="nav-li">
                  <Link  to="/" className="nav-link">HOME</Link>
                </li>

                <li className="nav-li">
                  <Link  to="/products" className="nav-link">SHOP</Link>
                </li>

                <li className="nav-li">
                  <Link to="/about" className="nav-link">ABOUT</Link>
                </li>

                <li className="nav-li">
                  <Link to='/journal' className="nav-link">JOURNAL</Link>
                </li>

                <li className="nav-li">
                  <Link to='/contact' className="nav-link">CONTACT</Link>
                </li>

            </ul>

           
          </div>

          
      </div>
      <Outlet/>



    </>

  )

}

export default NavBar