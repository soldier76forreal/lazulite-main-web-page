import Style from './blogPostCard.module.css';
import { Fragment, useState , useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Pics from '../../assets/pl4.jpg'
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'jalali-moment';

const BlogPostCard =(props)=>{

    return(
        <Fragment>
            
            <div dir='rtl' className={Style.mainDiv}>
                <div style={{display:'inline-block'}}>
                    <div className={Style.imageDiv}>
                        <Link to={`/blog/showBlog/${props.data.result._id}`} target='_blank' ><img  src={props.data.result.coverImage}></img></Link>
                        {/* <Link target='_blank' to={`/showCase/${props.data._id}`}><img title={props.data.result.title} alt={props.data.result.title} src={`${props.data.result.images[0]}`}></img></Link> */}
                    </div>
                </div>
                <div className={Style.listDiv} style={{display:'inline-block'}}>
                    <div className={Style.titleDiv}>
                    <Link style={{padding:'0px'}} to={`/blog/showBlog/${props.data.result._id}`} target='_blank' ><h4>{props.data.result.title}</h4></Link>
                    </div>
                    <div className={Style.caption}>
                        <h3><span>{props.data.comment}</span> نظر</h3> | <h3>{moment(props.data.result.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3>
                    </div>
                    <div className={Style.caption}>
                        <Link to={`/blog/showBlog/${props.data.result._id}`} target='_blank' > <p>{props.data.result.subtitle}</p></Link>
                    </div>

                </div>
            </div>
        </Fragment>
    )

}
export default BlogPostCard;