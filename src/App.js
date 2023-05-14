import { RecoilRoot } from "recoil";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Pages/Main";
import ProductList from "./Pages/ProductList";
import BookmarkList from "./Pages/BookmarkList";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/products/list">
          <ProductList />
        </Route>
        <Route path="/bookmark">
          <BookmarkList />
        </Route>
      </Switch>
      <Footer />
    </RecoilRoot>
  );
}

export default App;
