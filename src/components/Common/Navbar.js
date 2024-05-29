import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/codexpertise new purple logo.png"
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
    const [loading, setLoading] = useState(false)
    const { totalItems } = useSelector((state) => state.cart)

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

            <div className='flex text-richblack-25 items-center gap-x-52'>
            
                <Link to="/">
                    {/* <div className='noise'>
                        <h1 className='text-4xl font-bold'>CodeXpertise</h1>
                    </div> */}
                    <img class="navlogo" src={logo} width={170} height={40} loading='lazy'/>
                </Link>
                

                <ul className='flex gap-5 items-center'>
                    {
                        NavbarLinks.map( (item , index) =>{
                            return(
                                <li key={index}>
                                    {
                                        item.title === "Catalog" ? 
                                        (
                                            <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                                setTab("/catalog/:catalogName")
                                                ? "text-yellow-25"
                                                : "text-richblack-25"
                                            }`}>
                                            

                                            <p>{item.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ): subLinks?.length ? (
                                                            subLinks.map( (subLink, index) => (
                                                                <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ) )
                                                    ) : (<p className="text-center">No Courses Found</p>)
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
                        <Link to={"/dashboard/cart"} className="relative">
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        {totalItems > 0 && (
                                <span className="absolute bottom-4 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                {totalItems}
                                </span>
                            )}
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