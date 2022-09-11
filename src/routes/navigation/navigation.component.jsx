
import { Outlet, Link} from "react-router-dom";
import { Fragment, useContext } from "react";
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context";
import { CartContext} from "../../contexts/cart-context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";


import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'


const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)


    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to='/shop' className="nav-link">
                        SHOP
                    </Link>
                    {currentUser ? (<span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>) : (<Link className="nav-linik" to='/auth'>SIGN IN</Link>)}
                    <CartIcon />
                </div>

                {isCartOpen && <CartDropDown />}
                
            </div>
            <Outlet />
        </Fragment>
    )
}


export default Navigation;