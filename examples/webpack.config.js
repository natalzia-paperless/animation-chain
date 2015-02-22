/** Config heavily based on https://github.com/rackt/react-router/blob/master/examples/webpack.config.js */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

module.exports = {
  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
     var isDraft = dir.charAt(0) === '_';

     if (!isDraft && isDirectory(path.join(__dirname, dir)))
       entries[dir] = path.join(__dirname, dir, 'app.js');

     return entries;
   }, {}),

   output: {
     path: 'examples/__build__',
     filename: '[name].js',
     chunkFilename: '[id].chunk.js',
     publicPath: '/__build__/'
   },

   resolve: {
     alias: {
       'animation-chain': '../../'
     }
   }
};
