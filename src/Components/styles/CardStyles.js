import { styled } from "styled-components";

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

export { CardContainer, ImageContainer };
