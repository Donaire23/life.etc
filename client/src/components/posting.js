import Axios from 'axios'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Posting = () => {

  const [getPost, setGetPost] = useState([]);

  useEffect(() => {

    Axios.get("http://localhost:3001/post").then((response) => {
      setGetPost(response.data)
    }).catch((error) => {
      console.log(error)
    })

  }, [getPost])


  return (

    <>

      <div className='container-md mb-5'>

        <p className='all-post-txt mt-5'>All Posts</p>

        <div className='d-flex row justify-content-center'>

          {getPost.map((val) => {

          
            return (

              <Card className='col-lg-3 mt-3 me-4'>
                <Card.Img variant="top" src={`http://localhost:3001/images/`+val.image_upload} className='mt-2'/>

                <Card.Body>

                  <Card.Title>
                    <div className='d-flex mb-4'>

                      <div className='d-flex align-items-center'>
                        <span className="me-3 admin-profile text-center bg-dark">

                          <span className="text-white admin">
                            <i class="fa-solid fa-user"></i>
                          </span>

                        </span>
                      </div>

                      <div className='d-flex flex-column'>

                        <span className='post-text mb-1'>Admin</span>
                        <span className='post-text'>{val.date}</span>
                        
                        
                      </div>

                      
                    </div>
                  </Card.Title>

                  <Card.Text className='mt-3'>
                   {val.time_line}
                  </Card.Text>

                
              
                </Card.Body>

               </Card>

            )



          })}

        </div>



      </div>
     
     \
    
    </>

  )

}

export default Posting
