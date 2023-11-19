const deviceSize = {
  // RESPONSIVE BREAKPOINTS
  // default: 1400px
  largest: "81.5em", // 1300px / 16px
  large: "72em", // 1150px / 16px
  medium: "62em", // 990px / 16px
  small: "47em", // 750px / 16px
  mobileLarge: "38em", // 610px / 16px
  mobileMedium: "26.25em", // 420px / 16px
  // 700 600 500 400 ...
};

const device = {
  largest: `screen and (max-width: ${deviceSize.largest})`,
  large: `screen and (max-width: ${deviceSize.large})`,
  medium: `screen and (max-width: ${deviceSize.medium})`,
  small: `screen and (max-width: ${deviceSize.small})`,
  mobileLarge: `screen and (max-width: ${deviceSize.mobileLarge})`,
  mobileMedium: `screen and (max-width: ${deviceSize.mobileMedium})`,
};

const theme = {
  device,
};

export default theme;
