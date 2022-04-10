import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from  "./commentItself.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import PlaceHolderImg from '../../assets/a.jpg'
import AuthContext from '../../store/auth';
import { useContext , useState } from 'react';
import Axios  from 'axios';
import AxiosGlobal from '../../store/axiosGlobal';
import Cookies from 'js-cookie';
import LogIn from './auth/login';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextAvatar from './textAvatar';
import moment from 'moment';

let CommentItself = (props) =>{
    const authCtx = useContext(AuthContext);
    const axiosGlobal = useContext(AxiosGlobal);
    const [author , setAuthor] = useState();
    const [showLogInModal , setShowLogInModal] = useState(false);

    const closeLogInModal = () =>{
        setShowLogInModal(false);
    }
  
    const like = (e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: authCtx.decoded.id
            }
        }
        try{
            const response = authCtx.jwtInst({
                method:'post',
                url:`${axiosGlobal.defaultTargetApi}/comment/likeCommentCp`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setUpdateComments(Math.random());
        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const dislike = (e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: authCtx.decoded.id
            }
        }
        try{
            const response = authCtx.jwtInst({
                method:'post',
                url:`${axiosGlobal.defaultTargetApi}/comment/dislikeCommentCp`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setUpdateComments(Math.random());

        }catch{
            console.log('خطایی رخ داده')
        }
    }
    return(
        <Col  xs={12} md={12} lg={12}>
        {showLogInModal === true ?
            <LogIn closeLogInModal={closeLogInModal} openModal={showLogInModal}></LogIn>
        :
            null
        }
         
        <div className={Style.commentItselfDiv}>
               <div className={Style.commentItselfDateDiv}>
                  <h4 >{moment(props.comment.comment.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h4>
              </div>
              <div  dir="rtl"  className={Style.commentItselfProfDiv}>
                <div className={Style.commentProfItselfImage}>
                    <TextAvatar text={`${props.comment.user.firstName} ${props.comment.user.lastName}`}></TextAvatar>
                </div>
                 <div className={Style.commentProfItselfName}>
                    <h4>{`${props.comment.user.firstName} ${props.comment.user.lastName}`}</h4>
                 </div>
              </div>

              <div className={Style.commentTextItselfDiv}>
                  <p>
                    {props.comment.comment.comment}
                  </p>
              </div>
              <div   dir="rtl" className={Style.commentItselfFooterDiv}>
                  {authCtx.decoded !== undefined ?
                    <div className={Style.commentLikeAndDislike}>
                            <div className={Style.commentLike}>
                                <h5>{props.comment.comment.likes.length}</h5>
                                {props.comment.comment.likes.includes(authCtx.decoded.id)?
                                    <button  value={props.comment.comment._id} onClick={like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#009C0B" />
                                    </button>
                                :
                                    <button value={props.comment.comment._id} onClick={like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon onClick={like} className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#DCDCDC" />
                                    </button>
                                }
                            </div>
                        
                            <div className={Style.commentDislike}>
                                <h5>{props.comment.comment.dislikes.length}</h5>
                                {props.comment.comment.dislikes.includes(authCtx.decoded.id)?
                                    <button  value={props.comment.comment._id} onClick={dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#D90000" />
                                    </button>
                                :
                                    <button  value={props.comment.comment._id} onClick={dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#DCDCDC" />
                                    </button>

                                }                            
                            </div>
                        

                    </div>
                    :authCtx.decoded === undefined ?
                    <div className={Style.commentLikeAndDislike}>
                        <div className={Style.commentLike}>
                            <h5>{props.comment.comment.likes.length}</h5>
                            <FontAwesomeIcon onClick={()=>{setShowLogInModal(true)}} className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#DCDCDC" />

                        </div>
                        <div className={Style.commentDislike}>
                            <h5>{props.comment.comment.dislikes.length}</h5>
                            <FontAwesomeIcon onClick={()=>{setShowLogInModal(true)}} className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#DCDCDC" />

                        </div>
                    </div>
                    :null}
                      <div className={Style.commentShowReplyDiv}>
                        <FontAwesomeIcon className={Style.commentShowReplyArrow} icon="caret-down" color="#DCDCDC" />
                        <h5><span>10 </span>پاسخ</h5>
                        <FontAwesomeIcon className={Style.commentShowReplyArrow}  icon="caret-down" color="#DCDCDC" />
                      </div>
                  <div className={Style.commentReplyBtnDiv}>
                      <button className={Style.replyBtnButton}  onClick={props.replyBtn}>
                              <FontAwesomeIcon    className={Style.commentReplyBtn} size="lg" icon="reply"  color="#DCDCDC" />
                      </button>
                  </div>
              </div>
        </div>
    </Col>
    );
}



export default CommentItself;


