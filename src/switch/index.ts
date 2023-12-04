/**
 * @file 组件 switch
 * @author panming <panming@baidu.com>
 */

import Icon from '../icon';
import {classCreator} from '../core/util';
import './style/index.less';
import Base from 'santd/base';
import {State, Props, Computed} from './interface'
const prefixCls = classCreator('switch')();

export default class Switch extends Base<State, Props, Computed> {
    
    static template = `
        <span
            disabled="{{disabled}}"
            class="{{classes}}"
            on-click="toggle"
            on-keydown="handleKeyDown"
            on-mouseUp="handleMouseUp"
            tabIndex="{{disabled ? -1 : tabIndex || 0}}"
        >
            <span class="${prefixCls}-handler" s-if="{{loading}}">
                <s-icon type="loading" />
            </span>
            <span class="${prefixCls}-inner">
                <template s-if="checked && checkedChildren">{{checkedChildren}}</template>
                <slot name="checkedChildren" s-else-if="checked" />
                <template s-if="!checked && unCheckedChildren">{{unCheckedChildren}}</template>
                <slot name="unCheckedChildren" s-else-if="!checked" />
            </span>
        </span>
    `
    
    static components = {
        's-icon': Icon
    }

    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'small'
            },
            disabled: false,
            defaultChecked: false,
            checked: false,
            loading: false
        };
    }

    inited() {
        this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
    }

    static computed = {
        classes(this: Switch) {
            const data = this.data;
            const checked = data.get('checked');
            const disabled = data.get('disabled');
            const size = data.get('sizeMap')[data.get('size')];
            const loading = data.get('loading');
            const block = data.get('block');
            let classArr = [prefixCls];

            !!checked && classArr.push(`${prefixCls}-checked`);
            !!disabled && classArr.push(`${prefixCls}-disabled`);
            !!size && classArr.push(`${prefixCls}-${size}`);
            !!loading && classArr.push(`${prefixCls}-loading`);
            !!block && classArr.push(`${prefixCls}-block`);
            return classArr;
        }
    }

    attached() {
        this.nextTick(() => {
            const autoFocus = this.data.get('autoFocus');
            const disabled = this.data.get('disabled');
            if (autoFocus && !disabled) {
                this.focus();
            }
        });
    }

    setChecked(checked: boolean) {
        if (this.data.get('disabled')) {
            return;
        }
        if (!this.data.get('disabled')) {
            this.data.set('checked', checked);
        }
        this.fire('change', checked);
        this.dispatch('UI:form-item-interact', {fieldValue: checked, type: 'change'});
    }

    toggle() {
        const checked = !this.data.get('checked');
        this.setChecked(checked);
        this.fire('click', checked);
    }

    handleKeyDown(e: {keyCode: number}) {
        if (e.keyCode === 37) { // Left
            this.setChecked(false);
        }
        else if (e.keyCode === 39) { // Right
            this.setChecked(true);
        }
        else if (e.keyCode === 32 || e.keyCode === 13) { // Space, Enter
            this.toggle();
        }
    }

    focus() {
        (this.el as unknown as HTMLInputElement).focus();
    }

    blur() {
        (this.el as unknown as HTMLInputElement).blur();
    }

    handleMouseUp(e: MouseEvent) {
        (this.el as unknown as HTMLInputElement).blur();
        this.fire('mouseup', e);
    }
};
