/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import KEYCODE from '../core/util/keyCode';
import Icon from '../icon';
const prefixCls = classCreator('select')();

export default san.defineComponent({
    dataTypes: {
        placeholder: DataTypes.string,
        title: DataTypes.any,
        disabled: DataTypes.bool,
        inputValue: DataTypes.string,
        emptyValue: DataTypes.string
    },
    components: {
        's-icon': Icon
    },
    computed: {
        placeholderStyles() {
            const title = this.data.get('title') || this.data.get('inputValue');
            return {
                display: title ? 'none' : 'block',
                'user-select': 'none'
            };
        },
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

            result = value.filter((item, index) => index < maxTagCount);

            value.length > maxTagCount && result.push({title: `+ ${value.length} ${maxTagPlaceholder || '...'}`});
            return result;
        }
    },
    initData() {
        return {
            placeholder: '',
            title: '',
            maxTagCount: 50,
            disabled: false
        };
    },
    closeHandler(e) {
        const value = e.currentTarget.getAttribute('title');
        e.stopPropagation();
        this.dispatch('closeBtnClick', value);
    },
    query(query, e) {
        this.dispatch('queryInput', {value: query, event: e});
    },
    inputChange(e) {
        const value = e.target.value;
        e.target.style.width = value.length * 10 + 10 + 'px';
        this.data.set('inputValue', value);
        this.query(value, e);
        this.dispatch('inputSearch', value);
    },
    inputKeyDown(e) {
        const value = e.target.value;
        if (e.keyCode === KEYCODE.ENTER && value) {
            // this.dispatch('keyEnter', {value, event: e});
        }
        // 处理del键时的删除事件
        if (e.keyCode === KEYCODE.BACKSPACE) {
            if (value === '') {
                this.dispatch('handleBackspace', e);
            }
        }
    },
    removeValue(e, index) {
        e.stopPropagation();
        this.fire('removeValue', index);
    },
    template: `
            <ul>
                <li
                    s-for="value, index in multipleValue"
                    class="${prefixCls}-selection__choice"
                    style="user-select: none;"
                >
                    <div class="{{mulClasses}}">
                        <template s-if="value.title">
                            {{value.title}}
                        </template>
                        <slot s-else />
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
                <!--input位置-->
                <li class="${prefixCls}-search ${prefixCls}-search--inline" key="__input">
                    <div class="${prefixCls}-search__field__wrap">
                        <input
                            s-ref="importInput"
                            autoComplete="off"
                            class="${prefixCls}-search__field"
                            on-input="inputChange($event)"
                            on-keydown="inputKeyDown($event)"
                            value="{{ emptyValue }}"
                            >
                        <span class="${prefixCls}-search__field__mirror">
                            {{inputValue}}&nbsp;
                        </span>
                    </div>
                </li>
            </ul>
    `
});
