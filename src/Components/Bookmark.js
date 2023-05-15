import { useEffect, useState } from "react";

function Bookmark({ data }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, []);

  const checkBookmarkStatus = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmark") || "[]");
    const isDataBookmarked = bookmarks.includes(data);

    setIsBookmarked(isDataBookmarked);
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmark") || "[]");

    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((item) => item.id !== data.id);
      localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      const updatedBookmarks = [data, ...bookmarks];
      localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }

    setIsBookmarked(!isBookmarked);
  };

  return (
    <div>
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
