import { Fragment , useState , useContext  } from 'react';
import Style from './sortTopToolBar.module.css';

import FilterListIcon from '@mui/icons-material/FilterList';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate , useParams , useLocation  } from "react-router-dom";
import Language from '../../store/language';


const SortTopToolBar = (props) =>{
    const navigation = useNavigate();
    const location = useLocation();
    const langCtx = useContext(Language);
    const queryParams = new URLSearchParams(location.search);
    const [currentFilter , setCurrentFilter] = useState(queryParams.get('filter'));
    const fm = () =>{
        navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=view`)
    }
    return(
        <Fragment>
                <div dir={langCtx.language === 'english' ? 'ltr': 'rtl'} className={Style.topFilterSectionInnerDiv}>
                    <div className={Style.iconDiv}>
                        <FilterListIcon sx={{fontSize:'28px' , color:'#1043A9'}}></FilterListIcon>
                    </div>
                    <h5 className={Style.responsiveHeader}>{langCtx.language === 'persian' ? 'مرتب سازی':langCtx.language === 'english' ? 'order':langCtx.language === 'arabic' ? 'ترتيب':null}</h5>
                    <h5 className={Style.normalHeader}>{langCtx.language === 'persian' ? 'مرتب سازی:':langCtx.language === 'english' ? 'order:':langCtx.language === 'arabic' ? 'ترتيب:':null}</h5>
                    <div className={Style.filterItemsDiv} style={{display:'inline'}}>
                        {/* <div onClick={fm} className={queryParams.get('filter') === 'view' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>پربازدید ترین</h4></div> */}
                        <div onClick={()=>{navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=exp` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'exp' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>{langCtx.language === 'persian' ? 'گران ترین':langCtx.language === 'english' ? 'expensive':langCtx.language === 'arabic' ? 'الأغلى':null}</h4></div>
                        <div onClick={()=>{navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=ch` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'ch' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>{langCtx.language === 'persian' ? 'ارزان ترین':langCtx.language === 'english' ? 'cheaper':langCtx.language === 'arabic' ? 'أرخص':null}</h4></div>
                        <div onClick={()=>{navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=last` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'last' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>{langCtx.language === 'persian' ? 'جدیدترین':langCtx.language === 'english' ? 'newest':langCtx.language === 'arabic' ? 'أحدث':null}</h4></div>
                        <div onClick={()=>{navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=old` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'old' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>{langCtx.language === 'persian' ? 'قدیمی ترین':langCtx.language === 'english' ? 'oldest':langCtx.language === 'arabic' ? 'الاكبر':null}</h4></div>
                    </div>
                </div>
        </Fragment>
    )
}
export default SortTopToolBar;