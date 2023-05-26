import { styled } from "styled-components";

const CloseButtonContainer = styled.button`
  border: none;
  background-color: none;
  color: none;
  cursor: pointer;
`;

function CloseButton({ onClick }) {
  return (
    <CloseButtonContainer className="modal-close" onClick={onClick}>
      <img src="/modal-close.png" alt="modal-close" />
    </CloseButtonContainer>
  );
}

export default CloseButton;
