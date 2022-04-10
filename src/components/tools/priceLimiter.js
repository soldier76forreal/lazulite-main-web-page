import LimiterSlider from './limiterSlider';
import Style from './priceLimiter.module.css';

const PriceLimiter = () =>{
    return(
        <div className={Style.priceLimiterDiv}>
            <h4>محدوده قیمت</h4>
            <div className={Style.limiterDiv}>
               <LimiterSlider></LimiterSlider>
            </div>
            <div className={Style.priceDiv}> از <span>{parseInt(0).toLocaleString()}</span> تا <span>{parseInt(2000000).toLocaleString()}</span> تومان </div>
        </div>
    )
}
export default PriceLimiter;