import { styled } from "styled-components";

const FilterList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const FilterButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: white;
  margin-left: 18px;
  margin-right: 18px;
  font-size: 1.1rem;
  cursor: pointer;
  > div {
    margin: 7px;
    box-sizing: border-box;
    color: ${(props) => (props.selected ? "#452CDD" : "black")};
    border-bottom: ${(props) =>
      props.selected ? "3px solid #452CDD" : "none"};
    font-weight: ${(props) => (props.selected ? 700 : "normal")};
  }
`;

export { FilterButton, FilterList };
