/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
const prefixCls = classCreator('select')();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        maxTagCount: DataTypes.number,
        maxTagPlaceholder: DataTypes.any,
        treeNodeLabelProp: DataTypes.string
    },
    components: {
        's-icon': Icon
    },
    computed: {
        mulClasses() {
            const disabled = this.data.get('disabled');
            let classArr = [`${prefixCls}-selection__choice__content`];
            disabled && classArr.push(`${prefixCls}-selection__choice__disabled`);
            return classArr;
        },
        multipleValue() {
            let value = this.data.get('value').concat();
            let result;
            const maxTagCount = this.data.get('maxTagCount') || Number.MAX_VALUE;
            const maxTagPlaceholder = this.data.get('maxTagPlaceholder');
            const treeNodeLabelProp = this.data.get('treeNodeLabelProp');
            const diff = value.length - maxTagCount;

            result = value.filter((item, index) => index < maxTagCount);

            if (diff > 0) {
                const obj = {};
                obj[treeNodeLabelProp] = `+ ${diff} ${maxTagPlaceholder || '...'}`;
                result.push(obj);
            }

            return result;
        }
    },
    initData() {
        return {
            maxTagCount: 50,
            disabled: false
        };
    },
    removeValue(e, index) {
        e.stopPropagation();
        this.fire('removeValue', index);
    },
    updated() {
        const list = this.data.get('multipleValue');
        if (list && list.length) {
            for (const item of list) {
                if (!item.title && item.node && item.node.sourceSlots.named.title) {
                    this.sourceSlots.named[`title_${item.key}`] = item.node.sourceSlots.named.title;
                }
            }
        }
    },
    template: `
            <ul>
                <li
                    s-for="value, index in multipleValue"
                    class="${prefixCls}-selection__choice"
                    style="user-select: none;"
                >
                    <div class="{{mulClasses}}">
                        <template s-if="value[treeNodeLabelProp]">
                            {{value[treeNodeLabelProp]}}
                        </template>
                        <slot s-else name="title_{{value.key}}" />
                    </div>
                    <span
                        s-if="!disabled && index < maxTagCount"
                        class="${prefixCls}-selection__choice__remove"
                        title="{{content}}"
                        on-click="removeValue($event, index)"
                    >
                        <s-icon type="close"></s-icon>
                    </span>
                </li>
            </ul>
    `
});
