
import Style from './featuresBriefCard.module.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Pagination,Navbar,Row,  Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import ShowMore from './showMore';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
 
const blackCard = {
    background: "rgb(37,42,45)",
    background: "linear-gradient(52deg, rgba(37,42,45,1) 0%, rgba(61,62,66,1) 100%)"
}

const FeaturesBriefCard =(props)=>{
    return(
        <div style={props.customColor} className={Style.briefCardRiviewDiv}>
        <Row>
            <Col className={Style.briefCardCol} xs={5} sm={5} md={12} lg={5} xl={5}>
                <div className={Style.briefCardRiviewImage}>
                    <img src={`${props.bg}`}></img>
                </div>
            </Col>
            <Col style={{padding:'0px'}}  xs={7} sm={7} md={12} lg={7} xl={7}>
                <div className={Style.briefCardRiviewText}>
                    <h4>{props.name}</h4>
                    <div className={Style.responsive}>
                        <ShowMore
                            text={
                                <p dir='rtl'>
                                    {props.content}
                                </p>
                            }
                            >
                        </ShowMore>
                    </div>
                    <div className={Style.normal}>
                        <p dir='rtl'>
                            {props.content}
                        </p>

                    </div>

                    <div className={Style.moreBtn}>
                         <Link to={`/productList?id=${props.id}&title=${props.name}&state=category`}><button><span>نمایش محصولات</span><ArrowForwardIcon className={Style.arrowDiv} sx={{color:'#fff'}}></ArrowForwardIcon></button></Link>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    )
}
export default FeaturesBriefCard;