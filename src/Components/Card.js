import { useState, useEffect } from "react";
import { styled } from "styled-components";

import Bookmark from "./Bookmark";
import { useRecoilState } from "recoil";
import { bookmarksOrderState, bookmarksState } from "../recoil/bookmarksState";

const CardContainer = styled.article`
  width: 264px;
  height: 264px;
  min-width: 264px;
  min-height: 264px;
  border-radius: 12px;
  > .modal-backdrop {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    top: 0;
    left: 0;
    z-index: 1;
    > .modal-overlay {
      position: relative;
      width: 744px;
      height: 480px;
      border-radius: 12px;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
      > .modal-close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
      }
      > .modal-overlay_overlay {
        position: absolute;
        left: 24px;
        bottom: 24px;
      }
      > .modal-overlay_title {
        position: absolute;
        left: 56px;
        bottom: 24px;
        font-weight: 700;
        font-size: 24px;
        color: white;
      }
    }
  }
  > .image-container {
    width: 100%;
    height: 210px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 6px;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
    }
    > .placeholder {
      width: 100%;
      height: 100%;
      background-color: #d9d9d9;
    }
    > .overlay {
      position: absolute;
      color: red;
      left: 229px;
      top: 174px;
    }
  }

  > .item-info {
    > .info-top {
      width: 100%;
      height: 24px;
      min-height: 24px;
      font-weight: bold;
    }
    > .info-bottom {
      width: 100%;
      height: 24px;
      min-height: 24px;
    }
  }
`;

function Card({ image, infoTop, infoBottom, data, onBookmarkToggle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState);
  const [isBookmarked, setIsBookmarked] = useState(!!bookmarks[data.id]);
  const [bookmarksOrder, setBookmarksOrder] =
    useRecoilState(bookmarksOrderState);

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
            <div className="modal-overlay_title">{data.title}</div>
            {image}
          </article>
        </div>
      )}

      <div className="image-container" onClick={handleModalToggle}>
        <div className="overlay" onClick={(e) => e.stopPropagation()}>
          <Bookmark
            isBookmarked={isBookmarked}
            onClick={handleBookmarkUpdate}
          />
        </div>
        {image ? image : <div className="placeholder" />}
      </div>

      <section className="item-info">
        {infoTop && <div className="info-top">{infoTop}</div>}
        {infoBottom && <div className="info-bottom">{infoBottom}</div>}
      </section>
    </CardContainer>
  );
}

export default Card;
