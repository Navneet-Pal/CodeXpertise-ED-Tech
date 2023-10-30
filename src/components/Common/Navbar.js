import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/AuthPage/ProfileDropDown';


function Navbar() {

    const location = useLocation();
    const [subLinks, setSubLinks]  = useState([]);
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile );

    function setTab(value){
        
        return value ===location.pathname;
    }

    async function fetchSubLinks(){
        try {
            const res = await apiConnector ("GET",categories.CATEGORIES_API);
            setSubLinks(res.data.data);
           
           
        } 
        catch (error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        
        fetchSubLinks();
    },[] )

  return (
    <div className=' border-solid border-b-2 border-b-richblack-700 p-2 flex items-center'>
    
        <div className='text-white w-11/12 max-w-maxContent mx-auto '>

            <div className='flex gap-x-6 text-richblack-25 items-center justify-between'>
            
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy'/>
                </Link>
                

                <ul className='flex gap-5 items-center'>
                    {
                        NavbarLinks.map( (item , index) =>{
                            return(
                                <li key={index}>
                                    {
                                        item.title === "Catalog" ? 
                                        (
                                            <div className='relative flex items-center gap-2 group'>
                                            

                                            <p>{item.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className='invisible absolute left-[50%]
                                            translate-x-[-50%] translate-y-[80%]
                                            top-[50%]
                                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:visible
                                            group-hover:opacity-100 lg:w-[300px]'>

                                                <div className='absolute left-[50%] top-0
                                                translate-x-[80%]
                                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                                                
                                                {
                                                    subLinks.length ? (
                                                            subLinks.map( (subLink, index) => (
                                                                <Link to={`${subLink.link}`} key={index}>
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ) )
                                                    ) : (<div></div>)
                                                }
                                            
                                            </div>
                                            
                                            
                                            </div>




                                        ) : (
                                            <Link to={item.path}>
                                                <p className={`${ setTab(item.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {item.title}
                                                </p>
                                            
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        } )
                    }
                </ul>

                
                <div className='flex gap-x-4 items-center'>

                    {
                        user && user.accountType != "instructor" && 
                        <Link to={"/dashboard/cart"}>
                            <AiOutlineShoppingCart fontSize={26} />
                            
                        </Link>
                    }
                    {
                        token === null && 
                        <div className='flex gap-5'>
                        
                            <Link to={"/login"}>
                                <div className='border cursor-pointer border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'
                                >Log in</div>
                            </Link>

                            <Link to={"/signup"}>
                                <div className='border cursor-pointer border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'
                                >Sign up</div>
                            </Link>

                        </div>
                    }

                    {
                        token !==null && <ProfileDropDown/>
                    }

                
                    
                    
                    
                
                </div>


            
            </div>

        </div>
    
    </div>
  )
}

export default Navbar