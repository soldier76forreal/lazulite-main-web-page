// import { Cookie } from "@mui/icons-material";
// import axios from "axios";
// import Cookies from "js-cookie";
// import React ,{useState , useContext , useEffect } from "react";
// import AxiosGlobal from "./axiosGlobal";
// import Language from "./language";

// const PostForAll = React.createContext({
    
// });

// export const PostForAllProvider = (props) =>{
//     const [saveAllData , setGetAllData] = useState([]);
//     const axiosGlobal = useContext(AxiosGlobal);
//     const langCtx = useContext(Language);
//     const getData =async()=>{
//         try{
//             if(langCtx.language === 'persian'){
//                 const response = await axios({
//                     method:"get",
//                     url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMain`,
//                     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
//                 })
//                 const data = response.data; 
//                 setGetAllData([...data.rs])
//             }else if(langCtx.language === 'arabic'){
//                 const response = await axios({
//                     method:"get",
//                     url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMainAr`,
//                     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
//                 })
//                 const data = response.data; 
//                 setGetAllData([...data.rs])
//             }else if(langCtx.language === 'english'){
//                 const response = await axios({
//                     method:"get",
//                     url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMainEn`,
//                     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
//                 })
//                 const data = response.data; 
//                 setGetAllData([...data.rs])
//             }

        
//         }catch(error){
//             console.log(error);
//         }
//     }
//     useEffect(() => {
//         getData()
//     }, [Cookies.get('currentLang')]);

//     return <PostForAll.Provider value={saveAllData}>{props.children}</PostForAll.Provider>
// }
// export default PostForAll;