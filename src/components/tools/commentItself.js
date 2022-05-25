import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from  "./commentItself.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import PlaceHolderImg from '../../assets/a.jpg'
import React from 'react'

import AuthContext from '../../store/auth';
import { Fragment, useContext , useState , useEffect } from 'react';
import Axios  from 'axios';
import AxiosGlobal from '../../store/axiosGlobal';
import Cookies from 'js-cookie';
import LogIn from './auth/login';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextAvatar from './textAvatar';
import moment from 'moment';
import Language from '../../store/language';
import SendIcon from '@mui/icons-material/Send';
import jwtDecode from 'jwt-decode';
let CommentItself = (props) =>{
    const authCtx = useContext(AuthContext);
    const axiosGlobal = useContext(AxiosGlobal);
    const [author , setAuthor] = useState();
    const [showLogInModal , setShowLogInModal] = useState(false);
    const langCtx = useContext(Language);
    const [openReplySection , setOpenReplySection] = useState(false);
    const [comment , setComment] = useState('');
    const [showReply , setShowReply] = useState(false);
    const closeLogInModal = () =>{
        setShowLogInModal(false);
    }

    const like =async (e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: jwtDecode(Cookies.get('accessToken')).id
            }
        }
        try{
            const response =await authCtx.jwtInst({
                method:'post',
                url:`${axiosGlobal.defaultTargetApi}/comment/likeComment`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setUpdateComments(Math.random());
        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const dislike = async(e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: authCtx.logedInUserId
            }
        }
        try{
            const response =await authCtx.jwtInst({
                method:'post',
                url:`${axiosGlobal.defaultTargetApi}/comment/dislikeComment`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setUpdateComments(Math.random());

        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const commentReplyOpen = () =>{
        if(openReplySection === false){
            setOpenReplySection(true);
        }else if(openReplySection === true){
            setOpenReplySection(false);
        }
    }
    const commentShowReply = () =>{
        if(showReply === false){
            setShowReply(true);
        }else if(showReply === true){
            setShowReply(false);
        }
    }
    const sendCommentReply = (e) =>{
        var data;
     
             data = {
                targetPost  : props.comment.comment.targetPost ,
                author : jwtDecode(Cookies.get('accessToken')).id,
                replyedTo : props.comment.comment._id,
                comment:comment
            }
            console.log(data)
          
        try{
            const response = authCtx.jwtInst({
                method:'post',
                url:`${axiosGlobal.defaultTargetApi}/comment/newCommentReply`,
                data:data,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            console.log(response);
        }catch(error){
            console.log(error);
            console.log('خطایی رخ داده')
        }
    }
    return(
        <Fragment>
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
                        <div  dir={langCtx.language === 'english' ?'ltr':'rtl'}  className={Style.commentItselfProfDiv}>
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
                                <div onClick={commentShowReply} className={Style.commentShowReplyDiv}>
                                    <FontAwesomeIcon className={Style.commentShowReplyArrow} icon="caret-down" color="#DCDCDC" />
                                    <h5><span>10 </span>پاسخ</h5>
                                    <FontAwesomeIcon className={Style.commentShowReplyArrow}  icon="caret-down" color="#DCDCDC" />
                                </div>
                            <div className={Style.commentReplyBtnDiv}>
                            {authCtx.decoded !== undefined ?
                                <button onClick={commentReplyOpen} className={Style.replyBtnButton}  >
                                        <FontAwesomeIcon   className={Style.commentReplyBtn} size="lg" icon="reply"  color="#DCDCDC" />
                                </button>
                            :authCtx.decoded === undefined ?
                                <button onClick={commentReplyOpen} className={Style.replyBtnButton}  >
                                        <FontAwesomeIcon   className={Style.commentReplyBtn} size="lg" icon="reply"  color="#DCDCDC" />
                                </button>
                            :null}

                            </div>
                        </div>
                    </div>
            </Col>
            {openReplySection === true?
                <Col dir={langCtx.language === 'english' ?'ltr':'rtl'} style={{ maxWidth:'90%' , margin:'8px auto 0px auto'}} xs={12} md={12} lg={12}>
                    <div style={{paddingBottom:'18px'}} className={Style.replySection}>
                        <h5>پاسخ شما...</h5>
                        <Row>
                            <Col style={{padding:'0px'}} xs={11} md={11} lg={11}>
                                <div style={{paddingTop:'0px', paddingBottom:'0px'}} className="textareaDiv">
                                    <Form.Control onChange={(e)=>{setComment(e.target.value)}} className="commentTextarea" as="textarea" rows={2} />
                                </div>
                            </Col>
                            <Col style={{padding:'0px'}} xs={1} md={1} lg={1}>                           
                                <div className={Style.btnDiv}>
                                    <button onClick={sendCommentReply} className={Style.sendReply}><SendIcon sx={{color:'#fff' , fontSize:'26px', transform:"rotate(180deg)"}}></SendIcon></button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            :null}
    </Fragment>
    );
}



export default CommentItself;


