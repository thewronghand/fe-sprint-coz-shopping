import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { bookmarksState } from "../recoil/bookmarksState";

function useBookmarkUpdate(data, updateModal, updateToast) {
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState);
  const [isBookmarked, setIsBookmarked] = useState(!!bookmarks.get(data.id));
  useEffect(() => {
    setIsBookmarked(!!bookmarks.get(data.id));
  }, [bookmarks, data.id]);

  const handleBookmarkUpdate = () => {
    const prevBookmarks = new Map(bookmarks);

    if (!isBookmarked) {
      prevBookmarks.set(data.id, data);
    } else {
      prevBookmarks.delete(data.id);
    }
    setBookmarks(prevBookmarks);
    setIsBookmarked(!isBookmarked);
    updateToast(isBookmarked);
    updateModal();
  };
  return { isBookmarked, handleBookmarkUpdate };
}

export default useBookmarkUpdate;
