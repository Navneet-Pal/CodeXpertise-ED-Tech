import {Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navbar from './components/Common/Navbar';
import Signup from './pages/Signup';
import Login from "./pages/Login"
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './components/core/dashboard/MyProfile';
import EnrolledCourses from './components/core/dashboard/EnrolledCourses';
import SettingPage from './components/core/dashboard/settings/SettingPage';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import OpenRoute from './components/core/AuthPage/OpenRoute';
import PrivateRoute from './components/core/AuthPage/PrivateRoute';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import Cart from './components/core/dashboard/cart/Cart';

function App() {

  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter">
      
         <Navbar/>
         <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>} />
          <Route path='/login' element={<OpenRoute><Login/></OpenRoute>} />
          <Route path='/verifyemail' element={<OpenRoute><VerifyEmail/></OpenRoute>} />
          <Route path='/about' element={<OpenRoute><About/></OpenRoute>} />
          <Route path='/contact' element={<Contact/>} />
          <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            
            <Route path="/dashboard/setting" element={<SettingPage />} />
          </Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="dashboard/cart" element={<Cart />} />
              </>
            )
          }

          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />

          <Route path='/forgotpassword' element={<OpenRoute><ForgotPassword/></OpenRoute>} />
          <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>} />

         </Routes>

    </div>
  );
}

export default App;
