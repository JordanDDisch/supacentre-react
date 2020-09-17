const {
    watch, series, src, dest
} = require('gulp');
const browserSync = require('browser-sync').create();
const args = require('yargs').argv; // Grabs command line arguments
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// Variables
const options = {
    mode: (args.deploy) ? 'production' : 'development',
    src: {
        react: 'src/lib/'
    },
    dest: {
        react: 'build'
    },
    outputFilenames: {
        react: 'index'
    }
};

const webpackPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(options.mode)
        }
    })
];

const webpackOptions = {
    mode: options.mode,
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx'],
        modules: [
            path.resolve(options.src.react),
            path.resolve('./node_modules')
        ]
    },
    optimization: {
        minimizer: []
    },
    devtool: '#source-map',
    plugins: webpackPlugins,
    module: {
        rules: [{
            use: [
                { loader: 'babel-loader' }
            ],
            exclude: /node_modules/
        }]
    },
    output: {
        filename: `${options.outputFilenames.react}.js`
    }
};

if (options.mode === 'production') {
    webpackOptions.optimization.minimizer.push(new TerserPlugin({
        parallel: 4,
        extractComments: true,
        terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: true
        }
    }));
}

const buildSrc = () =>
    src([
        'src/docs/App.jsx',
        'src/docs/index.js',
        `${options.src.react}/components/**/*.{js,jsx}`,
        `${options.src.react}/containers/**/*.{js,jsx}`,
        `!${options.src.react}/**/*.test.{js,jsx}`
    ])
        .pipe(plugins.plumber())
        .pipe(webpackStream(webpackOptions, webpack))
        .pipe(dest('docs/js'));

const buildIndex = () =>
    src('src/docs/index.html')
        .pipe(dest('docs'));


const buildImages = () =>
    src('src/docs/img/**')
        .pipe(dest('docs/img'));


const buildDocs = series(buildSrc, buildIndex);

const browserSyncReload = (done) => {
    browserSync.reload();
    done();
};

const browsersync = series(buildDocs, browserSyncReload);

const watchDocs = done => (args.watch ? watch(['src/**/*'], browsersync) && done() : done());

const setupBrowserSync = (done) => {
    browserSync.init({
        open: false,
        reloadOnRestart: true,
        server: {
            baseDir: './docs/'
        },
        port: 3010
    });
    done();
};

exports.default = series(buildDocs, buildImages, watchDocs, setupBrowserSync);
