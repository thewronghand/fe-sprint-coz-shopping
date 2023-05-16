import { atom } from "recoil";

const initialBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
const initialBookmarksOrder =
  JSON.parse(localStorage.getItem("bookmarksOrder")) || [];

export const bookmarksState = atom({
  key: "bookmarksState",
  default: initialBookmarks,
});

export const bookmarksOrderState = atom({
  key: "bookmarksOrderState",
  default: initialBookmarksOrder,
});
