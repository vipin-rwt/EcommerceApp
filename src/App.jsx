import './App.css'
import Home from './Pages/Home/Home.jsx'
import Order from './Pages/order/Order'
import Cart from './Pages/Cart/Cart.jsx'
import Dashboard from './Pages/admin/dashboard/Dashboard.jsx';
import {BrowserRouter as Router,Route,Routes, Navigate } from 'react-router-dom'
import Nopage from './Pages/nopage/Nopage.jsx';
import MyState from './Context/Data/MyState.jsx';
import Login from './Pages/Registration/Login.jsx';
import Signup from './Pages/Registration/Signup.jsx';
import Productinfo from './Pages/productinfo/Productinfo.jsx';
import AddProduct from './Pages/admin/pages/AddProduct.jsx';
import UpdateProduct from './Pages/admin/pages/UpdateProduct.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './Pages/allProducts/Allproducts.jsx';



function App() {


  return (
    <>
  <MyState>
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Order" element={<ProtectedRoute><Order/></ProtectedRoute>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Dashboard" element={<ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<Productinfo />} />
          <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>} />
          <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>} />
          <Route path="/allproducts" element={<Allproducts/>} />
          <Route path="/*" element={<Nopage />} /> {/* whicever page path is not matched it will be redirected to this no page */}
        </Routes>
        <ToastContainer/>
      </Router> 
    </MyState>
    
    </>
  )
}

export default App
//user
// ProtectedRoute Component
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}

// ProtectedRouteForAdmin Component
export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  if (admin && admin.user.email === 'vipin@gmail.com') {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}