import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../utils/data'

const Navbar = () => {
    const [active, setActive] = useState(links[0])
    return (
        <nav className='navbar'>
            <div className="navbar_center">
                <img src="/images/logo.svg" alt="" />
                <div className='links'>
                    {
                        links.map((item, index) => <Link key={index} className={`links_item ${item === active && 'active'}`} to={item.path}>{item.text}</Link>)
                    }
                </div>
                <div className='right'>
                    <Link className='login' to={'/signin'}>Login</Link>
                    <Link to={'/signup'} className='get-started'>Get Started</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar