import Style from './productCard.module.css';
import { Fragment, useState , useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@mui/icons-material/Star';
import { Link, useLocation } from 'react-router-dom';

import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import productImg from '../../assets/bg2.jpg';

import Language from '../../store/language';
const ProductCard =(props)=>{
    const langCtx = useContext(Language);
    const location = useLocation();
    return(
        <Fragment>
            <div style={langCtx.language === 'english' ?{textAlign:'left'}:{textAlign:'right'}} className={Style.productCardDiv}>
                    <Link target='_blank' to={`/${location.pathname.split('/')[1]}/showCase/${props.data.result._id}`}><img alt={props.data.result.title} title={props.data.result.title} src={`${props.data.result.images[0]}`}></img></Link>
                <div className={Style.productNameDiv}>
                    <Link target='_blank' to={`/${location.pathname.split('/')[1]}/showCase/${props.data.result._id}`}><h3>{props.data.result.title}</h3></Link>
                </div>

                <div style={langCtx.language === 'english' ?{float:'left' , padding:'2px 0px 0px 8px'} :{float:'right'}} dir={langCtx.language === 'english' ?"ltr":"rtl"} className={Style.cardInfo}>
                    {props.data.result.price.price !== null ?
                        <div className={Style.measure}>
                                <h4 style={langCtx.language === 'english' ?{float:'left'} :{float:'right'}}>{props.data.result.price.measure}</h4>
                            <div style={langCtx.language === 'english' ?{float:'right' , paddingLeft:'5px'} :{float:'left'}} className={Style.priceDiv}>
                                <h5>{parseInt(props.data.result.price.price).toLocaleString()}<span style={{marginRight:'3px' , margin:'5px 0px 0px 3px ' , fontSize:'13px'}}>{langCtx.language === 'persian' ? 'تومان' : "$"}</span></h5>
                            </div>
                        </div>
                    :props.data.result.price.price === null ?
                        <div className={Style.measure}>
                            <h4 style={langCtx.language === 'english' ?{float:'left'} :{float:'right'}}>{langCtx.language === 'persian' ? 'قیمت' :langCtx.language === 'english' ? 'Price':langCtx.language === 'arabic' ? 'سعر':null}</h4>
                            <div style={langCtx.language === 'english' ?{float:'right' , paddingLeft:'5px'} :{float:'left'}} className={Style.priceDiv}>
                                <h5>{langCtx.language === 'persian' ? 'تماس بگیرید' :langCtx.language === 'english' ? 'contact us':langCtx.language === 'arabic' ? 'مكالمة':null} <span style={{marginRight:'3px' , margin:'5px 0px 0px 3px ' , fontSize:'13px'}}></span></h5>
                            </div>
                        </div>    
                    :null}
                    <div dir={langCtx.language === 'english' ? 'ltr' : "rtl"} style={langCtx.language === 'english' ?{float:'right' , padding:'0px 10px 0px 0px'} :{float:'left'}} className={Style.ratingStar}>
                        <StarIcon sx={{ fontSize: 24,color: '#CE9800' ,iconHover:'#3e76e6' }}></StarIcon>
                        {props.data.rate === 0?
                            <h4 style={{fontSize:'12px'}}>{langCtx.language === 'english' ? 'not rated' :langCtx.language === 'persian' ? 'ثبت نشده':langCtx.language === 'arabic' ? "غير مسجل":null}</h4>
                        :
                            <h4>{props.data.rate}</h4>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )

}
export default ProductCard;