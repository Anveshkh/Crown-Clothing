
import { Outlet, Link} from "react-router-dom";
import { Fragment, useContext } from "react";
import {NavigationContainer, NavLinksContainer, NavLink, LogoContainer,} from './navigation.styles.jsx'
import { UserContext } from "../../contexts/user.context";
import { CartContext} from "../../contexts/cart-context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";


import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'


const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)

    // console.log("hit"); 
    
    // console.log("current user is: ", currentUser);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop' >
                        SHOP
                    </NavLink>
                    { currentUser ? (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinksContainer>

                {isCartOpen && <CartDropDown />}
                
            </NavigationContainer>
            <Outlet />
            
        </Fragment>
    )
}


export default Navigation;