/**
 * @file Santd release rollup file
 * @author mayihui@baidu.com
 **/

const path = require('path');
const rollup = require('rollup').rollup;
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const {terser} = require('rollup-plugin-terser');
const svgo = require('rollup-plugin-svgo');

module.exports = async (dest, src) => {
    const inputOptions = {
        input: src,
        plugins: [
            peerDepsExternal(),
            postcss({
                inject: false,
                extract: true,
                use: [['less', {javascriptEnabled: true}]]
            }),
            resolve(),
            commonjs(),
            svgo(),
            babel({
                presets: ['@babel/preset-env'],
                plugins: [
                    'babel-plugin-transform-object-assign'
                ]
            })
        ]
    };

    const outputMin = {
        file: path.join(dest, 'santd.min.js'),
        name: 'santd',
        exports: 'named',
        format: 'umd',
        plugins: [terser()]
    };

    const output = {
        file: path.join(dest, 'santd.js'),
        name: 'santd',
        exports: 'named',
        format: 'umd'
    };

    const bundle = await rollup(inputOptions);
    await bundle.write(outputMin);
    await bundle.write(output);
};
