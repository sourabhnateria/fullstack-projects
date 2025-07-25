import { createContext, useEffect} from "react";
import ProductAPI from "./api/ProductAPI";
import { useState } from "react";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobaLState = createContext();
export const DataProvider = ({children}) => {

    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        const refresh = await axios.post('/user/refresh_token');

        setToken(refresh.data.accesstoken)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    }, [])
   
    const state = {
        token:[token, setToken],
        productAPI:ProductAPI(),
        userAPI: UserAPI(token)
    };

    
    return(
        <GlobaLState.Provider value={state }>{children}
        </GlobaLState.Provider>
    )
}