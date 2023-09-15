const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const secretKey = "ASDKASLK"
const adminKey = 'AKOIUYQWE'
const saltRounds = 10;
const app = express()
const PORT = 3001;



app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
  }
));


app.use(session({
  key: "admin_session",
  secret: "life-etc",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 24 * 60 * 60 * 1000,
  }
}))


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'life_etc_db'
})




const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }


})

const upload = multer({
  storage: storage
})



//upload products
app.post("/uploadProducts", upload.single("image"), (request, response) => {

  const product_image = request.file.filename;
  const product_name = request.body.product_name;
  const product_price = request.body.product_price;
  const sku = request.body.sku;

 
  
  const upload = "INSERT INTO products_table(product_image, product_name, product_price, sku) VALUES (?,?,?,?)";

  db.query(upload, [product_image, product_name , product_price, sku], (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log("upload success")
    }
  })

})



//upload featured item
app.post("/upfeaturedItem", upload.single("image"), (request, response) => {

  const product_image = request.file.filename;
  const product_name = request.body.featured_product_name;
  const product_price = request.body.featured_product_price;


    console.log(product_price)
  const upload = "INSERT INTO featured_item(featured_product_img, featured_product_name, featured_product_price) VALUES (?,?,?)";

  db.query(upload, [product_image, product_name , product_price], (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log("upload success")
    }
  })

})


//upload post
app.post("/addPost", upload.single("image"), (request, response) => {

  const product_image = request.file.filename;
  const postDate = request.body.postDate;
  const post = request.body.post;

  const addPost = "INSERT INTO posting_table(image_upload, date, time_line) VALUES (?,?,?)";

  db.query(addPost, [product_image, postDate , post], (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log("upload success")
    }
  })
  
  
})







app.get("/featuredItem" , (request, response) => {

  const getFItem = "SELECT * FROM featured_item";
  
  db.query(getFItem, (err, res) => {
    
    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }

  })

})











app.get("/products", (request, response) => {
  

  const getProducts = "SELECT * FROM products_table";

  db.query(getProducts, (err, res) => {

    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }
 
  })

})




app.post("/userRegister", (request, response) => {

  

  const register = "INSERT INTO registration_tb(full_name, birth_date, gender, email_address, user_address, zip_code, phone_number, password) VALUES (?,?,?,?,?,?,?,?)";

  bcrypt.hash(request.body.password.toString(), saltRounds, (err, hash) => {
    if(err) return res.json({Error: 'error'});

    const full_name = request.body.full_name;
    const birth_date = request.body.birth_date;
    const gender = request.body.gender;
    const email_address = request.body.email_address;
    const user_address = request.body.user_address;
    const zip_code = request.body.zip_code;
    const phone_number = request.body.phone_number;
    

    db.query(register, [full_name, birth_date , gender, email_address, user_address,zip_code, phone_number, hash], (err, res) => {
      
        if(err) {
          return console.log(err)
        } else {
          return console.log("success")
        }

      })
      
    })

})




app.post("/userLogin", (request, response) => {
 
  const getAll = 'SELECT * FROM registration_tb WHERE email_address = ?';

  
  db.query(getAll,[request.body.loginEmail], (error, result) => {

    if(error) {
      return response.json({Error: 'Login Error in Server'})
    } 
    
    if(result.length > 0) {

      bcrypt.compare(request.body.loginPassword, result[0].password, (err, data) => {
        if(err) {
          return response.json({Error: 'Password compare error'})
        }

        if(data) {

          const userId = result[0].user_id;
         

          const token = jwt.sign({userId} , secretKey, {expiresIn: "1d"});

          response.cookie('token', token, { httpOnly: true, maxAge: 3600000 })

          return response.json({Email: result[0].email_address});
          
        } else {

          return response.json({Error: 'Invalid Password'})
          
        }

      })

    }  else {

      return response.json({Error: 'Invalid Email Address'})

    }
    
  } )
  
}) 

const verifyUser = (req, res, next) => {

  const token  = req.cookies.token;

  if(!token) {

    return res.json({ message: 'Unauthorized' });

  } else {

    jwt.verify(token, secretKey, (err, decoded) => {

      if(err) {

        return res.json({message: "Token is not valid"})

      } else {

        req.userId = decoded.userId;
        next()

      }
    })
  }

}

app.get("/LoggedIn", verifyUser, (req, res) => {
  
  return res.json({Message: "Authorized"});

})

app.get("/loggedinID", verifyUser, (req, res) => {

  
  const userID = req.userId

  return res.json({id: userID})

});


app.post("/addToCart", (request, response) => {

  const product_image = request.body.product_image;
  const product_name = request.body.product_name;
  const product_price = request.body.product_price;
  const qty = request.body.qty;
  const sizes = request.body.sizes;
  const cart_user_id = request.body.cart_user_id;

 const addCart = "INSERT INTO add_cart_table(product_image, product_name, product_price, qty, sizes, cart_user_id) VALUES (?,?,?,?,?,?)";

 db.query(addCart, [product_image, product_name, product_price, qty, sizes, cart_user_id], (err, result) => {

  if(err) {
    console.log(err)
  } else {
    console.log("success")
  }

 })

})



app.get("/getOrderList", verifyUser, (request , response ) => {

  const userID = request.userId

  const getList = "SELECT * FROM add_cart_table WHERE cart_user_id=?";

  db.query(getList, [userID], (err, res) => {

    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }

  })


})

app.get("/userLogout", (req, res) => {

  res.clearCookie("token"); 
  req.session.destroy()
  res.sendStatus(200); 

});



app.delete("/deleteCart/:id", (request, response) => {

const cart_id = request.params.id




const deleteCart = "DELETE FROM add_cart_table WHERE cart_id = ?";
db.query(deleteCart, [cart_id], (err, result) => {

  if(err) {
    console.log(err)
  } else {
    console.log("delete success")
  }

})

})



// "SELECT registration_table.full_name, registration_table.address, registration_table.postal_code,   registration_table.contact_number,  buyers_table.cart_id,buyers_table.buyer_id, buyers_table.product_image, buyers_table.product_name, buyers_table.product_price, buyers_table.qty FROM buyers_table INNER JOIN registration_table ON registration_table.id=buyers_table.buyer_id";

app.get("/countOrders", (request, response) => {

  const getOrders = "SELECT registration_tb.full_name, registration_tb.user_address, registration_tb.phone_number, add_cart_table.product_image, add_cart_table.product_name, add_cart_table.product_price, add_cart_table.qty, add_cart_table.sizes FROM add_cart_table INNER JOIN registration_tb ON registration_tb.user_id=add_cart_table.cart_user_id";
  
  db.query(getOrders, (err, result) => {

    if(err) {
      console.log(err)
    } else {
      response.send(result)
    }

  })
 
})

app.get("/allProd", (request, response) => {

  const getProd = "SELECT * FROM products_table";

  db.query(getProd, (err, result) => {

    if(err) {
      console.log(err)
    } else {
      response.send(result)
    }

  })

})



app.get("/post", (request, response) => {

  const getPost = "SELECT * FROM posting_table";

  db.query(getPost, (err, res) => {

    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }

  })

})



app.listen(PORT, () => {
  console.log(`Listening port in ${PORT}`)
})