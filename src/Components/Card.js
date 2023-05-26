import { CardContainer, ImageContainer } from "./styles/CardStyles";
import Bookmark from "./Bookmark";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import useBookmarkUpdate from "../hooks/useBookmarkUpdate";

function Card({ image, infoTop, infoBottom, data, onBookmarkToggle, title }) {
  const { isModalOpen, handleModalToggle } = useModal();
  const { isBookmarked, handleBookmarkUpdate } = useBookmarkUpdate(
    data,
    () => {
      if (isModalOpen) {
        handleModalToggle();
      }
    },
    onBookmarkToggle
  );

  return (
    <CardContainer>
      <>
        {isModalOpen && (
          <Modal
            title={title}
            image={image}
            bookmark={
              <Bookmark
                isBookmarked={isBookmarked}
                onClick={handleBookmarkUpdate}
              />
            }
            onModalToggle={handleModalToggle}
          />
        )}
        <ImageContainer onClick={handleModalToggle}>
          <div className="overlay" onClick={(e) => e.stopPropagation()}>
            <Bookmark
              isBookmarked={isBookmarked}
              onClick={handleBookmarkUpdate}
            />
          </div>
          {image ? image : <div className="placeholder" />}
        </ImageContainer>
        <section className="item-info">
          {infoTop && <div className="info-top">{infoTop}</div>}
          {infoBottom && <div className="info-bottom">{infoBottom}</div>}
        </section>
      </>
    </CardContainer>
  );
}

export default Card;
