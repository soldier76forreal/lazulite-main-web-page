//modules
import { Fragment } from "react";
import Style from './selectiveOutLineBtn.module.css';
import {useState} from 'react';
//required tag




const SelectiveOutLineBtn =(props)=>{
    const [activeState , setActiveState] = useState(props.isActive);
    //style
    const active = {
        fontSize:`${props.fontSize}`,
        color:`${props.color}`,
        backgroundColor: `${props.backgroundColor}`,
        border:'3px solid #1043A9',
        paddingLeft:`${props.paddingLeft}`,
        paddingRight:`${props.paddingRight}`,
        paddingTop:`${props.paddingTop}`,
        paddingButton:`${props.paddingButton}`,
    }
    const notActive = {
        fontSize:`${props.fontSize}`,
        color:'#354063',
        border:`${props.border}`,
        paddingLeft:`${props.paddingLeft}`,
        paddingRight:`${props.paddingRight}`,
        paddingTop:`${props.paddingTop}`,
        paddingButton:`${props.paddingButton}`,
    }
    return(
        <Fragment>
            {activeState === true ?
                <button className={Style.btnActive} value={props.value} id={props.id} onClick={props.onClick}  style={active} >{props.btnName}</button>
            :activeState === false ?
                <button className={Style.btnNotActive} value={props.value} id={props.id} onClick={props.onClick}  style={notActive} >{props.btnName}</button>
            : null }
        </Fragment>
    )
}
export default SelectiveOutLineBtn;