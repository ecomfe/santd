/**
 * @file Santd release rollup file
 * @author mayihui@baidu.com
 **/

const path = require('path');
const fs = require('fs');
const rollup = require('rollup').rollup;
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const {terser} = require('rollup-plugin-terser');
const svgo = require('rollup-plugin-svgo');
const cssnano = require('cssnano');
const rpt = require('rollup-plugin-ts');

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
            svgo(),
            rpt(),
            resolve(),
            commonjs(),
            babel({
                presets: ['@babel/preset-env'],
                plugins: [
                    'babel-plugin-transform-object-assign'
                ]
            })
        ],
        onwarn: function(warning, handler) {
            // Skip certain warnings
        
            // should intercept ... but doesn't in some rollup versions
            if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
        
            // console.warn everything else
            handler( warning );
        }
    };
    
    const outputMin = {
        file: path.join(dest, 'santd.min.js'),
        name: 'santd',
        exports: 'named',
        format: 'umd',
        plugins: [
            terser()
        ]
    };
    const output = {
        file: path.join(dest, 'santd.js'),
        name: 'santd',
        exports: 'named',
        format: 'umd',
        // sourcemap: true,
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outputMin);
    await bundle.write(output);

    // 压缩 https://github.com/egoist/rollup-plugin-postcss/blob/master/src/index.js#L236
    let code = fs.readFileSync(path.join(dest, 'santd.css'));
    let result = await cssnano.process(code, {from: 'santd.css'});
    fs.writeFileSync(path.join(dest, 'santd.min.css'), result.css);
};
