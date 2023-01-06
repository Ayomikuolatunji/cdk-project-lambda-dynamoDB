import { resolve } from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  mode: "none",
  entry: {
    helloLambda: "./services/hello/hello.ts",
  },
  target: "node",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.webpack.json",
          },
        },
      },
    ],
  },
  externals: {
    "aws-sdk": "aws-sdk",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    libraryTarget: "commonjs2",
    path: resolve(__dirname, "build"),
    filename: "[name]/[name].js",
  },
};

export default config;
