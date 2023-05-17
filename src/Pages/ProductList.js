import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import CardGenerator from "../Components/CardVariations";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";
import Toast from "../Components/Toast";
import Filter from "../Components/Filter";

const ProductListMain = styled.main`
  padding-top: 52px;
`;

const ProductListContainer = styled.ul`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

function ProductList() {
  const [products, setProducts] = useState({});
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState);
  const [bookmarksOrder, setBookmarksOrder] =
    useRecoilState(bookmarksOrderState);
  const [currentFilter, setCurrentFilter] = useState("전체");

  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("bookmarksOrder", JSON.stringify(bookmarksOrder));
  });

  const [toastMessages, setToastMessages] = useState([]);
  const addToastMessage = (message) => {
    setToastMessages((prevMessages) => [message, ...prevMessages]);
  };
  const removeToastMessage = (id) => {
    setToastMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };
  const handleBookmarkToggle = (isBookmarked) => {
    const toastMessage = {
      id: Date.now(),
      content: (
        <div className="toast">
          <img
            src={!isBookmarked ? "/bookmark-on.png" : "/bookmark-off.png"}
            alt={!isBookmarked ? "bookmark-on" : "bookmark-off"}
          />
          <div className="toast-message">
            {isBookmarked
              ? "상품이 북마크에서 제거되었습니다."
              : "상품이 북마크에 추가되었습니다."}
          </div>
        </div>
      ),
    };
    addToastMessage(toastMessage);
  };
  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products?count=4")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다:", error);
      });
  }, []);
  return (
    <ProductListMain>
      <Filter setCurrentFilter={setCurrentFilter} />
      <ProductListContainer>
        {Object.keys(products)
          .filter((item) => {
            if (currentFilter === "전체") return true;
            if (currentFilter === "상품" && products[item].type === "Product")
              return true;
            if (
              currentFilter === "카테고리" &&
              products[item].type === "Category"
            )
              return true;
            if (
              currentFilter === "기획전" &&
              products[item].type === "Exhibition"
            )
              return true;
            if (currentFilter === "브랜드" && products[item].type === "Brand")
              return true;
            return false;
          })
          .map((item) => CardGenerator(products[item], handleBookmarkToggle))}
        <div className="toast-container">
          <Toast messages={toastMessages} removeToast={removeToastMessage} />
        </div>
      </ProductListContainer>
    </ProductListMain>
  );
}

export default ProductList;
