import { Fragment, useState , useEffect , useContext } from "react";
import Style from './showAllListPage.module.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate , useParams , useLocation } from "react-router-dom";
import axios from "axios";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchBarV2 from "./tools/searchBarV2";
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import ProductCard from "./tools/productCard";
import Pag from "./tools/pagination";
import Loader from "./tools/loader";
import Language from "../store/language";
import AxiosGlobal from "../store/axiosGlobal";
import NoDataFigure from "./tools/noDataFigure";
import MainNav from "./tools/mainNav";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PriceLimiter from "./tools/priceLimiter";
import SizeFilter from "./tools/sizeFilter";
import SortModal from "./tools/sortModal";
import SortTopToolBar from "./tools/sortTopToolBar";
import ProductCardHorizon from "./tools/productCardHorizon";
import Footer from "./footer";

import Cookies from "js-cookie";
const ShowAllListPage = () =>{
    //hooks
    const history = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const axiosGlobalCtx = useContext(AxiosGlobal);
    const langCtx = useContext(Language)
    const params = useParams();
    useEffect(() => {
        document.title = queryParams.get('title');
    }, []);
    //----------------------------------states--------------------------------------
    const [maxPage , setMaxPage] = useState();
    const [currentPage , setCurrentPage] = useState();
    const [totalPage , setTotalPage] = useState();
    const [nextPage , setNextPage] = useState();
    const [prevPage , setPrevPage] = useState();
    const [maxPageSearch , setMaxPageSearch] = useState();
    const [currentPageSearch , setCurrentPageSearch] = useState();
    const [totalPageSearch , setTotalPageSearch] = useState();
    const [nextPageSearch , setNextPageSearch] = useState();
    const [prevPageSearch , setPrevPageSearch] = useState();
    const [itemsSearch , setItemsSearch] = useState([]);
    const [products , setProducts] = useState([]);
    const [items , setItems] = useState([]);
    const [searchLoading , setSearchLoading] = useState(false);
    const [searchText , setSearchText] = useState('');
    const [searchData , setSearchData] = useState([]);
    const [pageLoading , setPageLoading] = useState(true);
    const [pageLoadingAllPage , setPageLoadingAllPage] = useState(true);
    const [showSortModal , setShowSortModal] = useState(false);
        


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
    //----------------------------------http req--------------------------------------
        
            // get products
            const getProducts = async() =>{
                try{
                    setPageLoading(true);
                    const response = await axios({
                        method: 'get',
                        params:{language:langCtx.language},
                        url: `${axiosGlobalCtx.defaultTargetApi}/product/productListForCardFullListMain?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=20&lable=${queryParams.get('lable')}`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const recivedData = response;
                    if(recivedData.data.now.total<9){
                        setMaxPage(recivedData.data.now.total);
                    }else{
                        setMaxPage(9);
                    }
                    setCurrentPage(recivedData.data.now.page);
                    setTotalPage(recivedData.data.now.total);
                    if(recivedData.data.previous !== undefined){
                        setPrevPage(recivedData.data.previous.page);
                    }
                    if(recivedData.data.next !== undefined){
                        setNextPage(recivedData.data.next.page);
                    }
                    setPageLoading(false);
                    setProducts(recivedData.data.results);

                }catch(error){
        
                }
            }
        

            useEffect(() => {
                getProducts();
        
                const half =Math.round(maxPage/2);
                let to = maxPage;
                if(currentPage + half >= totalPage){
                    to = totalPage;
                }else if(currentPage > half){
                    to = currentPage + half;
                }
                let from = to - maxPage;
                setItems(Array.from({length:maxPage},(_,i) => (i+1) + from));
        }, [currentPage , queryParams.get('filter')]);


        useEffect(()=>{
            setPageLoadingAllPage(false);
        },[])

        //----------------------------------listners--------------------------------------
        const currentPageClick = (event) =>{
            setCurrentPage(event.target.value);
                history(`/fullList?page=${event.target.value}&lable=${queryParams.get('lable')}&title=${queryParams.get('title')}`);  
        }
        const nextP = () =>{
            if(nextPage !== undefined){
                setCurrentPage(nextPage);
                    history(`/fullList?page=${nextPage}&lable=${queryParams.get('lable')}&title=${queryParams.get('title')}`);

            }
        }
        const prevP = () =>{
            if(prevPage !== undefined){
                setCurrentPage(prevPage);
                    history(`/fullList?page=${prevPage}&lable=${queryParams.get('lable')}&title=${queryParams.get('title')}`);
            
            }
        }



        if(pageLoadingAllPage === true){
            return(           
                <div className={Style.loaderDiv} >
                        <Loader marginBottom={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
                </div>
            )
        }else if(pageLoadingAllPage === false){

            return(
                <Fragment>
                    {/* footer */}
                    <Footer></Footer>
                    {/* portal */}
                    <MainNav></MainNav>
                    <SortModal closeModalFn={()=>{setShowSortModal(false)}} showModal={showSortModal} ></SortModal>

                    <Container  style={{padding:'0px' , maxWidth:'1676px'}}>
                            <div style={{ maxWidth:'1676px'}} className={Style.wapper}>
                                <Row style={{width:'100%'  , padding:'0px' , margin:'0px'}} dir="rtl">
                                    <Col className={Style.sideBarDiv} style={{ padding:'0px 0px 0px 10px'}} xs={0} md={0} lg={3} xl={3} xxl={2}>
                                        {/* <PriceLimiter></PriceLimiter>
                                        <SizeFilter></SizeFilter> */}
                                    </Col>
                                    <Col  style={{padding:'0px' , margin:'0px'}} xs={12} md={12} lg={9} xl={9} xxl={10}>
                                        <Row style={{padding:'0px' , margin:'0px'}}>
                                            <Col style={{padding:'0px' , margin:'0px'}} xs={12} md={12} lg={12} xl={12} xxl={12}>
                                                <div className={Style.topFilterSectionDiv}>
                                                    <h5 className={Style.lastestProductTitleNormal}>{queryParams.get('title')}</h5>
                                                </div>
                                                <div className={Style.topToolTip}>
                                                    <button><FilterAltIcon sx={{fontSize:'32px' , color:'#1043A9'}}></FilterAltIcon><h5>{langCtx.language === 'persian'?'فیلتر':langCtx.language === 'english'?'filter':langCtx.language ==='arabic'?'منقي':null}</h5></button>
                                                    <h5 className={Style.lastestProductTitleResponsive}>{queryParams.get('title')}</h5>
                                                </div>
                                            </Col>
                                        </Row>
                                        {pageLoading === true?
                                                <div className={Style.loaderDiv2} >
                                                        <Loader marginBottom={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
                                                </div>
                                        :pageLoading === false && products.length !== 0?
                                            <Row  style={{padding:'0px' , margin:'0px'}}>         
                                                <Row style={{padding:'0px' , margin:'0px'}} className={Style.normalList}>
                                                    {products.map((data , i) =>{
                                                        return(
                                                            <Col key={i} style={{padding:'0px 5px 18px 5px'}} xs={6} md={4} lg={4} xl={4} xxl={3}>
                                                                <ProductCard data={data}></ProductCard>
                                                            </Col>
                                                        )
                                                    })}
                                                </Row>

                                                <Row style={{padding:'0px' , margin:'0px'}} className={Style.normalListResponsive}>    
                                                    {products.map((data , i) =>{
                                                        return(
                                                            <Col key={i} style={{padding:'0px 5px 9px 5px'}} xs={12} md={4} lg={4} xl={4} xxl={3}>
                                                                <ProductCardHorizon data={data}></ProductCardHorizon>
                                                            </Col>
                                                        )
                                                    })}
                                                </Row>

                                           
                                                
                                            </Row>
                                            
                                        

                                        :
                                        <div style={{ position:'absolute' , top:'30%'}}>
                                            <NoDataFigure msg={langCtx.language === 'persian'?'محصولی وجود ندارد':langCtx.language === 'english'?'there are no products':langCtx.language ==='arabic'?'لا يوجد منتجات':null}></NoDataFigure>
                                        </div>
                                        }

                                    </Col>
                                </Row>
                                {pageLoading === true?
                                    null
                                :pageLoading === false?
                                    <div>
                                        {totalPage !== 1?
                                        <Pag items={items}  prevPage={prevP} nextPage={nextP} setCurrent={currentPageClick} max={maxPage} current={currentPage} total={totalPage} ></Pag>
                                        :
                                        null  
                                        }
                                    </div>
                                :null}
                            </div>



                    </Container>
                </Fragment>
            ) 
        }
    
}
export default ShowAllListPage;
