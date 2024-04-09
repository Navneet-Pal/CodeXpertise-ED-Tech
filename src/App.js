import {Routes, Route,useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/core/dashboard/cart/Cart';
import AddCourse from './components/core/dashboard/AddCourse';
import MyCourses from './components/core/dashboard/MyCourses';
import EditCourse from './components/core/dashboard/EditCourse';
import Error from './pages/Error';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Instructor from './components/core/dashboard/Instructor';
import { getUserDetails } from './services/operations/profileAPI';
import { useEffect, useState } from 'react';

function App() {

  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
   
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

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
          <Route path='/forgotpassword' element={<OpenRoute><ForgotPassword/></OpenRoute>} />
          <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>} />
          <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />

          <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
                </>
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="dashboard/instructor" element={<Instructor />} />
                  <Route path="dashboard/add-course" element={<AddCourse />} />
                  <Route path="dashboard/my-courses" element={<MyCourses />} />
                  <Route
                    path="dashboard/edit-course/:courseId"
                    element={<EditCourse />}
                  />
                </>
              )
            }

            <Route path="/dashboard/setting" element={<SettingPage />} />
          </Route>


          <Route element={<PrivateRoute> <ViewCourse/> </PrivateRoute>}>
            {user?.accountType=== ACCOUNT_TYPE.STUDENT && (
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
            )}

          </Route>
         

          

            {/* 404 Page */}
          <Route path="*" element={<Error />} />

         </Routes>

    </div>
  );
}

export default App;
