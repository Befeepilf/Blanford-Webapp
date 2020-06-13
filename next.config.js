const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withOffline = require('next-offline');

module.exports = withBundleAnalyzer(withOffline(withCSS(withSass({
  webpack: (config, {dev}) => {
    config.node = {fs: 'empty'};

    config.module.rules.push({
		  test: /\.svg$/,
		  use: [
		    {
		      loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
		    },
		    {
		      loader: 'react-svg-loader',
		      options: {
		        jsx: true
		      }
		    }
		  ]
		});

    config.module.rules.push({
			test: /\.(eot|woff|woff2|ttf|webp|png|jpe?g)$/,
			use: [{
				loader: 'file-loader',
				options: {
          outputPath: 'static',
          publicPath: '/_next/static',
					name: '[sha512:hash:base64:7].[ext]'
				}
			}]
		});

    return config;
  },
  // workboxOpts: {
  //
  // }
}))));
