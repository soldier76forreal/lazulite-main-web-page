import Style from './signup.module.css';
import { Fragment , useState , useEffect , useContext ,React} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";
import AuthContext from '../../../store/auth';
import {Route , Switch  , Redirect, Link , useNavigate , useHistory} from "react-router-dom";
import ReactDom from "react-dom";
import blg from '../../../assets/sts.jpg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';import {Navbar,Row ,Container , Nav ,NavDropdown ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Loader from '../loader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AxiosGlobal from '../../../store/axiosGlobal';
import LogInNoModal from './logInNoModal';
import ActivePage from '../../../store/activePage';
import Language from '../../../store/language';


const SignUp = (props) =>{
    const axiosGlobal = useContext(AxiosGlobal);
    const navigate = useNavigate();
    const activePage = useContext(ActivePage);
    const langCtx = useContext(Language);
    useEffect(() => {
        document.title = "ثبت نام"
    }, []);
    const styles = {
        smallIcon: {
          width: 76,
          height: 76,
        }
      };

      const [name , setName] = useState('');
      const [lastName , setLastName] = useState('');
      const [email , setEmail] = useState('');
      const [password , setPassword] = useState('');
      const [signUpError , setSignUpError] = useState(false);
      const [signUpErrorMsg , setSignUpErrorMsg] = useState('');
      const [loadingStatus , setLoadingStatus] = useState(false);
      const [passwordVisibiltyStatus , setPasswordVisibilityStatus] = useState(false);
      
      const ctx = useContext(AuthContext);
      useEffect(() => {
        setSignUpError(false);
        setSignUpErrorMsg('');
    }, [name , lastName , email , password])
      const gettingName = async (e) =>{
          setName(e.target.value);
      }
      const gettingLastName = async (e) =>{
          setLastName(e.target.value)
      }
      const gettingEmail = async (e) =>{
        setEmail(e.target.value);
      }
      const gettingPassword = async (e) =>{
          setPassword(e.target.value);
      }
      const signUpData = async (e) =>{
        e.preventDefault();
        const formData = {
            firstName : name,
            lastName : lastName , 
            email : email,
            password : password
        } 

          try{
            setLoadingStatus(true);
              const response = await axios({
                withCredentials:true,
                  method:'post',
                  url : `${axiosGlobal.defaultTargetApi}/auth/registerMainPage`,
                  data : formData,
                  config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
              })
              const data = response.data;
              ctx.login(data.accessToken);
              setLoadingStatus(false);
              navigate(activePage.nav);
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
            <div className={Style.modalBackground}>
                

             <Container style={{maxWidth:'1676px'}} fluid className={Style.container}>
                <Row className={Style.contentRow}>
                    <Col sm={0} xs={0} md={0} lg={1} xl={2} ></Col>
                                <Col style={{backgroundImage:`url(${blg})`}}  className={Style.sideImg}  xs={0} md={7} lg={6} xl={5} >
                                </Col>
                                
                                <Col dir={langCtx.language === 'english' ?'ltr':'rtl'} className={Style.signUpForm} sm={9} xs={10} md={5} lg={4} xl={3} >
                                    <form className={Style.form} onSubmit={signUpData}>
                                        <div className={Style.signUpDiv}>

                                                <h5 className={Style.signUpHeader}>
                                                    {langCtx.language === 'english' ?'Sign Up':'ثبت نام'}
                                                </h5>
                                            <div className={Style.inputDiv}> 
                                                <PersonOutlineIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></PersonOutlineIcon>
                                                <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={gettingName} autoComplete='false' type='text' placeholder={langCtx.language === 'english' ?"Name":'نام'} className={Style.input}></input>
                                            </div>
                                            <div className={Style.inputDiv}> 
                                                <PeopleOutlineIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} fontSize='medium' className={Style.icon}></PeopleOutlineIcon>
                                                <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={gettingLastName} autoComplete='false' type='text' placeholder={langCtx.language === 'english' ?"Last Name":'نام خانوادگی'} className={Style.input}></input>
                                            </div>
                                            <div className={Style.inputDiv}> 
                                                <MailOutlineIcon fontSize='medium' style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}} className={Style.icon}></MailOutlineIcon>
                                                <input onChange={gettingEmail} type='email' autoComplete='false' style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}}  placeholder={langCtx.language === 'english' ?"Email":'ایمیل'} className={Style.input}></input>
                                            </div>
                                            <div className={Style.inputDiv}> 
                                                <VpnKeyIcon style={langCtx.language === 'english' ?{marginLeft:'11px', marginTop:'13px', marginRight:'0px' }:{marginLeft:'0px', marginRight:'13px'}}  fontSize='medium' className={Style.icon}></VpnKeyIcon>
                                                    <input style={langCtx.language === 'english' ?{textAlign:'left',padding:'13px 20px 13px 38px'}:{padding:'13px 38px 13px 20px' ,textAlign:'right'}} onChange={gettingPassword} autoComplete='false' type={passwordVisibiltyStatus === false ?'password' :passwordVisibiltyStatus === true ? 'text':null} placeholder={langCtx.language === 'english' ?"Password":'کمه عبور'} className={Style.input}></input>
                                                <VisibilityIcon onClick={passwordVisibil} style={langCtx.language === 'english' ?{right:'0px' , left:'auto' , marginRight:'10px'}:{right:'auto' , left:'0px' , marginLeft:'0px'}} fontSize='medium' className={passwordVisibiltyStatus === true ? `${Style.activeVisibility} ${Style.visibilityIconStyle}` : passwordVisibiltyStatus === false ? `${Style.visibilityIconStyle}`:null}></VisibilityIcon>

                                            </div>           
                                            <div className={Style.errorDiv}>
                                                    {/* <FontAwesomeIcon size='1x' color="#db5800"  icon='exclamation-circle'></FontAwesomeIcon> */}
                                                    {signUpError === true ? <h4>{signUpErrorMsg}</h4> : ''}
                                              </div>                                
                                            <div className={Style.signUpBtnDiv}>
                                                <button type='submit' className={Style.signUpBtn}>{loadingStatus === true ? <Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'22px'} height={'22px'}></Loader> : langCtx.language === 'english' ?'Sign Up':'ثبت نام'}</button>
                                            </div>
                                                <div className={Style.logInDiv}>
                                                    <h5>{langCtx.language === 'english' ?'Already have an account?':'قبلا ثبت نام کرده اید؟'}</h5>
                                                    <Link to='/login'><h5 className={Style.logInBtn}>{langCtx.language === 'english' ?'Log In':'ورود'}</h5></Link>
                                                </div>
                                            </div>
 
                                    </form>
                                </Col>
                    <Col sm={0} xs={0} md={0} lg={1} xl={2} ></Col>
                </Row>
                </Container>
                </div>
        </Fragment>
    )
}
// const SignUp = (props)=>{

//     return(
//         <Fragment>
//             {ReactDom.createPortal(
//             <SignUpPage>
//             </SignUpPage>
//             ,
//             document.getElementById('modal_place')
            
//             )}

//         </Fragment>
//     );
//}

export default SignUp;