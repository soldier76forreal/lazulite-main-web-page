import Style from "./forgetPassword.module.css";
import { Fragment ,React , useState ,useEffect , useContext } from 'react';
import ReactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios';
import AuthContext from '../../../store/auth';
import {Route , Switch  , Redirect, Link , useHistory, useNavigate} from "react-router-dom";
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






const ForgetPassword = () =>{
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [signUpError , setSignUpError] = useState(false);
    const [signUpErrorMsg , setSignUpErrorMsg] = useState('');
    const [loadingStatus , setLoadingStatus] = useState(false);
    const [linkSent , setLinkSent] = useState(false);
    const langCtx = useContext(Language);
    const [passwordVisibiltyStatus , setPasswordVisibilityStatus] = useState(false);
    const AuthCtx = useContext(AuthContext);
    const axiosGlobal = useContext(AxiosGlobal);
    const activePage = useContext(ActivePage);
    const navigation = useNavigate();
    useEffect(() => {
        document.title = "بازیابی کلمه عبور"
    }, []);
    useEffect(() => {
        setSignUpError(false);
        setSignUpErrorMsg('');
    }, [email , password])
    const styles = {
        smallIcon: {
          width: 76,
          height: 76,
        }
      };
      const formData ={
          email:email      }
      const getEmail = (e) =>{
          setEmail(e.target.value);
      }

      const passwordVisibil = () =>{
          if(passwordVisibiltyStatus === true){
              setPasswordVisibilityStatus(false);
          }else if(passwordVisibiltyStatus === false){
            setPasswordVisibilityStatus(true);

          }
      }

      const resetPass = async () =>{
        try{
          setLoadingStatus(true);
            const response = await axios({
                withCredentials:true,
                method:'post',
                url:`${axiosGlobal.defaultTargetApi}/auth/forgetPassword`,
                data : formData,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            setLoadingStatus(false);
            setLinkSent(true);
            
        }catch(err){
            let error = 'خطایی رخ داده است!'
            if(err && err.response.data !== ''){
                error=err.response.data;
                setSignUpError(true);
                setSignUpErrorMsg(error);
                setLoadingStatus(false);
            } 
        }
    }
    if(linkSent === false){
        return(
            <div style={{padding:'0px 30px 0px 30px' , width:'86%'}} dir={langCtx.language === 'english' ?'ltr':'rtl'}  className={Style.resetPasswordDiv}>
                <div style={{padding:'0px'}} className={Style.resetPasswordDiv}>
                        <div className={Style.signUpDiv}>
                            <h5 style={langCtx.language === 'english' ?{fontSize:'22px'}:{fontSize:'30px'}} className={Style.signUpHeader}>
                                {langCtx.language === 'english' ?'Forgot your password?':'بازیابی کلمه عبور'}
                            </h5>
                        <div className={Style.logInDiv}>
                            <h5 style={{fontSize:'12px'}}>
                                {langCtx.language === 'english' ?
                                'Enter the email address associated with your account and we’ll send you a link to reset your password.'
                                :
                                'برای تغییر کلمه عبور، ایمیل خود را وارد کنید'}
                            </h5>
                        </div>
                        <div className={Style.inputDiv}> 
                            <MailOutlineIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></MailOutlineIcon>
                            <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={getEmail} type='email' autoComplete='false'  placeholder={langCtx.language === 'english' ?"Email":'ایمیل'} className={Style.input}></input>
                        </div>

                        <div className={Style.errorDiv}>
                                {signUpError === true ?<h4 style={{fontSize:'13px'}}>{signUpErrorMsg}</h4> : ''}
                        </div> 
                        <div className={Style.signUpBtnDiv}>
                            <button onClick={resetPass} className={Style.signUpBtn}>{loadingStatus === true ?  <Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'25px'} height={'25px'}></Loader> : langCtx.language === 'english' ?"Send":'ارسال'}</button>
                        </div>
                            <div style={{opacity:"0.6"}} className={Style.logInDiv}>
                                <Link to='/logIn'><h5 className={Style.logInBtn}>{langCtx.language === 'english' ?"Log In":'ورود'}</h5></Link>
                            </div>
                        </div>
                </div>
            </div>
        )
    }else if(linkSent === true){
        return(
            <div dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.resetPasswordDivDiv}>
                <div className={Style.sendEmailMsgDiv}>
                    <h4 style={langCtx.language === 'english' ?{lineHeight:'26px' , textAlign:'center'}:{textAlign:'right'}}>{langCtx.language === 'english' ?
                    "If your email address exists in our database, and you haven't requested a password reset in the last 15 minutes, you will receive a password recovery link at your email address in a few minutes."
                        :
                    'لینک بازیابی کلمه عبور به ایمیل شما ارسال شده است، لطفا ایمیل خود را چک کنید'}</h4>
                    <h5 onClick={()=>{navigation(activePage.nav)}} style={{ textAlign:'center' , width:'100%', cursor:'pointer'}}  className={Style.logInBtn}>{langCtx.language === 'english' ?'Previous page':'صفحه قبل'}</h5>
                </div>

            </div>


        )

    }
}
export default ForgetPassword;