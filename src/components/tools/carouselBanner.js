import './carouselBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row , Carousel , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Bg from '../../assets/bg.jpg';
import Bg2 from '../../assets/bg2.jpg';
import MdBanerUp6 from "../../assets/top banner - 1.jpg";
import MdBanerUp7 from "../../assets/top banner - 2.jpg";
import MdBanerUp8 from "../../assets/top banner - 3.jpg";
const CarouselBanner =(props)=>{
    return(
        <Carousel  interval={5000} fade>
            <Carousel.Item > 
                <img
                className="d-block w-100"
                src={MdBanerUp6}
                alt="First slide"
                style={{maxHeight:'100%', objectFit:'cover'}}
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                className="d-block w-100"
                src={MdBanerUp7}
                alt="Second slide"
                style={{maxHeight:'100%', objectFit:'cover'}}
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                className="d-block w-100"
                src={MdBanerUp8}
                alt="Third slide"
                style={{maxHeight:'100%', objectFit:'cover'}}
                />
            </Carousel.Item>
        </Carousel>

    )
}

export default CarouselBanner;