import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/navBar';
import HomePage from './pages/home';
import AllProducts from './pages/allProducts';
import About from './pages/about';
import Journal from './pages/journal';
import Contact from './pages/contact';
import RegistrationPage from './pages/registrationPage';
import OrderList from './components/orderList'
import PrivateRoutes from './components/privateRoutes';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminNavBar from './admin_routes/adminNav';
import OrderAdmin from './admin_routes/ordersAdmin';



function App() {

 

  return (

    <>

      <PayPalScriptProvider options={{'client-id': "AUazfhdDixou0Gfuj_UdDkeBOcO_LAKorsYeNGJKS0_a6CsJCd_T07zscPUskGxHVeD08DxKQJfiQMGJ"}}>

      <BrowserRouter>

        

        <Routes>

          <Route path='/' element={<NavBar/>}>

          <Route path="/" element={<HomePage/>}/> 
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/journal' element={<Journal/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={<RegistrationPage/>}/>



          <Route  element={<PrivateRoutes/>}>

              <Route path='/orders' element={<OrderList/>} exact/>

          </Route>

         


            
         </Route>

        </Routes>

      </BrowserRouter>

     </PayPalScriptProvider>




     <BrowserRouter>

      <Routes>
        

        <Route path='/admin' element={<AdminNavBar/>}>

          < Route path='/admin' element={<OrderAdmin/>}/>


        </Route>


      </Routes>
     
     
     
     </BrowserRouter>




        
    </>

  );

}

export default App;
