import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { bookmarksState } from "../recoil/bookmarksState";

function useBookmarkSync() {
  const bookmarks = useRecoilValue(bookmarksState);

  useEffect(() => {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(Array.from(bookmarks.entries()))
    );
  }, [bookmarks]);
}

export default useBookmarkSync;
