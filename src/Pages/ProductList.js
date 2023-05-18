import { useState, useEffect, useRef } from "react"; // useRef 추가
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";
import { bookmarksState } from "../recoil/bookmarksState";

import CardGenerator from "../Components/CardVariations";
import Toast from "../Components/Toast";
import Filter from "../Components/Filter";
import { ReactComponent as SkeletonLoading } from "../skeleton-loading.svg";
import { ListContainer, ListMain } from "./styles/ListPageStyles";

const maxToastCount = 4;
const initialItemViewCount = 16;

function ProductList() {
  const [products, setProducts] = useState([]);

  const bookmarks = useRecoilValue(bookmarksState);

  const [currentFilter, setCurrentFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [renderedItemsCount, setRenderedItemsCount] =
    useState(initialItemViewCount);
  const { ref, inView } = useInView({ threshold: 0 });
  const loadingRef = useRef(null);

  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
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

  useEffect(() => {
    const filterProducts = () => {
      const filtered = Object.keys(products)
        .filter((item) => {
          if (currentFilter === "All") return true;
          return products[item].type === currentFilter;
        })
        .slice(0, renderedItemsCount)
        .map((item) => products[item]);
      setFilteredProducts(filtered);
    };
    filterProducts();
  }, [products, currentFilter, renderedItemsCount]);

  useEffect(() => {
    let delay;
    if (inView && renderedItemsCount < products.length) {
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
    <ListMain>
      <Filter setCurrentFilter={setCurrentFilter} />
      <ListContainer>
        {filteredProducts.map((product, index) => {
          if (index === filteredProducts.length - 1) {
            return (
              <div key={product.id} ref={loadingRef}>
                {CardGenerator(product, handleBookmarkToggle)}
              </div>
            );
          }
          return CardGenerator(product, handleBookmarkToggle);
        })}
        <div className="toast-container">
          <Toast messages={toastMessages} removeToast={removeToastMessage} />
        </div>
      </ListContainer>
      <div ref={ref} />
      {isLoading && <SkeletonLoading />}
    </ListMain>
  );
}

export default ProductList;
