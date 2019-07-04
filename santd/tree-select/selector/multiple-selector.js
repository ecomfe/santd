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
            return classNames({
                [`${prefixCls}-selection__choice__content`]: true,
                [`${prefixCls}-selection__choice__disabled`]: disabled
            });
        },
        multipleTitles() {
            const maxTagContent = this.data.get('maxTagContent');
            const maxTagCount = this.data.get('maxTagCount');
            const title = this.data.get('title');
            let defaultMaxTag = title;
            if (!title || !title.length) {
                return '';
            }
            if (title.length > maxTagCount) {
                defaultMaxTag = title.filter((val, index) => {
                    return index < maxTagCount;
                });
                defaultMaxTag.push(maxTagContent);
            }
            return defaultMaxTag;
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
    template: `
        <div>
            <div
                unselectable="on"
                class="${prefixCls}-selection__placeholder"
                style="{{placeholderStyles}}"
            >{{placeholder}}</div>

            <ul>
                <li
                    s-for="content, index in multipleTitles"
                    class="${prefixCls}-selection__choice"
                    style="user-select: none;"
                >
                    <div class="{{mulClasses}}">
                        {{content}}
                    </div>
                    <span
                        s-if="!disabled && index < maxTagCount"
                        class="${prefixCls}-selection__choice__remove"
                        title="{{content}}"
                        s-ref="removeIconRef-{{index}}"
                        on-click="closeHandler($event)"
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
        </div>
    `
});
