const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "../src/index.ts"),
  output: {
    filename: "tslog.min.js",
    libraryTarget: "umd",
    path: path.join(__dirname, "../dist"),
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.(ts|tsx)$/,
        include: resolveApp("src"),
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "../tsconfig.json"),
            },
          },
          {
            loader: "tslint-loader",
            options: {
              configFile: path.resolve(__dirname, "../tslint.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
