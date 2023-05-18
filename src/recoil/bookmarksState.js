import { atom } from "recoil";

const initialBookmarksData = localStorage.getItem("bookmarks");
const initialBookmarks = initialBookmarksData
  ? new Map(JSON.parse(initialBookmarksData))
  : new Map();
export const bookmarksState = atom({
  key: "bookmarksState",
  default: initialBookmarks,
});
