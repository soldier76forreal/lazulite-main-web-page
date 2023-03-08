import Style from "./logInNoModal.module.css";
import { Fragment ,React , useState ,useEffect , useContext } from 'react';
import ReactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios';
import AuthContext from '../../../store/auth';
import {Route , Switch  , Redirect, Link , useHistory, useNavigate, useLocation} from "react-router-dom";
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

const LogInNoModal = (props) =>{
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [signUpError , setSignUpError] = useState(false);
    const [signUpErrorMsg , setSignUpErrorMsg] = useState('');
    const [loadingStatus , setLoadingStatus] = useState(false);
    const [passwordVisibiltyStatus , setPasswordVisibilityStatus] = useState(false);
    const AuthCtx = useContext(AuthContext);
    const axiosGlobal = useContext(AxiosGlobal);
    const activePage = useContext(ActivePage);
    const langCtx = useContext(Language);
    const navigation = useNavigate();
    const location = useLocation();
    useEffect(() => {
        document.title = "ورود"
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
          email:email,
          password:password
      }
      const getEmail = (e) =>{
          setEmail(e.target.value);
      }
      const getPassword = (e) =>{
        setPassword(e.target.value);
    }
      const sendLogIn = async () =>{
          try{
            setLoadingStatus(true);
              const response = await axios({
                  withCredentials:true,
                  method:'post',
                  url:`${axiosGlobal.defaultTargetApi}/auth/login`,
                  data : formData,
                  config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
              })
              const data = await response.data;
            //   const expirationAuth = new Date(new Date().getTime() + (3600 * 1000));
              AuthCtx.login(data.accessToken);
              setLoadingStatus(false);

              navigation(activePage.nav);

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
      const passwordVisibil = () =>{
          if(passwordVisibiltyStatus === true){
              setPasswordVisibilityStatus(false);
          }else if(passwordVisibiltyStatus === false){
            setPasswordVisibilityStatus(true);

          }
      }
    return(
        <Fragment>
          <div  className={Style.modalBackground}>
                <Container style={{maxWidth:'1676px'}}  fluid className={Style.container}>
                   <Row className={Style.contentRow}>

                                <Col xs={1} sm={1}  md={1} lg={1} xl={2}></Col>
                                            <Col style={{backgroundImage:`url(${blg})`}}  className={Style.sideImg}  xs={0} md={6} lg={6} xl={5}>
                                            </Col>
                                            <Col dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.signUpForm} sm={10} xs={10} md={4} lg={4} xl={3}>
                                                <div className={Style.signUpDiv}>
                                                    <h5 className={Style.signUpHeader}>
                                                        {langCtx.language === 'english' ?'Log In':'ورود'}
                                                    </h5>
                                                    <div className={Style.inputDiv}> 
                                                        <MailOutlineIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></MailOutlineIcon>
                                                        <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={getEmail} type='email' autoComplete='false'  placeholder={langCtx.language === 'english' ?"Email":'ایمیل'} className={Style.input}></input>
                                                    </div>
                                                    <div className={Style.inputDiv}> 
                                                            <VpnKeyIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></VpnKeyIcon>
                                                                <input style={langCtx.language === 'english' ?{padding:'13px 20px 13px 38px' , textAlign:'left'}:{padding:'13px 38px 13px 20px' , textAlign:'right'}} onChange={getPassword} autoComplete='false' type={passwordVisibiltyStatus === false ?'password' :passwordVisibiltyStatus === true ? 'text':null} placeholder={langCtx.language === 'english' ?"password":'کلمه عبور'} className={Style.input}></input>
                                                            <VisibilityIcon style={langCtx.language === 'english' ?{right:'0px' , left:'auto' , marginRight:'10px'}:{right:'auto' , left:'0px' , marginLeft:'10px'}} onClick={passwordVisibil}  fontSize='medium' className={passwordVisibiltyStatus === true ? `${Style.activeVisibility} ${Style.visibilityIconStyle}` : passwordVisibiltyStatus === false ? `${Style.visibilityIconStyle}`:null}></VisibilityIcon>
                                                    </div>
                                                    <div className={Style.logInDiv}>
                                                        <Link to={`/${location.pathname.split('/')[1]}/forgetPassword`}>
                                                            <h5 className={Style.logInBtn}>
                                                                {langCtx.language === 'english' ?'Forgot your password?':'فراموشی کلمه عبور'}
                                                            </h5>
                                                        </Link>
                                                    </div>
                                                    <div className={Style.errorDiv}>
                                                            {signUpError === true ?<h4>{signUpErrorMsg}</h4> : ''}  
                                                    </div> 
                                                    <div className={Style.signUpBtnDiv}>
                                                        <button onClick={sendLogIn} className={Style.signUpBtn}>{loadingStatus === true ?  <Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'25px'} height={'25px'}></Loader> : langCtx.language === 'english' ?'Log In':'ورود'}</button>
                                                    </div>
                                                    <div className={Style.logInDiv}>
                                                        <h5>{langCtx.language === 'english' ?"Don't have an account?":'هنوز ثبت نام نکرده اید؟'}</h5>
                                                        <Link to={`/${location.pathname.split('/')[1]}/signUp`}><h5 className={Style.logInBtn}>{langCtx.language === 'english' ?"Sign up":'ثبت نام'}</h5></Link>
                                                    </div>
                                                </div>
                                            </Col>
                                <Col xs={1} sm={1}  md={1} lg={1} xl={2} ></Col>
                                </Row>
                   </Container>
                   </div>

                
        </Fragment>
    )
}

export default LogInNoModal;


