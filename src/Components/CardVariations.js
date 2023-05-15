import Card from "./Card";
import Bookmark from "./Bookmark";

const generateCardByType = (data) => {
  switch (data.type) {
    case "Product":
      return (
        <Card
          image={<img src={data.image_URL} alt={data.title} />}
          infoTop={
            data.discountPercentage ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{data.title}</div>
                <div style={{ color: "#452CDD" }}>
                  {data.discountPercentage}
                </div>
              </div>
            ) : (
              data.title
            )
          }
          infoBottom={<div style={{ textAlign: "right" }}>{data.price}</div>}
          overlay={<Bookmark data={data} />}
        />
      );
    case "Category":
      return (
        <Card
          image={<img src={data.image_URL} alt={data.title} />}
          infoTop={"# " + data.title}
          overlay={<Bookmark data={data} />}
        />
      );
    case "Exhibition":
      return (
        <Card
          image={<img src={data.image_URL} alt={data.title} />}
          infoTop={data.title}
          infoBottom={data.sub_title}
          overlay={<Bookmark data={data} />}
        />
      );
    case "Brand":
      return (
        <Card
          image={<img src={data.brand_image_url} alt={data.title} />}
          infoTop={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{data.title}</div>
              <div>관심고객수</div>
            </div>
          }
          infoBottom={<div style={{ textAlign: "right" }}>{data.follower}</div>}
          overlay={<Bookmark data={data} />}
        />
      );
    default:
      return;
  }
};

export default generateCardByType;
