//ROUTING IMPORTS
import { Route, Switch } from "react-router";
//CONTEXT
import VideoSearchProvider from "./components/store/VideoSearchCtx";
import VideoDetailProvider from "./components/store/VideoDetailCtx";
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
              <Route path="/" component={MainPage} exact></Route>
              <Route path="/:searchTerm" component={MainPage} exact></Route>
            </Switch>
          </Layout>
        </VideoDetailProvider>
      </VideoSearchProvider>
    </Fragment>
  );
};

export default App;

/*
 if (videos.length === 0) {
        await localStorage.setItem(searchStr, JSON.stringify(res.data.items));
      } else {
        await localStorage.setItem(
          searchStr,
          JSON.stringify([...videos, res.data.items])
        );
      }

*/

/*
     await setSelectedVideo((prev) => videos[0]);
      await setSelectId((prev) => videos[0].id.videoId);
*/
