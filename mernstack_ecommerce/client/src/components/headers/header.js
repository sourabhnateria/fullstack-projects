import React, { useContext } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { GlobaLState } from "../../GlobalState";
import axios from "axios";

const Header = () => {

    const state = useContext(GlobaLState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin,setIsAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = () => {
        return(
            <>
            <li><Link to ='/create_product'> Create Product</Link></li>
            <li><Link to='/catergory'> Categories</Link></li>
            </>
        )

        
    }

    const loggedRouter = () => {
        return (
            <>
            <li><Link to='/history'>History</Link></li>
            <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
     return(

        <header>
            <div className="menu"><CiMenuFries size={30}/> </div>
            <div className="logo"><h1><Link to="/">{isAdmin?'Admin':'my e-commerce'} </Link></h1><MdClose /></div>
            <ul> 
                <li><Link to="/">{isAdmin?'Products':'Shop'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() :<li><Link to="/login">login or register</Link></li>
                }
                

                <li><MdClose size={30} className='menu'/></li>
            </ul>

            {
                isAdmin ? '' : <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to= '/cart' ><IoCartOutline size={30} /></Link>
                </div>
            }
            
        </header>
    )
}

export default Header