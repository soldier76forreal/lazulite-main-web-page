import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "./ratingStar.module.css";
import Cookies from 'js-cookie';



const StarRating = (props) =>{
    const [rating , setRating] = useState(null);
    const [hover , setHover] = useState(null);

    return( 
        // {Cookies.get('accessToken') !== undefined ?}
        
        <div style={{display:'inline-block'}}>
            {Cookies.get('accessToken') === undefined ? 
                [...Array(5)].map((star , i)=>{
                    const ratingValue = i + 1;
                    return(
                        
                        <label>
                            <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => {setRating(ratingValue); props.setShowLogInModal(true); props.rating(ratingValue)}}
                            />
                            <FontAwesomeIcon
                            className={Style.star}
                            icon='star' color={ratingValue <= (hover || rating) ? '#CE9800' : '#afafaf'} 
                            style={{fontSize:'22px'}} 
                            
                            onMouseEnter={() => setHover(ratingValue)} 
                            onMouseLeave={() => setHover(null)}
                            ></FontAwesomeIcon>
                            
                        </label>
                    )
                })
            :
                [...Array(5)].map((star , i)=>{
                    const ratingValue = i + 1;
                    return(
                        
                        <label>
                            <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => {setRating(ratingValue); props.rating(ratingValue)}}
                            />
                            <FontAwesomeIcon
                            className={Style.star}
                            icon='star' color={ratingValue <= (hover || rating) ? '#CE9800' : '#afafaf'} 
                            style={{fontSize:'22px'}} 
                            
                            onMouseEnter={() => setHover(ratingValue)} 
                            onMouseLeave={() => setHover(null)}
                            ></FontAwesomeIcon>
                            
                        </label>
                    )
                })
        }
        </div>
    )

}
export default StarRating;