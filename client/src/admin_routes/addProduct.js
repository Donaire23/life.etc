import { useState } from "react";
import Axios from "axios";

const AdminPage = () => {


  const [file, setFile] = useState(null);
  const [productN, setProductN] = useState("");
  const [productP, setProductP] = useState("");
  const [productSKU, setProductSku] = useState("");

  const [imagePreview, setImagePreview] = useState(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

   
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }

  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_name", productN);
    formData.append("sku", productSKU);
    formData.append("product_price", productP);


    Axios.post("http://localhost:3001/uploadProducts", formData)
      .then((response) => {
        console.log("Upload Success");
      })
      .catch((error) => {
        console.error("Upload Error:", error);
      });
  };




  
  return (

    <>


      <div className="count-card col-lg-4 mt-5 pt-5 pb-5 d-flex align-items-center justify-content-center">
          <h1 className="orders-txt text-center">ADD PRODUCTS</h1>
      </div>

   

      <div className="mt-5 add-prod">


          <div className="add-images-div mt-5 col-lg-6 d-flex flex-column justify-content-center">
            
          
            {imagePreview && <img src={imagePreview} alt="Selected" className="col-lg-3 selected-img d-flex justify-content-center"/>}



            <p className="mt-2">Add Image Product</p>
            <input type="file" onChange={handleFileChange} className="pb-5"/>
          </div>
          <div className="d-flex flex-column col-lg-6 pb-5">
          <div className="form-floating mb-3">
            <input
              type="text"
              onChange={(e) => {
                setProductN(e.target.value);
              }}
              className="form-control"
              id="floatingInput"
              placeholder="Product Name"
            />
        
            <label htmlFor="floatingInput">Product Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              onChange={(e) => {
                setProductSku(e.target.value);
              }}
              className="form-control"
              id="floatingInput"
              placeholder="Product Name"
            />
            
            <label htmlFor="floatingInput">Product SKU</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              onChange={(e) => {
                setProductP(e.target.value);
              }}
              className="form-control"
              id="floatingInput"
              placeholder="Product Price"
            />
            <label htmlFor="floatingInput">Product Price</label>
          </div>

          

          <button onClick={handleUpload} className="upload-btn">
            Upload
          </button>
        </div>




      </div>






    </>


  )
   
};

export default AdminPage;