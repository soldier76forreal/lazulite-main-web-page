import { Fragment , useEffect , useContext , useState } from "react";
import Style from './branches.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lottie from "lottie-react";
import MainAnimation from "../assets/branches.json";
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
import A from "../assets/a.jpg";
import Language from "../store/language";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
const Branches = () =>{
    const langCtx = useContext(Language);

    const location = useLocation();


    const activePage = useContext(ActivePage);
    const [esf , setEsf] = useState(false);
    const [esfFactory , setEsfFactory] = useState(false);
    const [oman , setOman] = useState(false);
    const [iraq , setIraq] = useState(false);
    const [ahvaz , setAhvaz] = useState(false);
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
        activePage.activePageFn('branches');
    }, []);
    useEffect(() => {
        activePage.nav=window.location.pathname;
        if(langCtx.language === 'persian'){
            document.title = "شعب لازولیت ماربل"
        }else if(langCtx.language === 'english'){
            document.title = "lazulite marble branches"
        }else if(langCtx.language === 'arabic'){
            document.title = "فروع لازولیت ماربل"
        }
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
        <Footer ></Footer> 
        <MainNav></MainNav>
            <Row>
                <div style={{padding:'0px 20px 30px 20px'}} className={Style.divContainer}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className={Style.introDiv}>
                            <div className={Style.animatedSectionDiv}>
                                <Lottie loop={true} animationData={MainAnimation} />
                            </div>
                            <h1>شعب لازولیت ماربل</h1>
                        </div>
                    </Col>
                    <div dir="rtl" className={Style.listDiv}>
                        <ul>
                            {/* <li onClick={()=>{if(esf===true){setEsf(false)}else if(esf===false){setEsf(true)}}}>                     
                                <Row>
                                    <Col style={{padding:'0px calc(var(--bs-gutter-x) * .5) 0px 0px'}}  xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.cityLable}>
                                            <h5>اصفهان</h5>
                                        </div>     
                                    </Col>           
                                    <Col style={{padding:'0px'}} xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <div className={Style.address}>
                                            <h5><span style={{fontWeight:'800'}}>کارخانه:</span>محمود آباد-خیابان ۳۳- جدیدالاحداث</h5>
                                        </div>
                                    </Col>
                                    <Col  xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.showMoreBtnDiv}>
                                            <button><span className={Style.showMore}>جزئیات بیشتر</span><ArrowDropDownIcon className={esf === true?`${Style.rotateIn}`:`${Style.rotateOut}`} sx={{fontSize:'22px'}}></ArrowDropDownIcon></button>
                                        </div> 
                                    </Col>     
                                </Row>
                            </li> */}
                            {esf===true?
                            
                                <div className={Style.newsDiv}>
                                        <Row>
                                            <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div className={Style.headerDiv}><h5>معرفی لازولیت ماربل</h5></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={Style.vertDiv}  style={{ borderLeft:'solid 3px #000000' , padding:'0px 12px 0px 0px'}} xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <div className={Style.imageDiv}>
                                                    <h4>آلبوم تصاویر</h4>
                                                    <img src={A}></img>
                                                </div>
                                                <Row style={{padding:'0px 12px 0px 12px'}}>
                                                    <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>

                                                    </Col>
                                                    <Col style={{padding:'0px 0px 0px 0px'}} xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>
                                                    </Col>
                                                    <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col  style={{  padding:'0px 0px 0px 12px'}}  xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <div className={Style.aboutBranchHeadDiv}>
                                                    <h4>درباره شعبه اصفهان</h4>
                                                </div>
                                                <div className={Style.aboutBranchTextDiv}>
                                                    <p>
                                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col   xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div className={Style.videoTitleDiv}>
                                                    <h5>ویدیو معرفی</h5>
                                                </div>
                                                <div className={Style.videoDiv}>
                                                    <video  controls>
                                                        <source src="https://www.bigbuckbunny.org/" type="video/mp4"/>
                                                    </video> 
                                                </div>
                                            </Col>
                                        </Row>

                                    </div> 
                            :null}  
                            
                            <li className={Style.lightBlue} onClick={()=>{if(esfFactory===true){setEsfFactory(false)}else if(esfFactory===false){setEsfFactory(true)}}}>                     
                                <Row>
                                    <Col style={{padding:'0px calc(var(--bs-gutter-x) * .5) 0px 0px'}} xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.cityLable}>
                                            <h5>اصفهان</h5>
                                        </div>     
                                    </Col>           
                                    <Col style={{padding:'0px'}} xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <div className={Style.address}>
                                            <h5><span style={{fontWeight:'800'}}>نمایشگاه:</span>محمود آباد - خیابان ۲۰</h5>
                                        </div>        
                                    </Col>
                                    <Col  xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.showMoreBtnDiv}>
                                            <button><span className={Style.showMore}>جزئیات بیشتر</span><ArrowDropDownIcon className={esfFactory === true?`${Style.rotateIn}`:`${Style.rotateOut}`} sx={{fontSize:'22px'}}></ArrowDropDownIcon></button>
                                        </div> 
                                    </Col>     
                                </Row>  
                            </li>
                            {esfFactory===true?
                            
                                <div className={Style.newsDiv}>
                                    <Row>
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className={Style.headerDiv}><h5>معرفی لازولیت ماربل</h5></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={Style.vertDiv}  style={{ borderLeft:'solid 3px #000000' , padding:'0px 12px 0px 0px'}} xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div className={Style.imageDiv}>
                                                <h4>آلبوم تصاویر</h4>
                                                <img src={A}></img>
                                            </div>
                                            <Row style={{padding:'0px 12px 0px 12px'}}>
                                                <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className={Style.imgSubDiv}>
                                                        <img src={A}></img>
                                                    </div>

                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 0px'}} xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className={Style.imgSubDiv}>
                                                        <img src={A}></img>
                                                    </div>
                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className={Style.imgSubDiv}>
                                                        <img src={A}></img>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col  style={{  padding:'0px 0px 0px 12px'}}  xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div className={Style.aboutBranchHeadDiv}>
                                                <h4>درباره شعبه اصفهان</h4>
                                            </div>
                                            <div className={Style.aboutBranchTextDiv}>
                                                <p>
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col   xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className={Style.videoTitleDiv}>
                                                <h5>ویدیو معرفی</h5>
                                            </div>
                                            <div className={Style.videoDiv}>
                                                <video  controls>
                                                    <source src="https://www.bigbuckbunny.org/" type="video/mp4"/>
                                                </video> 
                                            </div>
                                        </Col>
                                    </Row>

                                </div> 
                            :null}
                            <li onClick={()=>{if(ahvaz===true){setAhvaz(false)}else if(ahvaz===false){setAhvaz(true)}}}>  
                                <Row>
                                    <Col style={{padding:'0px calc(var(--bs-gutter-x) * .5) 0px 0px'}} xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.cityLable}>
                                            <h5>اهواز</h5>
                                        </div> 
                                    </Col>           
                                    <Col style={{padding:'0px'}} xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <div className={Style.address}>
                                            <h5>سه راه خرمشهر بعد از کلانتری ۱۹</h5>
                                        </div>
                                    </Col>
                                    <Col  xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.showMoreBtnDiv}>
                                            <button><span className={Style.showMore}>جزئیات بیشتر</span><ArrowDropDownIcon className={ahvaz === true?`${Style.rotateIn}`:`${Style.rotateOut}`} sx={{fontSize:'22px'}}></ArrowDropDownIcon></button>
                                        </div> 
                                    </Col>     
                                </Row>                   
                            </li>
                            {ahvaz===true?
                            
                                <div className={Style.newsDiv}>
                                        <Row>
                                            <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div className={Style.headerDiv}><h5>معرفی لازولیت ماربل</h5></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={Style.vertDiv}  style={{ borderLeft:'solid 3px #000000' , padding:'0px 12px 0px 0px'}} xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <div className={Style.imageDiv}>
                                                    <h4>آلبوم تصاویر</h4>
                                                    <img src={A}></img>
                                                </div>
                                                <Row style={{padding:'0px 12px 0px 12px'}}>
                                                    <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>

                                                    </Col>
                                                    <Col style={{padding:'0px 0px 0px 0px'}} xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>
                                                    </Col>
                                                    <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col  style={{  padding:'0px 0px 0px 12px'}}  xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <div className={Style.aboutBranchHeadDiv}>
                                                    <h4>درباره شعبه اصفهان</h4>
                                                </div>
                                                <div className={Style.aboutBranchTextDiv}>
                                                    <p>
                                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col   xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div className={Style.videoTitleDiv}>
                                                    <h5>ویدیو معرفی</h5>
                                                </div>
                                                <div className={Style.videoDiv}>
                                                    <video  controls>
                                                        <source src="https://www.bigbuckbunny.org/" type="video/mp4"/>
                                                    </video> 
                                                </div>
                                            </Col>
                                        </Row>

                                    </div> 
                            :null}  
                            <li className={Style.lightBlue} onClick={()=>{if(iraq===true){setIraq(false)}else if(iraq===false){setIraq(true)}}}>          
                            <Row>

                
                                <Col style={{padding:'0px calc(var(--bs-gutter-x) * .5) 0px 0px'}} xs={2} sm={2} md={2} lg={2} xl={2}> 
                                    <div className={Style.cityLable}>
                                        <h5>بصره</h5>
                                    </div>    
                                </Col>           
                                <Col style={{padding:'0px'}} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <div className={Style.address}>
                                        <h5>المشراق الجدید مقابل بصره سنتر</h5>
                                    </div>
                                </Col>
                                <Col  xs={2} sm={2} md={2} lg={2} xl={2}> 
                                    <div className={Style.showMoreBtnDiv}>
                                        <button><span className={Style.showMore}>جزئیات بیشتر</span><ArrowDropDownIcon className={iraq === true?`${Style.rotateIn}`:`${Style.rotateOut}`} sx={{fontSize:'22px'}}></ArrowDropDownIcon></button>
                                    </div>  
                                </Col>     
                            </Row>
                            </li>
                            {iraq===true?
                                <div className={Style.newsDiv}>
                                    <Row>
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className={Style.headerDiv}><h5>معرفی لازولیت ماربل</h5></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={Style.vertDiv}  style={{ borderLeft:'solid 3px #000000' , padding:'0px 12px 0px 0px'}} xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div className={Style.imageDiv}>
                                                <h4>آلبوم تصاویر</h4>
                                                <img src={A}></img>
                                            </div>
                                            <Row style={{padding:'0px 12px 0px 12px'}}>
                                                <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className={Style.imgSubDiv}>
                                                        <img src={A}></img>
                                                    </div>

                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 0px'}} xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className={Style.imgSubDiv}>
                                                        <img src={A}></img>
                                                    </div>
                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className={Style.imgSubDiv}>
                                                        <img src={A}></img>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col  style={{  padding:'0px 0px 0px 12px'}}  xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div className={Style.aboutBranchHeadDiv}>
                                                <h4>درباره شعبه اصفهان</h4>
                                            </div>
                                            <div className={Style.aboutBranchTextDiv}>
                                                <p>
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col   xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className={Style.videoTitleDiv}>
                                                <h5>ویدیو معرفی</h5>
                                            </div>
                                            <div className={Style.videoDiv}>
                                                <video  controls>
                                                    <source src="https://www.bigbuckbunny.org/" type="video/mp4"/>
                                                </video> 
                                            </div>
                                        </Col>
                                    </Row>
                                </div> 
                            :null}
                            <li onClick={()=>{if(oman===true){setOman(false)}else if(oman===false){setOman(true)}}}>
                                <Row>
                                    <Col style={{padding:'0px calc(var(--bs-gutter-x) * .5) 0px 0px'}} xs={2} sm={2} md={2} lg={2} xl={2}> 
                                        <div className={Style.cityLable}>
                                            <h5>عمان</h5>
                                        </div>     
                                    </Col>
                                    <Col style={{padding:'0px'}} xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <div className={Style.address}>
                                            <h5>لازولیت ماربل الحديثة ش.م.م‌ سلطنة عمان، شمال الباطنة، صحار، منطقة صناعية العوهي</h5>
                                        </div>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                        <div className={Style.showMoreBtnDiv}>
                                            <button><span className={Style.showMore}>جزئیات بیشتر</span><ArrowDropDownIcon className={oman === true?`${Style.rotateIn}`:`${Style.rotateOut}`} sx={{fontSize:'22px'}}></ArrowDropDownIcon></button>
                                        </div>  
                                    </Col>
                                </Row>                     


                            </li>
                            {oman===true?
                                <div className={Style.newsDiv}>
                                        <Row>
                                            <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div className={Style.headerDiv}><h5>معرفی لازولیت ماربل</h5></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={Style.vertDiv}  style={{ borderLeft:'solid 3px #000000' , padding:'0px 12px 0px 0px'}} xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <div className={Style.imageDiv}>
                                                    <h4>آلبوم تصاویر</h4>
                                                    <img src={A}></img>
                                                </div>
                                                <Row style={{padding:'0px 12px 0px 12px'}}>
                                                    <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>

                                                    </Col>
                                                    <Col style={{padding:'0px 0px 0px 0px'}} xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>
                                                    </Col>
                                                    <Col style={{padding:'0px 0px 0px 0px'}}  xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <div className={Style.imgSubDiv}>
                                                            <img src={A}></img>
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col  style={{  padding:'0px 0px 0px 12px'}}  xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <div className={Style.aboutBranchHeadDiv}>
                                                    <h4>درباره شعبه اصفهان</h4>
                                                </div>
                                                <div className={Style.aboutBranchTextDiv}>
                                                    <p>
                                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col   xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div className={Style.videoTitleDiv}>
                                                    <h5>ویدیو معرفی</h5>
                                                </div>
                                                <div className={Style.videoDiv}>
                                                    <video  controls>
                                                        <source src="https://www.bigbuckbunny.org/" type="video/mp4"/>
                                                    </video> 
                                                </div>
                                            </Col>
                                        </Row>

                                    </div> 
                            :null}  
                        </ul>
                    </div>
                </div>
            </Row>
        </Fragment>
    )
}
export default Branches;