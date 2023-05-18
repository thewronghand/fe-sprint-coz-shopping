import { styled } from "styled-components";

const CardContainer = styled.li`
  list-style: none;
  margin: 12px;
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
    background-color: rgba(255, 255, 255, 0.4);
    top: 0;
    left: 0;
    z-index: 1;
    > .modal-overlay {
      filter: drop-shadow(0px 0px 36px rgba(0, 0, 0, 0.5));
      position: relative;
      width: 744px;
      height: 480px;
      border-radius: 12px;
      overflow: hidden;
      z-index: 2;
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
