import Style from "./blogsGrids.module.css";
import { Fragment , useContext } from "react";
import { Link , useLocation, useNavigate } from "react-router-dom";

import AxiosGlobal from '../../store/axiosGlobal';


const BlogsGrids = (props) =>{
    const axiosGlobal = useContext(AxiosGlobal);
    const nav = useNavigate();
    const location = useLocation();
    return(
        <Fragment>
            {props.data[0] !== undefined?
            <div className={Style.wrapper}>
                
                <div className={Style.homeHero}>
                        <div onClick={()=>{nav(`/${location.pathname.split('/')[1]}/blog/showBlog/${props.data[0]._id}`)}} style={{backgroundImage:`linear-gradient(45deg ,rgba(0,0,0,0), rgba(0,0,0,0.8)),url(${props.data[0].coverImage})`}} className={Style.feature}>
                            <h3>{props.data[0].title}</h3>
                        </div>
                        <div onClick={()=>{nav(`/${location.pathname.split('/')[1]}/blog/showBlog/${props.data[1]._id}`)}} style={{backgroundImage:`linear-gradient(45deg ,rgba(0,0,0,0), rgba(0,0,0,0.8)),url(${props.data[1].coverImage})`}} className={Style.special}>
                            <h3>{props.data[1].title}</h3>
                        </div>
                        <div onClick={()=>{nav(`/${location.pathname.split('/')[1]}/blog/showBlog/${props.data[2]._id}`)}} style={{backgroundImage:`linear-gradient(45deg , rgba(0,0,0,0), rgba(0,0,0,0.8)),url(${props.data[2].coverImage})`}} className={Style.amazing}>
                            <h3>{props.data[2].title}</h3>
                        </div>
                        <div onClick={()=>{nav(`/${location.pathname.split('/')[1]}/blog/showBlog/${props.data[3]._id}`)}} style={{backgroundImage:`linear-gradient(45deg ,rgba(0,0,0,0), rgba(0,0,0,0.8)),url(${props.data[3].coverImage})`}} className={Style.news}>
                            <h3>{props.data[3].title}</h3>
                        </div>
                        <div onClick={()=>{nav(`/${location.pathname.split('/')[1]}/blog/showBlog/${props.data[4]._id}`)}} style={{backgroundImage:`linear-gradient(45deg ,rgba(0,0,0,0), rgba(0,0,0,0.8)),url(${props.data[4].coverImage})`}} className={Style.photos}>
                            <h3>{props.data[4].title}</h3>
                        </div>
                        <div onClick={()=>{nav(`/${location.pathname.split('/')[1]}/blog/showBlog/${props.data[5]._id}`)}} style={{backgroundImage:`linear-gradient(45deg ,rgba(0,0,0,0), rgba(0,0,0,0.8)),url(${props.data[5].coverImage})`}} className={Style.cta}>
                            <h3>{props.data[5].title}</h3>
                        </div>

                </div>
            
            </div>
        :null}
        </Fragment>
    )

}
export default BlogsGrids;