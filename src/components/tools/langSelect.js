import { Fragment  , useState} from 'react';
import Style from './langSelect.module.css';
import Pr from '../../assets/per.png';
import En from '../../assets/eng.png';
import Ar from '../../assets/arb.png';
import { useContext } from 'react';
import Language from '../../store/language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import jsCookie from 'js-cookie';
import Loading from '../../store/loading';
import { useNavigate } from 'react-router-dom';
import AxiosGlobal from '../../store/axiosGlobal';

const LangSelect = (props) =>{
    const [openMenu , setOpenMenu] = useState(false);
    const axiosGlobal = useContext(AxiosGlobal);
    const navigate = useNavigate();
    const loadingCtx = useContext(Loading);
    const openList = () =>{
        if(props.closeLangPicker === true){
            setOpenMenu(false);
            props.setCloseLangPicker(false);
        }else if(props.closeLangPicker === false){
            setOpenMenu(true);
            props.setCloseLangPicker(true);
        }

    }
    const select = (e) =>{
        jsCookie.set('currentLang',e.currentTarget.value , {sameSite: 'strict', secure: true});
        langCtx.activeLangFn(e.currentTarget.value);  
        setOpenMenu(false);  
        props.setCloseLangPicker(false);
        loadingCtx.loadingStatus(false);
        if(e.currentTarget.value === 'persian'){
            navigate('/pr')
        }else if(e.currentTarget.value === 'english'){
            navigate('/en')

        }else if(e.currentTarget.value === 'arabic'){
            navigate('/ar')

        }
        }
    const list = [{showName:'فارسی' , value:'persian' , icon:Pr} , {showName:'English' , value:'english' , icon:En} , {showName:'العربية' , value:'arabic' , icon:Ar} ]
    const langCtx = useContext(Language);
    return(
        <Fragment>

            <div>
                {list.map(data=>{      
                    if(data.value === langCtx.language){
                        return(
                            <button value={data.value} onClick={openList} dir='rtl' className={Style.selectLangBtn}>
                                <img alt={data.showName} title={data.showName} src={data.icon}></img>
                                     <span className={Style.name}>{data.showName}</span>
                                <div className={Style.arrowIconDiv}>
                                     <span className={Style.arrowIcon}><ArrowDropDownIcon  style={props.closeLangPicker === true?{transform:'rotate(180deg)'}:props.closeLangPicker === false?{transform:'rotate(0deg)'}:null} sx={{color:'#fff'}}></ArrowDropDownIcon></span>
                                </div>
                            </button>
                        )
                    }        

                })}
                {props.closeLangPicker === true ?
                    <div className={Style.list}>
                        {list.map(data=>{
                            if(data.value !== langCtx.language){
                            return(   
                                <button onClick={select} value={data.value} dir='rtl' className={Style.selectLangBtnInList}>
                                    <img src={data.icon}></img>
                                    <span className={Style.nameOnList}>{data.showName}</span>
                                </button>
                            )}
                        })}
                    </div>
                :null}
            </div>

        </Fragment>
    )
}
export default LangSelect;