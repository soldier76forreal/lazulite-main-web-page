import { Fragment } from 'react';
import MuiCustomCheckBox from './muiCustomCheckBox';
import Style from './sizeFilter.module.css';


const SizeFilter = () =>{
    return(
        <Fragment>
            <div className={Style.priceLimiterDiv}>
                <h4>نمایش براساس ابعاد</h4>
                <div>
                    <MuiCustomCheckBox ></MuiCustomCheckBox>
                    <div className={Style.hrLine}></div>
                </div>
                <div>
                    <MuiCustomCheckBox></MuiCustomCheckBox>
                    <div className={Style.hrLine}></div>
                </div>
                <div>
                    <MuiCustomCheckBox></MuiCustomCheckBox>
                    <div className={Style.hrLine}></div>
                </div>
                <div>
                    <MuiCustomCheckBox></MuiCustomCheckBox>
                    <div className={Style.hrLine}></div>
                </div>
                <div>
                    <MuiCustomCheckBox></MuiCustomCheckBox>
                    <div className={Style.hrLine}></div>
                </div>
                <div>
                    <MuiCustomCheckBox></MuiCustomCheckBox>
                </div>
                
            </div>
        </Fragment>
    )
}
export default SizeFilter