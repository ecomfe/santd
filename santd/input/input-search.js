/**
* @file input-search 输入框search组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
import BaseInput from './base';
import './style/index.less';
const pagin = classCreator('input');
const prefixCls = pagin();

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
            return classNames({
                [`${prefixCls}-search`]: true,
                [`${prefixCls}-affix-wrapper`]: true,
                [`${prefixCls}-search-enter-button`]: !!enterButton,
                [`${prefixCls}-affix-wrapper-${size}`]: !!size
            });
        },
        searchClass() {
            return classNames({
                [`${prefixCls}-suffix`]: true
            });
        },
        buttonClass() {
            return classNames({
                [`${prefixCls}-search-button`]: true
            });
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
        pressEnter(item) {
            this.fire('pressEnter', item.value);
        },
        inputChange(item) {
            this.fire('change', item.value);
            this.dispatch('formChange', item.value);
        },
        inputBlur(item) {
            this.fire('blur', item.value);
            this.dispatch('formBlur', item.value);
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
                placeholder="{{placeholder}}"
                size="{{size}}"
                defaultValue="{{defaultValue}}"
                disabled="{{disabled}}"
                id="{{id}}"
                type="{{type}}"
            ></s-base-input>
            <span s-if="{{enterButton}}" class="{{searchClass}}" on-click="searchClick($event)">
                <s-button type="primary" class="{{buttonClass}}" size="{{size}}">
                    <s-icon s-if="{{enterButton === true}}" type="search"></s-icon>
                    <span s-else>{{enterButton}}</span>
                </s-button>
            </span>
            <span s-else class="{{searchClass}}" on-click="searchClick($event)">
                <s-icon class="${prefixCls}-search-icon" type="search"></s-icon>
            <span>
        </span>
    `

});
