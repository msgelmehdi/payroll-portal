module.exports = {
  transforms: [
    {
      include: /\.(js|jsx|ts|tsx)$/,
      factory: "babel",
      before: [["@babel/preset-env"], ["@babel/preset-react"]],
      after: [["styled-components"]],
    },
  ],
};
