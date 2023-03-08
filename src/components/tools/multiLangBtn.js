//modules
import Style from './multiLangBtn.module.css';
import per from '../../assets/per.png';
import arb from '../../assets/arb.png';
import eng from '../../assets/eng.png';
import { useContext } from 'react';
import Language from '../../store/language';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const MultiLangBtn = () =>{
    const navigation = useNavigate();
    const langCtx = useContext(Language);
    const setLang = (e)=>{
            Cookies.set('currentLang',e.currentTarget.value , {sameSite: 'strict', secure: false , expires:8});
            langCtx.activeLangFn(e.currentTarget.value);
            if(langCtx === 'persian'){
                navigation('/pr');
            }else if(langCtx === 'english'){
                navigation('/en');
            }else if(langCtx === 'arabic'){
                navigation('/ar')
            }
    }
    return(

        
        <div className={Style.btnDiv}>
            <button onClick={setLang} value='persian' className={langCtx.language=== 'persian' ?`${Style.active} ${Style.perBtn}`:`${Style.perBtn}`}><div className={langCtx.language=== 'persian' ?`${Style.btnIcon} ${Style.active}`:`${Style.btnIcon}`} style={{ backgroundImage: `url(${per})` }}></div>فارسی</button>
            <button onClick={setLang} value='arabic' className={langCtx.language=== 'arabic' ?`${Style.active} ${Style.perBtn}`:`${Style.perBtn}`}><div className={langCtx.language=== 'arabic' ?`${Style.btnIcon} ${Style.active}`:`${Style.btnIcon}`} style={{ backgroundImage: `url(${arb})` }}></div>عربی</button>
            <button onClick={setLang} value='english' className={langCtx.language=== 'english' ?`${Style.active} ${Style.perBtn}`:`${Style.perBtn}`}><div className={langCtx.language=== 'english' ?`${Style.btnIcon} ${Style.active}`:`${Style.btnIcon}`} style={{ backgroundImage: `url(${eng})` }}></div>English</button>
        </div>
    )
}

export default MultiLangBtn;