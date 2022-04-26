import './cardSlider.css';

import { Fragment , useState , useEffect , useContext } from 'react';
import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard from './productCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
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
    useEffect(() => {
      if(props.data !== undefined){
        var temp = [...props.data];
        temp.sort(function (a, b) {
          var dateA = new Date(a.insertdate), dateB = new Date(b.insertdate)
          return dateA - dateB
        });
        var last = [];
        for(var i=0 ; temp.length > i ; i++){
          if(temp.length-i < 12){
            last.push(temp[i]);
          }
        }
        setDataToRender([...last.reverse()]);
        console.log(last)
      }

    }, []);
    return(
      <div className='wapperDivCardSlider'>
      {langCtx.language === 'english' ?
          <div  className='cardSliderTopSection'>
              <h2 style={{width:'100%' , float:'left' , textAlign:'left' , padding:'0px 0px 0px 20px'}}>{props.cardName}</h2>
              <Link style={{ float:'right' , textAlign:'right'}} to={`/fullList?lable=${props.listType}&title=${props.cardName}`}><button style={{ padding:'0px 20px 0px 0px' , right:'0px' , left:'auto'}}>{langCtx.language === 'english' ?'Show All':'نمایش همه'}<span style={{marginLeft:'6px' }}><ArrowForwardIcon style={{transform:'rotate(0deg)'}} className='btnArrow' ></ArrowForwardIcon></span></button></Link>
        </div>
        :      
        <div className='cardSliderTopSection'>
              <Link style={{width:'100%'}} to={`/fullList?lable=${props.listType}&title=${props.cardName}`}><button><span><ArrowForwardIcon className='btnArrow' ></ArrowForwardIcon></span>نمایش همه</button></Link>
              <h2 style={{width:'100%' }}>{props.cardName}</h2>
        </div>
 }

    <hr className='dotted'></hr>
    <Slider {...settings}>
      {dataToRender !== undefined?
              dataToRender.map(dt=>{
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