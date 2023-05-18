import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";
import { CardContainer, ImageContainer } from "./styles/CardStyles";
import Bookmark from "./Bookmark";

function Card({ image, infoTop, infoBottom, data, onBookmarkToggle, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState);
  const [bookmarksOrder, setBookmarksOrder] =
    useRecoilState(bookmarksOrderState);
  const [isBookmarked, setIsBookmarked] = useState(!!bookmarks[data.id]);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setIsBookmarked(!!bookmarks[data.id]);
  }, [bookmarks, data.id]);

  const handleBookmarkUpdate = () => {
    if (!isBookmarked) {
      const prevBookmarks = { ...bookmarks };
      setBookmarks({ ...prevBookmarks, [data.id]: data });
      setBookmarksOrder([data.id, ...bookmarksOrder]);
    } else {
      const prevBookmarks = { ...bookmarks };
      delete prevBookmarks[data.id];
      setBookmarks(prevBookmarks);
      setBookmarksOrder(bookmarksOrder.filter((item) => item !== data.id));
    }
    setIsBookmarked(!isBookmarked);
    onBookmarkToggle(isBookmarked);
    if (isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <CardContainer>
      <>
        {isModalOpen && (
          <div className="modal-backdrop" onClick={handleModalToggle}>
            <article
              className="modal-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-close" onClick={handleModalToggle}>
                <img src="modal-close.png" alt="modal-close" />
              </div>
              <div className="modal-overlay_overlay">
                <Bookmark
                  isBookmarked={isBookmarked}
                  onClick={handleBookmarkUpdate}
                />
              </div>
              <div className="modal-overlay_title">{title}</div>
              {image}
            </article>
          </div>
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
