import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
export default function Header() {
    const navigator=useNavigate();
    const location=useLocation();
    function checkLocation(route){
        if(route===location.pathname)
            return true;
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3 mx-auto max-w-6xl'>
            <div>
                <img src={require("../images/rent-easy-high-resolution-logo.png")} alt="logo" className='h-[60px] cursor-pointer p-0 m-0' onClick={()=>{navigator("/")}}/>
            </div>
            <div>
                <ul className='flex space-x-10 pt-3'>
                    <li className={`text-gray-500 pb-3 font-semibold ${checkLocation("/") && "text-black border-b-[3px] border-red-600"}`} onClick={()=>{navigator("/")}}>Home</li>
                    <li className={`text-gray-500 pb-3 font-semibold ${checkLocation("/offers") && "text-black border-b-[3px] border-red-600"}`} onClick={()=>{navigator("/offers")}}>Offers</li>
                    <li className={`text-gray-500 pb-3 font-semibold ${checkLocation("/sign-in") && "text-black border-b-[3px] border-red-600"}`} onClick={()=>{navigator("/sign-in")}}>Sign In</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
