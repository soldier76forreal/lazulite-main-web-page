import React ,{useState , useEffect} from "react";

const ActivePage = React.createContext({
    activePage:'',
    activePageFn:()=>{},
    nav:''
});

export const ActivePageProvider = (props) =>{
    const [activePage , setActivePage] = useState('');
    const  activePageFn =  (data) =>{
        setActivePage(data);
    }
    var nav = '/';
    return <ActivePage.Provider value={{activePage:activePage , activePageFn:activePageFn ,  nav:nav}}>{props.children}</ActivePage.Provider>
}
export default ActivePage;