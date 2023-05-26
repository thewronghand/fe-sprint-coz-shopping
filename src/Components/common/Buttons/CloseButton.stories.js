import CloseButton from "./CloseButton";

export default {
  title: "Basic/Buttons/CloseButton",
  component: CloseButton,
  parameters: {
    backgrounds: {
      default: { value: "dark" },
    },
  },

  controls: { hideNoControlsWarning: true },
};
export const Template = (args) => <CloseButton {...args} />;
