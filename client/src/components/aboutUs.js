import Picture from "../images/about-us-pic.png"

const AboutUs = () => {

  return (

    <>

      <div className="container-md mt-5">

        <div className="col-lg-11 d-flex justify-content-center">
         <img src={Picture} alt="Girl"/>
        </div>

        <div className="about-us-text mt-5">

          <p className="text-center fs-5">We are a curated online store that celebrates the beauty of simplicity and the allure of the artistic. Our passion lies in offering a meticulously handpicked selection of products that reflect the essence of minimalism, elegance, and creativity. From captivating artwork and exquisite decor pieces to fashion that merges style with comfort, we aim to provide you with a unique and immersive shopping experience. Our journey is fueled by a deep appreciation for the finer details in life, and we invite you to explore our collection that embodies a harmonious blend of aesthetics and inspiration. At Euphoria, we believe that the ordinary can be extraordinary, and we're thrilled to share our vision of beauty with you</p>

        </div>

      </div>

    </>

  )

}

export default AboutUs