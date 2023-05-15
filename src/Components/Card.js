import { styled } from "styled-components";

const CardContainer = styled.article`
  width: 264px;
  height: 264px;
  min-width: 264px;
  min-height: 264px;
  border-radius: 12px;
  > .image-container {
    width: 100%;
    height: 210px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 6px;
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
      position: fixed;
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

function Card({ image, overlay, infoTop, infoBottom }) {
  return (
    <CardContainer>
      <div className="image-container">
        <div className="overlay">{overlay}</div>
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
