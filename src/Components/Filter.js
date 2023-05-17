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
    All: {
      title: "전체",
      img_url: "/filter-all.png",
    },
    Product: {
      title: "상품",
      img_url: "/filter-product.png",
    },
    Category: {
      title: "카테고리",
      img_url: "/filter-category.png",
    },
    Exhibition: {
      title: "기획전",
      img_url: "/filter-exhibition.png",
    },
    Brand: {
      title: "브랜드",
      img_url: "/filter-brand.png",
    },
  };

  const [selectedFilter, setSelectedFilter] = useState("All");
  const handleFilterToggle = (filter) => {
    setSelectedFilter(filter);
    setCurrentFilter(filter);
  };

  return (
    <FilterList>
      {Object.keys(filters).map((filter) => (
        <FilterButton
          key={filters[filter].title}
          onClick={() => handleFilterToggle(filter)}
          selected={selectedFilter === filter}
        >
          <img src={filters[filter].img_url} alt={filters[filter].title} />
          <div>{filters[filter].title}</div>
        </FilterButton>
      ))}
    </FilterList>
  );
}

export default Filter;
