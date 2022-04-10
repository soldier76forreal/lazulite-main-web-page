import Cookies from "js-cookie";
import React ,{useState} from "react";

const Language = React.createContext({
    language:"",
    activeLanguageFnOr:(data) =>{}
});

export const LanguageProvider = (props) =>{
    const [activeLanguage , setActiveLanguage] = useState(Cookies.get('currentLang'));
    if(Cookies.get('currentLang') === undefined){
        Cookies.set("currentLang" , 'persian' ,{sameSite: 'strict', secure: true , expires:3});
        setActiveLanguage('persian')   
     }
    const  activeLang =  (data) =>{
        setActiveLanguage(data);
    }
    return <Language.Provider value={{language:activeLanguage , activeLangFn:activeLang}}>{props.children}</Language.Provider>
}
export default Language;