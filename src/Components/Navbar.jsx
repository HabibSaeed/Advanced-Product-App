import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {

    const logoutHandler = () => {
        localStorage.removeItem("uid");
    }
    return (
        <>
            <div className='mainNavbar'>
                <div className='navbarNested1'>
                    <img src="https://www.newspace.im/img/org/thumb3/thumbnail_spire-global-cubesat-satellite-logo.png" alt="" />
                </div>
                <div className='navbarNested2'>
                    <ul>
                        <Link to="/body" className='li'><li>Home</li></Link>
                        <Link to="/allproducts" className='li'><li>Products</li></Link>
                        <li>About</li>
                        <Link to="/" className='li'><li onClick={logoutHandler}>Logout</li></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar