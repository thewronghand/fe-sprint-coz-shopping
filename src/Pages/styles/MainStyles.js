import { styled } from "styled-components";

const MainContainer = styled.main`
  padding-top: 52px;
  display: flex;
  flex-direction: column;
`;

const ListSection = styled.section`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  width: 1130px;
  font-weight: 600;
  font-size: 24px;
  > a {
    color: black;
    text-decoration: none;
  }
`;

const ItemList = styled.ul`
  width: 1152px;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`;

const EmptyBookmarkListIndicator = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 288px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #452cdd;
  > .sub-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: black;
    margin-top: 5px;
  }
`;

export {
  MainContainer,
  ListSection,
  SectionTitle,
  ItemList,
  EmptyBookmarkListIndicator,
};
