// Bookmark.js
import { useEffect } from "react";

function Bookmark({ data, isBookmarked, setIsBookmarked }) {
  useEffect(() => {
    checkBookmarkStatus();
  }, [data]);

  const checkBookmarkStatus = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmark") || "[]");
    const isDataBookmarked = bookmarks.some(
      (bookmark) => bookmark.id === data.id
    );

    setIsBookmarked(isDataBookmarked);
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmark") || "[]");
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== data.id
      );
      localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      const updatedBookmarks = [...bookmarks, data];
      localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <div style={{ cursor: "pointer" }}>
      {isBookmarked ? (
        <img src="bookmark-on.png" alt="bookmark-on" onClick={toggleBookmark} />
      ) : (
        <img
          src="bookmark-off.png"
          alt="bookmark-off"
          onClick={toggleBookmark}
        />
      )}
    </div>
  );
}

export default Bookmark;
