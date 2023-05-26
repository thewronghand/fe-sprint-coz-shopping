import Card from "./Card";

export default {
  title: "Basic/Containers/Card",
  component: Card,
  parameters: {
    backgrounds: {
      default: { value: "light" },
    },
  },

  controls: { hideNoControlsWarning: true },
};

export const Sample = (args) => <Card {...args} />;
Sample.args = {
  image: (
    <img
      src="https://plus.unsplash.com/premium_photo-1666265087913-9326638decfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      alt="sample"
    />
  ),
  infoTop: <div>Sample Text</div>,
  infoBottom: <div>Sample Text</div>,
};
