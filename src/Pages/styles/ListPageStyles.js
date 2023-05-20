import { styled } from "styled-components";

const ListMain = styled.main`
  padding-top: 52px;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled.ul`
  width: 1152px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

export { ListContainer, ListMain };
