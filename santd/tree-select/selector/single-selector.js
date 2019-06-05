/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import KEYCODE from 'santd/core/util/keyCode';
import Icon from 'santd/icon';
const pagin = classCreator('select');
const prefixCls = pagin();

export default san.defineComponent({
    dataTypes: {
        placeholder: DataTypes.string,
        title: DataTypes.any
    },
    computed: {
        placeholderStyles() {
            const title = this.data.get('title');
            return {
                display: title ? 'none' : 'block',
                'user-select': 'none'
            };
        }
    },
    initData() {
        return {
            placeholder: '',
            titles: ''
        };
    },
    template: `
        <div>
            <div
                unselectable="on"
                class="${prefixCls}-selection__placeholder"
                style="{{placeholderStyles}}"
            >{{placeholder}}</div>
            <div
                class="${prefixCls}-selection-selected-value"
                >
                {{title}}
            </div>
        </div>
    `
});
