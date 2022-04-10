import axios from "axios";
import Cookies from "js-cookie";
import React ,{useState , useContext , useEffect} from "react";
import AxiosGlobal from "./axiosGlobal";

const PostForAll = React.createContext({
    
});

export const PostForAllProvider = (props) =>{
    const [saveAllData , setGetAllData] = useState([]);
    const axiosGlobal = useContext(AxiosGlobal);
    
    const getData =async()=>{
        try{
            const response = await axios({
                method:"get",
                url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMain`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = response.data; 
            setGetAllData([...data.rs])
        
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, []);


    return <PostForAll.Provider value={saveAllData}>{props.children}</PostForAll.Provider>
}
export default PostForAll;