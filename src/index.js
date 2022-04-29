import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LanguageProvider} from './store/language';
import { AxiosGlobalProvider } from './store/axiosGlobal';
import {PostForAllProvider} from './store/getPostForAll';
import { ActivePageProvider } from './store/activePage';
import { AuthContextProvider } from './store/auth';
import { LoadingProvider } from './store/loading';

ReactDOM.render(
      <LanguageProvider>
            <LoadingProvider>
                  <AxiosGlobalProvider>
                        <PostForAllProvider>
                              <BrowserRouter>
                                    <AuthContextProvider>
                                          <ActivePageProvider>
                                                <App />
                                          </ActivePageProvider>
                                    </AuthContextProvider>
                              </BrowserRouter>
                        </PostForAllProvider>
                  </AxiosGlobalProvider>
            </LoadingProvider>
      </LanguageProvider>


, document.getElementById('root'));
