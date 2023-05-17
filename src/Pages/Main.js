import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import Card from "../Components/Card";

import Toast from "../Components/Toast";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";
import CardGenerator from "../Components/CardVariations";
import { ReactComponent as EmptyFolderIcon } from "../folder-open-regular.svg";

const maxToastCount = 4;
const defaultProductViewCount = 4;
const sliceArrayByCount = (arr) => {
  return arr.slice(0, defaultProductViewCount);
};

const MainContainer = styled.main`
  padding-top: 52px;
  display: flex;
  flex-direction: column;
`;

const ListSection = styled.section`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  width: 1130px;
  font-weight: 600;
  font-size: 24px;
`;

const ItemList = styled.ul`
  width: 1152px;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`;

const EmptyBookmarkListIndicator = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 288px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #452cdd;
  > .sub-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: black;
    margin-top: 5px;
  }
`;

function Main() {
  const [products, setProducts] = useState({});
  const bookmarks = useRecoilValue(bookmarksState);
  const bookmarksOrder = useRecoilValue(bookmarksOrderState);

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
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("bookmarksOrder", JSON.stringify(bookmarksOrder));
  }, [bookmarksOrder]);

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
        <SectionTitle>상품 리스트</SectionTitle>
        <ItemList>
          {sliceArrayByCount(Object.keys(products)).map((key) =>
            CardGenerator(products[key], handleBookmarkToggle)
          )}
        </ItemList>
      </ListSection>
      <ListSection>
        <SectionTitle>북마크 리스트</SectionTitle>
        <ItemList>
          {bookmarks && bookmarksOrder.length > 0 ? (
            sliceArrayByCount(bookmarksOrder).map((key) =>
              CardGenerator(bookmarks[key], handleBookmarkToggle)
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
