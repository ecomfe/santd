/**
 * @file 组件 radio
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import Radio from './radio';
const prefixCls = classCreator('radio-button')();

const radioButton = san.defineComponent({
    initData() {
        return {
            prefixCls
        };
    }
});

san.inherits(radioButton, Radio);
export default radioButton;
