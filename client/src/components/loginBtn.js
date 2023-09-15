import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from './card';
import {Link} from 'react-router-dom'
import Axios from 'axios'



const LoginButton = ({ setToken }) => {


  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  

  const [feedBackEmail, setfeedBackEmail] = useState();
  const [feedBackPassword, setfeedBackPassword] = useState();
  const [auth, setAuth] = useState()


  const [feedBack, setFeedBack] = useState()
  
  const [toggleCard, setToggleCard] = useState(false)

  let [countOrderList, setCountOrderList] = useState(0)

  const loginUser = {
    loginEmail: loginEmail,
    loginPassword: loginPassword
  };

  const [isUserIn, setIsUserIn] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => {

    setShow(false);
   
  }


  useEffect(() => {

    if(feedBack === "Invalid Email Address") {
      setfeedBackEmail("Invalid Email Address")
    } else if(feedBack === "Invalid Password") {
      setfeedBackPassword("Invalid Password")
    } 

  }, [feedBack])

  


  const Submit = () => {

    Axios.post("http://localhost:3001/userLogin", loginUser).then((response) => {

      setFeedBack(response.data.Error)

      if(response.data.Email === loginEmail) {
        window.location.reload()
      }
      
    console.log(response)
    
    }).catch((error) => {

      console.log(error)

    })

  }

  
  useEffect(() => {
    Axios.get("http://localhost:3001/LoggedIn").then((response) => {

    if(response.data.Message === "Unauthorized") {

      setAuth(false)
   

    } else if(response.data.Message === "Token is not valid" ) {

      setAuth(false)



    } else if(response.data.Message === "Authorized") {

      setAuth(true)
    
    }

 
    setIsUserIn(response.data)

    }).catch((error) => {
      console.log(error)
    })

  }, [])





  useEffect(() => {

    Axios.get("http://localhost:3001/GetOrderList").then((response) => {

      setCountOrderList(response.data)
     

    }).catch((error) => {

      console.log(error)

    })

  }, [countOrderList])



 

Axios.defaults.withCredentials = true

  return (
    <>

      <div className="card-overlay  col-lg-2 d-flex justify-content-center align-items-center">

        
            <span className="text-white fs-4 me-2">
             <i class="fa-solid fa-circle-user"></i>
            </span>


            {auth ? 
            
            
            <button className="login-btn me-3" onClick={() => {
              setToggleCard(!toggleCard)
            }}>
              Account
            </button>

            : 

          <button className="login-btn me-3" onClick={() => {
            setShow(true)
          }}>
            Login
          </button>
            
          }
          

          <span>

            <span className="fs-4">
              <i class="fa-solid fa-bag-shopping"></i>
            </span>

            <span className="counter">

            
              {auth ? countOrderList && countOrderList.length : countOrderList = 0} 
              
              </span>

          </span>
          
      </div>

      <Modal show={show} onHide={handleClose}  
          
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered>

        <Modal.Title className='text-center mt-5'>Login</Modal.Title>


        <Modal.Body>

          <div className='d-flex justify-content-center'>
            <div className='flex-column col-lg-10'>

              <div class="form-floating mb-3" >
                <input type="email" class="form-control" id="floatingInput" onChange={(e) => {setLoginEmail(e.target.value)}} placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>

                <div className='text-danger mt-1'>
                {feedBackEmail}
                </div>
                
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" onChange={(e) => {setLoginPassword(e.target.value)}} placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>

                <div className='text-danger mt-1'>
                 {feedBackPassword}
                </div>
                

              </div>

              <div className='mt-3'>
                <button className='login col-lg-12 fs-5' onClick={Submit}>Login</button>
              </div>

              <div className='col-lg-12 d-flex justify-content-center mt-3'>
               <Link className='forgot-pass'>Forgot Password?</Link>
              </div>
              
      
            </div>
           
          </div>

          <hr/>
          
          <div className='d-flex justify-content-center'>
           <p className='no-acc'>Don't have an account? <span><Link  to='/register' className='create-acc-link' onClick={() => {

            setShow(false)
            
           }}>Create One</Link></span></p>
          </div>
         
        </Modal.Body>
        
      </Modal>
        
        <div className={`${toggleCard ? "options" : "hide-options"}`}>
          <Card/>
        </div>
      
    </>
  )

}

export default LoginButton