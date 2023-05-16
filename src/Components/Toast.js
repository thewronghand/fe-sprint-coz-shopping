import { useEffect, useState } from "react";
import { styled } from "styled-components";

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
  bottom: ${(props) => 20 + props.index * 70}px;
  right: 20px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  color: black;
  padding: 10px 20px;
  z-index: 9999;
  animation: toastAnimation 0.5s ease-in-out;

  > .toast {
    display: flex;
    align-items: center;
    justify-content: center;
    > .toast-message {
      margin-top: 3px;
      margin-left: 8px;
    }
  }

  @keyframes toastAnimation {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

function Toast({ messages, removeToast }) {
  const [visibleToasts, setVisibleToasts] = useState([]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setVisibleToasts(messages);
      const timer = setTimeout(() => {
        removeToast(messages[0].id);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setVisibleToasts([]);
    }
  }, [messages, removeToast]);

  return (
    <ToastList>
      {visibleToasts.map((toast, index) => (
        <ToastContainer key={toast.id} index={index}>
          {toast.content}
        </ToastContainer>
      ))}
    </ToastList>
  );
}

export default Toast;
