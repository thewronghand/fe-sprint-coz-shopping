import { ModalBackDrop, ModalOverlay } from "./styles/ModalStyles";

function Modal({ title, image, bookmark, onModalToggle }) {
  return (
    <ModalBackDrop onClick={onModalToggle}>
      <ModalOverlay onClick={(e) => e.stopPropagation()}>
        <div className="modal-close" onClick={onModalToggle}>
          <img src="/modal-close.png" alt="modal-close" />
        </div>
        <div className="bookmark">{bookmark}</div>
        <div className="title">{title}</div>
        {image}
      </ModalOverlay>
    </ModalBackDrop>
  );
}

export default Modal;

{
  /* <Bookmark
isBookmarked={isBookmarked}
onClick={handleBookmarkUpdate}
/> */
}
