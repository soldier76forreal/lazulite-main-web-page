import './cardSlider.css';

import { Fragment , useState , useEffect , useContext } from 'react';
import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard from './productCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useLocation } from 'react-router-dom';
import Language from '../../store/language';


        
      var settings = {
        dots: true,
        dotsClass: `slick-dots slick-thumb customStyle`,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
            breakpoint: 1400,
            settings: {
                dots: true,
                dotsClass: `slick-dots slick-thumb customStyle`,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                autoplay: true,
                autoplaySpeed: 4000,
            }
           },
          {
            breakpoint: 1024,
            settings: {
                dots: true,
                dotsClass: `slick-dots slick-thumb customStyle`,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 0,
                autoplay: true,
                autoplaySpeed: 4000,
            }
          },
          {
            breakpoint: 600,
            settings: {
                dots: true,
                dotsClass: `slick-dots slick-thumb customStyle`,
                infinite: true,
                speed: 500,

                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                autoplay: true,
                autoplaySpeed: 4000,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };



  const CardSlider =(props)=>{
    const langCtx = useContext(Language);
    const [dataToRender , setDataToRender] = useState();
    const location = useLocation();
    return(
      <div className='wapperDivCardSlider'>
          <div  className='cardSliderTopSection'>
              <h2 style={{width:'100%' ,  float:'left' , textAlign:'left' , padding:'0px 0px 0px 20px'}}>{props.cardName}</h2>
              {props.listType === 'last'?
                <Link style={{ float:'right' , textAlign:'right'}} to={`/${location.pathname.split('/')[1]}/fullList?lable=${props.listType}&title=${props.cardName}`}><button style={{ padding:'0px 20px 0px 0px' , right:'0px' , left:'auto'}}>{langCtx.language === 'english' ?'Show All':langCtx.language === 'arabic' ?'عرض الكل':langCtx.language === 'persian' ?'نمایش همه':null}<span style={{marginLeft:'6px' }}><ArrowForwardIcon style={{transform:'rotate(0deg)'}} className='btnArrow' ></ArrowForwardIcon></span></button></Link>
              :props.listType === 'travertin'?
                <Link style={{ float:'right' , textAlign:'right'}} to={props.link}><button style={{ padding:'0px 20px 0px 0px' , right:'0px' , left:'auto'}}>{langCtx.language === 'english' ?'Show All':langCtx.language === 'arabic' ?'عرض الكل':langCtx.language === 'persian' ?'نمایش همه':null}<span style={{marginLeft:'6px' }}><ArrowForwardIcon style={{transform:'rotate(0deg)'}} className='btnArrow' ></ArrowForwardIcon></span></button></Link>
              :props.listType === 'granite'?
                <Link style={{ float:'right' , textAlign:'right'}} to={props.link}><button style={{ padding:'0px 20px 0px 0px' , right:'0px' , left:'auto'}}>{langCtx.language === 'english' ?'Show All':langCtx.language === 'arabic' ?'عرض الكل':langCtx.language === 'persian' ?'نمایش همه':null}<span style={{marginLeft:'6px' }}><ArrowForwardIcon style={{transform:'rotate(0deg)'}} className='btnArrow' ></ArrowForwardIcon></span></button></Link>
              :props.listType === 'marmarit'?
              <Link style={{ float:'right' , textAlign:'right'}} to={props.link}><button style={{ padding:'0px 20px 0px 0px' , right:'0px' , left:'auto'}}>{langCtx.language === 'english' ?'Show All':langCtx.language === 'arabic' ?'عرض الكل':langCtx.language === 'persian' ?'نمایش همه':null}<span style={{marginLeft:'6px' }}><ArrowForwardIcon style={{transform:'rotate(0deg)'}} className='btnArrow' ></ArrowForwardIcon></span></button></Link>
            :null}
        </div>
    <hr className='dotted'></hr>
    <Slider {...settings}>
      {props.data !== undefined?
              props.data.map(dt=>{
                return(
                  <div className='cardDivCardSlider'>
                    <ProductCard data={dt}></ProductCard>
                  </div>
                )
              })
      :null}

    </Slider>
  </div>
    )
  }
  export default CardSlider