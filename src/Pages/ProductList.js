import { useState, useEffect, useRef } from "react"; // useRef 추가
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import CardGenerator from "../Components/CardVariations";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";
import Toast from "../Components/Toast";
import Filter from "../Components/Filter";
import { useInView } from "react-intersection-observer";
import { ReactComponent as SkeletonLoading } from "../skeleton-loading.svg";

const maxToastCount = 4;
const initialItemViewCount = 16;

const ProductListMain = styled.main`
  padding-top: 52px;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductListContainer = styled.ul`
  max-width: 1152px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState({});
  const [toastMessages, setToastMessages] = useState([]);
  const bookmarks = useRecoilValue(bookmarksState);
  const bookmarksOrder = useRecoilValue(bookmarksOrderState);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [renderedItemsCount, setRenderedItemsCount] =
    useState(initialItemViewCount);
  const { ref, inView } = useInView({ threshold: 0 });
  const loadingRef = useRef(null); // useRef로 스크롤 위치를 저장할 변수 추가

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
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("bookmarksOrder", JSON.stringify(bookmarksOrder));
  }, [bookmarksOrder]);

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
    if (!isLoading && loadingRef.current) {
      // 로딩이 끝나고 스크롤 위치가 저장되어 있는 경우
      loadingRef.current.scrollIntoView(); // 스크롤 위치로 이동
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
    <ProductListMain>
      <Filter setCurrentFilter={setCurrentFilter} />
      <ProductListContainer>
        {filteredProducts.map((product, index) => {
          if (index === filteredProducts.length - 1) {
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
      </ProductListContainer>
      <div ref={ref} />
      {isLoading && <SkeletonLoading />}
    </ProductListMain>
  );
}

export default ProductList;
