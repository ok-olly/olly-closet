const deviceSize = {
  // RESPONSIVE BREAKPOINTS
  // default: 1400px
  largest: "81.25em", // 1300px / 16px = 81.25
  large: "72em", // 1150px / 16px = 71.875
  medium: "62em", // 990px / 16px = 61.875
  small: "47em", // 750px / 16px = 46.875
  mobileLarge: "38.2em", // 610px / 16px = 38.125
  mobileMedium: "26.25em", // 420px / 16px = 26.25
  mobileSmall: "23em", // 365px / 16px = 22.8125
};

const device = {
  largest: `screen and (max-width: ${deviceSize.largest})`,
  large: `screen and (max-width: ${deviceSize.large})`,
  medium: `screen and (max-width: ${deviceSize.medium})`,
  small: `screen and (max-width: ${deviceSize.small})`,
  mobileLarge: `screen and (max-width: ${deviceSize.mobileLarge})`,
  mobileMedium: `screen and (max-width: ${deviceSize.mobileMedium})`,
  mobileSmall: `screen and (max-width: ${deviceSize.mobileSmall})`,
};

const theme = {
  device,
};

export default theme;
