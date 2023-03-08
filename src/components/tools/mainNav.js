import { Fragment , useContext , useState  , useEffect , useLayoutEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDom from 'react-dom';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Style from './mainNav.module.css';
import Language from "../../store/language";
import LangSelect from "./langSelect";
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import SearchBarV2 from "./searchBarV2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pivot  as Hamburger } from 'hamburger-react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CollapseList from '../tools/collapseList';                  
import logo from '../../assets/lmcLogo.png';
import axios from "axios";
import AxiosGlobal from "../../store/axiosGlobal";
import ActivePage from '../../store/activePage';
import LogIn from "./auth/login";
import AuthContext from "../../store/auth";
import Cookies from "js-cookie";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SitemapUrls from "./sitemapUrls";

const MainNavPortal = (props) =>{
    const [searchBarStatus , setSearchBarStatus] = useState(false);
    const [inisialLoad , setInisialLoad] = useState(false);

    const [showMegaMenu , setShowMegaMenu] = useState(false);
    const [showMegaMenuResponive , setShowMegaMenuResponive] = useState(false);
    const [searchInputField , setSearchInputField] = useState('');
    const [searchedData , setSearchedData] = useState([]);
    const [searchLoading , setSearchLoading] = useState(false);
    const [closeLangPicker , setCloseLangPicker] = useState(false);
    const [logedIn , setLogedIn] = useState(false);
    const [showLogInModal , setShowLogInModal] = useState(false);
    const [showUserSettingMenu , setShowUserSettingMenu] = useState(false);
    const [dropDownResponsiveMenu , setDropDownResponsiveMenu] = useState(false);
    // categories state  
    const [categoriesData , setCategoriesData] = useState([]);
    //navigation
    const navigation = useNavigate();
    //Context api
    const langCtx = useContext(Language);
    const axiosGlobalCtx = useContext(AxiosGlobal);
    const activePage = useContext(ActivePage);
    const authCtx = useContext(AuthContext);
    const location = useLocation();
    
    const openSearchBar = () =>{
        if(searchBarStatus === true){
            setSearchBarStatus(false);
            setInisialLoad(true);
        }else if(searchBarStatus === false){
            setSearchBarStatus(true);
            setInisialLoad(true);
        }
    }
    const openMegaMenuResponive = () =>{
        if(showMegaMenuResponive === true){
            setShowMegaMenuResponive(false);
        }else if(showMegaMenuResponive === false){
            setShowMegaMenuResponive(true);
        }
    }
    const logOutHandler = () =>{
        authCtx.logout();
    }
    useLayoutEffect(()=>{
        setShowMegaMenu(false)
        setSearchBarStatus(false)
        setShowMegaMenuResponive(false)
    },[])

    //tags and categories section
    const getCategoriesAndTags = async() =>{
        try{
            const response  = await axios({
                method :'get',
                params:{language:langCtx.language},
                url:`${axiosGlobalCtx.defaultTargetApi}/tagAndCategory/getAllCategoriesWithTagsForMainPage`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = await response.data;
            setCategoriesData([...data.rs]);
        }catch{

        }
    }

    useEffect(() => {
        getCategoriesAndTags()
    }, [Cookies.get('accessToken')]);

    const closeLogInModal = () =>{
        setShowLogInModal(false);
    }

    const getDataForSearching = (e) =>{
        setSearchInputField(e.target.value);
    }
    const searchForData = async(e) =>{
        const searching = {searching:searchInputField , language:langCtx.language};
        if(searchInputField === ''){
            setSearchLoading(false); 
        }
        if(searchInputField !== ''){
            try{
                const response  = await axios({
                    method :'get',
                    url:`${axiosGlobalCtx.defaultTargetApi}/product/searchForMainThing`,
                    params:searching,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data = await response.data;
                setSearchedData([...data]);
                setSearchLoading(false); 
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
        if(searchInputField !== ''){
            setSearchLoading(true); 
        }
        let categorySearchTimeOut = setTimeout(()=>{
            searchForData();
        }, 1000);

        return () => {
            clearTimeout(categorySearchTimeOut);
        }
    }, [searchInputField]);

    useEffect(() => {
        getCategoriesAndTags()
    }, [Cookies.get('currentLang')]);

    const toggleClick = () =>{
        setSearchInputField('');
        setSearchedData([]);

    }
    const closeAllMenu = () =>{
        setSearchBarStatus(false);
        setShowUserSettingMenu(false);
        setCloseLangPicker(false);
    }
    const menuDropDown = () =>{
        if(dropDownResponsiveMenu === true){
            setDropDownResponsiveMenu(false);
        }else if(dropDownResponsiveMenu === false){
            setDropDownResponsiveMenu(true);
        }
    }

    return(

        <Fragment>
            
            <div dir={langCtx.language === 'english' ?'ltr':'rtl'}  onClick={closeAllMenu} style={closeLangPicker === true || searchBarStatus === true || showUserSettingMenu === true ? {display:'block'}:{display:'none'}} className={Style.backDropStyle}></div>
             
            {/* modal */}
            {showLogInModal === true ?
                <LogIn closeLogInModal={closeLogInModal} openModal={showLogInModal}></LogIn>
            :
                null
            }
            <Navbar style={{zIndex:'11'}} fixed="top" className={Style.mainNav} expand="lg">
                <Container  className={Style.MainNavContainer} fluid>
                    <Navbar.Brand className={Style.lmcName} href={`/${location.pathname.split('/')[1]}`}>Lazulite marble company</Navbar.Brand>
                    <Navbar.Brand className={Style.lmcLogo} href={`/${location.pathname.split('/')[1]}`}><img alt="لازولیت ماربل" title="لازولیت ماربل" src={logo}></img></Navbar.Brand>
                    <Navbar.Toggle onClick={toggleClick} style={{padding:'0px' , border:'none'}} aria-controls="basic-navbar-nav">
                        <div onClick={menuDropDown}>
                            <Hamburger  style={{height:'10px !importain'}}  color="#354063" size={29}></Hamburger>
                        </div>
                    </Navbar.Toggle>

                    <Navbar.Collapse  dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.collapsSec} id="navbarScroll">
                        <Nav dir={langCtx.language === 'english' ?'ltr':'rtl'}
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '390px' , padding:'12px 0px 12px 0px' , margin:'auto auto auto auto'}}
                            navbarScroll
                        >
                            <div   className={Style.responsiveSearch}>
                                <div style={{zIndex:'20'}}>
                                    <SearchBarV2 searchLoadingStatus = {searchLoading} onChange={getDataForSearching}></SearchBarV2>
                                </div>
                                    {searchInputField !== ''?
                                        <div  dir={langCtx.language === 'english' ?'ltr':'rtl'} style={{textAlign:'right'   , marginTop:'60px' , zIndex:'21' , position:'absloute'}} className={Style.searchResult}>
                                            {searchedData.length !== 0 ?
                                                searchedData.map(i=>{
                                                    return(
                                                        <div style={langCtx.language === 'english' ?{textAlign:'left'}:null} dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.searchedItem}>
                                                              {i.tag !== undefined?
                                                                <div dir={langCtx.language === 'english' ?'ltr':'rtl'}>
                                                                    <div className={Style.searchedLable}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.tag}&state=tag`}>{langCtx.language === 'english' ?'tag':langCtx.language === 'arabic' ?'بطاقة شعار' :langCtx.language === 'persian' ? 'تگ':null}</Link></div>
                                                                    <div className={Style.searchedTitle}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.tag}&state=tag`}>{i.tag}</Link></div>
                                                                </div>
                                                            :null}
                                                            {i.category !== undefined?
                                                                <div dir={langCtx.language === 'english' ?'ltr':'rtl'}>
                                                                    <div className={Style.searchedLable}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.category}&state=category`}>{langCtx.language === 'english' ?'category':langCtx.language === 'arabic' ?'الفئة' :langCtx.language === 'persian' ? 'دسته بندی':null}</Link></div>
                                                                    <div className={Style.searchedTitle}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.category}&state=category`}>{i.category}</Link></div>
                                                                </div>
                                                            :null}
                                                            {i.title !== undefined?
                                                                <div dir={langCtx.language === 'english' ?'ltr':'rtl'}>
                                                                    <div className={Style.searchedLable}><Link to={`/${location.pathname.split('/')[1]}/showCase/${i._id}`}>{langCtx.language === 'english' ?'product':langCtx.language === 'arabic' ?'منتج' :langCtx.language === 'persian' ? 'محصول':null}</Link></div>
                                                                    <div className={Style.searchedTitle}><Link to={`/${location.pathname.split('/')[1]}/showCase/${i._id}`}>{i.title}</Link></div>
                                                                </div>
                                                            :null}
                                                        </div>
                                                    )

                                                })
                                            :
                                            <h4 className={Style.noResult}>{langCtx.language === 'persian' ? "!یافت نشد":langCtx.language === 'arabic' ? "!لم يتم العثور على":langCtx.language === 'english'?"not found!":null}</h4>
                                            }
                                        </div>
                                    :null}
                                <hr style={{width:'100%' , margin:'6px 0px 6px 0px'}}></hr>
                            </div>
                            <div  className={Style.linksDiv}>
                                <Nav.Link  style={showMegaMenu===true?{color: '#8996c2'}:null}  onMouseEnter={() => setShowMegaMenu(true)} onMouseLeave={() => setShowMegaMenu(false)} className={activePage.activePage==='home' ? `${Style.navLink} ${Style.active} ${Style.showCategoriesOnHover}` : `${Style.navLink} ${Style.showCategoriesOnHover}`} href="#action1">{langCtx.language === 'english' ?"Products":langCtx.language === 'persian' ?"محصولات":langCtx.language === 'arabic' ?"منتجات":null}</Nav.Link>
                                <Nav.Link style={langCtx.language === 'english' ?{textAlign:'left'}:null} className={activePage.activePage==='branches' ? `${Style.navLink} ${Style.active}` : `${Style.navLink}`}  href={`/${location.pathname.split('/')[1]}/branches`}>{langCtx.language === 'english' ?"Branches":langCtx.language === 'persian' ?"شعبه ها":langCtx.language === 'arabic' ?"الفروع":null}</Nav.Link>
                                <Nav.Link style={langCtx.language === 'english' ?{textAlign:'left'}:null} className={activePage.activePage==='shiping' ? `${Style.navLink} ${Style.active}` : `${Style.navLink}`} href={`/${location.pathname.split('/')[1]}/shiping`}>{langCtx.language === 'english' ?"shiping":langCtx.language === 'persian' ?"حمل و نقل":langCtx.language === 'arabic' ?"وسائل النقل":null}</Nav.Link>
                                {/* <Nav.Link style={langCtx.language === 'english' ?{textAlign:'left'}:null} className={Style.navLink} href="#action2">{langCtx.language === 'english' ?"About us":"درباره ما"}</Nav.Link>  */}
                                <Nav.Link style={langCtx.language === 'english' ?{textAlign:'left'}:null} className={activePage.activePage==='blog' ?`${Style.navLink} ${Style.active}`:`${Style.navLink}`} href={`/${location.pathname.split('/')[1]}/blog`}>{langCtx.language === 'english' ?"blog":langCtx.language === 'persian' ?"وبلاگ":langCtx.language === 'arabic' ?"مقالات":null}</Nav.Link>     
                                {authCtx.isLoggedIn === true && authCtx.decoded.role === 'superAdmin' ?
                                <Nav.Link style={langCtx.language === 'english' ?{textAlign:'left'}:null} className={Style.navLink} ><SitemapUrls></SitemapUrls></Nav.Link>   
                                :null}
                                    <div style={{margin:'-4px 0px 0px 0px'}}   className={dropDownResponsiveMenu === true ?`${Style.logInDropDownResPonsive} ${Style.logInDropDownResPonsiveActive}` : `${Style.logInDropDownResPonsive} ${Style.logInDropDownResPonsiveNotActive}`}> 
                                   
                                    {Cookies.get('accessToken') === undefined && authCtx.decoded === undefined?
                                            <div style={{padding:'0px 30px 0px 30px'}}>
                                                <Nav.Link onClick={()=>{setShowLogInModal(true)}} className={Style.navLink} href="#action2"><button style={{maxWidth: '430px' , margin:'0px auto 0px auto' , padding:'5px 0px 1px 0px'}} onClick={()=>{setShowLogInModal(true)}} className={`${Style.logIn_responsive} ${Style.logIn}`}>{langCtx.language === 'english' ?'Log In':langCtx.language === 'persian' ?"ورود":langCtx.language === 'arabic' ?"تسجيل الدخول":null}<span  onClick={()=>{setShowLogInModal(true)}}className={Style.logInIcon}></span></button></Nav.Link>
                                            </div>
                                        :Cookies.get('accessToken') !== undefined && authCtx.decoded !== undefined? 
                                            <button style={{zIndex:'10'}} onClick={()=>{
                                                if(showUserSettingMenu === true){
                                                    setShowUserSettingMenu(false)
                                                }else if(showUserSettingMenu === false){
                                                    setShowUserSettingMenu(true)
                                                }
                                            }} 
                                            className={Style.userMenuBtn}>
                                                <ArrowDropDownIcon sx={{fontSize:'23px' , color:'#354063'}}></ArrowDropDownIcon>
                                                    <h4>{authCtx.decoded.firstName+' '+authCtx.decoded.lastName}</h4>
                                                <PersonIcon sx={{fontSize:'33px' , marginBottom:'3px' , color:'#354063'}}></PersonIcon>
                                                {showUserSettingMenu === true?
                                                    <div className={Style.listStyleDiv}>
                                                        <ul>
                                                            <li onClick={logOutHandler}><span>{langCtx.language === 'english' ?'Log Out':langCtx.language === 'persian' ?"خروج":langCtx.language === 'arabic' ?"مخرج":null}</span><LogoutIcon></LogoutIcon></li>
                                                        </ul>
                                                    </div>
                                                :
                                                null
                                                }
                                            </button>
                                            // <button onClick={()=>{setShowLogInModal(true)}} className={Style.logIn}>ورود<span onClick={()=>{setShowLogInModal(true)}} className={Style.logInIcon}><LoginIcon onClick={()=>{setShowLogInModal(true)}}></LoginIcon></span></button>
                                        :null}
                                </div>
                                
                            </div>


                        </Nav>
                            {/* <Form className="d-flex">
                                <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                    </Navbar.Collapse>
                    <div  className={Style.largDisplayStatus}>
                        <button onClick={openSearchBar} className={Style.searchBtn}><SearchIcon sx={{fontSize:'33px'}}></SearchIcon></button>
                        {Cookies.get('accessToken') === undefined && authCtx.decoded === undefined?
                            <button onClick={()=>{setShowLogInModal(true)}} className={Style.logIn}>{langCtx.language === 'english' ?"Log In":langCtx.language === 'persian' ?"ورود":langCtx.language === 'arabic' ?"تسجيل الدخول":null}<span onClick={()=>{setShowLogInModal(true)}} className={Style.logInIcon}><LoginIcon onClick={()=>{setShowLogInModal(true)}}></LoginIcon></span></button>
                        :Cookies.get('accessToken') !== undefined && authCtx.decoded !== undefined? 
                            <button onClick={()=>{
                                if(showUserSettingMenu === true){
                                    setShowUserSettingMenu(false)
                                }else if(showUserSettingMenu === false){
                                    setShowUserSettingMenu(true)
                                }
                            }} 
                             className={Style.userMenuBtn}>
                                <ArrowDropDownIcon sx={{fontSize:'23px' , color:'#354063'}}></ArrowDropDownIcon>
                                    <h4>{authCtx.decoded.firstName+' '+authCtx.decoded.lastName}</h4>
                                <PersonIcon sx={{fontSize:'33px' , marginBottom:'3px' , color:'#354063'}}></PersonIcon>
                                {showUserSettingMenu === true?
                                
                                    <div className={Style.listStyleDiv}>
                                        <ul>
                                            <li onClick={logOutHandler}><span>{langCtx.language === 'english' ? 'Log out' : langCtx.language === 'persian' ? 'خروج': langCtx.language === 'arabic' ? 'مخرج':null}</span><LogoutIcon></LogoutIcon></li>
                                        </ul>
                                    </div>
                                :
                                null
                                }
                            </button>
                            // <button onClick={()=>{setShowLogInModal(true)}} className={Style.logIn}>ورود<span onClick={()=>{setShowLogInModal(true)}} className={Style.logInIcon}><LoginIcon onClick={()=>{setShowLogInModal(true)}}></LoginIcon></span></button>
                        :null}
                        <LangSelect closeLangPicker={closeLangPicker} setCloseLangPicker={setCloseLangPicker}></LangSelect>
                    </div>
                </Container>
            </Navbar>

            <Navbar  style={{zIndex:'9'}} className={Style.subMenu} fixed="top" style={{backgroundColor:'#F8FBFE' , borderTop:'2px #99999977 solid' , zIndex:'10' , marginTop:'48px'  , justifyContent:'center'}} expand="lg">
                <Container fluid>
                    <div className={Style.responsivNavSec}>
                         <div style={{textAlign:'right' , float:'right' , width:'fit-content'}} className={Style.langSelect}>  
                            <LangSelect closeLangPicker={closeLangPicker} setCloseLangPicker={setCloseLangPicker}></LangSelect>
                         </div>
                         <div style={{textAlign:'left' , width:'fit-content'}} className={Style.responsivProductSec}>
                            <button onClick={openMegaMenuResponive}><span ><ArrowDropDownIcon className={showMegaMenuResponive === true?`${Style.rotateIn}` : `${Style.rotateOut}`}  sx={{color:'#1043A9' , fontSize:'25px'}}></ArrowDropDownIcon></span>{langCtx.language === 'english' ?"products":langCtx.language==='persian'?"محصولات":langCtx.language==='arabic'?"منتجات":null}</button>
                         </div>
                    </div>
                </Container>

            </Navbar>
            
            <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={showMegaMenuResponive === true ?`${Style.scaleIn} ${Style.categoryListSec}`: showMegaMenuResponive === false ? `${Style.scaleOut} ${Style.categoryListSec}`:null}>                 
               {categoriesData.map(dt1=>{
                   return(
                        <div style={{marginBottom:'15px'}}>
                            <CollapseList setShowMegaMenuResponive={setShowMegaMenuResponive} data={dt1}></CollapseList>
                        </div>
                   )

               })}

            </div>
            <div>
                <Navbar  className={searchBarStatus === true && inisialLoad === true ? `${Style.scaleInSearchBar}` :searchBarStatus === false  && inisialLoad === true ?  `${Style.scaleOutSearchBar}`:inisialLoad === false ? `${Style.searchBarAllOut}`:null} style={{backgroundColor:'#F8FBFE'   , width:'100%' , zIndex:'10' , transform:'translateY(-800px)', marginTop:'80px' , position:'fixed' , padding:'0px' , justifyContent:'center'}} expand="lg">
                    <Container style={{padding:'0px'}} fluid>
                        <div className={Style.searchBarSec}>
                            <SearchBarV2 searchLoadingStatus = {searchLoading} onChange={getDataForSearching}></SearchBarV2>
                        </div>
                        {searchInputField !== ''?
                            <div dir={langCtx.language === 'english' ?'ltr':'rtl'}  style={{textAlign:'right'}} className={Style.searchResult}>
                                {searchedData.length !== 0 ?
                                    searchedData.map(i=>{
                                        return(
                                            <div style={langCtx.language === 'english' ?{textAlign:'left'}:null} className={Style.searchedItem}>
                                                {i.tag !== undefined?
                                                    <div>
                                                        <div className={Style.searchedLable}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.tag}&state=tag`}>{langCtx.language === 'english' ?'tag':langCtx.language === 'arabic' ?'بطاقة شعار' :langCtx.language === 'persian' ? 'تگ':null}</Link></div>
                                                        <div className={Style.searchedTitle}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.tag}&state=tag`}>{i.tag}</Link></div>
                                                    </div>
                                                :null}
                                                {i.category !== undefined?
                                                    <div>
                                                        <div className={Style.searchedLable}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.category}&state=category`}>{langCtx.language === 'english' ?'category':langCtx.language === 'arabic' ?'الفئة' :langCtx.language === 'persian' ? 'دسته بندی':null}</Link></div>
                                                        <div className={Style.searchedTitle}><Link to={`/${location.pathname.split('/')[1]}/productList?id=${i._id}&title=${i.category}&state=category`}>{i.category}</Link></div>
                                                    </div>
                                                :null}
                                                {i.title !== undefined?
                                                    <div>
                                                        <div className={Style.searchedLable}><Link to={`/${location.pathname.split('/')[1]}/showCase/${i._id}`}>{langCtx.language === 'english' ?'product':langCtx.language === 'arabic' ?'منتج' :langCtx.language === 'persian' ? 'محصول':null}</Link></div>
                                                        <div className={Style.searchedTitle}><Link to={`/${location.pathname.split('/')[1]}/showCase/${i._id}`}>{i.title}</Link></div>
                                                    </div>
                                                :null}
                                            </div>
                                        )

                                    })
                                :
                                <h4 className={Style.noResult}>{langCtx.language==='persian'?'!یافت نشد':langCtx.language==='arabic'?'!لم يتم العثور على':langCtx.language==='english' ? 'not found!':null}</h4>
                                }
                            </div>
                        :null}
                    </Container>

                </Navbar>
            </div>
            {showMegaMenu === true?
                <div className={Style.productListBackShade}></div>
            :
                null
            }
            {showMegaMenu === true?
                <div onMouseEnter={() => setShowMegaMenu(true)} onMouseLeave={() => setShowMegaMenu(false)} className={Style.productList}>
                    <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.listsWapper}>
                        <div className={Style.theList}>
                            <ul>
                                {categoriesData.map(dt1=>{
                                    return(
                                        <div>
                                            <Link target='_blank' to={`/${location.pathname.split('/')[1]}/productList?id=${dt1.category._id}&title=${dt1.category.category}&state=category`}><h5 style={langCtx.language === 'english' ?{borderLeft:'3px solid #1043A9', borderRight:'none' , marginLeft:'15px' , padding:'0px 0px 0px 5px'} : null}>{dt1.category.category}</h5></Link>
                                            {
                                                dt1.tags.map(dt2 =>{
                                                    return(
                                                        <Link to={`/${location.pathname.split('/')[1]}/productList?id=${dt2._id}&title=${dt2.tag}&state=tag`}><li style={langCtx.language === 'english' ?{textAlign:'left' , margin:'0px 0px 0px 20px', padding:'0px 0px 0px 0px'} : null}><h4 style={langCtx.language === 'english' ?{textAlign:'left' , paddingLeft:'0px'} : null}>{dt2.tag}</h4></li></Link>

                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>
                </div>
            :
            null
            }
        </Fragment>
    )
}
const MainNav = (props)=>{
    return(
        <Fragment>
            {ReactDom.createPortal(
                <MainNavPortal>

                </MainNavPortal>
                ,
                document.getElementById('headSec')
                )}
        </Fragment>
    )
}
export default MainNav;