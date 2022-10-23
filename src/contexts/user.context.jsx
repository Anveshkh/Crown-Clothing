
import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
// contexts is a storage place

// actual value you want to access


export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}

export const UserReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER : 
            return {
                ...state,
                currentUser : payload,
            };
        default :
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

// provider is a actual component
const INITIAL_STATE = {
    currentUser : null,
}


export const UserProvider = ({children}) => {

    const [ Outputstate, dispatch ] = useReducer(UserReducer, INITIAL_STATE)

    const {currentUser} = Outputstate;

    const setCurrentUser = (user) => {
        dispatch({type : USER_ACTION_TYPES.SET_CURRENT_USER, payload : user});
    } 

    const value = {currentUser, setCurrentUser};

    // signOutUser()

    useEffect(()=> {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}