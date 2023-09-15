


const ContactContent = () => {

  return (

    <>

    <div className="container-md mt-5">


      <div className="d-flex justify-content-center">
        <p className="text-center col-lg-4">For all order support, please include your order number and date that your order was placed</p>
      </div>

      <div className="mt-4">

   
        <form action="#" method="#" className="form">  


          <div className="d-flex justify-content-center mt-5">

            <div className="d-flex flex-column me-4">
              <span><label htmlFor="firstName">First Name</label></span>
              <input className="first-name" id="firstName"/>
            </div>

            <div className="d-flex flex-column">
             <span><label htmlFor="lastName">Last Name</label></span>
             <input className="last-name" id="lastName"/>
            </div>

          </div>

          <div className="d-flex justify-content-center mt-3">

            <div className="d-flex flex-column me-4">
              <span><label htmlFor="emailAdd">Email Address</label></span>
              <input className="email-add" id="emailAdd"/>
            </div>

            <div className="d-flex flex-column">
             <span><label htmlFor="phoneName">Phone Number</label></span>
             <input className="phone-num" id="phoneNum"/>
            </div>

          </div>


          <div className="d-flex justify-content-center mt-3">

            <div className="d-flex justify-content-center flex-column col-lg-4">
              <span><label htmlFor="firstName">Enter Your Message Here</label></span>
                <textarea className="col-lg-12"/>
            </div>

          
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button className="subBtn">Submit</button>
          </div>
          


        </form>


      </div>
      
      
      

    </div>
      

    </>

  )

}

export default ContactContent