import MainPage from "./components/mainPage";
//modules
import { useEffect } from "react";
import "@fontsource/roboto";
import {Route , useLocation , Redirect, Routes, useNavigate , Navigate} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCheckCircle, faUpload , faTimes , faStar ,faSearch , faPlus , faThumbsUp , faChevronLeft ,faChevronRight ,faExclamationCircle , faSignOutAlt , faFile , faUser  , faComments , faTags , faThumbsDown, faReply , faCaretDown , faQuestion , faCheck , faTimesCircle , faThLarge,  faTrashAlt , faEdit, faBars , faHeadset} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import ProductListPage from "./components/productListPage";
import ProductShowCase from "./components/productShowCase";
import ShowAllListPage from "./components/showAllListPage";
import MainNav from "./components/tools/mainNav";
import SignUp from "./components/tools/auth/signup";
import LogInNoModal from "./components/tools/auth/logInNoModal";
import AuthContext from "./store/auth";
import Cookies from "js-cookie";
import ResetPassword from "./components/tools/auth/resetPassword";
import ForgetPassword from "./components/tools/auth/forgetPassword";
import ReactGA from 'react-ga';
import usePageTracking from "./components/reactGA/pageTracker";
import Error404 from "./components/tools/404";
import BlogPost from "./components/blog";
import ShowBlog from "./components/showBlog";
import Shiping from "./components/shiping";
import Branches from "./components/branches";
import {Helmet} from "react-helmet";
library.add(faTimes , faUpload , faCheckCircle, farStar  , faStar , faSearch , faPlus , faChevronRight , faChevronLeft , faExclamationCircle ,faThumbsUp ,faSignOutAlt, faFile ,faUser, faComments , faTags , faThumbsDown  , faReply ,faCaretDown , faQuestion ,faBars , faThLarge , faCheck ,faTimesCircle , faTrashAlt ,faEdit , faHeadset )
function App() {
  usePageTracking();
  var currentLanguage = '';
  const location = useLocation();
  const navigate = useNavigate()
  if(Cookies.get('currentLang') === 'persian'){
    currentLanguage = 'pr';
  }else if(Cookies.get('currentLang') === 'english'){
    currentLanguage = 'en';
  }else if(Cookies.get('currentLang') === 'arabic'){
    currentLanguage = 'ar';
  }

  useEffect(() => {
    if(location.pathname === '/'){
      navigate(`/${currentLanguage}`)
    }
  }, []);
  return (
    
    <Routes>
          <Route path="*" element={<Error404/>}></Route>

          {/* pr */}
          <Route path="/pr" element={<MainPage/>}></Route>
          <Route path="/pr/productList" element={<ProductListPage/>}></Route>
          <Route path="/pr/showCase/:productId" element={<ProductShowCase/>}></Route>
          <Route path="/pr/fullList" element={<ShowAllListPage/>}></Route>
          <Route path="/pr/resetPassword/:id/:token" element={<ResetPassword/>}></Route>
          <Route path="/pr/forgetPassword" element={<ForgetPassword/>}></Route>
          <Route path="/pr/blog" element={<BlogPost/>}></Route>
          <Route path="/pr/shiping" element={<Shiping/>}></Route>
          <Route path="/pr/branches" element={<Branches/>}></Route>
          <Route path="/pr/blog/showBlog/:blogId" element={<ShowBlog/>}></Route>

          <Route path="/pr/signUp" element={Cookies.get('accessToken') === undefined ?
            <SignUp/>
          :
          <Navigate to="/pr" />
          }></Route>
          <Route path="/pr/logIn" element={Cookies.get('accessToken') === undefined ?
            <LogInNoModal/>
          :
          <Navigate to="/pr" />
          }></Route>
          
          {/* en */}
          <Route path="/en" element={<MainPage/>}></Route>
          <Route path="/en/productList" element={<ProductListPage/>}></Route>
          <Route path="/en/showCase/:productId" element={<ProductShowCase/>}></Route>
          <Route path="/en/fullList" element={<ShowAllListPage/>}></Route>
          <Route path="/en/resetPassword/:id/:token" element={<ResetPassword/>}></Route>
          <Route path="/en/forgetPassword" element={<ForgetPassword/>}></Route>
          <Route path="/en/blog" element={<BlogPost/>}></Route>
          <Route path="/en/shiping" element={<Shiping/>}></Route>
          <Route path="/en/branches" element={<Branches/>}></Route>
          <Route path="/en/blog/showBlog/:blogId" element={<ShowBlog/>}></Route>

          <Route path="/en/signUp" element={Cookies.get('accessToken') === undefined ?
            <SignUp/>
          :
          <Navigate to="/en" />
          }></Route>
          <Route path="/en/logIn" element={Cookies.get('accessToken') === undefined ?
            <LogInNoModal/>
          :
          <Navigate to="/en" />
          }></Route>


          {/* ar */}
          <Route path="/ar" element={<MainPage/>}></Route>
          <Route path="/ar/productList" element={<ProductListPage/>}></Route>
          <Route path="/ar/showCase/:productId" element={<ProductShowCase/>}></Route>
          <Route path="/ar/fullList" element={<ShowAllListPage/>}></Route>
          <Route path="/ar/resetPassword/:id/:token" element={<ResetPassword/>}></Route>
          <Route path="/ar/forgetPassword" element={<ForgetPassword/>}></Route>
          <Route path="/ar/blog" element={<BlogPost/>}></Route>
          <Route path="/ar/shiping" element={<Shiping/>}></Route>
          <Route path="/ar/branches" element={<Branches/>}></Route>
          <Route path="/ar/blog/showBlog/:blogId" element={<ShowBlog/>}></Route>

          <Route path="/ar/signUp" element={Cookies.get('accessToken') === undefined ?
            <SignUp/>
          :
          <Navigate to="/ar" />
          }></Route>
          <Route path="/ar/logIn" element={Cookies.get('accessToken') === undefined ?
            <LogInNoModal/>
          :
          <Navigate to="/ar" />
          }></Route>
    </Routes>


  )
}

export default App;
