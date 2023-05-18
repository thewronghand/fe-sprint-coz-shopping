import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";
import { bookmarksState } from "../recoil/bookmarksState";
import { useToast } from "../hooks/useToast";
import useBookmarkSync from "../hooks/useBookmarkSync";

import CardGenerator from "../Components/CardVariations";
import Toast from "../Components/Toast";
import Filter from "../Components/Filter";
import { ReactComponent as SkeletonLoading } from "../skeleton-loading.svg";
import { ReactComponent as EmptyFolderIcon } from "../folder-open-regular.svg";
import { EmptyBookmarkListIndicator } from "./styles/MainStyles";
import { ListContainer, ListMain } from "./styles/ListPageStyles";

const initialItemViewCount = 16;

function BookmarkList() {
  const bookmarks = useRecoilValue(bookmarksState);
  const { toastMessages, handleBookmarkToggle, removeToastMessage } =
    useToast();
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [renderedItemsCount, setRenderedItemsCount] =
    useState(initialItemViewCount);
  const { ref, inView } = useInView({ threshold: 0 });
  const loadingRef = useRef(null);

  useBookmarkSync();

  useEffect(() => {
    const filterProducts = () => {
      const filtered = Array.from(bookmarks.values())
        .reverse()
        .filter((item) => {
          if (currentFilter === "All") return true;
          return item.type === currentFilter;
        });
      setFilteredBookmarks(filtered);
    };
    filterProducts();
  }, [bookmarks, currentFilter]);

  useEffect(() => {
    setRenderedItemsCount(initialItemViewCount);
  }, [currentFilter]);

  useEffect(() => {
    let delay;
    if (inView && renderedItemsCount < bookmarks.size) {
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
    if (!isLoading && loadingRef.current) {
      loadingRef.current.scrollIntoView();
    }
  }, [isLoading]);

  const showEmptyBookmarkIndicator =
    bookmarks.size === 0 ||
    (currentFilter !== "All" && filteredBookmarks.length === 0);

  return (
    <ListMain>
      <Filter setCurrentFilter={setCurrentFilter} />
      <ListContainer>
        {filteredBookmarks
          .slice(0, renderedItemsCount)
          .map((product, index) => {
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
      </ListContainer>
      <div ref={ref} />
      {showEmptyBookmarkIndicator && (
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
      {currentFilter === "All" &&
        bookmarks.size > renderedItemsCount &&
        isLoading && <SkeletonLoading />}
      {currentFilter !== "All" &&
        Array.from(bookmarks.values())
          .reverse()
          .filter((item) => {
            if (currentFilter === "All") return true;
            return item.type === currentFilter;
          }).length > renderedItemsCount &&
        isLoading && <SkeletonLoading />}
    </ListMain>
  );
}

export default BookmarkList;
