import Style from "./sortModal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment  ,React} from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";
import SortTopToolBar from "./sortTopToolBar";
import CloseIcon from '@mui/icons-material/Close';
import BlogFilter from "./blogFilter";

const ModalPortal =(props)=>{
    return(
        <Fragment>
                <div className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                    <div onClick={props.closeModalFn}  className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>
                    <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                        <CloseIcon onClick={props.closeModalFn} className={Style.closeBtn}></CloseIcon>
                        {props.topBarMode === 'blog'?
                            <BlogFilter setShowSortModal={props.setShowSortModal} closeModal={props.closeModalFn}></BlogFilter>
                        :props.topBarMode === 'product'?
                            <SortTopToolBar setShowSortModal={props.setShowSortModal} closeModal={props.closeModalFn}></SortTopToolBar>
                        :null}
                    </div>
                </div>
        </Fragment>
    )
}
const SortModal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <ModalPortal topBarMode={props.topBarMode} setShowSortModal={props.setShowSortModal} closeModalFn={props.closeModalFn}  showModal={props.showModal} ></ModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default SortModal;
