import { styled } from "styled-components";
import { ReactComponent as SkeletonLoading } from "../skeleton-loading.svg";

import Card from "./Card";

const SkeletonContainer = styled.li`
  list-style: none;
  margin: 12px;
  width: 264px;
  height: 264px;
  min-width: 264px;
  min-height: 264px;
  border-radius: 12px;
  > .item-info {
    width: 100%;
    height: 24px;
    min-height: 24px;
    font-weight: bold;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 210px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

function SkeletonItem() {
  return (
    <SkeletonContainer>
      <ImageContainer>
        <SkeletonLoading style={{ width: "100px" }} />
      </ImageContainer>
      <section className="item-info">불러오는 중...</section>
    </SkeletonContainer>
  );
}

const CardGenerator = (data, handleBookmarkToggle) => {
  switch (data.type) {
    case "Product":
      return (
        <Card
          key={data.id}
          image={<img src={data.image_url} alt={data.title} />}
          infoTop={
            data.discountPercentage ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{data.title}</div>
                <div style={{ color: "#452CDD" }}>
                  {data.discountPercentage + "%"}
                </div>
              </div>
            ) : (
              data.title
            )
          }
          infoBottom={
            <div style={{ textAlign: "right" }}>{data.price + "원"}</div>
          }
          data={data}
          onBookmarkToggle={handleBookmarkToggle}
          title={data.title}
        />
      );
    case "Category":
      const title = `# ${data.title}`;
      return (
        <Card
          key={data.id}
          image={<img src={data.image_url} alt={data.title} />}
          infoTop={title}
          data={data}
          onBookmarkToggle={handleBookmarkToggle}
          title={title}
        />
      );
    case "Exhibition":
      return (
        <Card
          key={data.id}
          image={<img src={data.image_url} alt={data.title} />}
          infoTop={data.title}
          infoBottom={data.sub_title}
          data={data}
          onBookmarkToggle={handleBookmarkToggle}
          title={data.sub_title}
        />
      );
    case "Brand":
      return (
        <Card
          key={data.id}
          image={<img src={data.brand_image_url} alt={data.title} />}
          infoTop={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{data.brand_name}</div>
              <div>관심고객수</div>
            </div>
          }
          infoBottom={<div style={{ textAlign: "right" }}>{data.follower}</div>}
          data={data}
          onBookmarkToggle={handleBookmarkToggle}
          title={data.brand_name}
        />
      );
    default:
      return;
    // return <SkeletonItem />;
  }
};

export default CardGenerator;
