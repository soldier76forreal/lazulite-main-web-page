import { Fragment, useState , useEffect , useContext, useRef } from "react";
import Style from './blog.module.css';
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
import ProductCardHorizon from "./tools/productCardHorizon";
import Footer from "./footer";
import BlogPostCard from "./tools/blogPostCard";
import BlogFilter from "./tools/blogFilter";
import {Helmet} from "react-helmet";
import ActivePage from "../store/activePage";

const BlogPost = () =>{
    //hooks
    const history = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const axiosGlobalCtx = useContext(AxiosGlobal);
    const langCtx = useContext(Language);
    const params = useParams();
    const activePage = useContext(ActivePage)
    const ref = useRef()
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
        
    //----------------------------------http req--------------------------------------
        
            // get products
            const getProducts = async() =>{
                try{
                    setPageLoading(true);
                    const response = await axios({
                        method: 'get',
                        params:{language:langCtx.language},
                        url: `${axiosGlobalCtx.defaultTargetApi}/blog/getAllBlogPost?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=20&filter=${queryParams.get('filter')}`,
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
                    ref.current.scrollIntoView();
                }catch(error){
        
                }
            }

            useEffect(() => {
                activePage.activePageFn('blog');
            }, []);

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
            if(queryParams.get('filter')){
                history(`/blog?page=${event.target.value}&filter=${queryParams.get('filter')}`);
            }else{
                history(`/blog?page=${event.target.value}`);

            }
        }
        const nextP = () =>{
            if(nextPage !== undefined){
                setCurrentPage(nextPage);
                if(queryParams.get('filter')){
                    history(`/blog?page=${nextPage}&filter=${queryParams.get('filter')}`);
                }else{
                    history(`/blog?page=${nextPage}`);

                }
            }
        }
        const prevP = () =>{
            if(prevPage !== undefined){
                setCurrentPage(prevPage);
                if(queryParams.get('filter')){
                    history(`/blog?page=${prevPage}&filter=${queryParams.get('filter')}`);
                }else{
                    history(`/blog?page=${prevPage}`);
                }
            }
        }



        if(pageLoadingAllPage === true){
            return(           
                <div className={Style.loaderDiv} >
                        <Loader marginBottom={'2px'} marginTop={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
                </div>
            )
        }else if(pageLoadingAllPage === false){

            return(
                <Fragment>
                        <Helmet>
                            <title>{langCtx.language === 'english' ?'blog':langCtx.language === 'persian' ?'وبلاگ':langCtx.language === 'arabic' ?'test':null}</title>
                            {/* <meta name="description" content={product.pageDescription} /> */}
                        </Helmet>
                    {/* footer */}
                    <Footer></Footer>
                    {/* portal */}
                    <MainNav></MainNav>
                    <SortModal topBarMode='blog' setShowSortModal={setShowSortModal} closeModalFn={()=>{setShowSortModal(false)}} showModal={showSortModal} ></SortModal>

                            <div  className={Style.wapper}>
                                <Row style={{width:'100%'  , padding:'0px' , margin:'0px'}} dir="rtl">

                                        <Row ref={ref} style={{padding:'0px' , margin:'0px'}}>
                                            <Col style={{padding:'0px' , margin:'0px'}} xs={12} md={12} lg={12} xl={12} xxl={12}>
                                                <div className={Style.topFilterSectionDiv}>
                                                    <BlogFilter></BlogFilter>
                                                </div>
                                                <div className={Style.topToolTip}>
                                                    <button onClick={()=>{setShowSortModal(true)}}><FilterListIcon sx={{fontSize:'32px' , color:'#1043A9'}}></FilterListIcon><h5>مرتب سازی</h5></button>
                                                </div>
                                            </Col>
                                        </Row>
                                        {pageLoading === true?
                                                <div className={Style.loaderDiv2} >
                                                        <Loader marginBottom={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
                                                </div>
                                        :pageLoading === false && products.length !== 0?
                                            <Row style={{ padding:'0px' , margin:'0px'}}>
                                                <Col style={{ padding:'0px' , margin:'0px'}} xs={0} sm={0} md={1} lg={2} xl={3}>
                                                </Col>
                                                <Col style={{padding:'0px' , margin:'0px'}} xs={12} sm={12} md={10} lg={8} xl={6}>
                                                    <div dir='rtl' className={Style.listDiv}>
                                                        <ul>
                                                            {products.map((data , i)=>{
                                                                return(
                                                                <li key={i}>
                                                                    <BlogPostCard  data={data}></BlogPostCard>
                                                                </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
            
                                                </Col >
                                                <Col style={{padding:'0px' , margin:'0px'}} xs={0} sm={0} md={1} lg={2} xl={3}>
                                                </Col>
                                            </Row>
                                        :
                                        <div  className={Style.noDataFigureDiv}>
                                            <NoDataFigure msg='وبلاگی برای نمایش وجود ندارد'></NoDataFigure>
                                        </div>
                                        }

                                   
                                </Row>
                                {pageLoading === true && products.length === 0?
                                    null
                                :pageLoading === false && products.length !== 0?
                                    <div>
                                        {totalPage !== 1?
                                        <Pag items={items}  prevPage={prevP} nextPage={nextP} setCurrent={currentPageClick} max={maxPage} current={currentPage} total={totalPage} ></Pag>
                                        :
                                        null  
                                        }
                                    </div>
                                :null}
                            </div>



                </Fragment>
            ) 
        }
    
}
export default BlogPost;
