import axios from "axios";
import { Fragment, useState , useContext } from "react";
import AuthContext from "../../store/auth";






const SitemapUrls =  () =>{


    const [urlsList , setUrlsList] = useState('');
    const authCtx = useContext(AuthContext);
    const csvData = [];
    const listGenerator = async() =>{
        try{
            const response = await authCtx.jwtInst({
                method:"get",
                url:`${authCtx.defaultTargetApi}/product/productsId`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = await response.data; 
            console.log(data);
            setUrlsList(data)
            var element = document.createElement('a');
            element.setAttribute('href', data);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
        }catch(error){
            console.log(error);
        }
    }
    return(
        <Fragment>
            <button onClick={listGenerator}>urls List</button>
            
        </Fragment>
    )
}
export default SitemapUrls;