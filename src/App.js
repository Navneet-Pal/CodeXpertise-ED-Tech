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

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter">
      
         <Navbar/>
         <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/verifyemail' element={<VerifyEmail/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route element={<Dashboard/>} >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/dashboard/setting" element={<SettingPage />} />
          </Route>

         </Routes>

    </div>
  );
}

export default App;
