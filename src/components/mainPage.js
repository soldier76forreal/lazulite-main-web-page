import { Fragment  , useContext , useState , useEffect} from 'react';
import Style from './mainPage.module.css';
import MainNav from './tools/mainNav';
import CarouselBanner from '../components/tools/carouselBanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bg from '../assets/bg.jpg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardSlider from './tools/cardSlider';
import ShowMoreText from "react-show-more-text";
import {Pagination,Navbar,Row,  Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import sample from '../assets/smaple.jpg';
import sample2 from '../assets/vs.jpg';
import sample3 from '../assets/sm3.jpg';
import FeaturesBriefCard from './tools/featuresBriefCard';
import Footer from './footer';
import PostForAll from '../store/getPostForAll';
import ActivePage from '../store/activePage';
import MdBanerUp from "../assets/mid banner - up.jpg";
import MdBanerUp2 from "../assets/mid banner - up - 2.jpg";
import MdBanerUp3 from "../assets/mid bottom.jpg";
import MdBanerUp4 from "../assets/bottom - right .jpg";
import MdBanerUp5 from "../assets/bottom - left .jpg";
import Granite from '../assets/granite.jpg';
import Marmar from '../assets/marmar.jpg'
import Onix from '../assets/onix.jpg'
import Travertine from '../assets/travertine.jpg'
import ReactGa from "react-ga";
import Language from '../store/language';
import axios from 'axios';
import AxiosGlobal from '../store/axiosGlobal';
import Cookies from 'js-cookie';

ReactGa.initialize(process.env.GA_TRACKING_CODE);




const MainPage = () =>{
    // --------------------------------------------Context api ------------------------------------------
    const postForAll = useContext(PostForAll);
    const langCtx  = useContext(Language);
    const axiosGlobal = useContext(AxiosGlobal);
    // --------------------------------------------States------------------------------------------
    const [lastestPostForCard , setLastestPostForCard] = useState([...postForAll]);
    const [saveAllData , setGetAllData] = useState([]);

    const activePage = useContext(ActivePage)

    useEffect(() => {
        activePage.nav=window.location.pathname;
        document.title = "لازولیت ماربل"
    }, []);

    // --------------------------------------------functions------------------------------------------
    // const lastestDataForCardFn = () =>{
    //     var tempArr = [...postForAll];
    //     tempArr.sort(function(a,b){
    //         return new Date(a.insertDate) - new Date(b.insertDate)
    //       })
    //       setLastestPostForCard([...tempArr])
          
    // }
    useEffect(() => {
        activePage.activePageFn('home');
    }, []);

    var contentC = 'است، و برای شرایط فعلی تکنولوژی مورد نیاز،  و کاربردهای متنوع با هدف بهبود ابزارهای لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم';
    const blackCard = {
        background: "rgb(37,42,45)",
        background: "linear-gradient(52deg, rgba(37,42,45,1) 0%, rgba(61,62,66,1) 100%)"
    }
    const blueCard = {
        background: "rgb(23,80,190)",
        background: "linear-gradient(52deg, rgba(23,80,190,1) 0%, rgba(30,99,217,1) 100%)"
    }
    const lightBlueCard = {
        background: 'rgb(118,216,232)',
        background: 'linear-gradient(84deg, rgba(118,216,232,1) 0%, rgba(45,127,146,1) 100%)'
    }
    
    const peachi = {
        background: "rgb(243,143,151)",
        background: "linear-gradient(99deg, rgba(243,143,151,1) 0%, rgba(236,97,94,1) 100%)"
    }
    useEffect(() => {
        ReactGa.pageview(window.location.pathname + window.location.search);
    }, []);

    const getData =async()=>{
        try{
            if(langCtx.language === 'persian'){
                const response = await axios({
                    method:"get",
                    url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMain`,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data = response.data; 
                setGetAllData([...data.rs])
                
            }else if(langCtx.language === 'arabic'){
                const response = await axios({
                    method:"get",
                    url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMainAr`,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data = response.data; 
                setGetAllData([...data.rs])
            }else if(langCtx.language === 'english'){
                const response = await axios({
                    method:"get",
                    url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMainEn`,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data = response.data; 
                setGetAllData([...data.rs])
            }

        
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [Cookies.get('currentLang')]);
    return(
        <Fragment>
            {/* portals */}
            <Footer></Footer>
            <MainNav></MainNav>
                <div className={Style.carouselBannerDiv}>
                    <CarouselBanner>
                    </CarouselBanner>
                </div>
                <div  className={Style.briefCardDiv}>
                    <Row >
                        <Col className={Style.briefCardFirstCol}  xs={12} sm={12} md={6} lg={12} xl={6}>
                            <FeaturesBriefCard id='620ad4f3590f8461838825cc' bg={Travertine} name={langCtx.language === 'english' ?'Teraverten':'تراورتن'}
                            content='سنگ تراورتن در تمامی قسمت های یک ساختمان مورد استفاده قرار
                            می گیرد معروف ترین رنگ های تراورتن عبارتند از:سفید، قهوه ای مایل به قرمز، قهوه ای، کرم و طلایی. تراورتن امروزه بیشتر برای کف ها و دیوار ها مورد استفاده قرار می گیرید .'
                             customColor={blackCard}></FeaturesBriefCard>
                        </Col>
                        <Col className={Style.briefCardSecondCol}  xs={12} sm={12} md={6} lg={12} xl={6}>
                            <FeaturesBriefCard id='620b80425779ab2413f5036b' bg={Granite} name={langCtx.language === 'english' ?'Granite':'گرانیت'} 
                            content='سنگ های گرانیت، مقاومت بالایی در برابر مواد اسیدی و شکستگی دارند به همین دلیل بیشتر در بخش های ورودی و یا به صورت سنگفرش در ساختمان استفاده می شوند.گرانیت های ایرانی از :عبارتند  سنگ گرانیت جنگلی بیرجند، گرانیت خرمدره، گرانیت سفید نطنز، گرانیت نهبندان و...'
                            customColor={blueCard}></FeaturesBriefCard>
                        </Col>
                    </Row>
                    <Row >
                        <Col className={Style.briefCardThirdCol}   xs={12} sm={12}md={6} lg={12} xl={6}>
                            <FeaturesBriefCard id='6246e1e3f4b6e378c538a289' bg={Onix} name={langCtx.language === 'english' ?'Onix':'اونیکس'}
                            content='سنگ اونیکس بیشتر جنبه دکوراتیو دارد و در بخش های تزئینی استفاده می شود.یکی از ویژگی ها سنگ های اونیکس شفاف بودن و انتقال نور آن است.سنگ اونیکس قیمت بالایی دارد و در نقش ها و رنگ های زیادی یافت می شود.' customColor={lightBlueCard}></FeaturesBriefCard>
                        </Col>
                        <Col className={Style.briefCardFourthCol}   xs={12} sm={12} md={6} lg={12} xl={6}>
                             <FeaturesBriefCard id='621a40a25779ab2413f50377' bg={Marmar} name={langCtx.language === 'english' ?'MarMar':'مرمر'}
                             content='سنگ مرمر به دلیل ویژگی های خاص مانند تحمل فشار، جذب آب، تخلل و کمیابی بیشتر به صورت دکوراتیو مورد استفاده قرار می گیرد. انواع سنگ مرمر در ایران عبارتند از: مرمر سبز، مرمر سفید، مرمر صورتی، مرمر عسلی، مرمر پرتقالی، مرمر قرمز، مرمر آبی...'
                              customColor={peachi}></FeaturesBriefCard>

                        </Col>
                    </Row>
                </div>
                <div className={Style.cardSliderDiv}>
                    {saveAllData.length !== 0?
                         <CardSlider listType='last' cardName={langCtx.language === 'english' ?'Latest Products':'جدید ترین محصولات'} data={postForAll}></CardSlider>
                    :null
                }
                </div>

                <div className={Style.aboutUsTilesDiv}>
                    <h5>{langCtx.language === 'english' ?'What do you know about lazulite marble?':'با لازولیت ماربل آشنایی داری؟'}</h5>
                    <Row>

                        <Col style={{padding:'0px'}} sm={6} xs={6} md={6} lg={6} xl={6}>
                            <div className={Style.firstAboutUsTilesDiv}>
                                <img src={`${MdBanerUp}`}></img>
                            </div>
                        </Col>
                        <Col style={{padding:'0px'}} sm={6} xs={6} md={6} lg={6} xl={6}>
                            <div className={Style.secondAboutUsTilesDiv}>
                                <img src={`${MdBanerUp2}`}></img>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{padding:'0px'}} sm={12} xs={12} md={12} lg={12} xl={12}>
                            <div className={Style.thirdAboutUsTilesDiv}>
                                <img src={`${MdBanerUp3}`}></img>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={Style.opratorsSecDiv}>
                    <h5>{langCtx.language === 'english' ?'Contact us':'همین حالا با ما تماس بگیر'}</h5>
                    <Row>
                        <Col className={Style.firstOpratorCol} sm={6} xs={6} md={6} lg={6} xl={6}>
                            <div className={Style.firstOpratorDiv}>
                                <img src={`${MdBanerUp4}`}></img>
                            </div>
                        </Col>
                        <Col className={Style.secondOpratorCol} sm={6} xs={6} md={6} lg={6} xl={6}>
                            <div className={Style.secondOpratorDiv}>
                                <img src={`${MdBanerUp5}`}></img>
                            </div>
                        </Col>
                    </Row>
                </div>
                
        </Fragment>
    )

}

export default MainPage;