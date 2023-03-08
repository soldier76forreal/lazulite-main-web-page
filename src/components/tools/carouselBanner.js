import './carouselBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row , Carousel , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Bg from '../../assets/bg.jpg';
import Bg2 from '../../assets/bg2.jpg';
import React, { useContext } from 'react';

import { Link  , useLocation} from 'react-router-dom';
import Language from '../../store/language';

const CarouselBanner =(props)=>{
    const location = useLocation()
    const langCtx  = useContext(Language);
    return(
        <Carousel  interval={5000} fade>
            <Carousel.Item > 
                <a href={`https://lazulitemarble.com/${location.pathname.split('/')[1]}/showCase/624440abb10b3fef422d7887`}>
                    <img
                    className="d-block w-100"
                    src={langCtx.language === 'persian'?props.carouselBannerData[0].persian.img:langCtx.language === 'english'?props.carouselBannerData[0].english.img:langCtx.language === 'arabic'?props.carouselBannerData[0].arabic.img:null}
                    alt="تراورتن عباس آباد"
                    title="تراورتن عباس آباد"
                    style={{maxHeight:'100%', objectFit:'cover'}}
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item >
                
                    <img
                    className="d-block w-100"
                    src={langCtx.language === 'persian'?props.carouselBannerData[1].persian.img:langCtx.language === 'english'?props.carouselBannerData[1].english.img:langCtx.language === 'arabic'?props.carouselBannerData[1].arabic.img:null}
                    alt="گرانیت نهبندان"
                    title="گرانیت نهبندان"
                    style={{maxHeight:'100%', objectFit:'cover'}}
                    />
                
            </Carousel.Item>
            <Carousel.Item >
                <img
                className="d-block w-100"
                src={langCtx.language === 'persian'?props.carouselBannerData[2].persian.img:langCtx.language === 'english'?props.carouselBannerData[2].english.img:langCtx.language === 'arabic'?props.carouselBannerData[2].arabic.img:null}
                alt="مرمریت مهکام"
                title="مرمریت مهکام"
                style={{maxHeight:'100%', objectFit:'cover'}}
                />
            </Carousel.Item>
        </Carousel>

    )
}

export default CarouselBanner;