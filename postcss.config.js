	/**
 * @file postcss config
 */
/**
 * @file postcss config
 */
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const url = require('postcss-url');
module.exports = {
    plugins: [
        url({
            url: 'inline',
            maxSize: 4000
        }),
        autoprefixer(),
        atImport()
    ]
};
