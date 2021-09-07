//ROUTING IMPORTS
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
//CONTEXT
import VideoSearchProvider from "./components/store/VideoSearchCtx";
import VideoDetailProvider from "./components/store/VideoDetailCtx";
import HistoryProvider from "./components/store/HistoryCtx";
import FavoritesProvider from "./components/store/FavoritesCtx";

//REACT & COMPONENTS IMPORT
import Layout from "./layout/Layout";
import DevelopersConsolePage from "./pages/DevelopersConsolePage";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import MainPage from "./pages/MainPage";
import VideoDetailPage from "./pages/VideoDetailPage";

import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <VideoSearchProvider>
        <VideoDetailProvider>
          <FavoritesProvider>
            <HistoryProvider>
              <Layout>
                <Switch>
                  <Route
                    path="/videodetail/:videoId"
                    component={VideoDetailPage}
                  ></Route>
                  <Route path="/favorites" component={FavoritesPage}></Route>
                  <Route path="/history" component={HistoryPage}></Route>
                  <Route
                    path="/developer"
                    component={DevelopersConsolePage}
                  ></Route>

                  <Route path="/home/:searchTerm" component={MainPage}></Route>
                  <Route path="/home" component={MainPage} exact></Route>
                  <Redirect from="/" to="/home/" component={MainPage} />
                </Switch>
              </Layout>
            </HistoryProvider>
          </FavoritesProvider>
        </VideoDetailProvider>
      </VideoSearchProvider>
    </Fragment>
  );
};

export default App;
