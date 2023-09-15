import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

const Register = () => {

  const [name, setName] = useState("");
  const [bdate, setBdate] = useState("");
  
  const [gender, setGender]  = useState("");
  const male = "Male";
  const female = "Female";
  const other = "Others";

  const [phoneNum, setPhoneNum] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  //invalid feed-back
  const [invaName, setInvaName] = useState("")
  const [invaDate, setInvaDate] = useState("")
  const [invaGender, setInvaGender] = useState("")
  const [invaNum, setInvaNum] = useState("")
  const [invaZipcode, setInvaZip] = useState("")
  const [invaAddrss, setInvaAddress] = useState("")
  const [invaEmail, setInvaEmail] = useState("")
  const [invaPassword, setInvaPass] = useState("")

  


  const phoneRegex = /^(09|\+639)\d{9}$/;
  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const userRegister = {
    full_name: name,
    birth_date: bdate,
    gender: gender,
    email_address: emailAdd,
    user_address: address,
    zip_code: zipCode,
    phone_number: phoneNum,
    password: password
  }


  const Submit = () => {
    
    
   if(phoneNum.match(phoneRegex) && emailAdd.match(emailRegex) && password.match(passwordRegex) && invaName !== "" && invaDate !== "" && invaGender !== "" && invaNum !== "" && invaZipcode !== "" && invaAddrss !== "" && invaEmail !== "" && invaPassword !== "" && isChecked === true) {

    Axios.post("http://localhost:3001/userRegister", userRegister).then(() => {
      console.log("Registration Success")
    }).catch(() => {
      console.log("Registration Error")
    })

    
   } else {
    setInvaName("Invalid Name")
    setInvaDate("Invalid Date")
    setInvaGender("Invalid Gender")
    setInvaNum("Invalid Number")
    setInvaZip("Invalid Zip Code")
    setInvaAddress("Invalid Address")
    setInvaEmail("Invalid Email Address")
    setInvaPass("Invalid Password")
   }
    
  }

 
  return (

    <>
  
      <div className="container-md  mt-5">


        <div className="d-flex flex-row justify-content-center">

          <div className="col-lg-5 d-flex flex-column">

               <div class="form-floating mb-3" >

                <input type="text" class="form-control" id="floatingInput" placeholder="Full Name"  value={name} onChange={(e) => { setName(e.target.value) }} required/>
                <label htmlFor="floatingInput">Full Name <span className="form-req">*</span></label>

                <div className='mt-2 text-danger'>
                  {invaName}
                </div>

              </div>

              <div>
                
              </div>

              <div className="d-flex justify-content-between">

                <div class="form-floating">
                  <input type="date" class="form-control" id="floatingPassword" placeholder="Birth Date" value={bdate}  onChange={(e) => { setBdate(e.target.value) }} required/>
                  <label htmlFor="floatingPassword">Birthdate <span className="form-req">*</span></label>

                  <div className='mt-2 text-danger'>
                    {invaDate}
                  </div>
                </div>

                <div className="col-lg-5">

                  <div class="form-floating">

                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example" value={gender} onChange={(e) => { setGender(e.target.value) }} required>
                      <option disabled selected value="" >Select</option>
                      <option value={male}>Male</option>
                      <option value={female}>Female</option>
                      <option value={other}>Other</option>
                    </select>
                    <label htmlFor="floatingSelect">Gender <span className="form-req">*</span></label>

                  <div className='mt-2 text-danger'>
                    {invaGender}
                  </div>

                  </div>

                </div>

              </div>

             
              <div className="d-flex justify-content-between mt-3">

                <div class="form-floating">
                  <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={phoneNum} onChange={(e) => { setPhoneNum( e.target.value) }} required/>
                  <label htmlFor="floatingPassword">Phone Number <span className="form-req">*</span></label>

                  <div className='mt-2 text-danger'>
                    {invaNum}
                  </div>
                </div>


                <div class="form-floating">
                  <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={zipCode} onChange={(e) => { setZipCode(e.target.value)}} required/>
                  <label htmlFor="floatingPassword">Zip Code <span className="form-req">*</span></label>

                  <div className='mt-2 text-danger'>
                    {invaZipcode}
                  </div>
                </div>
                

              </div>

              <div class="form-floating mt-3" >
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={address} onChange={(e) => {setAddress(e.target.value)}} required/>
                <label htmlFor="floatingInput">Address <span className="form-req">*</span></label>

                <div className='mt-2 text-danger'>
                    {invaAddrss}
                </div>
              </div>
              
          
              <div class="form-floating mb-3 mt-3" >
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={emailAdd} onChange={(e) => { setEmailAdd(e.target.value)}} required/>
                <label htmlFor="floatingInput">Email Address <span className="form-req">*</span></label>

                  <div className='mt-2 text-danger'>
                    {invaEmail}
                  </div>
              </div>

              <div class="form-floating mb-3" >
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={password} onChange={(e) => { setPassword(e.target.value)}} required/>
                <label htmlFor="floatingInput">Password <span className="form-req">*</span></label>

                  <div className='mt-2 text-danger'>
                    {invaPassword}
                  </div>
              </div>

              <div>

                <div className="mt-2">
                  <input type="checkbox" className="me-2"  onChange={handleCheckboxChange} required/>
                  <span>I agree to all Term and Privacy Policy.</span>
                </div>


              </div>

              
              <button className="signup-btn col-lg-12 mt-5" onClick={Submit}>Sign up</button>
 
                <div className='d-flex justify-content-center mt-3'>
                  <p className='no-acc'>Already have an account? <span><Link  to="/" className='create-acc-link'>Login</Link></span></p>
               </div>
              
         

          </div>

        </div>

        
       



      </div>

    </>

  )

}

export default Register