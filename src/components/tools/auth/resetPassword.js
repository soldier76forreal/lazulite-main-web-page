import Style from "./resetPassword.module.css";
import { Fragment ,React , useState ,useEffect , useContext  } from 'react';
import ReactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios';
import AuthContext from '../../../store/auth';
import {Route , Switch  , Redirect, Link , useHistory, useNavigate , useParams, useLocation} from "react-router-dom";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import blg from '../../../assets/sts.jpg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Navbar,Row ,Container  , Nav ,NavDropdown ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Loader from "../loader";
import VisibilityIcon from '@mui/icons-material/Visibility';
import jwtDecode from "jwt-decode";
import AxiosGlobal from "../../../store/axiosGlobal";
import CloseIcon from '@mui/icons-material/Close';

import ActivePage from "../../../store/activePage";
import Language from "../../../store/language";





const ResetPassword = () =>{
    const [password , setPassword] = useState('');
    const [passwordAgain , setPasswordAgain] = useState('');

    const [signUpError , setSignUpError] = useState(false);
    const [signUpErrorMsg , setSignUpErrorMsg] = useState('');
    const [loadingStatus , setLoadingStatus] = useState(false);
    const [validLink , setValidLink] = useState(true);
    const [passwordUpdated , setPasswordUpdated] = useState(false);
    const activePage = useContext(ActivePage);
    const langCtx = useContext(Language);
    const [passwordVisibiltyStatus , setPasswordVisibilityStatus] = useState(false);
    const [passwordVisibiltyStatus2 , setPasswordVisibilityStatus2] = useState(false);

    const AuthCtx = useContext(AuthContext);
    const axiosGlobal = useContext(AxiosGlobal);
    const params = useParams();
    const location = useLocation();
    const navigation = useNavigate();
    useEffect(() => {
        document.title = "بازیابی کلمه عبور"
    }, []);
    useEffect(() => {
        setSignUpError(false);
        setSignUpErrorMsg('');
    }, [ password])
    const styles = {
        smallIcon: {
          width: 76,
          height: 76,
        }
      };


      const getPassword = (e) =>{
        setPassword(e.target.value);
    }
    const getPasswordAgain = (e) =>{
        setPasswordAgain(e.target.value);
    }
      const passwordVisibil = () =>{
          if(passwordVisibiltyStatus === true){
              setPasswordVisibilityStatus(false);
          }else if(passwordVisibiltyStatus === false){
            setPasswordVisibilityStatus(true);

          }
      }
      const passwordVisibil2 = () =>{
        if(passwordVisibiltyStatus2 === true){
            setPasswordVisibilityStatus2(false);
        }else if(passwordVisibiltyStatus2 === false){
          setPasswordVisibilityStatus2(true);

        }
    }

      const resetPass = async () =>{
          if(password === passwordAgain){
            try{
                setLoadingStatus(true);
                  const response = await axios({
                      withCredentials:true,
                      method:'post',
                      url:`${axiosGlobal.defaultTargetApi}/auth/updatePassword`,
                      data : {id:params.id , token:params.token , password:password},
                      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                  })
                  setLoadingStatus(false);
                  setPasswordUpdated(true);
              }catch(err){
                let error = 'خطایی رخ داده است!'
                if(err && err.response.data !== ''){
                    error=err.response.data;
                    setSignUpError(true);
                    setSignUpErrorMsg(error);
                    setLoadingStatus(false);
                }     
              }
          }else{
                setSignUpError(true);
                setSignUpErrorMsg('تکرار کلمه عبور اشتباه است');
                setLoadingStatus(false);
            }
          }

    
    const validation = async() =>{
        try{
            const response = await axios({
                withCredentials:true,
                method:'get',
                url:`${axiosGlobal.defaultTargetApi}/auth/resetPassword`,
                params:{id:params.id , token:params.token},
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            setValidLink(true);
        }catch(err){
            setValidLink(false);
        }
    }
    useEffect(() => {
        validation();
    }, []);
    if(validLink === true){
        return(
            <Fragment>
                {passwordUpdated === false ?
                    <div style={{padding:'0px 30px 0px 30px' , width:'86%'}} dir={langCtx.language === 'english' ?'ltr':'rtl'}  className={Style.resetPassword}>
                        <div className={Style.resetPassword}>
                                <div className={Style.signUpDiv}>
                                    <h5 style={langCtx.language === 'english' ?{fontSize:'22px'}:{fontSize:'30px'}} className={Style.signUpHeader}>
                                        {langCtx.language === 'english' ?'Forgot your password?':'بازیابی کلمه عبور'}
                                    </h5>
                                    <div className={Style.inputDiv}> 
                                            <VpnKeyIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></VpnKeyIcon>
                                                <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={getPassword} autoComplete='false' type={passwordVisibiltyStatus === false ?'password' :passwordVisibiltyStatus === true ? 'text':null} placeholder={langCtx.language === 'english' ?"Password":'کلمه عبور'} className={Style.input}></input>
                                            <VisibilityIcon style={langCtx.language === 'english' ?{right:'0px' , left:'auto' , marginRight:'10px'}:{right:'auto' , left:'0px' , marginLeft:'0px'}} onClick={passwordVisibil}  fontSize='medium' className={passwordVisibiltyStatus === true ? `${Style.activeVisibility} ${Style.visibilityIconStyle}` : passwordVisibiltyStatus === false ? `${Style.visibilityIconStyle}`:null}></VisibilityIcon>
                                    </div>
                                    <div className={Style.inputDiv}> 
                                            <VpnKeyIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></VpnKeyIcon>
                                                <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={getPasswordAgain} autoComplete='false' type={passwordVisibiltyStatus2 === false ?'password' :passwordVisibiltyStatus2 === true ? 'text':null}   placeholder={langCtx.language === 'english' ?"Password Again":'تکرار کلمه عبور'} className={Style.input}></input>
                                            <VisibilityIcon style={langCtx.language === 'english' ?{right:'0px' , left:'auto' , marginRight:'10px'}:{right:'auto' , left:'0px' , marginLeft:'10px'}} onClick={passwordVisibil2}  fontSize='medium' className={passwordVisibiltyStatus2 === true ? `${Style.activeVisibility} ${Style.visibilityIconStyle}` : passwordVisibiltyStatus2 === false ? `${Style.visibilityIconStyle}`:null}></VisibilityIcon>

                                    </div>
                                <div className={Style.errorDiv}>
                                        {signUpError === true ?<h4 style={{fontSize:'13px'}}>{signUpErrorMsg}</h4> : ''}
                                </div> 
                                <div className={Style.signUpBtnDiv}>
                                    <button onClick={resetPass} className={Style.signUpBtn}>{loadingStatus === true ?  <Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'25px'} height={'25px'}></Loader> : langCtx.language === 'english' ?"Send":'ارسال'}</button>
                                </div>

                                </div>
                        </div>
                    </div>
                :passwordUpdated === true ?
                    <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.resetPasswordDivDiv}>
                        <div style={{backgroundColor:'#b7f0bf'}} className={Style.sendEmailMsgDiv}>
                            <h4>{langCtx.language === 'english' ?"Password updated!":'کلمه عبور بروزرسانی شد'}</h4>
                            <Link to={`/${location.pathname.split('/')[1]}/login`}><h5 style={{ textAlign:'center' , width:'100%' , margin:'0px' , fontSize:'16px' , cursor:'pointer' , opacity:"0.6" , padding:'0px'}}  className={Style.logInBtn}>{langCtx.language === 'english' ?"Log In":'ورود'}</h5></Link>
                        </div>
                    </div>
                :null} 
            </Fragment>
        )
    }else if(validLink === false){
        return(
            <div dir="rtl"  className={Style.resetPasswordDivDiv}>
                <div className={Style.sendEmailMsgDiv}>
                    <h4>{langCtx.language === 'english' ?"recovery link has been expired":'لینک بازیابی کلمه عبور منقض شده است'}</h4>
                    <h5 onClick={()=>{navigation(activePage.nav)}} style={{ textAlign:'center' , width:'100%' , margin:'0px' , fontSize:'16px' , cursor:'pointer' , opacity:"0.6" , padding:'0px'}}  className={Style.logInBtn}>{langCtx.language === 'english' ?"home page":'صفحه اصل'}</h5>

                </div>

            </div>
        )
    }

}
export default ResetPassword;