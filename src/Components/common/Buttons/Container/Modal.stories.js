import { useState } from "react";
import Modal from "./Modal";
import BookmarkButton from "../Buttons/BookmarkButton";

export default {
  title: "Basic/Containers/Modal",
  component: Modal,
  parameters: {
    backgrounds: {
      default: { value: "light" },
    },
  },

  controls: { hideNoControlsWarning: true },
};

export const Sample = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
      <button onClick={handleModalToggle}>Toggle Modal</button>
      {isOpen && (
        <Modal
          title={args.title}
          image={args.image}
          bookmark={
            <BookmarkButton
              isBookmarked={isBookmarked}
              onClick={handleBookmarkToggle}
            />
          }
          onModalToggle={handleModalToggle}
        />
      )}
    </>
  );
};
Sample.args = {
  title: "Modal Title",
  image: (
    <img
      src="https://images.unsplash.com/photo-1626372416494-3183a0c4f726?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80"
      alt="sample_image"
    />
  ),
};
