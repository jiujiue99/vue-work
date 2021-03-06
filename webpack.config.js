/**
 * Created by xuanjiu on 17/2/20.
 */
const path = require('path');
const webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    extensions: ['.js', '.jsx', '.css', '.less', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'myEleUI': path.resolve(__dirname, 'src/eleUI/packages'),
      'eleUIStyle': path.resolve(__dirname, 'src/eleUI/theme-default'),
      'cmsApi': path.resolve(__dirname, 'src/cmsApi/index.js'),
      'thirdModal': path.resolve(__dirname, 'src/thirdParty/modal.vue')
    }
  }, 
  context: __dirname + "/src",
  entry: {
    tagManage: ['whatwg-fetch', './tagManage/index.js'],
    platform: ['whatwg-fetch', './platform/index.js']
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: '/assets/',
    chunkFilename: '[name].min.js?[hash:8]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // use: ['babel-loader', 'vue-loader'],
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ],

  },
  devtool: '#eval-source-map',
  // devServer: {
  //   hot: true,
  //   // enable HMR on the server

  //   contentBase: path.resolve( __dirname ,'./'),
  //   // match the output path

  //   publicPath: '/assets/fonts/',
  //   // match the output `publicPath`

  //   proxy: {
  //     "/cms/**/*": {
  //       target: "http://192.168.51.22/"
  //     },
  //     '/cdn/**/*': {
  //       target: 'http://192.168.51.22/'
  //     }
  //   },
  // },
  // watch: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: "vendor.js",
    //   // minChunks: 2,
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   filename: "commons.js",
    //   minChunks: 2,
    // }),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    // new webpack.LoaderOptionsPlugin({
    //    debug: true
    //  })
    // 压缩js文件
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: true,
    //   compress: {
    //     warnings: false // 禁止生成warning
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
