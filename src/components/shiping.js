import { Fragment , useEffect , useContext } from "react";
import Style from './shiping.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lottie from "lottie-react";
import MainAnimation from "../assets/shipingMainVector.json";
import Arrow from "../assets/arrow.json";
import {Pagination,Navbar,Row,  Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Footer from "./footer";
import MainNav from "./tools/mainNav";
import Gallery from "../assets/gallery.png";
import Oprator from "../assets/opratorIcon.png";
import Package from "../assets/package.png";
import ShipingVector from "../assets/shiping.png";
import ActivePage from "../store/activePage";
import {Helmet} from "react-helmet";
import Language from "../store/language";

import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Shiping = () =>{
    const langCtx = useContext(Language);

    const activePage = useContext(ActivePage);

    const location = useLocation();
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
    useEffect(() => {
        activePage.activePageFn('shiping');
    }, []);
    return(
        <Fragment>
            
            {langCtx.language==='persian'?
                <Helmet>
                    <title>حمل و نقل</title>
                    <meta name="description" content="حمل و نقل در لازولیت ماربل به چه صورت انجام می گیرد؟" />
                </Helmet>
                :
                langCtx.language==='english'?
                <Helmet>
                    <title>حمل و نقل</title>
                    <meta name="description" content="حمل و نقل در لازولیت ماربل به چه صورت انجام می گیرد؟" />
                </Helmet>
                :
                langCtx.language==='arabic'?
                <Helmet>
                    <title>حمل و نقل</title>
                    <meta name="description" content='حمل و نقل در لازولیت ماربل به چه صورت انجام می گیرد؟' />
                </Helmet>
                :null
            } 
        {/* portals */}
        <Footer></Footer> 
        <MainNav></MainNav>
            <Row>
                <div style={{padding:'0px'}} className={Style.divContainer}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className={Style.introDiv}>
                            <div className={Style.blueSection}>
                            </div>
                            <div className={Style.animatedSectionDiv}>
                                <Lottie loop={true} animationData={MainAnimation} />
                            </div>
                            <h1>حمل و نقل در لازولیت ماربل به چه صورت انجام می گیرد؟ </h1>
                            <div className={Style.arrowDiv}>
                                <Lottie loop={true} animationData={Arrow} />
                            </div>
                        </div>
                        <div className={Style.blueLine}></div>
                    </Col>
                    <div dir="rtl" className={Style.card1}>
                        <Row>
                            <Col className={Style.colCenter} xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div  className={Style.circle}>
                                    <img src={Gallery}></img>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div className={Style.cardInfo}>
                                    <div>
                                        <h2>انتخاب محصول</h2>
                                        <p>
                                        ابتدا سنگ مورد نظر خود را از طریق گالری اسلب های بروز لازولیت ماربل انتخاب کنید، در عین حال می توانید برای مشاوره با اپراتور های ما در تماس باشید.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{backgroundColor:'#C9E5F3'}} dir="ltr" className={Style.card1}>
                        <Row >
                            <Col className={Style.colCenter} xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div style={{float:'left'}} className={Style.circle}>
                                    <img src={Oprator}></img>
                                </div>
                                
                            </Col>
                            <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div  dir="rtl" className={Style.cardInfo}>
                                    <div>   
                                        <h2>مشاوره و خرید</h2>
                                        <p>                                       
                                        انتخاب خود را با یکی از اپراتور های ما در میان بگذارید
و منتظر دریافت فاکتور خرید خود باشید.
                                        </p>
                                    </div>
                                </div>
    
                            </Col>
                        </Row>
                    </div>
                    <div dir="rtl" className={Style.card1}>
                        <Row>
                            <Col className={Style.colCenter} xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div  className={Style.circle}>
                                    <img src={Package}></img>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div className={Style.cardInfo}>
                                    <div>
                                        <h2>بسته بندی</h2>
                                        <p>
                                            در این مرحله سنگ های انتخابی شما در پالت های چوبی قرار می گیرد؛پالت های چـــوبی از آســیب سنگ ها جلوگیری می کند.
                                        </p>
                                    </div>
                                </div>
    
                            </Col>

                        </Row>
                    </div>
                    <div style={{backgroundColor:'#C9E5F3'}} dir="ltr" className={Style.card1}>
                        <Row >
                            <Col className={Style.colCenter} xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div style={{float:'left'}} className={Style.circle}>
                                    <img src={ShipingVector}></img>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                                <div style={{float:'right'}}  dir="rtl" className={Style.cardInfo}>
                                    <div>   
                                        <h2>ارسال</h2>
                                        <p>                                       
                                        بار شما با یکی از چند روش انتخابی برای شما ارسال 
می شود.                                        </p>
                                    </div>
                                </div>
    
                            </Col>
                        </Row>
                    </div>

                </div>
            </Row>
        </Fragment>
    )
}
export default Shiping;