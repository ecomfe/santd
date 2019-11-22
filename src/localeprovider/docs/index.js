/**
* @file docs入口文件
*/
import san from 'san';
import Desc from './desc.md';
import Basic from './basic.md';
import Locale from './locale.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        locale: Locale
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <locale/>
        </div>
    `
});
