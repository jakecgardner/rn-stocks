import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
export const decorators = [withBackgrounds];
export const parameters = {
  backgrounds: {
    default: "dark",
    values: [
      { name: "light", value: "white" },
      { name: "warm", value: "hotpink" },
      { name: "cool", value: "deepskyblue" },
      { name: "dark", value: "black" },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
