import Style from './productCardHorizon.module.css';
import { Fragment, useState , useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@mui/icons-material/Star';
import { Link, useLocation } from 'react-router-dom';

import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import productImg from '../../assets/bg2.jpg';
import Language from '../../store/language';



const ProductCardHorizon =(props)=>{
    const langCtx = useContext(Language);
    const location = useLocation();
    return(
        <Fragment>
            
            <div dir={langCtx.language === 'english' ? 'ltr' : "rtl"}  className={Style.productCardDiv}>
                <Row  style={{padding:'0px' , margin:'0px' , position:'relative'}}>
                    <Col style={{padding:'0px' , margin:'0px'}} xs={4} md={4} lg={4} xl={4} xxl={4}>
                        <Link target='_blank' to={`/${location.pathname.split('/')[1]}/showCase/${props.data._id}`}><img title={props.data.result.title} alt={props.data.result.title} src={`${props.data.result.images[0]}`}></img></Link>
                    </Col>
                    <Col style={{padding:'0px' , margin:'0px' }} xs={8} md={8} lg={8} xl={8} xxl={8}>
                        <div  className={Style.productNameDiv}>
                            <Link target='_blank' to={`/${location.pathname.split('/')[1]}/showCase/${props.data._id}`}><h4>{props.data.result.title}</h4></Link>
                        </div>
                        <div  className={Style.cardInfo}>


                            {props.data.result.price.price !== null ?
                                    <div  className={Style.measure}>
                                            <h4>{props.data.result.price.measure}</h4>
                                        <div style={langCtx.language === 'english' ?{ marginLeft:'4px'} :null} className={Style.priceDiv}>
                                            <h5>{parseInt(props.data.result.price.price).toLocaleString()}<span style={{marginRight:'3px' , margin:'5px 3px 0px 0px ' , fontSize:'13px'}}>{langCtx.language === 'persian' ? 'تومان' : "$"}</span></h5>
                                        </div>
                                    </div>
                            :props.data.result.price.price === null ?
                                    <div style={langCtx.language === 'english' ?{ padding:'0px'} :null} className={Style.measure}>
                                        <h4>{langCtx.language === 'persian' ? 'قیمت' :langCtx.language === 'english' ? "price" : langCtx.language === 'arabic' ? "سعر" : null}</h4>
                                        <div style={langCtx.language === 'english' ?{ marginLeft:'4px'} :null} className={Style.priceDiv}>
                                            <h5>{langCtx.language === 'persian' ? 'تماس بگیرید' :langCtx.language === 'english' ? "contact us" : langCtx.language === 'arabic' ? "اتصل بنا" : null}<span style={{marginRight:'3px' , margin:'5px 3px 0px 0px ' , fontSize:'13px'}}></span></h5>
                                        </div>
                                    </div>    
                                :null}
                            <div dir={langCtx.language === 'english' ? 'rtl' : "ltr"} style={langCtx.language === 'english' ?{float:'right' , marginRight:'10px'} :{float:'left'}} className={Style.ratingStar}>
                                {props.data.rate === 0?
                                    <h4 style={{fontSize:'9px'}}>{langCtx.language === 'english' ? 'not rated' :langCtx.language === 'persian' ? 'ثبت نشده':langCtx.language === 'arabic' ? "غير مسجل":null}</h4>
                                :
                                    <h4>{props.data.rate}</h4>
                                }
                                    <StarIcon sx={{ fontSize: 24,color: '#CE9800' ,iconHover:'#3e76e6' }}></StarIcon>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}
export default ProductCardHorizon;