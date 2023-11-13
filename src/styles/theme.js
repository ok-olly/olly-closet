const deviceSize = {
  // RESPONSIVE BREAKPOINTS
  largest: "87.5em", // 1400px / 16px
  large: "81.5em", // 1300px / 16px

  //   medium: "50em", // 800px / 16px
  small: "37.5em", // 600px / 16px
};

const device = {
  largest: `screen and (max-width: ${deviceSize.largest})`,
  large: `screen and (max-width: ${deviceSize.large})`,
  //   medium: `screen and (max-width: ${deviceSize.medium})`,
  small: `screen and (max-width: ${deviceSize.small})`,
};

const theme = {
  device,
};

export default theme;
