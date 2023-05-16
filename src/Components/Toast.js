import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  bottom: ${(props) => 20 + props.index * 70}px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 9999;
  animation: toastAnimation 0.5s ease-in-out;

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
    <>
      {visibleToasts.map((toast, index) => (
        <ToastContainer key={toast.id} index={index}>
          {toast.content}
        </ToastContainer>
      ))}
    </>
  );
}

export default Toast;
