import React, { useState , useContext } from 'react';
import Cookies from 'js-cookie';
import axios, { Axios } from 'axios';
import jwtDecode from 'jwt-decode';
import { Redirect , useHistory , useNavigate } from 'react-router-dom';
import AxiosGlobal from './axiosGlobal';
import ActivePage from './activePage';

axios.defaults.withCredentials = true

const AuthContext = React.createContext({
    
    token:'',
    isLoggedIn : false,
    login:(token)=>{},
    logout:()=>{},
    jwtInst : null,
    defaultTargetApi:'',
    logedInUserId:''
})


export const AuthContextProvider = (props) =>{
    const savedToken = Cookies.get('accessToken');
    const axiosGlobal = useContext(AxiosGlobal);
    const [token , setToken] = useState(savedToken);
    const [logedInUserId , setLogedInUserId] = useState(savedToken);

    const activePage = useContext(ActivePage);
    const userIsLoggedIn = !!token;
    const navigation = useNavigate();
     
    if(Cookies.get('accessToken') !== undefined){
        var decoded = jwtDecode(token);
    }
    const logOutHandler = () =>{
        setToken(null)
        Cookies.remove('accessToken');
        deleteRefreshToken()
    }
    const logInHandler = async(token) =>{
        Cookies.set('accessToken' , token ,{sameSite: 'strict', secure: true});
        setToken(token);
        setLogedInUserId(decoded.id);
        
    }
    const jwt = axios.create(
        ({
            baseURL:`${axiosGlobal.defaultTargetApi}`,
            withCredentials:true,
            headers:{
                Authorization : `Bearer ${Cookies.get('accessToken')}`
            }
        })
    );
    const contextValue = {
        token :token,
        isLoggedIn: userIsLoggedIn,
        login:logInHandler,
        logout:logOutHandler,
        jwtInst:jwt,
        decoded,
        logedInUserId:logedInUserId,
        defaultTargetApi:`${axiosGlobal.defaultTargetApi}`
    };

    jwt.interceptors.request.use(async (config)=>{
        let currentDate = new Date();
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 < currentDate.getTime()){
            const toke = await postRefreshToken();
            Cookies.set('accessToken' , toke.accessToken ,{sameSite: 'strict', secure: true});
            setToken(toke.accessToken);
            config.headers["Authorization"] = `Bearer ${toke.accessToken}`;
        }else{
            logOutHandler();
        }
        return config;
    },(error)=>{
           
              logOutHandler();

    })
    const postRefreshToken = async() =>{
        try{
            const response = await axios({
                withCredentials:true,
                method:"post",
                url:`${axiosGlobal.defaultTargetApi}/auth/refreshTokenForMain`
            })
            const data =  response.data; 
            return data;
        }catch(err){    
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            setToken(null)
            deleteRefreshToken()
        }
    }

    const deleteRefreshToken =  async () =>{
        try{
            const response = await axios({
                withCredentials:true,
                method:"post",
                url:`${axiosGlobal.defaultTargetApi}/auth/deleteRefreshToken`
            })
            const data =  response.data; 

        }catch(error){
            console.log(error);
        }
    }
    
    return(
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )   
}


export default AuthContext;



