import Style from "./phoneCallModal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useContext  , useState , useEffect } from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";
import NormalBtnRed from "./normalBtnRed";
import SelectiveOutLineBtn from "./selectiveOutLineBtn";
import topCardBackGround from "../../assets/phoneCallModalBG.jpg";
import NormalBtn from "./normalBtn";
import axios from "axios";
import AxiosGlobal from "../../store/axiosGlobal";
import done from '../../assets/doneIconJson.json';
import Lottie from "lottie-web";
const PhoneCallModalPortal =(props)=>{
    const axiosGlobal = useContext(AxiosGlobal);
    const [phoneNumber , setPhoneNumber] = useState();
    const [doneTask , setDoneTask] = useState(false);

    const sendPhoneNumber = async(e) =>{
        const dataToSend = {
            targetId:e.currentTarget.value,
            phoneNumber:phoneNumber
        }
        try{
            const response = await axios({
                method:"post",
                url:`${axiosGlobal.defaultTargetApi}/oprators/newCallRequestMain`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            setDoneTask(true)
            Lottie.loadAnimation({
                display:'none',
                container: document.querySelector("#doneIcon"),
                animationData: done,
                renderer: "svg", // "canvas", "html"
                loop: false, // boolean
                autoplay: true, // boolean
            });
            setTimeout(props.closeModalFn , 1500)
            setTimeout(()=>{setDoneTask(false);document.getElementById('doneIcon').innerHTML = ""  } , 1700)
                      
        }catch{

        }
    }

        return(
            <Fragment>
                        <div className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                            <div onClick={props.closeModalFn}  className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>
                                <div style={{display:'flex' , alignContent:'center' , justifyContent:'center'}} className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                                
                                    <div  id="doneIcon"  style={doneTask === true ?{height:'140px' , display:'block' , width:'140px' , marginTop:'88px'}:doneTask === false ?{height:'140px' , display:'none' , width:'140px' , marginTop:'88px'}:null}>
                                    </div>

                                    <div style={doneTask === true ?{display:'none' , width:'100%'}:doneTask === false ?{display:'block' , width:'100%'}:null}>
                                        <h4>تماس مستقیم</h4>
                                        <div className={Style.opratorDiv}>
                                            <h3>{props.data.firstName} {props.data.lastName}</h3>
                                            {props.data.phoneNumbers.length === 1 ? 
                                                <div className={Style.numbersDiv}>
                                                    <a  className={Style.callLink} href={`tel:${props.data.phoneNumbers[0]}`}><span style={{marginRight:'0px'}} className={Style.num1}>{props.data.phoneNumbers[0]}</span></a>
                                                </div>
                                            :props.data.phoneNumbers.length === 2 ?
                                                <div className={Style.numbersDiv}>
                                                    <a  className={Style.callLink} href={`tel:${props.data.phoneNumbers[0]}`}><span className={Style.num1}>{props.data.phoneNumbers[0]}</span></a>
                                                        <div style={{width:'1px' , height:'14px' , padding:'0px' , backgroundColor:'#acacac' , display:'inline-block'}}></div>
                                                    <a className={Style.callLink} href={`tel:${props.data.phoneNumbers[1]}`}><span className={Style.num2}>{props.data.phoneNumbers[1]}</span></a>
                                                </div>
                                            :null }
                                        </div>
                                        <div dir="rtl" style={{marginTop:'10px'}} className={Style.opratorDiv}>
                                            <h3>یا ما با شما تماس بگیریم</h3>
                                                <input onChange={(e)=>{setPhoneNumber(e.currentTarget.value)}} placeholder="شماره تماس شما" className={Style.callPhoneNumber}></input>
                                                <div  style={{marginTop:'6px'}}>
                                                    <NormalBtn onClick={sendPhoneNumber} value={props.data._id} btnName='ثبت' paddingTop={'5px'} paddingButtom={'4px'} fontSize={'15px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>

                                                </div>

                                        </div>
                                    </div>
                                    {/* <div className={Style.btnsDiv}>
                                        <div className={Style.btnDiv}>
                                            <SelectiveOutLineBtn onClick={props.closeModalFn} btnName='انصراف' isActive={false}   paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                        </div>
                                        <div className={Style.btnDiv2}>
                                            <NormalBtnRed   btnName={'بله'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'43px'} paddingLeft={'43px'} backgroundColor={'#FD7474'} color={'#FFFFFF'} ></NormalBtnRed>
                                        </div>
                                    </div> */}
                                </div>
                            

                        </div>
                    
                    
            </Fragment>
        )
    
}
const PhoneCallModal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <PhoneCallModalPortal data={props.data}  closeModalFn={props.closeModalFn}  showModal={props.showModal} ></PhoneCallModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default PhoneCallModal;
