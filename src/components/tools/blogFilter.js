import { Fragment , useState  } from 'react';
import Style from './blogFilter.module.css';

import FilterListIcon from '@mui/icons-material/FilterList';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate , useParams , useLocation } from "react-router-dom";


const BlogFilter = (props) =>{
    const navigation = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [currentFilter , setCurrentFilter] = useState(queryParams.get('filter'));
    const fm = () =>{
        navigation(`/blog?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&filter=view`)
    }
    return(
        <Fragment>
                <div  className={Style.topFilterSectionInnerDiv}>
                    <div className={Style.iconDiv}>
                        <FilterListIcon sx={{fontSize:'28px' , color:'#1043A9'}}></FilterListIcon>
                    </div>
                    <h5 className={Style.responsiveHeader}>مرتب سازی</h5>
                    <h5 className={Style.normalHeader}>مرتب سازی:</h5>
                    <div className={Style.filterItemsDiv} style={{display:'inline'}}>
                        {/* <div onClick={fm} className={queryParams.get('filter') === 'view' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>پربازدید ترین</h4></div> */}
                        {/* <div onClick={()=>{navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=exp` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'exp' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>گران ترین</h4></div> */}
                        {/* <div onClick={()=>{navigation(`/productList?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}&filter=ch` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'ch' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>ارزان ترین</h4></div> */}
                        <div onClick={()=>{navigation(`/blog?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&filter=last` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'last' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>جدید ترین</h4></div>
                        <div onClick={()=>{navigation(`/blog?${queryParams.get('page') !== null ?`page=${queryParams.get('page')}`:''}&filter=old` );props.closeModal(); props.setShowSortModal(false)}} className={queryParams.get('filter') === 'old' ?`${Style.filterItem} ${Style.active}`: `${Style.filterItem}`}><h4>قدیمی ترین</h4></div>
                    </div>
                </div>
        </Fragment>
    )
}
export default BlogFilter;