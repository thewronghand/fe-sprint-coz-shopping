import { useEffect, useState } from "react";
import { ToastContainer, ToastList } from "./styles/ToastStyles";

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
