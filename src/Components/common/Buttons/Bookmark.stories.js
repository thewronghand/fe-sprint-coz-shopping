import { useState } from "react";
import BookmarkButton from "./BookmarkButton";

export default {
  title: "Basic/Buttons/BookmarkButton",
  component: BookmarkButton,
  parameters: {
    backgrounds: {
      default: { value: "dark" },
    },
  },

  controls: { hideNoControlsWarning: true },
};
export const Template = (args) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  return (
    <BookmarkButton
      {...args}
      isBookmarked={isBookmarked}
      onClick={handleBookmarkToggle}
    />
  );
};
