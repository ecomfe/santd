/**
 * @file generate component file
 * @author mayihui@baidu.com
 **/

import san from 'san';

export default (code, lang, path) => {
    return () => {
        const name = path.split('/')[2];
        const Component = require(`santd/${name}/docs/index.js`).default;
        return san.defineComponent(Component);
    };
};
