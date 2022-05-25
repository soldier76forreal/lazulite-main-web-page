import './carouselBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row , Carousel , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Bg from '../../assets/bg.jpg';
import Bg2 from '../../assets/bg2.jpg';
import React from 'react';

import MdBanerUp6 from "../../assets/top banner - 1.jpg";
import MdBanerUp7 from "../../assets/top banner - 2.jpg";
import MdBanerUp8 from "../../assets/top banner - 3.jpg";
import { Link } from 'react-router-dom';
const CarouselBanner =(props)=>{
    return(
        <Carousel  interval={5000} fade>
            <Carousel.Item > 
                <a href='https://lazulitemarble.com/showCase/624440abb10b3fef422d7887'>
                    <img
                    className="d-block w-100"
                    src={MdBanerUp6}
                    alt="تراورتن عباس آباد"
                    title="تراورتن عباس آباد"
                    style={{maxHeight:'100%', objectFit:'cover'}}
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item >
                
                    <img
                    className="d-block w-100"
                    src={MdBanerUp7}
                    alt="گرانیت نهبندان"
                    title="گرانیت نهبندان"
                    style={{maxHeight:'100%', objectFit:'cover'}}
                    />
                
            </Carousel.Item>
            <Carousel.Item >
                <img
                className="d-block w-100"
                src={MdBanerUp8}
                alt="مرمریت مهکام"
                title="مرمریت مهکام"
                style={{maxHeight:'100%', objectFit:'cover'}}
                />
            </Carousel.Item>
        </Carousel>

    )
}

export default CarouselBanner;