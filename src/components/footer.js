import Style from './footer.module.css';
import ReactDom from 'react-dom';
import { Fragment  , useContext } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'bootstrap/dist/css/bootstrap.min.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CallIcon from '@mui/icons-material/Call';
import TagIcon from '@mui/icons-material/Tag';
import DirectionsIcon from '@mui/icons-material/Directions';
import Logo from '../assets/logoSam.png';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Language from '../store/language';
import { textAlign } from '@mui/system';
import { BorderRight } from '@mui/icons-material';

const FooterPortal =(props)=>{
    const langCtx = useContext(Language);
    return(
        <Fragment>
            <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.footerDiv}>
                <Row>
                    <Col sm={12} xs={12} md={6} lg={4} xl={4}>
                        <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.addressDiv}>
                            <div style={langCtx.language === 'english'? {marginLeft:'-16px'}:{marginLeft:'0px'}} className={Style.titleDiv}>
                                <LocationOnIcon sx={{color:'#E6EDFD',fontSize:'35px'  }}></LocationOnIcon>
                                <h4>{langCtx.language === 'english' ?'Lazulite Marble Branches':'شعبه های شرکت لازولیت ماربل'}</h4>
                            </div>
                            <div style={langCtx.language === 'english'? {borderLeft:'4px solid #E6EDFD' , borderRight:'none'}:{borderRight:'4px solid #E6EDFD' , borderLeft:'none'}} className={Style.addressInnerDiv}>
                                <div style={langCtx.language === 'english' ?{textAlign:'left'}:{textAlign:'right'}} className={Style.addressInfoDiv}>
                                    {langCtx.language === 'english' ?
                                        <h5 style={{marginLeft:'15px'}}>Esfahan<button style={{float:'right' , marginRight:'20px'}} className={Style.showOnMapBtn}><span>Show on map</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px' , marginLeft:'3px'}}></DirectionsIcon></button></h5>
                                    :
                                        <h5 style={langCtx.language === 'english' ?{textAlign:'left'}:{textAlign:'right'}}>اصفهان<button className={Style.showOnMapBtn}><span>نمایش روی نقشه</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px'}}></DirectionsIcon></button></h5>
                                    }
                                    <p><span>{langCtx.language === 'english' ?'Factory:':'کارخانه:'}</span>محمود آباد-خیابان ۳۳- جدیدالاحداث</p>
                                    <p><span>{langCtx.language === 'english' ?'Exhibition:':'نمایشگاه:'}</span>محمود آباد - خیابان ۲۰</p>
                                    <div className={Style.hrLine}></div>
                                    {langCtx.language === 'english' ?
                                        <h5 style={{marginLeft:'15px', marginTop:'8px'}}>Ahvaz<button style={{float:'right' , marginRight:'20px'}} className={Style.showOnMapBtn}><span>Show on map</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px' , marginLeft:'3px'}}></DirectionsIcon></button></h5>

                                    :
                                        <h5 style={{marginTop:'8px'}}>اهواز<button className={Style.showOnMapBtn}><span>نمایش روی نقشه</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px'}}></DirectionsIcon></button></h5>
                                    }
                                    <p>سه راه خرمشهر بعد از کلانتری ۱۹</p>
                                    <div className={Style.hrLine}></div>
                                    {langCtx.language === 'english' ?
                                        <h5 style={{marginLeft:'15px', marginTop:'8px'}}>basre<button style={{float:'right' , marginRight:'20px'}} className={Style.showOnMapBtn}><span>Show on map</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px' , marginLeft:'3px'}}></DirectionsIcon></button></h5>

                                    :
                                        <h5 style={{marginTop:'8px'}}>بصره<button className={Style.showOnMapBtn}><span>نمایش روی نقشه</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px'}}></DirectionsIcon></button></h5>
                                    }
                                    <p>المشراق الجدید مقابل بصره سنتر</p>
                                    <div className={Style.hrLine}></div>
                                    {langCtx.language === 'english' ?
                                        <h5 style={{marginLeft:'15px', marginTop:'8px'}}>Oman<button style={{float:'right' , marginRight:'20px'}} className={Style.showOnMapBtn}><span>Show on map</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px' , marginLeft:'3px'}}></DirectionsIcon></button></h5>

                                    :
                                        <h5 style={{marginTop:'8px'}}>عمان<button className={Style.showOnMapBtn}><span>نمایش روی نقشه</span><DirectionsIcon sx={{color:'#BBD0FE' , fontSize:'28px'}}></DirectionsIcon></button></h5>
                                    }
                                    <p>لازولیت ماربل الحديثة ش.م.م‌ سلطنة عمان، شمال الباطنة، صحار، منطقة صناعية العوهي</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col dir='ltr' sm={12} xs={12} md={6} lg={4} xl={4}>
                        <div  className={Style.contactUsDiv}>
                            <div className={Style.contactUsTitleDiv}>
                                <PermContactCalendarIcon sx={{color:'#E6EDFD',fontSize:'35px'  }}></PermContactCalendarIcon>
                                <h4>{langCtx.language === 'english' ?'Contact us':'ارتباط با ما'}</h4>
                            </div>
                            <div className={Style.contactInnerDiv}>
                                <div  className={Style.contactInfo}>
                                    <div>
                                        <a href="tel:+98913-565-3700"><button><div><CallIcon sx={{color:'#1043A9',fontSize:'26px'  }}></CallIcon></div>+98913-565-3700</button></a>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <a href = "mailto:Lazulitemarble@gmail.com"><button><div><AlternateEmailIcon sx={{color:'#1043A9',fontSize:'26px'  }}></AlternateEmailIcon></div>Lazulitemarble@gmail.com</button></a>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop:'17px'}} className={Style.contactUsTitleDiv}>
                                <TagIcon sx={{color:'#E6EDFD',fontSize:'35px'  }}></TagIcon>
                                <h4>{langCtx.language === 'english' ?'Social Media':'صفحات مجازی'}</h4>
                            </div>
                            <div className={Style.contactInnerDiv}>
                                <div  className={Style.contactInfo}>
                                    <div>
                                        <a target='_blank' href='https://www.instagram.com/lazulitemarble/'><button><div><InstagramIcon sx={{color:'#1043A9',fontSize:'26px'  }}></InstagramIcon></div>lazulitemarble</button></a>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <a target='_blank' href='https://www.instagram.com/lmc.arabic/'><button><div><InstagramIcon sx={{color:'#1043A9',fontSize:'26px'  }}></InstagramIcon></div>lmc.arabic</button></a>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <a target='_blank' href='https://www.instagram.com/lmc.iraq/'><button><div><InstagramIcon sx={{color:'#1043A9',fontSize:'26px'  }}></InstagramIcon></div>lmc.iraq</button></a>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <a target='_blank' href='https://www.instagram.com/lmc.iran/'><button><div><InstagramIcon sx={{color:'#1043A9',fontSize:'26px'  }}></InstagramIcon></div>lmc.iran</button></a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </Col>
                    <Col sm={12} xs={12} md={12} lg={4} xl={4}>
                        <div style={{display:'flex' , alignItems:'center' , justifyContent:'center'}} className={Style.footerLogo}>
                            <Link to='/'><img style={{margin:'auto'}} src={Logo}></img></Link>
                        </div>
                    </Col>
                </Row>
                
            </div>
            <div className={Style.pouriyaMark}>
                <h5>Developed By <span>Soldier76</span></h5>
            </div>
        </Fragment>
    );
}
const Footer = (props)=>{
    return(
        <Fragment>
            {ReactDom.createPortal(
                <FooterPortal>

                </FooterPortal>
                ,
                document.getElementById('footer_div')
                )}
        </Fragment>
    )
}
export default Footer;