/**
* @file input-search 输入框search组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Button from '../button';
import BaseInput from './base';
import './style/index.less';
const prefixCls = classCreator('input')();

export default san.defineComponent({
    dataTypes: {
        enterButton: DataTypes.oneOfType([DataTypes.string, DataTypes.bool])
    },
    components: {
        's-icon': Icon,
        's-button': Button,
        's-base-input': BaseInput
    },
    computed: {
        className() {
            const enterButton = this.data.get('enterButton');
            const sSize = this.data.get('size');
            const size = this.data.get('sizeMap')[sSize];
            let classArr = [`${prefixCls}-search`, `${prefixCls}-affix-wrapper`];

            !!enterButton && classArr.push(`${prefixCls}-search-enter-button`);
            !!size && classArr.push(`${prefixCls}-affix-wrapper-${size}`);

            return classArr;
        }
    },
    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    messages: {
        santd_input_pressEnter(item) {
            this.fire('pressEnter', item.value);
        },
        santd_input_change(item) {
            this.fire('change', item.value);
            this.dispatch('UI:form-item-interact', {fieldValue: item.value, type: 'change'});
        },
        santd_input_blur(item) {
            this.fire('blur', item.value);
            this.dispatch('UI:form-item-interact', {fieldValue: item.value, type: 'change'});
        }
    },
    searchClick(e) {
        const inputValue = this.ref('inputValue').el.value;
        this.fire('search', inputValue);
    },
    template: `
        <span class="{{className}}">
            <s-base-input
                s-ref="inputValue"
                prefixCls="${prefixCls}"
                placeholder="{{placeholder}}"
                size="{{size}}"
                defaultValue="{{defaultValue}}"
                disabled="{{disabled}}"
                id="{{id}}"
                type="{{type}}"
                readOnly="{{readOnly}}"
                tabIndex="{{tabIndex}}"
                autoComplete="{{autoComplete}}"
                autoFocus="{{autoFocus}}"
            ></s-base-input>
            <span s-if="{{enterButton}}" class="${prefixCls}-suffix" on-click="searchClick($event)">
                <s-button type="primary" class="${prefixCls}-search-button" size="{{size}}">
                    <s-icon s-if="{{enterButton === true}}" type="search"></s-icon>
                    <span s-else>{{enterButton}}</span>
                </s-button>
            </span>
            <span s-else class="${prefixCls}-suffix" on-click="searchClick($event)">
                <s-icon class="${prefixCls}-search-icon" type="search"></s-icon>
            <span>
        </span>
    `
});
