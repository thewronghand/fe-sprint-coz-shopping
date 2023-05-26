import { useState } from "react";

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  return { isModalOpen, handleModalToggle };
}

export default useModal;
