import { styled } from "styled-components";

const ModalBackDrop = styled.div`
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
`;

const ModalOverlay = styled.article`
  filter: drop-shadow(0px 0px 36px rgba(0, 0, 0, 0.5));
  position: absolute;
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
  > .bookmark {
    position: absolute;
    left: 24px;
    bottom: 24px;
  }
  > .title {
    position: absolute;
    left: 56px;
    bottom: 24px;
    font-weight: 700;
    font-size: 24px;
    color: white;
  }
`;

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
