//modules
import { Fragment, useState , useEffect , useRef, useContext } from "react";
import Style from './productShowCase.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory , useLocation , useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import NormalHeader from "./tools/normalHeader";
import CommentBox from "./tools/commentBox";
import CommentItself from "./tools/commentItself";
import ProductPhotoGallery from "./tools/productPhotoGallery";
import PhoneCallModal from "./tools/phoneCallModal";
import Loader from "./tools/loader";
//placeholder img
import BulletPoint from '../assets/bullet.svg'
import Language from "../store/language";
import AxiosGlobal from "../store/axiosGlobal";
import MainNav from "./tools/mainNav";
import Footer from "./footer";
import  PhotoSwipe  from "react-photoswipe";
import NormalBtn from "./tools/normalBtn";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ActivePage from "../store/activePage";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {Helmet} from "react-helmet";
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 
const ProductShowCase = (props) =>{
    const keyFeaturesRef = useRef();
    const riviewRef = useRef();
    const commentsRef = useRef();
    const moveToCommentsRef = useRef();
    const params = useParams();
    const authCtx = useContext(AxiosGlobal);
    const langCtx = useContext(Language);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activePage = useContext(ActivePage)
    activePage.nav = window.location.pathname;
    
    //------------------------------states------------------------------
    const [productRate , setProductRate]  =  useState(3);
    const [product , setProduct] = useState({});
    const [keyFeature , setKeyFeature] = useState([]);
    const [price , setPrice] = useState({});
    const [imageGallery , setImageGallery] = useState([]);
    const [feature , setFeature] = useState([]);
    const [waContactBtn , setWaContactBtn] = useState({});
    const [pContactBtn , setpContactBtn] = useState({});
    const [pageLoading , setPageLoading] = useState(true);
    const [phoneCallModal , setPhoneCallModal] = useState(false);
    const [isOpen , setIsOpen]  = useState(false);
    const [imageToShow , setImageToShow] = useState()
    const [comments , setComments] = useState([]);
    const [limit , setLimit] = useState(20);
    const [updateComments , setUpdateComments] = useState(5);
    const [commentCount , setCommentCount] = useState('');
    const [overalRate , setOveralRate] = useState(0);
    const [ratedBefore , setRatedBefore] =useState({});
    


    useEffect(()=>{
        if(location.pathname.split('/')[1]=== 'pr'){

            Cookies.set('currentLang','persian' , {sameSite: 'strict', secure: false , expires:8});
            langCtx.activeLangFn('persian');
        }else if(location.pathname.split('/')[1] === 'en'){
            Cookies.set('currentLang','english' , {sameSite: 'strict', secure: false , expires:8});
            langCtx.activeLangFn('english');
        }else if(location.pathname.split('/')[1] === 'ar'){
            Cookies.set('currentLang','arabic' , {sameSite: 'strict', secure: false , expires:8});
            langCtx.activeLangFn('arabic');
        }
    },[])
    //------------------------------listners-----------------------------

        const handleClose = () => {
            setIsOpen(false)
        };
        let items = [];
        items.push(        
            {
                src: imageToShow,
                w: 1200,
                h: 900,
                title: null
            }
        );
        for(var i = 1 ; imageGallery.length > i ; i++){
            items.push(
                {
                    src: imageGallery[i],
                    w: 1200,
                    h: 900,
                    title: null
                }
            );
        }
        const openFullView = (currentImage , selectedImage) =>{
            setImageToShow(currentImage);
            setIsOpen(true)
        }
        let options = {
            closeOnScroll: false
          };
    //------------------------------axios listner------------------------------
        //get tags
    const getProduct = async () =>{

            try{
                const response = await axios({
                    method:"get",
                    url:`${authCtx.defaultTargetApi}/newProduct/getProductForMain`,
                    params:{id:
                        params.productId,
                        language:langCtx.language
                    },
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const dataRes = response.data;
                setOveralRate(dataRes.productRate);
                setProduct(dataRes.product);
                setKeyFeature([...dataRes.product.keyFeatures]);
                setPrice(dataRes.product.price);
                setImageGallery([...dataRes.product.images]);
                setFeature([...dataRes.product.features]);
                setWaContactBtn(dataRes.phoneContacts[0]);
                setpContactBtn(dataRes.phoneContacts[1]);
                setPageLoading(false);
            }catch(err){
                          
            }       
    }

    const productComments = async() =>{
        let queryLimit = '';
        if(queryParams.get('limit') === null){
            queryLimit = 10;
        }else{
            queryLimit = parseInt(queryParams.get('limit'));
        }
         
        try{
            if(Cookies.get('accessToken') !== undefined){
                const decoded = jwtDecode(Cookies.get('accessToken'));
                const response = await axios({
                    method:'get',
                    url:`${authCtx.defaultTargetApi}/comment/getComments`,
                    params:{
                        id:params.productId,
                        lang:langCtx.language,
                        limit:queryLimit,
                        logedInId:decoded.id
                    },
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                setComments([...response.data.comments]);
                setCommentCount(response.data.commentsLength);
                setOveralRate(response.data.commentRate);
                setRatedBefore(response.data.ratedOrNot);
            }else{
                const response = await axios({
                    method:'get',
                    url:`${authCtx.defaultTargetApi}/comment/getComments`,
                    params:{
                        id:params.productId,
                        lang:langCtx.language,
                        limit:queryLimit
                    },
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    
                })
                setComments([...response.data.comments]);
                setCommentCount(response.data.commentsLength);
                setOveralRate(response.data.commentRate);
                setRatedBefore(response.data.ratedOrNot);
            }

        }catch{

        }
    }

    const showMore = (e) =>{
        e.preventDefault();
        if(queryParams.get('limit') === null){
            setLimit(limit+10);
            navigate(`/showCase/${params.productId}?limit=${limit}`);
            moveToCommentsRef.current.scrollIntoView();
        }else if(queryParams.get('limit') !== null){
            const limits =parseInt(queryParams.get('limit'))+10;
            setLimit(limits);
            navigate(`/showCase/${params.productId}?limit=${limits}`);
            moveToCommentsRef.current.scrollIntoView();
        }
    }
    useEffect(() => {
        productComments();
    }, [limit , updateComments]);
    useEffect(() => {
        getProduct();
    }, []);
    if(pageLoading === true){
        return(
            <div className={Style.loaderDiv} >
                 <Loader marginBottom={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
            </div>
        )
    }else if(pageLoading === false){
        return(
                <Fragment>  
                        <Helmet>
                            <title>{product.pageTitle}</title>
                            <meta name="description" content={product.pageDescription} />
                        </Helmet>
                    <div className={Style.photoSwipeDiv}>
                        <PhotoSwipe  isOpen={isOpen} items={items} options={options} onClose={handleClose}/>
                    </div>

                    {/* footer */}
                    <Footer></Footer>
                    {/* navigation */}
                    <MainNav></MainNav>
                    {/* Modal*/}
                    {pContactBtn !== null && Object.keys(pContactBtn).length !== 0 ?
                         <PhoneCallModal data={pContactBtn} closeModalFn={()=>{setPhoneCallModal(false)}} showModal={phoneCallModal}></PhoneCallModal>
                    :null}
                   <Container style={{maxWidth:'100%' , overflowX:'none'}}>
                        <div style={{marginTop:'85px'}} className={Style.inndeDiv}>
                            <Row style={{margin:'0px auto 20px auto' , maxWidth:'1676px'}} >
                                <Col xs={0} md={0} lg={1}>
                                    
                                </Col>
                                {/*---------------------------- product ShowCase section ----------------------------*/}
                                <Col xs={12} md={12} lg={10}>
                                    <Row >
                                        {/* product route */}
                                        <Col xs={12} md={12} lg={12}>
                                            {/* <div className={Style.routeBackground}>
                                                <div>

                                                </div>
                                            </div> */}
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <div  className={Style.responsiveTitle}>   
                                            {/*-------- product title --------*/}
                                            <Col  xs={12} md={12} lg={12}>
                                                <div className={Style.productTitleDiv}>
                                                    <h1>{product.title}</h1>
                                                </div>
                                            </Col>
                                            {/*-------- rate and functions --------*/}
                                            <Col xs={12} md={12} lg={12}>
                                                <div  className={Style.productRatingDiv}>
                                                    {/* rate star */}

                                                    {/* rate info */}
                                                        {overalRate === 0?
                                                            <div  style={{display:'inline-block'}}>
                                                                <FontAwesomeIcon color='#CE9800' style={{fontSize:'15px'}} icon='star'></FontAwesomeIcon>
                                                                <h3 style={langCtx.language === 'english' ?{margin:'0px 0px 0px 5px'}:{margin:'0px 5px 0px 0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":langCtx.language === 'persian' ?"امتیاز این محصول":langCtx.language === 'arabic' ? "سعر المنتج":null} : {langCtx.language === 'english' ?"not rated yet":"امتیازی ثبت نشده"}</h3>
                                                            </div>
                                                        :
                                                            <div style={{display:'inline-block'}}>
                                                                {[...Array(5-Math.floor(overalRate))].map((star , i)=>{
                                                                    return(
                                                                        <lable>
                                                                            <FontAwesomeIcon icon={['far', 'star']} color='#CE9800' style={{fontSize:'15px'}} ></FontAwesomeIcon>
                                                                        </lable>
                                                                    )
                                                                })}
                                                                {[...Array(Math.floor(overalRate))].map((star , i)=>{
                                                                    return(
                                                                        <lable>
                                                                            <FontAwesomeIcon color='#CE9800' style={{fontSize:'15px'}} icon='star'></FontAwesomeIcon>
                                                                        </lable>
                                                                    )
                                                                })}
                                                                <h3 style={langCtx.language === 'english' ?{margin:'0px 0px 0px 5px'}:{margin:'0px 5px 0px 0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":langCtx.language === 'persian' ?"امتیاز این محصول":langCtx.language === 'arabic' ? 'سعر المنتج':null} : {overalRate}</h3>
                                                            
                                                            </div>
                                                            
                                                        }  
                                                <h3 style={{margin:'0px 3px 0px 3px'}} className={Style.horizonDiv}>|</h3>
                                                <h3 className={Style.commentText}>{commentCount} {langCtx.language === 'english' ?"comments":langCtx.language === 'persian' ?"دیدگاه":langCtx.language === 'arabic' ?"تعليقات":null}</h3>
                                                </div>
                                            </Col>
                                            {/*-------- Line --------*/}
                                                        {/*-------- photo gallery --------*/}
                                            <Col  className={Style.photoGalleryNormalResponsive} style={{float:'right'}} xs={12} md={12} lg={6}>
                                                <div   className={Style.imageGalleryDiv}> 
                                                    <ProductPhotoGallery title={product.title} openFullViewFn={openFullView} galleryImages={imageGallery}></ProductPhotoGallery>
                                                </div>
                                            </Col>
                                        </div>

                                        {/*-------- photo gallery --------*/}
                                        {langCtx.language === 'english'?
                                            <Col dir='ltr' style={{float:'left'}} className={Style.photoGalleryNormal} xs={12} md={12} lg={6}>
                                                <div className={Style.imageGalleryDiv}> 
                                                    <ProductPhotoGallery title={product.title} openFullViewFn={openFullView} galleryImages={imageGallery}></ProductPhotoGallery>
                                                </div>
                                            </Col>
                                        :null}
                                        {/*---------- product Brief ----------*/}

                                        <Col  xs={12} md={12} lg={6}>
                                            <Row>
                                                <div dir={langCtx.language === 'english' ?'ltr':'rtl'} style={{float:'right'}} className={Style.productBriefDiv}>
                                                    <div  className={Style.normalTitle}> 
                                                        {/*-------- product title --------*/}
                                                        <Col  xs={12} md={12} lg={12}>
                                                            <div className={Style.productTitleDiv}>
                                                                <h1>{product.title}</h1>
                                                            </div>
                                                        </Col>
                                                        {/*-------- rate and functions --------*/}
                                                        <Col xs={12} md={12} lg={12}>
                                                            <div  className={Style.productRatingDiv}>
                                                                {/* rate star */}
                                                                {/* rate info */}
                                                                {overalRate === 0?
                                                                    <div style={{display:'inline-block'}}>
                                                                        <FontAwesomeIcon color='#CE9800' style={{fontSize:'15px'}} icon='star'></FontAwesomeIcon>
                                                                        <h3 style={langCtx.language === 'english' ?{margin:'0px 0px 0px 5px'}:{margin:'0px 5px 0px 0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":langCtx.language === 'persian' ?"امتیاز این محصول":langCtx.language === 'arabic' ?'سعر المنتج':null} : {langCtx.language === 'english' ?"not rated yet":langCtx.language === 'persian' ?"امتیازی ثبت نشده":langCtx.language === 'arabic' ?'لم يتم تقييمه بعد':null}</h3>
                                                                    </div>
                                                                :
                                                                    <div style={{display:'inline-block'}}>
                                                                       <div dir={langCtx.language === 'english'?'rtl':'ltr'} style={{display:'inline-block'}}>
                                                                            {[...Array(5-Math.floor(overalRate))].map((star , i)=>{
                                                                                return(
                                                                                    <lable>
                                                                                        <FontAwesomeIcon icon={['far', 'star']} color='#CE9800' style={{fontSize:'15px'}} ></FontAwesomeIcon>
                                                                                    </lable>
                                                                                )
                                                                            })}
                                                                            {[...Array(Math.floor(overalRate))].map((star , i)=>{
                                                                                return(
                                                                                    <lable>
                                                                                        <FontAwesomeIcon color='#CE9800' style={{fontSize:'15px'}} icon='star'></FontAwesomeIcon>
                                                                                    </lable>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                            <h3 style={langCtx.language === 'english' ?{marginLeft:'5px'}:{marginLeft:'0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":langCtx.language === 'persian' ?"امتیاز این محصول" : langCtx.language === 'arabic' ? "سعر المنتج":null} : {overalRate}</h3>
                                                                    </div>        
                                                                }                                                               
                                                                 <h3 style={{margin:'0px 3px 0px 3px'}} className={Style.horizonDiv}>|</h3>
                                                                 <h3 className={Style.commentText}>{commentCount} {langCtx.language === 'english' ?"comments":langCtx.language === 'persian' ?"دیدگاه":langCtx.language === 'arabic' ?'تعليقات':null}</h3>
                                                            </div>
                                                        </Col>
                                                        {/*-------- Line --------*/}
                                                        <Col xs={12} md={12} lg={12}>
                                                            <div className={Style.line}></div>
                                                        </Col>
                                                    </div>
                                                    <div className={Style.briefSecResponsive}>
                                                        {/*-------- features --------*/}
                                                        <div  className={Style.featuresAndPriceResponsive}>
                                                            <Col xs={12} md={12} lg={12}>
                                                                <div style={langCtx.language === 'english' ?{float:'right'}:{float:'left'}} dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.stockDivRes}>
                                                                    {product.stock === true ?
                                                                         <div style={langCtx.language === 'english' ?{float:'right'}:{float:'left'}} className={Style.stockStyle}>
                                                                            <CheckCircleIcon className={Style.tikIcon} sx={{color:'#00CC81' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></CheckCircleIcon>
                                                                            <h4 style={langCtx.language === 'english' ?{padding:'8px 7px 8px 0px'}:{padding:'8px 0px 8px 7px' , marginRight:'4px'}} className={Style.availableSurfaceDiv}>{langCtx.language === 'persian'?"موجود در انبار":langCtx.language === 'arabic'?"في الأوراق المالية":langCtx.language === 'english'?'In stock':null}<span>{product.availableSurface}</span> {langCtx.language === 'arabic'?'متر':langCtx.language === 'persian'? 'متر':langCtx.language === 'english'? 'Meter':null} </h4>
                                                                        </div>
                                                                    :
                                                                        <div style={langCtx.language === 'english' ?{float:'right'}:{float:'left'}} className={Style.stockStyle}>
                                                                            <ErrorIcon sx={{color:'#cc1800' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></ErrorIcon>
                                                                            <h4 style={langCtx.language === 'english' ?{padding:'8px 7px 8px 0px'}:{padding:'8px 0px 8px 7px' , marginRight:'4px'}}>{langCtx.language === 'english' ?'out of stock':langCtx.language === 'persian' ?'اتمام موجودی':langCtx.language === 'arabic' ? 'إنتهى من المخزن':null}</h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.featuresDiv}>
                                                                    <h3 style={langCtx.language === 'english' ?{marginLeft:'5px' , marginBottom:'2px'}:{paddingRight:'5px' , marginBottom:'2px'}} >{langCtx.language === 'english' ?'Features':langCtx.language === 'persian' ?'ویژگی ها' : langCtx.language === 'arabic' ? 'سمات':null}</h3>
                                                                    <ul style={langCtx.language === 'english' ?{listStyleImage : `url(${BulletPoint})`, marginTop:'0px' , padding:'0px'}:{listStyleImage : `url(${BulletPoint})`, marginTop:'0px' , padding:'0px'}}  className={Style.featuresUl}> 
                                                                        {keyFeature.map(data=>{
                                                                            return(
                                                                                <li>{data.title}:<span>{data.content}</span></li>
                                                                            )
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </Col>
                                                            {/* price */}
                                                            <Col xs={12} md={12} lg={12}>
                                                                <div style={{display:'inline-block'}} dir={langCtx.language === 'english' ?'ltr':'rtl'}>
                                                                    {price.price === null ?
                                                                        <div style={langCtx.language === 'english' ?{padding:'0px'}:{padding:'0px 0px 0px 7px'}} className={Style.priceDiv}>
                                                                            <div className={Style.meterDiv}><h4>{langCtx.language === 'english' ?'Price':langCtx.language === 'persian' ?'قیمت':langCtx.language === 'arabic' ?'سعر':null}</h4></div>
                                                                            <div style={langCtx.language === 'english' ?{marginLeft:'5px'}:{marginRight:'5px'}} className={Style.priceItSelfDiv}><h4>{langCtx.language === 'english' ?'Contact Us':langCtx.language === 'persian' ?'تماس بگیرید':langCtx.language === 'arabic' ?'اتصل بنا':null}</h4></div>
                                                                        </div>
                                                                    :
                                                                        <div style={langCtx.language === 'english' ?{padding:'0px'}:{padding:'0px 0px 0px 7px'}} className={Style.priceDiv}>
                                                                            <div className={Style.meterDiv}><h4>{price.measure}</h4></div>
                                                                            <div style={langCtx.language === 'english' ?{marginLeft:'5px'}:{marginRight:'5px'}} className={Style.priceItSelfDiv}><h4>{parseInt(price.price).toLocaleString()}</h4><span className={Style.priceUnit}>{langCtx.language === 'english' ?'$':langCtx.language === 'persian' ?'تومان':langCtx.language === 'arabic' ?'Rial':null}</span></div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div style={langCtx.language === 'english' ?{float:'right'}:{float:'left'}} dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.stockDiv}>
                                                                    {product.stock === true ?
                                                                        <div className={Style.stockStyle}>
                                                                            <CheckCircleIcon sx={langCtx.language === 'english' ?{color:'#00CC81' , fontSize:'23px' , marginRight:'0px' , marginTop:'2px'}:{color:'#00CC81' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></CheckCircleIcon>
                                                                            {product.availableSurface === null?
                                                                                <h4 style={langCtx.language === 'english' ? {marginRight:'8px'}:null} className={Style.availableSurfaceDiv}>{langCtx.language === 'english' ?'in stock':langCtx.language === 'persian' ?'موجود در انبار':langCtx.language === 'arabic' ?'في الأوراق المالية':null}</h4>
                                                                            :
                                                                                <h4 style={langCtx.language === 'english' ? {marginRight:'5px'}:null} className={Style.availableSurfaceDiv}>{langCtx.language === 'english' ?'In stock:':langCtx.language === 'persian' ?'موجودی در انبار:':langCtx.language === 'arabic' ?'في الأوراق المالية:':null}<span>{product.availableSurface}</span> {langCtx.language === 'arabic'?'متر':langCtx.language === 'persian'? 'متر':langCtx.language === 'english'? 'Meter':null} </h4>
                                                                            }
                                                                        </div>
                                                                    :
                                                                        <div className={Style.stockStyle}>
                                                                            <ErrorIcon sx={langCtx.language === 'english' ?{color:'#cc1800' , fontSize:'23px' , marginRight:'0px' , marginTop:'2px'}:{color:'#cc1800' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></ErrorIcon>
                                                                            <h4 style={langCtx.language === 'english' ? {marginRight:'6px'}:null}>{langCtx.language === 'arabic'?'إنتهى من المخزن':langCtx.language === 'persian'? 'اتمام موجودی':langCtx.language === 'english'? 'out of stock':null}</h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </div>
                                                        {/* contact btn */}
                                                        <Col xs={12} md={12} lg={12}>
                                                            <div  className={Style.purchaseDiv}>
                                                                <div style={langCtx.language === 'english' ?{display:'inline-block' , float:'left'}:{display:'inline-block' , float:'right'}} className={Style.purchaseTitle}><h4 style={langCtx.language === 'english' ?{paddingLeft:'14px'}:{paddingRight:'0px'}}>{langCtx.language === 'english' ? 'Consulting and orther':langCtx.language === 'persian' ?'سفارش و مشاوره':langCtx.language === 'arabic'?'استشارات وأورثر':null}</h4></div>
                                                                <div style= {langCtx.language === 'english' ?{display:'inline-block' , backgroundColor:'#354063' , color:'#fff' , padding:'3px 8px 3px 8px' , borderRadius:'6px' , float:'right' , margin:'6px 14px 0px 0px'}:{display:'inline-block' , backgroundColor:'#354063' , color:'#fff' , padding:'3px 8px 3px 8px' , borderRadius:'6px' , float:'left' , margin:'6px 0px 0px 14px'}}  className={Style.productRateDiv}>{langCtx.language === 'english' ? 'Product Code:':langCtx.language === 'persian' ?'کد محصول:':langCtx.language === 'arabic' ?'كود المنتج:':null}<span>{product.productCode}</span></div>
                                                                <div className={Style.purchaseBtn}>
                                                                    <button onClick={()=>{setPhoneCallModal(true)}} className={Style.contactBtn}>{langCtx.language === 'english' ?'Call':langCtx.language === 'arabic' ?'مكالمة':langCtx.language === 'persian' ?'تماس':null}</button>
                                                                    <a target='blank' href={`https://api.whatsapp.com/send?phone=98${parseInt(waContactBtn.phoneNumber, 10)}`}><button className={Style.whatsAppBtn}>{langCtx.language === 'english' ?'Whats App':langCtx.language === 'persian' ?'واتساپ':langCtx.language === 'arabic' ?'واتساب':null}</button></a>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Row>
                                        </Col>
                                        {langCtx.language === 'persian' || langCtx.language === 'arabic'?
                                            <Col dir='ltr' className={Style.photoGalleryNormal} xs={12} md={12} lg={6}>
                                                <div className={Style.imageGalleryDiv}> 
                                                    <ProductPhotoGallery title={product.title} openFullViewFn={openFullView} galleryImages={imageGallery}></ProductPhotoGallery>
                                                </div>
                                            </Col>
                                        :null}
                                    </Row>
                                </Col>
                                <Col xs={0} md={0} lg={1}>
                                </Col>
                            </Row>
                            <Row style={{padding:'0px' , position: 'sticky' , top:'0'}} >
                                {/*-------- navigation section --------*/}
                                    <Col  style={{padding:'0px'}} xs={12} md={12} lg={12}>
                                        <div  dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.productPostNavigation}>
                                            <ul className={Style.unortherList}>
                                                <li onClick={()=>{keyFeaturesRef.current.scrollIntoView()}} className={Style.unortherListActive}>
                                                    {langCtx.language === 'english' ?'Features':langCtx.language === 'persian' ?'مشخصات کلیدی':langCtx.language === 'arabic' ?'سمات':null}
                                                </li>
                                                <li onClick={()=>{riviewRef.current.scrollIntoView()}}>{langCtx.language === 'english' ?'Review':langCtx.language === 'persian' ?'نقد و بررسی':langCtx.language === 'arabic' ?'إعادة النظر':null}</li>
                                                <li onClick={()=>{commentsRef.current.scrollIntoView()}}>{langCtx.language === 'english' ?'Comments':langCtx.language === 'persian' ?'دیدگاه کاربران':langCtx.language === 'arabic' ?'تعليقات':null}</li>
                                            </ul>
                                        </div>
                                    </Col>
                            </Row>
                            <Row  style={{margin:'0px auto 20px auto' , maxWidth:'1676px'}}>
                                <Col xs={0} md={1} lg={1}>
                                </Col>
                                {/*-------- navigation section --------*/}
                                <Col  xs={12} md={10} lg={10}>

                                    {/* featuresTable */}
                                    <div dir={langCtx.language === 'english' ?'ltr':'rtl'} ref={keyFeaturesRef} className={Style.featuresTable}>
                                        <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  
                                        header={langCtx.language === 'english' ?'Features':langCtx.language === 'persian' ?'مشخصات کلیدی':langCtx.language === 'arabic' ?'سمات':null}></NormalHeader>
                                        <ul  className={Style.featuresListUl}>
                                            {feature.map((data , i)=>{
                                                return(
                                                    <div>
                                                        <li style={langCtx.language === 'english' ?{margin:'0px 0px 0px 20px'}:{margin:'0px 20px 0px 0px'}}><div style={{margin:'0px'}} className={Style.itemName}>{data.title}</div><div className={Style.itemValue}>{data.content}</div></li>
                                                        {feature.length === i+1 ? <div style={{width:'0%' , height:'0px' , backgroundColor:'#d1d1d1'}}></div>:<div style={{width:'100%' , borderRadius:'50px' , height:'1px' , backgroundColor:'#d1d1d1'}}></div>}                                
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>     
                                    <div style={{width:'100%' , height:'2px' , backgroundColor:'#7B99D5'}}></div>
                                
                                    {/* review */}
                                    {/* <StarRating></StarRating> */}
                                    <div ref={riviewRef} className={Style.reviewDiv}>
                                        <div className={Style.reviewHeaderDiv}>
                                            {langCtx.language === 'english' ?<h3>Product Review</h3>:langCtx.language === 'persian' ?<h3>نقد و بررسی</h3>:langCtx.language === 'arabic' ?<h3>تقييم المنتج</h3>:null}
                                            <h2>{product.title}</h2>
                                        </div>
                                        <div  className={Style.reviewContentDiv} dangerouslySetInnerHTML={{__html: `${product.productRiview}`}} />
                                        {/* <div id="productRiview" dir="rtl" className={Style.reviewContentDiv}>
                                        </div> */}
                                    </div>

                                    <div style={{width:'100%' , height:'2px' , marginTop:'12px' , backgroundColor:'#7B99D5'}}></div>

                                    <div  ref={commentsRef}  className={Style.commentSectionDiv}>
 
                                        {langCtx.language === 'english' ?
                                            <div  className={Style.commentSectionHeaderDiv}>
                                                    <div style={{textAlign:"left"}} className={Style.theHeaderItSelfDiv}>
                                                            <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='comments'></NormalHeader>
                                                    </div>
                                                {overalRate === 0?
                                                    <div style={{float:"right"}} className={Style.theRateItSelfDiv}>
                                                        <h5 style={{float:"right"}}>not rated yet</h5>
                                                    </div>
                                                :
                                                    <div style={{float:"right"}} className={Style.theRateItSelfDiv}>
                                                        <h5 style={{float:"right"}}>product rate: <span>{overalRate} </span>/ 5</h5>
                                                    </div>
                                                }

                                            </div>
                                            :langCtx.language === 'persian' ?

                                            <div  className={Style.commentSectionHeaderDiv}>
                                                {overalRate === 0?
                                                    <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.theRateItSelfDiv}>
                                                        <h5>امتیازی ثبت نشده</h5>
                                                    </div>
                                                :
                                                    <div  className={Style.theRateItSelfDiv}>
                                                        <h5>امتیاز این محصول: <span>{overalRate} </span>از 5</h5>
                                                    </div>
                                                }
                                                <div className={Style.theHeaderItSelfDiv}>
                                                        <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='دیدگاه کاربران'></NormalHeader>
                                                </div> 
                                            </div>
                                            :langCtx.language === 'arabic' ?
                                            <div  className={Style.commentSectionHeaderDiv}>
                                                {overalRate === 0?
                                                    <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.theRateItSelfDiv}>
                                                        <h5>النتيجة غير المسجلة</h5>
                                                    </div>
                                                :
                                                    <div  className={Style.theRateItSelfDiv}>
                                                        <h5>قيم هذا المنتج: <span>{overalRate} </span>من 5</h5>
                                                    </div>
                                                }
                                                <div className={Style.theHeaderItSelfDiv}>
                                                        <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='تعليقات المستخدم'></NormalHeader>
                                                </div> 
                                            </div>
                                            :null}
                                        <div className={Style.commentBoxDiv}>
                                            <CommentBox ratedBefore={ratedBefore} commentCount={commentCount} id={product._id}></CommentBox>
                                        </div>
                                        {comments.length !== 0 ?
                                        <div>
                                            {comments.map(dt=>{
                                                return(
                                                    <div className={Style.commentDiv}>
                                                        <CommentItself setUpdateComments={setUpdateComments} targetedPostId={product._id} comment={dt}></CommentItself>
                                                    </div>
                                                )
                                            })}
                                            {commentCount.length >20?
                                                <div ref={moveToCommentsRef} style={{width:'100%' , textAlign:'center' , margin:'20px 0px 0px 0px'}}>
                                                    <NormalBtn onClick={showMore} paddingRight='14px' paddingLeft='14px' fontSize='16px' btnName={langCtx.language === 'english' ?'show more':langCtx.language === 'persian'?'بیشتر':langCtx.language==='arabic'?'أظهر المزيد':null}></NormalBtn>
                                                </div>
                                                :null}
                                        </div>
                                        :
                                        <div style={{borderRadius:'8px' , backgroundColor:'#EFEFEF' , width:'100%' , textAlign:'center'  , margin:'15px 0px 0px 0px' , padding:'40px 0px 40px 0px'}}>
                                            <h5 style={{margin:'0px' , padding:'0px' , fontFamily:'Dana1' , fontSize:'15px' , color:'#666666'}}>{langCtx.language === 'english' ?'no comment!':langCtx.language === 'persian'?'!دیدگاهی وجود ندارد':langCtx.language==='arabic'?'لا تعليق':null}</h5>
                                        </div>
                                            }
                                    </div>
                                                            
                                </Col>
                                <Col xs={0} md={1} lg={1}>
                                
                                </Col>
                            </Row>
                        </div>

                    </Container>
                </Fragment>
        )
}

}
export default ProductShowCase;