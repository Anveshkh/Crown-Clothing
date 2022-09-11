import { Link } from "react-router-dom";
import { Outlet} from "react-router-dom";
import { Fragment, useContext } from "react";
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
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


                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}


export default Navigation;