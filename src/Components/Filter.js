import { styled } from "styled-components";
import { useState } from "react";

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

function Filter({ setCurrentFilter }) {
  const filters = {
    전체: "/filter-all.png",
    상품: "/filter-product.png",
    카테고리: "/filter-category.png",
    기획전: "/filter-exhibition.png",
    브랜드: "/filter-brand.png",
  };

  const [selectedFilter, setSelectedFilter] = useState("전체");
  const handleFilterToggle = (filter) => {
    setSelectedFilter(filter);
    setCurrentFilter(filter);
  };

  return (
    <FilterList>
      {Object.keys(filters).map((title) => (
        <FilterButton
          key={title}
          onClick={() => handleFilterToggle(title)}
          selected={selectedFilter === title}
        >
          <img src={filters[title]} alt={title} />
          <div>{title}</div>
        </FilterButton>
      ))}
    </FilterList>
  );
}

export default Filter;
