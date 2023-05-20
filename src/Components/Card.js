import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { bookmarksState } from "../recoil/bookmarksState";
import { CardContainer, ImageContainer } from "./styles/CardStyles";
import Bookmark from "./Bookmark";
import Modal from "./Modal";

function Card({ image, infoTop, infoBottom, data, onBookmarkToggle, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState);
  const [isBookmarked, setIsBookmarked] = useState(!!bookmarks.get(data.id));
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    onBookmarkToggle(isBookmarked);
    if (isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }
  };

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
