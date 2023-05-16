import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Card from "../Components/Card";
import Toast from "../Components/Toast";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";
import CardGenerator from "../Components/CardVariations";

function Main() {
  const [products, setProducts] = useState({});
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState);
  const [bookmarksOrder, setBookmarksOrder] =
    useRecoilState(bookmarksOrderState);

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
            src={!isBookmarked ? "bookmark-on.png" : "bookmark-off.png"}
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

  const testObj = {
    36: {
      id: 36,
      type: "Exhibition",
      title: "카공족 필수템",
      sub_title: "베스트 아이템 30% 할인",
      brand_name: null,
      price: null,
      discountPercentage: null,
      image_url:
        "https://images.unsplash.com/photo-1516342243255-ac2202f9f149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      brand_image_url: null,
      follower: null,
    },
    29: {
      id: 29,
      type: "Product",
      title: "에어팟 맥스",
      sub_title: null,
      brand_name: null,
      price: "110520",
      discountPercentage: 50,
      image_url:
        "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      brand_image_url: null,
      follower: null,
    },
    14: {
      id: 14,
      type: "Brand",
      title: null,
      sub_title: null,
      brand_name: "나이키",
      price: null,
      discountPercentage: null,
      image_url: null,
      brand_image_url:
        "https://images.unsplash.com/photo-1608541737042-87a12275d313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1722&q=80",
      follower: 7598,
    },
    86: {
      id: 86,
      type: "Brand",
      title: null,
      sub_title: null,
      brand_name: "칼하트",
      price: null,
      discountPercentage: null,
      image_url: null,
      brand_image_url:
        "https://images.unsplash.com/photo-1622408298915-24d322badf9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
      follower: 6287,
    },
    96: {
      id: 96,
      type: "Category",
      title: "다이어트",
      sub_title: null,
      brand_name: null,
      price: null,
      discountPercentage: null,
      image_url:
        "https://images.unsplash.com/photo-1627820751275-e44b937c5d33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      brand_image_url: null,
      follower: null,
    },
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {Object.keys(products)
          .slice(0, 4)
          .map((key) => CardGenerator(products[key], handleBookmarkToggle))}
      </div>
      <div style={{ display: "flex" }}>
        {Object.keys(testObj)
          .slice(0, 4)
          .map((key) => CardGenerator(testObj[key], handleBookmarkToggle))}
      </div>
      <div style={{ display: "flex" }}>
        {bookmarks && bookmarksOrder.length > 0 ? (
          bookmarksOrder
            .slice(0, 4)
            .map((key) => CardGenerator(bookmarks[key], handleBookmarkToggle))
        ) : (
          <div>북마크가 비었습니다.</div>
        )}
      </div>

      <div className="toast-container">
        <Toast messages={toastMessages} removeToast={removeToastMessage} />
      </div>
    </>
  );
}

export default Main;
