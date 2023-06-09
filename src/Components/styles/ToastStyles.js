import { styled, keyframes } from "styled-components";

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(120%);
  }
`;

const ToastList = styled.section`
  display: flex;
  flex-direction: column;
`;

const ToastContainer = styled.div`
  height: 35px;
  margin: 10px;
  display: flex;
  position: fixed;
  overflow: hidden;
  bottom: ${(props) => 0 + props.index * 70}px;
  right: 20px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  color: black;
  padding: 10px 20px;
  z-index: 9999;
  animation: ${slideIn} 0.5s ease, ${slideOut} 0.5s ease 2.5s forwards;

  > .toast {
    display: flex;
    align-items: center;
    justify-content: center;
    > .toast-message {
      margin-top: 3px;
      margin-left: 8px;
    }
  }
`;

export { ToastList, ToastContainer };
