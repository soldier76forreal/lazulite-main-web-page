import { Fragment  , useContext , useState , useEffect , React} from 'react';
import Style from './mainPage.module.css';
import MainNav from './tools/mainNav';
import CarouselBanner from '../components/tools/carouselBanner';
import { useNavigate , useParams , useLocation , Link} from "react-router-dom";
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
import ActivePage from '../store/activePage';
import MdBanerUp from "../assets/mid banner - up.jpg";
import MdBanerUp2 from "../assets/mid banner - up - 2.jpg";
import MdBanerUp3 from "../assets/mid bottom.jpg";
import MdBanerUp4 from "../assets/bottom-right.jpg";
import MdBanerUp5 from "../assets/bottom-left.jpg";
import callEng from "../assets/callEng.jpg";
import whatsAppEng from "../assets/whatsAppEng.jpg";
import callAr from "../assets/callAr.jpg";
import waAr from "../assets/waAr.jpg";
import Granite from '../assets/granite.jpg';
import Marmar from '../assets/marmar.jpg'
import Onix from '../assets/onix.jpg'
import Travertine from '../assets/travertine.jpg'
import Language from '../store/language';
import axios from 'axios';
import AxiosGlobal from '../store/axiosGlobal';
import Cookies from 'js-cookie';
import Loading from '../store/loading';
import Loader from './tools/loader';
import MdBanerUp6 from "../assets/top banner - 11.jpg";
// import MdBanerUp6Mobile from "../assets/top banner - 1.jpg";
import MdBanerUp7 from "../assets/top banner - 2.jpg";
import MdBanerUp8 from "../assets/top banner - 3.jpg";
import lashotorAr from "../assets/lashotorAr.jpg";
import geranitRoyalAr from "../assets/geranitRoyalAr.jpg";
import marmaritAr from "../assets/marmaritAr.jpg";
import PersianMarkinehEn from "../assets/Persian markineh.jpg";
import RoyalGranite from "../assets/Royal Granite.jpg";
import goldeBlack from "../assets/golde black.jpg";
import AbousUsPr from "../assets/abousUsPr.jpg";
import AbousUsAr from "../assets/abousUsAr.jpg";

import AbousUsEn from "../assets/abousUsEn.jpg";
import Shiping from "../assets/shipingPr.jpg";
import Branches from "../assets/branchesPr.jpg";
import ShipingEn from "../assets/shipingEn.jpg";
import BranchesEn from "../assets/branchesEn.jpg";
import ShipingAr from "../assets/shipingAr.jpg";
import BranchesAr from "../assets/branchesAr.jpg";
import BlogsGrids from './tools/blogsGrids';
import GoldenBlackMobile from "../assets/goldenBlackMobile.jpg";
import PersianMarkinehMobile from "../assets/persianMarkinehMobile.jpg";
import RoyalGraniteMobile from "../assets/royalGraniteMobile.jpg";


const MainPage = () =>{
    // --------------------------------------------Context api ------------------------------------------
    const langCtx  = useContext(Language);
    const axiosGlobal = useContext(AxiosGlobal);
    const loadingCtx = useContext(Loading);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // --------------------------------------------States------------------------------------------
    const [getAllData , setGetAllData] = useState([]);
    const [lastSixBlogData , setLastSixBlogData] = useState([]);
    const [travertinForCardCarousel , setTravertinForCardCarousel] = useState([]);
    const [graniteForCardCarousel , setGraniteForCardCarousel] = useState([]);
    const [marmariteForCarousel , setMarmariteForCarousel] = useState([]);
    const [lastestProduct , setLastestProduct] = useState([]);
    const [travertineLink , setTravertineLink] = useState('');
    const [graniteLink , setGraniteLink] = useState('');
    const [marmaritLink , setMarmaritLink] = useState('');

    const activePage = useContext(ActivePage);

    const graniteArabic = "تتمتع أحجار جرانیت بمقاومة عالية للمواد الحمضية والكسور ، لذا فهي تستخدم في الغالب في أقسام المدخل أو كرصف في المبنى. جرانیت الإيراني هو: جرانيت بيرجند ، جرانيت خرم دره ، جرانيت نطنز الأبيض ، جرانيت نهبندان و ..."
    const granitPersian = 'سنگ های گرانیت، مقاومت بالایی در برابر مواد اسیدی و شکستگی دارند به همین دلیل بیشتر در بخش های ورودی و یا به صورت سنگفرش در ساختمان استفاده می شوند.گرانیت های ایرانی از :عبارتند  سنگ گرانیت جنگلی بیرجند، گرانیت خرمدره، گرانیت سفید نطنز، گرانیت نهبندان و...'
    const granitEnglish = "Granite stones have a high resistance to acidic materials and fractures, so they are mostly used in the entrance sections or as paving in the building. Iranian granites are: Birjand forest granite, Khorramdareh granite, Natanz white granite, Nehbandan granite and ..."

    const teravertenEnglish = "Travertine is used in all parts of a building. The most famous colors of travertine are: white, reddish brown, brown, cream and gold. Travertine is mostly used for floors and walls today."
    const teravertenArabic = "يستخدم ترفنتینو في جميع أجزاء المبنى. وأشهر ألوان ترفنتینو هي: الأبيض ، والبني المحمر ، والبني ، والقشدي ، والذهبي. يستخدم ترفنتینو في الغالب كرصف والجدران."
    const teravertenPersian = "سنگ تراورتن در تمامی قسمت های یک ساختمان مورد استفاده قرار    می گیرد معروف ترین رنگ های تراورتن عبارتند از:سفید، قهوه ای مایل به قرمز، قهوه ای، کرم و طلایی. تراورتن امروزه بیشتر برای کف ها و دیوار ها مورد استفاده قرار می گیرید ."

    const marbleEnglish = "Marble is used decoratively due to special properties such as pressure tolerance, water absorption, porosity and scarcity. Types of marble in Iran are: green marble, white marble, pink marble, honey marble, orange marble, red marble, blue marble ..."
    const marbleArabic = "يستخدم رخام بشكل زخرفي بسبب خصائصه الخاصة مثل تحمل الضغط وامتصاص الماء والمسامية والندرة. أنواع رخام في إيران هي: رخام الأخضر و رخام الأبيض و رخام الوردي و رخام العسل و رخام البرتقالي و رخام الأحمر و رخام الأزرق ..."
    const marblePersian = 'سنگ اونیکس بیشتر جنبه دکوراتیو دارد و در بخش های تزئینی استفاده می شود.یکی از ویژگی ها سنگ های اونیکس شفاف بودن و انتقال نور آن است.سنگ اونیکس قیمت بالایی دارد و در نقش ها و رنگ های زیادی یافت می شود.'


    const onyxEnglish = "Onyx stone has more decorative aspect and is used in decorative parts. One of the features of onyx stone is its transparency and light transmission. Onyx stone has a high price and can be found in many patterns and colors."
    const onyxArabic = "حجر أونيكس له جوانب زخرفية أكثر ويستخدم في الأجزاء الزخرفية. من مميزات أونيكس شفافيته وانتقاله للضوء. أونيكس له سعر مرتفع ويمكن العثور عليه في العديد من الأنماط والألوان."
    const onyxPersian = 'سنگ اونیکس بیشتر جنبه دکوراتیو دارد و در بخش های تزئینی استفاده می شود.یکی از ویژگی ها سنگ های اونیکس شفاف بودن و انتقال نور آن است.سنگ اونیکس قیمت بالایی دارد و در نقش ها و رنگ های زیادی یافت می شود.' 
    useEffect(() => {
        activePage.nav=window.location.pathname;
        if(langCtx.language === 'persian'){
            document.title = "لازولیت ماربل"
        }else if(langCtx.language === 'english'){
            document.title = "lazulite marble"
        }else if(langCtx.language === 'arabic'){
            document.title = "لازولیت ماربل"
        }
    }, []);


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

    const carouselBannerData = [ 
        {
            persian:{
                link:'https://lazulitemarble.com/showCase/624440abb10b3fef422d7887',
                img:MdBanerUp6
            },
            arabic:{
                link:'',
                img:lashotorAr
            },
            english:{
                link:'',
                img:RoyalGranite
            }
        },
        {
            persian:{
                link:'',
                img:MdBanerUp7
            },
            arabic:{
                link:'',
                img:geranitRoyalAr
            },
            english:{
                link:'',
                img:PersianMarkinehEn
            }
        },
        {
            persian:{
                link:'',
                img:MdBanerUp8
            },
            arabic:{
                link:'',
                img:marmaritAr
            },
            english:{
                link:'',
                img:goldeBlack
            }
        }
   ]
if (window.matchMedia('(min-width: 640px)').matches) {
    carouselBannerData[0].persian.img  = MdBanerUp6;
    carouselBannerData[0].english.img  = RoyalGranite;
    carouselBannerData[1].english.img  = PersianMarkinehEn;
    carouselBannerData[2].english.img  = goldeBlack;


} else {
    carouselBannerData[0].english.img  = RoyalGraniteMobile;
    carouselBannerData[1].english.img  = PersianMarkinehMobile;
    carouselBannerData[2].english.img  = GoldenBlackMobile;
    // carouselBannerData[0].persian.img  = MdBanerUp6Mobile;
}
    var contentC = 'است، و برای شرایط فعلی تکنولوژی مورد نیاز،  و کاربردهای متنوع با هدف بهبود ابزارهای لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم';
    // const blackCard = {
    //     background: "rgb(37,42,45)",
    //     background: "linear-gradient(52deg, rgba(37,42,45,1) 0%, rgba(61,62,66,1) 100%)"
    // }
    // const blueCard = {
    //     background: "rgb(23,80,190)",
    //     background: "linear-gradient(52deg, rgba(23,80,190,1) 0%, rgba(30,99,217,1) 100%)"
    // }
    // const lightBlueCard = {
    //     background: 'rgb(118,216,232)',
    //     background: 'linear-gradient(84deg, rgba(118,216,232,1) 0%, rgba(45,127,146,1) 100%)'
    // }
    
    // const peachi = {
    //     background: "rgb(243,143,151)",
    //     background: "linear-gradient(99deg, rgba(243,143,151,1) 0%, rgba(236,97,94,1) 100%)"
    // }
    const blackCard = {
        background: "#F9F9F9",
    }
    const blueCard = {
        background: "#F9F9F9",
    }
    const lightBlueCard = {
        background: '#F9F9F9',
    }
    
    const peachi = {
        background: "#F9F9F9",
    }
    const getData =async()=>{
        try{
            const response = await axios({
                method:"get",
                params:{language:langCtx.language},
                url:`${axiosGlobal.defaultTargetApi}/product/getAllProductsForMain`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = response.data; 
            setGetAllData([...data.rs]);
            var temp = [...data.rs];
            temp.sort(function (a, b) {
              var dateA = new Date(a.insertdate), dateB = new Date(b.insertdate)
              return dateA - dateB
            });
            var last = [];
            for(var i=0 ; temp.length > i ; i++){
              if(temp.length-i < 12){
                last.push(temp[i]);
              }
            }
            
            setLastestProduct([...last.reverse()]);
            loadingCtx.loadingStatus(true);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [langCtx.language]);
    
    // get products
    const lastestTravertin= async() =>{
        var id = '';
        if(langCtx.language === 'persian'){
            id = '620ad4f3590f8461838825cc';
            setTravertineLink(`productList?id=${id}&title=تراورتن&state=category`)
        }else if(langCtx.language === 'arabic'){
            id = '6289ceb2bcf16d017d6fee83';
            setTravertineLink(`productList?id=${id}&title=ترفنتینو&state=category`)
        }else if(langCtx.language === 'english'){
            id = '6289fb41bcf16d017d6fee96';
            setTravertineLink(`productList?id=${id}&title=Travertine&state=category`)
        }
        try{
            const response = await axios({
                method: 'get',
                params:{language:langCtx.language},
                url: `${axiosGlobal.defaultTargetApi}/product/productListByCategoryAndTagMain?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=8&id=${id}&state=category&filter=last`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const recivedData = response.data.results;
            setTravertinForCardCarousel([...response.data.results])
            loadingCtx.loadingStatus(true);

        }catch(error){
            console.log(error)
        }
    }

    const graniteTravertin= async() =>{
        var id = '';
        if(langCtx.language === 'persian'){
            id = '620b80425779ab2413f5036b';
            setGraniteLink(`productList?id=${id}&title=گرانیت&state=category`)
        }else if(langCtx.language === 'arabic'){
            id = '6289ce27bcf16d017d6fee82';
            setGraniteLink(`productList?id=${id}&title=جرانیت&state=category`)
        }else if(langCtx.language === 'english'){
            id = '6289fb6cbcf16d017d6fee98';
            setGraniteLink(`productList?id=${id}&title=Granite&state=category`)
        }
        try{
            const response = await axios({
                method: 'get',
                params:{language:langCtx.language},
                url: `${axiosGlobal.defaultTargetApi}/product/productListByCategoryAndTagMain?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=8&id=${id}&state=category&filter=last`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const recivedData = response.data.results;
            setGraniteForCardCarousel([...response.data.results])
            loadingCtx.loadingStatus(true);

        }catch(error){
            console.log(error)
        }
    }

    const marmaritData= async() =>{
        var id = '';
        if(langCtx.language === 'persian'){
            id = '6242fe6c520e1dda73fc89b1';
            setMarmaritLink(`productList?id=${id}&title=مرمریت&state=category`)
        }else if(langCtx.language === 'arabic'){
            id = '6242fe6c520e1dda73fc89b1';
            setMarmaritLink(`productList?id=${id}&title=رخام&state=category`)
        }else if(langCtx.language === 'english'){
            id = '6289fb5ebcf16d017d6fee97';
            setMarmaritLink(`productList?id=${id}&title=Marble&state=category`)
        }
        try{
            const response = await axios({
                method: 'get',
                params:{language:langCtx.language},
                url: `${axiosGlobal.defaultTargetApi}/product/productListByCategoryAndTagMain?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=8&id=${id}&state=category&filter=last`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const recivedData = response.data.results;
            setMarmariteForCarousel([...response.data.results])
            loadingCtx.loadingStatus(true);

        }catch(error){
            console.log(error)
        }
    }
    
    const getLastSixBlogs =async()=>{
        try{
            const response = await axios({
                method:"get",
                params:{language:langCtx.language},
                url:`${axiosGlobal.defaultTargetApi}/blog/getLastSixBlogs`,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = response.data; 
            setLastSixBlogData([...data]);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
        getLastSixBlogs()
        lastestTravertin()
        graniteTravertin()
        marmaritData()
    }, [langCtx.language]);

    if(loadingCtx.loading === true){
    return(
        <Fragment>
            <div style={{marginBottom:'20px'}}>

            
                {/* portals */}
                <Footer></Footer>
            
                <MainNav></MainNav>
                    <div className={Style.carouselBannerDiv}>
                        <CarouselBanner carouselBannerData={carouselBannerData}>
                        </CarouselBanner>
                    </div>
                    <div  className={Style.briefCardDiv}>
                        <Row >
                            <Col className={Style.briefCardFirstCol}  xs={12} sm={12} md={6} lg={12} xl={6}>
                                <FeaturesBriefCard id='620ad4f3590f8461838825cc' bg={Travertine} name={langCtx.language === 'english' ? 'Travertine' :langCtx.language === 'arabic' ?  'ترفنتینو' :langCtx.language === 'persian'?'تراورتن' : null} 
                                content={langCtx.language === 'english' ? teravertenEnglish :langCtx.language === 'arabic' ? teravertenArabic :langCtx.language === 'persian'?teravertenPersian : null}
                                customColor={blackCard}
                                ></FeaturesBriefCard>
                            </Col>
                            <Col className={Style.briefCardSecondCol}  xs={12} sm={12} md={6} lg={12} xl={6}>
                                <FeaturesBriefCard id='620b80425779ab2413f5036b' bg={Granite} name={langCtx.language === 'english' ? 'Granite' :langCtx.language === 'arabic' ?  'جرانیت' :langCtx.language === 'persian'?'گرانیت' : null}
                                content={langCtx.language === 'english' ? granitEnglish :langCtx.language === 'arabic' ? graniteArabic :langCtx.language === 'persian'?granitPersian : null}
                                customColor={blueCard}></FeaturesBriefCard>
                            </Col>
                        </Row>
                        <Row >
                            <Col className={Style.briefCardThirdCol}   xs={12} sm={12}md={6} lg={12} xl={6}>
                                <FeaturesBriefCard id='6246e1e3f4b6e378c538a289' bg={Onix} name={langCtx.language === 'english' ? 'Onyx' :langCtx.language === 'arabic' ?  'أونيكس' :langCtx.language === 'persian'?'اونیکس' : null}
                                content={langCtx.language === 'english' ? onyxEnglish :langCtx.language === 'arabic' ? onyxArabic :langCtx.language === 'persian'?onyxPersian : null} customColor={lightBlueCard}></FeaturesBriefCard>
                            </Col>
                            <Col className={Style.briefCardFourthCol}   xs={12} sm={12} md={6} lg={12} xl={6}>
                                <FeaturesBriefCard id='6242fe6c520e1dda73fc89b1' bg={Marmar} name={langCtx.language === 'english' ? 'Marble' :langCtx.language === 'arabic' ?  'رخام' :langCtx.language === 'persian'?'مرمریت' : null}
                                content={langCtx.language === 'english' ? marbleEnglish :langCtx.language === 'arabic' ? marbleArabic :langCtx.language === 'persian'?marblePersian : null}
                                customColor={peachi}></FeaturesBriefCard>
                            </Col>
                        </Row>
                    </div>
                    <div className={Style.cardSliderDiv}>
                        {getAllData.length !== 0?
                                <CardSlider listType='last' cardName={langCtx.language === 'english' ?'Latest Products':langCtx.language === 'persian'?'جدید ترین محصولات':langCtx.language==='arabic'?'أحدث المنتجات':null} data={lastestProduct}></CardSlider>
                            :null
                        }
                    </div>

                    <div className={Style.aboutUsTilesDiv}>
                        <h2>{langCtx.language === 'english' ?'What do you know about lazulite marble?':langCtx.language === 'persian' ?'با لازولیت ماربل آشنایی داری؟':langCtx.language === 'arabic' ?'ماذا تعرف عن لازولیت ماربل؟':null}</h2>
                        <Row>
                            <Col style={{padding:'0px'}} sm={6} xs={6} md={6} lg={6} xl={6}>
                                <div className={Style.firstAboutUsTilesDiv}>
                                    <Link to={`${axiosGlobal.defaultTargetApi}/shiping`}>
                                        <img style={{cursor:'pointer'}} src={langCtx.language === 'persian'?`${Shiping}`:langCtx.language === 'arabic'? `${ShipingAr}`:langCtx.language === 'english'?`${ShipingEn}`:null}></img>
                                    </Link>
                                </div>
                            </Col>
                            <Col style={{padding:'0px'}} sm={6} xs={6} md={6} lg={6} xl={6}>
                                <div className={Style.secondAboutUsTilesDiv}>
                                    <Link to={`${axiosGlobal.defaultTargetApi}/branches`}>
                                        <img style={{cursor:'pointer'}} src={langCtx.language === 'persian' ?`${Branches}`:langCtx.language === 'arabic'?`${BranchesAr}`:langCtx.language === 'english'? `${BranchesEn}`:null}></img>
                                   </Link>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{padding:'0px'}} sm={12} xs={12} md={12} lg={12} xl={12}>
                                <div className={Style.thirdAboutUsTilesDiv}>
                                    {/* <Link to={`${axiosGlobal.defaultTargetApi}/shiping`}> */}
                                        <img style={{cursor:'pointer'}} src={langCtx.language === 'persian' ?`${AbousUsPr}`:langCtx.language === 'arabic'?`${AbousUsAr}`:langCtx.language === 'english'? `${AbousUsEn}`:null}></img>
                                    {/* </Link> */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={Style.cardSliderDiv}>
                        {getAllData.length !== 0?
                                <CardSlider link={travertineLink} listType='travertin' cardName={langCtx.language === 'english' ?'Travertine':langCtx.language === 'persian'?'تراورتن':langCtx.language==='arabic'?'ترفنتینو':null} data={travertinForCardCarousel}></CardSlider>
                        :null}
                    </div>
                    <div className={Style.opratorsSecDiv}>
                        <h2>{langCtx.language === 'english' ?'Contact us!':langCtx.language === 'persian'?'!همین حالا با ما تماس بگیر':langCtx.language === 'arabic' ? '!اتصل بنا':null}</h2>
                        <Row>
                            <Col className={Style.firstOpratorCol} sm={6} xs={6} md={6} lg={6} xl={6}>
                                <div className={Style.firstOpratorDiv}>
                                    <a href="tel:+98913 565 3700"><img title='phone call' alt='phone call' src={langCtx.language === 'english' ? callEng:langCtx.language === 'arabic' ?callAr :langCtx.language === 'persian'?MdBanerUp4:null}></img></a>
                                </div>
                            </Col>
                            <Col className={Style.secondOpratorCol} sm={6} xs={6} md={6} lg={6} xl={6}>
                                <div className={Style.secondOpratorDiv}>
                                    <a target='blank' href={`https://api.whatsapp.com/send?phone=98${parseInt("09135653700", 10)}`}>
                                        <img title='whats app' alt='whats app' src={langCtx.language === 'english' ? whatsAppEng:langCtx.language === 'arabic' ?waAr :langCtx.language === 'persian'?MdBanerUp5:null}></img>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={Style.cardSliderDiv}>
                        {getAllData.length !== 0?
                            <CardSlider link={graniteLink} listType='granite' cardName={langCtx.language === 'english' ?'Granite':langCtx.language === 'persian'?'گرانیت':langCtx.language==='arabic'?'جرانیت':null} data={graniteForCardCarousel}></CardSlider>
                        :null}
                    </div>
                    {/* {lastSixBlogData.length !==0?
                        <div className={Style.blogSectionDiv}>
                            <h2>{langCtx.language === 'english' ?'Lazulite Marble newsletter':langCtx.language === 'persian'?'خبر نامه لازولیت ماربل':langCtx.language==='arabic'?'نشرة إخبارية من لازولیت ماربل':null}خبر نامه لازولیت ماربل</h2>
                            
                            <BlogsGrids data={lastSixBlogData}></BlogsGrids>
                            <div className={Style.showAll}>
                                <Link to='/blog'><h4>{langCtx.language === 'english' ?'show all':langCtx.language === 'persian'?'نمایش همه':langCtx.language==='arabic'?'عرض الكل':null}</h4></Link>
                            </div>
                        </div>
                    :null} */}
                    <div className={Style.cardSliderDiv}>
                        {getAllData.length !== 0?
                            <CardSlider link={marmaritLink} listType='marmarit' cardName={langCtx.language === 'english' ?'Marble':langCtx.language === 'persian'?'مرمریت':langCtx.language==='arabic'?'رخام':null} data={marmariteForCarousel}></CardSlider>
                        :null}
                    </div>
            </div>
        </Fragment>

    )
    }else if(loadingCtx.loading === false){
        return(
            <div className={Style.loaderDiv} >
                 <Loader marginBottom={'2px'} borderTop={'4px solid #F8FBFE'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
            </div>
        )
    }
}

export default MainPage;