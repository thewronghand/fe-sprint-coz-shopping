import { useState } from "react";
import { FilterList, FilterButton } from "./styles/FilterStyles";

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

function Filter({ setCurrentFilter }) {
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
