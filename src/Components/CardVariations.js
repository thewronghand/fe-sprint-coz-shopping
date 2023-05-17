import Card from "./Card";

const CardGenerator = (data, handleBookmarkToggle) => {
  switch (data.type) {
    case "Product":
      return (
        <Card
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
      return <Card />;
  }
};

export default CardGenerator;
