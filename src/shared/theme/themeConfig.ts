import { ThemeConfig } from "antd";

const primaryColor = "#C95559";
const white = "#fff";
const black = "#000";

const itemSelectedBg = "#96393C";
const itemSelectedColor = "#ffffff";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
  },
  components: {
    Layout: {
      headerBg: white,
      siderBg: primaryColor,
    },
    Menu: {
      colorBgContainer: primaryColor,
      //non-selected
      itemColor: black,
      itemBg: primaryColor,
      itemHoverBg: itemSelectedBg,
      itemHoverColor: itemSelectedColor,

      //selected
      itemSelectedBg: itemSelectedBg,
      itemSelectedColor: itemSelectedColor,
    },
    Button: {
      colorBorder: "#000",
      colorText: primaryColor,
    },
  },
};
