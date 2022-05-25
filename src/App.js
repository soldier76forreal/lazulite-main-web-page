import MainPage from "./components/mainPage";
//modules
import "@fontsource/roboto";
import {Route , Redirect, Routes, useNavigate , Navigate} from "react-router-dom";
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

library.add(faTimes , faUpload , faCheckCircle, farStar  , faStar , faSearch , faPlus , faChevronRight , faChevronLeft , faExclamationCircle ,faThumbsUp ,faSignOutAlt, faFile ,faUser, faComments , faTags , faThumbsDown  , faReply ,faCaretDown , faQuestion ,faBars , faThLarge , faCheck ,faTimesCircle , faTrashAlt ,faEdit , faHeadset )
function App() {
  usePageTracking();

  return (
    <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/productList" element={<ProductListPage/>}></Route>
          <Route path="/showCase/:productId" element={<ProductShowCase/>}></Route>
          <Route path="/fullList" element={<ShowAllListPage/>}></Route>
          <Route path="/resetPassword/:id/:token" element={<ResetPassword/>}></Route>
          <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
          <Route path="/blog" element={<BlogPost/>}></Route>
          <Route path="/blog/showBlog/:blogId" element={<ShowBlog/>}></Route>
          <Route path="*" element={<Error404/>}></Route>

          <Route path="/signUp" element={Cookies.get('accessToken') === undefined ?
            <SignUp/>
          :
          <Navigate to="/" />
          }></Route>
          <Route path="/logIn" element={Cookies.get('accessToken') === undefined ?
            <LogInNoModal/>
          :
          <Navigate to="/" />
          }></Route>
          {/* {Cookies.get('accessToken') === undefined ?
            <Route path="/signUp" element={<SignUp/>}></Route>
            :
            
          }
          {Cookies.get('accessToken') === undefined ?
            <Route path="/logIn" element={<LogInNoModal/>}></Route>

          :
            
            <Navigate to="/" />
          } */}
    </Routes>

  )
}

export default App;
