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
    
    const executeScroll = () => scrollToRef(riviewRef);
    console.log(executeScroll);

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

          useEffect(() => {
            document.title = product.title;
        }, []);
    //------------------------------axios listner------------------------------
        //get tags
    const getProduct = async () =>{

            try{
                if(langCtx.language === 'persian'){
                    const response = await axios({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getProductForMain`,
                        params:{id:
                            params.productId
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
                    document.title = dataRes.product.title;
                    
                    
                }else if(langCtx.language === 'arabic'){
                    const response = await axios({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getProductForMainAr`,
                        params:{id:
                            params.productId
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
                    document.title = dataRes.product.title;
                }else if(langCtx.language === 'english'){
                    const response = await axios({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getProductForMainEn`,
                        params:{id:
                            params.productId
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
                    document.title = dataRes.product.title;
                }

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
                    <div className={Style.photoSwipeDiv}>
                        <PhotoSwipe  isOpen={isOpen} items={items} options={options} onClose={handleClose}/>
                    </div>

                    {/* footer */}
                    <Footer></Footer>
                    {/* navigation */}
                    <MainNav></MainNav>
                    {/* Modal*/}
                    {Object.keys(pContactBtn).length !== 0 ?
                         <PhoneCallModal data={pContactBtn} closeModalFn={()=>{setPhoneCallModal(false)}} showModal={phoneCallModal}></PhoneCallModal>
                    :null}
                   <Container dir={langCtx.language === 'english' ?'ltr':'rtl'} style={{maxWidth:'100%'}}>
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
                                        <div dir={langCtx.language === 'english' ?'ltr':'rtl'} style={langCtx.language === 'english' ?{textAlign:'left'}:{textAlign:'right'}} className={Style.responsiveTitle}>   
                                            {/*-------- product title --------*/}
                                            <Col  xs={12} md={12} lg={12}>
                                                <div className={Style.productTitleDiv}>
                                                    <h4>{product.title}</h4>
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
                                                                <h3 style={langCtx.language === 'english' ?{margin:'0px 0px 0px 5px'}:{margin:'0px 5px 0px 0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":"امتیاز این محصول"} : {langCtx.language === 'english' ?"not rated yet":"امتیازی ثبت نشده"}</h3>
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
                                                                <h3 style={langCtx.language === 'english' ?{margin:'0px 0px 0px 5px'}:{margin:'0px 5px 0px 0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":"امتیاز این محصول"} : {overalRate}</h3>
                                                            
                                                            </div>
                                                            
                                                        }  
                                                <h3 style={{margin:'0px 3px 0px 3px'}} className={Style.horizonDiv}>|</h3>
                                                <h3 className={Style.commentText}>{commentCount} {langCtx.language === 'english' ?"comments":"دیدگاه"}</h3>
                                                </div>
                                            </Col>
                                            {/*-------- Line --------*/}
                                                        {/*-------- photo gallery --------*/}
                                            <Col className={Style.photoGalleryNormalResponsive} style={{float:'right'}} xs={12} md={12} lg={6}>
                                                <div  className={Style.imageGalleryDiv}> 
                                                    <ProductPhotoGallery openFullViewFn={openFullView} galleryImages={imageGallery}></ProductPhotoGallery>
                                                </div>
                                            </Col>
                                        </div>

                                        {/*---------- product Brief ----------*/}
                                        <Col  dir={langCtx.language === 'english' ?'ltr':'rtl'} xs={12} md={12} lg={6}>
                                            <Row>
                                                <div className={Style.productBriefDiv}>
                                                    <div  className={Style.normalTitle}> 
                                                        {/*-------- product title --------*/}
                                                        <Col  xs={12} md={12} lg={12}>
                                                            <div className={Style.productTitleDiv}>
                                                                <h4>{product.title}</h4>
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
                                                                        <h3 style={langCtx.language === 'english' ?{margin:'0px 0px 0px 5px'}:{margin:'0px 5px 0px 0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":"امتیاز این محصول"} : {langCtx.language === 'english' ?"not rated yet":"امتیازی ثبت نشده"}</h3>
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
                                                                        <h3 style={langCtx.language === 'english' ?{marginleft:'5px'}:{marginleft:'0px'}} className={Style.rateTextStyle}>{langCtx.language === 'english' ?"Product rate":"امتیاز این محصول"} : {overalRate}</h3>
                                                                    
                                                                    </div>
                                                                    
                                                                }                                                               
                                                                 <h3 style={{margin:'0px 3px 0px 3px'}} className={Style.horizonDiv}>|</h3>
                                                                 <h3 className={Style.commentText}>{commentCount} {langCtx.language === 'english' ?"comments":"دیدگاه"}</h3>
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
                                                                            <h4 style={langCtx.language === 'english' ?{padding:'8px 7px 8px 0px'}:{padding:'8px 0px 8px 7px' , marginRight:'4px'}} className={Style.availableSurfaceDiv}>موجود در انبار:<span>{product.availableSurface}</span> متر</h4>
                                                                        </div>
                                                                    :
                                                                        <div style={langCtx.language === 'english' ?{float:'right'}:{float:'left'}} className={Style.stockStyle}>
                                                                            <ErrorIcon sx={{color:'#cc1800' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></ErrorIcon>
                                                                            <h4 style={langCtx.language === 'english' ?{padding:'8px 7px 8px 0px'}:{padding:'8px 0px 8px 7px' , marginRight:'4px'}}>{langCtx.language === 'english' ?'out of stock':'اتمام موجودی'}</h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.featuresDiv}>
                                                                    <h3 style={langCtx.language === 'english' ?{marginLeft:'5px' , marginBottom:'2px'}:{paddingRight:'5px' , marginBottom:'2px'}} >{langCtx.language === 'english' ?'Features':'ویژگی ها'}</h3>
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
                                                                            <div className={Style.meterDiv}><h4>{langCtx.language === 'english' ?'Price':'قیمت'}</h4></div>
                                                                            <div style={langCtx.language === 'english' ?{marginLeft:'5px'}:{marginRight:'5px'}} className={Style.priceItSelfDiv}><h4>{langCtx.language === 'english' ?'Contact Us':'تماس بگیرید'}</h4></div>
                                                                        </div>
                                                                    :
                                                                        <div style={langCtx.language === 'english' ?{padding:'0px'}:{padding:'0px 0px 0px 7px'}} className={Style.priceDiv}>
                                                                            <div className={Style.meterDiv}><h4>{price.measure}</h4></div>
                                                                            <div style={langCtx.language === 'english' ?{marginLeft:'5px'}:{marginRight:'5px'}} className={Style.priceItSelfDiv}><h4>{parseInt(price.price).toLocaleString()}</h4><span className={Style.priceUnit}>تومان</span></div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div style={langCtx.language === 'english' ?{float:'right'}:{float:'left'}} dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.stockDiv}>
                                                                    {product.stock === true ?
                                                                        <div className={Style.stockStyle}>
                                                                            <CheckCircleIcon sx={{color:'#00CC81' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></CheckCircleIcon>
                                                                            <h4 style={langCtx.language === 'english' ?{padding:'8px 7px 8px 0px'}:{padding:'8px 0px 8px 7px' , marginRight:'4px'}} 
                                                                             className={Style.availableSurfaceDiv}>موجود در انبار:<span>{product.availableSurface}</span> متر</h4>
                                                                        </div>
                                                                    :
                                                                        <div className={Style.stockStyle}>
                                                                            <ErrorIcon sx={{color:'#cc1800' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></ErrorIcon>
                                                                            <h4 style={langCtx.language === 'english' ?{padding:'8px 7px 8px 0px'}:{padding:'8px 0px 8px 7px' , marginRight:'4px'}}>{langCtx.language === 'english' ?'out of stock':'اتمام موجودی'}</h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </div>
                                                        {/* contact btn */}
                                                        <Col xs={12} md={12} lg={12}>
                                                            <div  className={Style.purchaseDiv}>
                                                                <div style={langCtx.language === 'english' ?{display:'inline-block' , float:'left'}:{display:'inline-block' , float:'right'}} className={Style.purchaseTitle}><h4 style={langCtx.language === 'english' ?{paddingLeft:'14px'}:{paddingRight:'0px'}}>{langCtx.language === 'english' ? 'Consulting and orther':'سفارش و مشاوره'}</h4></div>
                                                                <div style= {langCtx.language === 'english' ?{display:'inline-block' , backgroundColor:'#354063' , color:'#fff' , padding:'3px 8px 3px 8px' , borderRadius:'6px' , float:'right' , margin:'6px 14px 0px 0px'}:{display:'inline-block' , backgroundColor:'#354063' , color:'#fff' , padding:'3px 8px 3px 8px' , borderRadius:'6px' , float:'left' , margin:'6px 0px 0px 14px'}}  className={Style.productRateDiv}>{langCtx.language === 'english' ? 'Product Code:':'کد محصول:'}<span>{product.productCode}</span></div>
                                                                <div className={Style.purchaseBtn}>
                                                                    <button onClick={()=>{setPhoneCallModal(true)}} className={Style.contactBtn}>{langCtx.language === 'english' ?'Call':'تماس'}</button>
                                                                    <a target='blank' href={`https://api.whatsapp.com/send?phone=98${parseInt(waContactBtn.phoneNumber, 10)}`}><button className={Style.whatsAppBtn}>{langCtx.language === 'english' ?'Whats App':'واتساپ'}</button></a>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Row>
                                        </Col>
                                        {/*-------- photo gallery --------*/}
                                        <Col className={Style.photoGalleryNormal} style={{float:'right'}} xs={12} md={12} lg={6}>
                                            <div  className={Style.imageGalleryDiv}> 
                                                <ProductPhotoGallery openFullViewFn={openFullView} galleryImages={imageGallery}></ProductPhotoGallery>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={0} md={0} lg={1}>
                                </Col>
                            </Row>
                            <Row style={{padding:'0px' , position: 'sticky' , top:'0'}} >
                                {/*-------- navigation section --------*/}
                                    <Col  style={{padding:'0px'}} xs={12} md={12} lg={12}>
                                        <div  dir="ltr" className={Style.productPostNavigation}>
                                            <ul className={Style.unortherList}>
                                                <li onClick={()=>{keyFeaturesRef.current.scrollIntoView()}} className={Style.unortherListActive}>
                                                    {langCtx.language === 'english' ?'Features':'مشخصات کلیدی'}
                                                </li>
                                                <li onClick={()=>{riviewRef.current.scrollIntoView()}}>{langCtx.language === 'english' ?'Review':'نقد و بررسی'}</li>
                                                <li onClick={()=>{commentsRef.current.scrollIntoView()}}>{langCtx.language === 'english' ?'Comments':'دیدگاه کاربران'}</li>
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
                                        header={langCtx.language === 'english' ?'Features':'مشخصات کلیدی'}></NormalHeader>
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
                                            <h3>Product Review</h3>
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
                                                        <h5 style={{float:"right"}}>product rate: <span>{overalRate} </span>از 5</h5>
                                                    </div>
                                                }

                                            </div>
                                            :
                                            <div  className={Style.commentSectionHeaderDiv}>
                                                {overalRate === 0?
                                                    <div className={Style.theRateItSelfDiv}>
                                                        <h5>امتیازی ثبت نشده</h5>
                                                    </div>
                                                :
                                                    <div className={Style.theRateItSelfDiv}>
                                                        <h5>امتیاز این محصول: <span>{overalRate} </span>از 5</h5>
                                                    </div>
                                                }
                                                <div className={Style.theHeaderItSelfDiv}>
                                                        <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='دیدگاه کاربران'></NormalHeader>
                                                </div> 
                                            </div>
                                            }
                                        <div className={Style.commentBoxDiv}>
                                            <CommentBox ratedBefore={ratedBefore} commentCount={commentCount} id={product._id}></CommentBox>
                                        </div>
                                        {comments.length !== 0 ?
                                        <div>
                                            {comments.map(dt=>{
                                                return(
                                                    <div className={Style.commentDiv}>
                                                        <CommentItself setUpdateComments={setUpdateComments} comment={dt}></CommentItself>
                                                    </div>
                                                )
                                            })}
                                            <div ref={moveToCommentsRef} style={{width:'100%' , textAlign:'center' , margin:'20px 0px 0px 0px'}}>
                                                <NormalBtn onClick={showMore} paddingRight='14px' paddingLeft='14px' fontSize='16px' btnName="بیشتر"></NormalBtn>
                                            </div>
                                        </div>
                                        :
                                        <div style={{borderRadius:'8px' , backgroundColor:'#EFEFEF' , width:'100%' , textAlign:'center'  , margin:'15px 0px 0px 0px' , padding:'40px 0px 40px 0px'}}>
                                            <h5 style={{margin:'0px' , padding:'0px' , fontFamily:'Dana1' , fontSize:'15px' , color:'#666666'}}>{langCtx.language === 'english' ?'no comment!':'!دیدگاهی وجود ندارد'}</h5>
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