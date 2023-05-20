import { useState, useEffect, useRef } from "react"; // useRef 추가
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";
import { bookmarksState } from "../recoil/bookmarksState";
import { useToast } from "../hooks/useToast";
import useBookmarkSync from "../hooks/useBookmarkSync";

import CardGenerator from "../Components/CardVariations";
import Toast from "../Components/Toast";
import Filter from "../Components/Filter";
import { ReactComponent as SkeletonLoading } from "../skeleton-loading.svg";
import { ListContainer, ListMain } from "./styles/ListPageStyles";

const initialItemViewCount = 16;

function ProductList() {
  const [products, setProducts] = useState([]);
  const { toastMessages, handleBookmarkToggle, removeToastMessage } =
    useToast();

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

  useBookmarkSync();

  useEffect(() => {
    const filterProducts = () => {
      const filtered = Object.keys(products)
        .filter((item) => {
          if (currentFilter === "All") return true;
          return products[item].type === currentFilter;
        })
        .map((item) => products[item]);
      setFilteredProducts(filtered);
    };
    filterProducts();
  }, [products, currentFilter]);

  useEffect(() => {
    setRenderedItemsCount(initialItemViewCount);
  }, [currentFilter]);

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

  return (
    <ListMain>
      <Filter setCurrentFilter={setCurrentFilter} />
      <ListContainer>
        {filteredProducts.slice(0, renderedItemsCount).map((product, index) => {
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
      {currentFilter === "All" &&
        products.length > renderedItemsCount &&
        isLoading && <SkeletonLoading />}
      {currentFilter !== "All" &&
        filteredProducts.length > renderedItemsCount &&
        isLoading && <SkeletonLoading />}
    </ListMain>
  );
}

export default ProductList;
