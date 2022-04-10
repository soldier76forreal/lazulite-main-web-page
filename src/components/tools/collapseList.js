import { Fragment  , useState} from "react"
import Style from './collapseList.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Route , Redirect, Routes , Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const CollapseList = (props) =>{
    const [openList , setOpenList] = useState(false);
    const showMenu =()=>{
        if(openList === true){
            setOpenList(false);
        }else if(openList === false){
            setOpenList(true);
        }
    }
    return(
        <Fragment>
            <div className={Style.list}>
                <button style={openList === true ? {color:'#407AEF'} : {color:'#354063'}} onClick={showMenu}>{props.data.category.category}<span><ArrowDropDownIcon className={openList === true?`${Style.rotateIn}` : `${Style.rotateOut}`}  sx={openList === true ?{color:'#407AEF' , fontSize:'25px'}:{color:'#354063' , fontSize:'25px'}}></ArrowDropDownIcon></span></button>
                {openList===true?
                <ul>
                    <div className={Style.showOnCategory}>
                        <Link to={`/productList?id=${props.data.category._id}&title=${props.data.category.category}&state=category`}><h5>نمایش کامل دسته بندی<ArrowBackIcon sx={{fontSize:'20px'}} style={{marginRight:'4px'}}></ArrowBackIcon></h5></Link>
                    </div>
                    {props.data.tags.map(dt2=>{
                        return(
                            <Link to={`/productList?id=${dt2._id}&title=${dt2.tag}&state=tag`}><li>{dt2.tag}</li></Link>
                        )

                    })}
                </ul>
                :null}
            </div>
        </Fragment>
    )
}
export default CollapseList;