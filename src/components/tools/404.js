import { Fragment } from "react";
import Footer from "../footer";
import MainNav from "./mainNav";
import Opps from "../../assets/opps.png";
import Style from './404.module.css';
import { Link } from "react-router-dom";
const Error404 = () =>{
    return(
        <Fragment>
            <Footer></Footer>
            <MainNav></MainNav>
            <div className={Style.errorDiv}>
                <div className={Style.imageDiv}>
                    <img className={Style.oppsImg} src={Opps}></img>
                </div>
                <div className={Style.errorText}>
                    <h1>404 ERROR!</h1>
                    <h3>صفحه مورد نظر شما یافت نشد</h3>
                </div>
                <div className={Style.backToHome}>
                    <Link to='/'><button>خانه</button></Link>
                </div>
            </div>
        </Fragment>
    )
}
export default Error404;