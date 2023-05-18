import { useState } from "react";

const maxToastCount = 4;

export function useToast() {
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

  return {
    toastMessages,
    handleBookmarkToggle,
    removeToastMessage,
  };
}
