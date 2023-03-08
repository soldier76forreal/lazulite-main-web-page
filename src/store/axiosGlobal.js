import Cookies from "js-cookie";
import React ,{useState} from "react";
const AxiosGlobal = React.createContext({
    defaultTargetApi:''
});
export const AxiosGlobalProvider = (props) =>{
    const contextValue ={
        defaultTargetApi:'https://api.lazulitemarble.com'
    }
    return <AxiosGlobal.Provider value={contextValue}>{props.children}</AxiosGlobal.Provider>
}
export default AxiosGlobal;
