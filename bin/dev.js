const webpack = require('webpack');
const nodemon = require('nodemon');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    noInfo: true,
    watchOptions: {
        ignore: /public/,
    },
    writeToDisk: true,
    stats: 'errors-only'
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
    console.log('HMR server has been successfully started');
});

const compiler = webpack(webpackServerConfig);

compiler.run((err) => {
    if (err) {
        console.log('Compilation has failed: ', err);
    }

    compiler.watch({}, (err) => {
        if (err) {
            console.log('Compilation has failed: ', err);
        }
        console.log('Compilation has been successfully');
    })

    nodemon({
        script: path.resolve(__dirname, '../public/server/server.js'),
        watch: [
            path.resolve(__dirname, '../public/server'),
            path.resolve(__dirname, '../public/client'),
        ]
    })
}) 