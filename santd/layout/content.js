/**
* @file content.js
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
const pagin = classCreator('layout-content');
const prefixCls = pagin();

export default san.defineComponent({
    computed: {
        classes() {
            return classNames({
                [`${prefixCls}`]: true
            });
        }
    },
    inited() {
        let styles = this.data.get('style');
        if (styles) {
            // 用正则把string对象中的数据匹配出来
            styles = styles.replace(/'/g, '');
            const regExp = /{(.*)}/;
            let res = regExp.exec(styles)[1].split(',');
            let resStyle = {};
            res.forEach(item => {
                let temp = item.split(':');
                resStyle[temp[0]] = temp[1];
            });
            this.data.set('styles', resStyle);
        }
    },
    template: `
        <div
            class="{{classes}}"
            style="{{styles}}"
        >
            <slot></slot>
        </div>
    `
});
