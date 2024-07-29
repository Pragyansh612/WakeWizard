import React from 'react'
// import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className='flex justify-between  bg-violet-500'>
            <div className=' text-center my-4 text-white m-28 font-bold text-2xl hover:text-4xl duration-200'>WakeWizard</div>
            <ul className='flex gap-8 my-5 text-white m-20'>
                <a href="" className=' hover:font-bold duration-200'><li>Home</li></a>
                <a href="" className=' hover:font-bold duration-200'><li>Alarms</li></a>
            </ul>
        </div>
    )
}

export default Nav
