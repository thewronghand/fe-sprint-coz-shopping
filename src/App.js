import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Pages/Main";
import ProductList from "./Pages/ProductList";
import BookmarkList from "./Pages/BookmarkList";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/products/list" element={<ProductList />} />
        <Route path="/bookmark" element={<BookmarkList />} />
      </Routes>
      <Footer />
    </RecoilRoot>
  );
}

export default App;
