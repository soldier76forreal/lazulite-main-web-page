import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./commentBox.css";
import NormalBtn from "../tools/normalBtn";
import { color, fontSize } from '@mui/system';
import { useState , useContext , useEffect, Fragment } from 'react';
import axios from 'axios';
import AxiosGlobal from '../../store/axiosGlobal';
import AuthContext from '../../store/auth';
import Cookies from 'js-cookie';
import StarRating from './ratingStar';
import LogIn from './auth/login';
import FailedMsg from './failedMsg';
import SuccessMsg from './successMsg'
import jwtDecode from 'jwt-decode';
const CommentBox = (props)=>{
  const axiosGlobal = useContext(AxiosGlobal);
  const authCtx = useContext(AuthContext);
  const [commentItSelf , setCommentItSelf] = useState('');
  const [showLogInModal , setShowLogInModal] = useState(false);
  const [rating , setRating] = useState(null);
  const [successOpenToast , setSuccessOpenToast] = useState(false);
  const [failedOpenToast , setFailedOpenToast] = useState(false);
  const [successMsgToast , setSuccessMsgToast] = useState('');
  const [failedMsgToast , setFailedMsgToast] = useState('');
  const [ratedBefore , setRatedBefore] = useState(null);


  const closeLogInModal = () =>{
      setShowLogInModal(false);
  }
  const sendComment = async()=>{
    const decoded = jwtDecode(Cookies.get('accessToken'));
    const dataToSend = {
      comment:commentItSelf,
      author:decoded.id,
      targetedPost:props.id,
      rate:rating
    }

    if(props.ratedBefore.rated === false){
      if(rating === null){
        setFailedOpenToast(true);
        setFailedMsgToast("امتیازی برای این محصول ثبت نکردید");
        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false);}, 2000);
      }else{
        try{
          const response = await authCtx.jwtInst({
            method:"post",
            url:`${axiosGlobal.defaultTargetApi}/comment/newComment`,
            data:dataToSend,
            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
          })
          setSuccessOpenToast(true);
          setSuccessMsgToast("دیدگاه شما ثبت شد");
          const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 2000);
          if(response.data.rate !==null){
            setRating(null);
            setRatedBefore(response.data.rate);
          }else{
            setRating(null);
            setRatedBefore(null);
          }
        }catch(err){
          console.log(err);
        }
      }

    }else if(props.ratedBefore.rated === true){
      dataToSend.rate = null;
      try{
        const response = await authCtx.jwtInst({
          method:"post",
          url:`${axiosGlobal.defaultTargetApi}/comment/newComment`,
          data:dataToSend,
          config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        })
        setSuccessOpenToast(true);
        setSuccessMsgToast("دیدگاه شما ثبت شد");
        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 2000);
        if(response.data.rate !==null){
          setRating(null);
          setRatedBefore(response.data.rate);
        }else{
          setRating(null);
          setRatedBefore(null);
        }
      }catch(err){
        console.log(err);
      }
    }
  }

    return(
      <Fragment>
              <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
              <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
              {showLogInModal === true ?
                <LogIn closeLogInModal={closeLogInModal} openModal={showLogInModal}></LogIn>
              :
              null
              }
          <Col  className="commentSectionCol"  xs={12} md={12} lg={12}>
            <div className="commentSection">
              <div  className="commentHeaderSection">
                  <div dir="rtl" className="commentCounter">
                    <h3><span>{props.commentCount}</span> دیدگاه</h3>
                  </div> 
                  {ratedBefore !== null ?
                  <div className="charCounter">
                        <h5 className='commentRateText' style={{display:'inline-block' , margin:'0px 0px 0px 10px'}}><spam style={{color:'#1043A9'}}>{ratedBefore}</spam> امتیاز شما به این محصول</h5>
                  </div> 
                :
                props.ratedBefore.rated === false ?
                  <div className="charCounter">
                      <StarRating setShowLogInModal={setShowLogInModal} rating={setRating}></StarRating>
                      {rating !== null?
                        <h5 className='commentRateText' style={{display:'inline-block' , margin:'0px 0px 0px 10px'}}><spam style={{color:'#1043A9'}}>{rating}</spam> :امتیاز شما به این محصول</h5>
                      :null
                      }
                  </div>
                :
                <div className="charCounter">
                  امتیاز شما به این محصول:{props.ratedBefore.rate} از 5
                </div>
                
             }

              </div>
              <div>
                  <div dir="rtl" className="commentItself">
                      <div className="textareaDiv">
                        <Form.Control onChange={(e)=>{setCommentItSelf(e.target.value)}} className="commentTextarea" as="textarea" rows={3} />
                      </div>
                  </div>
                      <div dir="rtl" className="commentFooter">
                          <div> 
                              {/* <div>
                              <h4 style={{color:"#F38033" , marginBottom:"15px" , fontSize:"20px"}}>{props.commentErrorMsg}</h4>

                              </div> */}
                            {Cookies.get('accessToken') !== undefined ?
                                  <div className="commentSendBtn">
                                    <NormalBtn  onClick={sendComment} send={props.sendComment}  btnName="ارسال"></NormalBtn>
                                  </div>   
                            :Cookies.get('accessToken') === undefined ?
                                  <div className="commentSendBtn">
                                    <button onClick={()=>{setShowLogInModal(true)}} className='commentBoxLogInBtn'>برای نظر دهی وارد <span>حساب کاربری</span> شوید</button>
                                  </div>
                            :null}
                    
                          </div>
                    </div>
              </div>
            </div>
          </Col>
      </Fragment>
    );
}


export default CommentBox;