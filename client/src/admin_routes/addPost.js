import Axios from 'axios'
import {useEffect, useState} from 'react'

const AddPost = () => {

  const [file, setFile] = useState()
  const [post, setPost] = useState()
  const [postDate, setPostDate] = useState()
  const [imagePreview, setImagePreview] = useState(null);

  const date = Date()

  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  useEffect(() => {

    setPostDate(formattedDate)

  }, [formattedDate])


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
    formData.append('image', file);
     formData.append('postDate', postDate)
   formData.append('post', post);
   

    Axios.post("http://localhost:3001/addPost", formData)
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
          <h1 className="orders-txt text-center">ADD POST</h1>
      </div> 
      
      <div className="container mt-5">

        <div className="add-images-div mt-5 col-lg-5 mb-5">

          

          <p>
            Add Images
          </p>

          <input type="file" onChange={handleFileChange}/>

        </div>

       
         <div className="d-flex flex-column col-lg-5 pb-5">

             <div class="form-floating mb-3">
              <input type="text" onChange={(e) => {setPost(e.target.value)}} class="form-control" id="floatingInput" placeholder="Post"/>

              <label for="floatingInput">
                Post
              </label>

           </div>

          
       
      
            <button onClick={() => {

            const formData = new FormData();
            formData.append('image', file);
            formData.append('postDate', postDate)
            formData.append('post', post);
      
            
           

            Axios.post("http://localhost:3001/addPost", formData).then((response) => {
              console.log("Upload Success");
            }).catch((error) => {
              console.error("Upload Error:", error);
            });


            }} className="upload-btn">Upload</button>
          </div>
        </div>

    </>
  )
}

export default AddPost