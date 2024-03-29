
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './searchBarV2.module.css';
import Loader from './loader';
import {useContext} from 'react';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import Language from '../../store/language';

let SearchBarV2 = (props)=>{
    const langCtx = useContext(Language);
    return (
        langCtx.language === 'english' ?
            <div dir='rtl' className={Style.searchBarDiv}>
                <input style={{textAlign:'left' , borderRadius:'5px' , borderTopLeftRadius:'0px' , borderBottomRightRadius:'5px' , borderBottomLeftRadius:'0px'}} onChange={props.onChange} placeholder='...search' className={Style.searchBar} type='search'></input>

                <div style={{borderRadius:'5px' , padding: '7px 5px 0px 10px', borderTopRightRadius:'0px' , borderBottomRightRadius:'0px'}} className={Style.searchBtn}>{props.searchLoadingStatus === true?<Loader marginBottom={'2px'} borderTop={'3px solid #fff'} border={'#1043A9 3px solid'} width={'22px'} height={'22px'}></Loader>:props.searchLoadingStatus === false?<SearchIcon sx={{color:'#1043A9'}}></SearchIcon>:null}</div>
                {/* <div className={Style.clearBtn}>            
                    <FontAwesomeIcon size='lg' color='#000' icon='times'></FontAwesomeIcon>
                </div> */}
            </div>
        :
            <div dir='rtl' className={Style.searchBarDiv}>
                <div  className={Style.searchBtn}>{props.searchLoadingStatus === true?<Loader marginBottom={'2px'} borderTop={'3px solid #fff'} border={'#1043A9 3px solid'} width={'22px'} height={'22px'}></Loader>:props.searchLoadingStatus === false?<SearchIcon sx={{color:'#1043A9'}}></SearchIcon>:null}</div>
                <input onChange={props.onChange} placeholder={langCtx.language === 'persian' ? 'جستجو...':langCtx.language === 'english' ? 'search...':langCtx.language === 'arabic'? 'بحث...':null} className={Style.searchBar} type='search'></input>
                {/* <div className={Style.clearBtn}>            
                    <FontAwesomeIcon size='lg' color='#000' icon='times'></FontAwesomeIcon>
                </div> */}
            </div>
    )
}
export default SearchBarV2;