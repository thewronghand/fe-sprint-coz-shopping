import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import {
  MainContainer,
  ListSection,
  SectionTitle,
  ItemList,
  EmptyBookmarkListIndicator,
} from "./styles/MainStyles";
import Toast from "../Components/Toast";
import { bookmarksState } from "../recoil/bookmarksState";
import CardGenerator from "../Components/CardVariations";
import { ReactComponent as EmptyFolderIcon } from "../folder-open-regular.svg";

const maxToastCount = 4;
const defaultProductViewCount = 4;
const sliceArrayByCount = (arr) => {
  return arr.slice(0, defaultProductViewCount);
};

function Main() {
  const [products, setProducts] = useState({});
  const bookmarks = useRecoilValue(bookmarksState);

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

  useEffect(() => {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(Array.from(bookmarks.entries()))
    );
  }, [bookmarks]);

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
    if (toastMessages.length >= maxToastCount) {
      removeToastMessage(toastMessages[toastMessages.length - 1].id);
    }
    addToastMessage(toastMessage);
  };

  return (
    <MainContainer>
      <ListSection>
        <SectionTitle>
          <Link to="/products/list">상품 리스트</Link>
        </SectionTitle>
        <ItemList>
          {sliceArrayByCount(Object.keys(products)).map((key) =>
            CardGenerator(products[key], handleBookmarkToggle)
          )}
        </ItemList>
      </ListSection>
      <ListSection>
        <SectionTitle>
          <Link to="/bookmark">북마크 리스트</Link>
        </SectionTitle>
        <ItemList>
          {bookmarks && bookmarks.size > 0 ? (
            sliceArrayByCount(Array.from(bookmarks.values()).reverse()).map(
              (value) => CardGenerator(value, handleBookmarkToggle)
            )
          ) : (
            <EmptyBookmarkListIndicator>
              <EmptyFolderIcon
                style={{
                  width: "100px",
                  marginBottom: "10px",
                  fill: "#452cdd",
                }}
              />
              <div>북마크한 상품이 하나도 없어요!</div>
              <div className="sub-title">뭔가 담아볼까요?</div>
            </EmptyBookmarkListIndicator>
          )}
        </ItemList>
      </ListSection>

      <div className="toast-container">
        <Toast messages={toastMessages} removeToast={removeToastMessage} />
      </div>
    </MainContainer>
  );
}

export default Main;
