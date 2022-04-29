import Cookies from "js-cookie";
import React ,{useState} from "react";

const Loading = React.createContext({
    loading:false,
    loadingStatus:(status)=>{}
});

export const LoadingProvider = (props) =>{
    const [loadingStatus , setLoadingStatus] = useState(false);
    const changeLoadingStatus = (status)=>{
        setLoadingStatus(status);
    }
    return <Loading.Provider value={{loading:loadingStatus , loadingStatus:changeLoadingStatus}}>{props.children}</Loading.Provider>
}
export default Loading;