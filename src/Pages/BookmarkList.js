import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import CardGenerator from "../Components/CardVariations";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";
import Toast from "../Components/Toast";
import Filter from "../Components/Filter";
import { useInView } from "react-intersection-observer";
import { ReactComponent as SkeletonLoading } from "../skeleton-loading.svg";
import { ReactComponent as EmptyFolderIcon } from "../folder-open-regular.svg";

const maxToastCount = 4;
const initialItemViewCount = 16;

const BookmarkListMain = styled.main`
  padding-top: 52px;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookmarkListContainer = styled.ul`
  min-width: 1152px;
  max-width: 1152px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
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

function BookmarkList() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]);
  const bookmarks = useRecoilValue(bookmarksState);
  const bookmarksOrder = useRecoilValue(bookmarksOrderState);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [renderedItemsCount, setRenderedItemsCount] =
    useState(initialItemViewCount);
  const { ref, inView } = useInView({ threshold: 0 });
  const loadingRef = useRef(null); // useRef로 스크롤 위치를 저장할 변수 추가

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("bookmarksOrder", JSON.stringify(bookmarksOrder));
  }, [bookmarksOrder]);

  useEffect(() => {
    let delay;
    if (inView && renderedItemsCount < bookmarksOrder.length) {
      setIsLoading(true);
      delay = setTimeout(() => {
        setIsLoading(false);
        setRenderedItemsCount((prevCount) => prevCount + initialItemViewCount);
      }, 1000);
    }

    return () => {
      clearTimeout(delay);
    };
  }, [inView]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = bookmarksOrder
        .filter((item) => {
          if (currentFilter === "All") return true;
          return bookmarks[item].type === currentFilter;
        })
        .slice(0, renderedItemsCount)
        .map((item) => bookmarks[item]);
      setFilteredBookmarks(filtered);
    };
    filterProducts();
  }, [bookmarks, bookmarksOrder, currentFilter, renderedItemsCount]);

  useEffect(() => {
    if (!isLoading && loadingRef.current) {
      loadingRef.current.scrollIntoView();
    }
  }, [isLoading]);

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
    <BookmarkListMain>
      <Filter setCurrentFilter={setCurrentFilter} />
      <BookmarkListContainer>
        {filteredBookmarks.map((product, index) => {
          if (index === filteredBookmarks.length - 1) {
            // 마지막 아이템일 때 loadingRef에 ref를 할당하여 스크롤 위치 저장
            return (
              <div key={product.id} ref={loadingRef}>
                {CardGenerator(product, handleBookmarkToggle)}
              </div>
            );
          } else {
            return CardGenerator(product, handleBookmarkToggle);
          }
        })}
        <div className="toast-container">
          <Toast messages={toastMessages} removeToast={removeToastMessage} />
        </div>
      </BookmarkListContainer>
      <div ref={ref} />
      {Object.keys(bookmarks).length === 0 && (
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
      {Object.keys(bookmarks).length > initialItemViewCount && isLoading && (
        <SkeletonLoading />
      )}
    </BookmarkListMain>
  );
}

export default BookmarkList;
