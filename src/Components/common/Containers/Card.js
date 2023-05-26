import { useState } from "react";
import { styled } from "styled-components";
import Modal from "./Modal";
import BookmarkButton from "../Buttons/BookmarkButton";

const CardContainer = styled.li`
  list-style: none;
  margin: 12px;
  width: 264px;
  height: 264px;
  min-width: 264px;
  min-height: 264px;
  border-radius: 12px;

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

const ImageContainer = styled.div`
  width: 100%;
  height: 210px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
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
`;

function Card({ image, infoTop, infoBottom, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <CardContainer>
      <>
        {isModalOpen && (
          <Modal
            title={title}
            image={image}
            bookmark={
              <BookmarkButton
                isBookmarked={isBookmarked}
                onClick={handleBookmarkToggle}
              />
            }
            onModalToggle={handleModalToggle}
          />
        )}
        <ImageContainer onClick={handleModalToggle}>
          <div className="overlay" onClick={(e) => e.stopPropagation()}>
            <BookmarkButton
              isBookmarked={isBookmarked}
              onClick={handleBookmarkToggle}
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
