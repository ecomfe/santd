/**
* @file checkableTag.js 可选择标签
* @author fuqiangqiang@baidu.com
*/
import Base from 'santd/base';
import {classCreator} from '../core/util';
const prefixCls = classCreator('tag')();
import {ICheckableTag} from './interface';
export default class CheckableTag extends Base<ICheckableTag> {
    initData(): ICheckableTag {
        return {
            checked: false
        };
    }

    handleClick() {
        const check = this.data.get('checked');
        this.fire('change', !check);
        this.data.set('checked', !check);
    }

    static template = `
        <div class="${prefixCls} ${prefixCls}-checkable{{checked ? ' ${prefixCls}-checkable-checked' : ''}}" on-click="handleClick">
           <slot/>
        </div>
    `;
};