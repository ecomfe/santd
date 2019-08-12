/**
 * @file 组件 switch
 * @author panming <panming@baidu.com>
 */

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import Icon from '../icon';
import {classCreator} from '../core/util';
import './style/index.less';
const prefixCls = classCreator('switch')();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        checkedChildren: DataTypes.any,
        unCheckedChildren: DataTypes.any,
        checked: DataTypes.bool,
        defaultChecked: DataTypes.bool,
        autoFocus: DataTypes.bool,
        type: DataTypes.string,
        className: DataTypes.string,
        prefixCls: DataTypes.string,
        loading: DataTypes.bool,
        tabIndex: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },
    components: {
        's-icon': Icon
    },
    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'small'
            },
            disabled: false,
            defaultChecked: false,
            checked: false,
            checkedChildrenIsString: false,
            unCheckedChildrenIsString: false,
            loading: false,
            prefixCls
        };
    },
    inited() {
        const data = this.data;
        data.set('checked',
            data.get('checked')
            || data.get('defaultChecked'));
        data.set('checkedChildrenIsString', typeof data.get('checkedChildren') === 'string');
        data.set('unCheckedChildrenIsString', typeof data.get('unCheckedChildren') === 'string');
    },
    computed: {
        classes() {
            const data = this.data;
            const checked = data.get('checked');
            const disabled = data.get('disabled');
            const size = data.get('sizeMap')[data.get('size')];
            const loading = data.get('loading');
            const block = data.get('block');
            const className = data.get('className');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-checked`]: !!checked,
                [`${prefixCls}-disabled`]: !!disabled,
                [`${prefixCls}-${size}`]: !!size,
                [`${prefixCls}-loading`]: !!loading,
                [`${prefixCls}-block`]: !!block
            }, className);
        },
        switchTabIndex() {
            const data = this.data;
            return data.get('disabled') ? -1 : data.get('tabIndex') || 0;
        }
    },
    attached() {
        this.nextTick(() => {
            const autoFocus = this.data.get('autoFocus');
            const disabled = this.data.get('disabled');
            if (autoFocus && !disabled) {
                this.focus();
            }
        });
    },
    setChecked(checked) {
        if (this.data.get('disabled')) {
            return;
        }
        if (!this.data.get('disabled')) {
            this.data.set('checked', checked);
        }
        this.fire('change', checked);
        this.dispatch('UI:form-item-interact', {fieldValue: checked, type: 'change'});
    },
    toggle() {
        const checked = !this.data.get('checked');
        this.setChecked(checked);
        this.fire('click', checked);
    },
    handleKeyDown(e) {
        if (e.keyCode === 37) { // Left
            this.setChecked(false);
        } else if (e.keyCode === 39) { // Right
            this.setChecked(true);
        } else if (e.keyCode === 32 || e.keyCode === 13) { // Space, Enter
            this.toggle();
        }
    },
    focus() {
        this.el.focus();
    },
    blur() {
        this.el.blur();
    },
    handleMouseUp(e) {
        this.el.blur();
        this.fire('mouseup', e);
    },
    template: `
        <span
            disabled="{{disabled}}"
            class="{{classes}}"
            on-click="toggle"
            on-keydown="handleKeyDown"
            on-mouseUp="handleMouseUp"
            tabIndex="{{switchTabIndex}}"
        >
            <span class="{{prefixCls}}-handler">
                <s-icon s-if="{{loading}}" type="loading"></s-icon>
            </span>
            <span class="{{prefixCls}}-inner">
                <template s-if="checked">
                    <template s-if="checkedChildrenIsString">
                        {{checkedChildren}}
                    </template>
                    <template s-else>
                        <slot name="checkedChildren" />
                    </template>
                </template>
                <template s-else>
                    <template s-if="unCheckedChildrenIsString">
                        {{unCheckedChildren}}
                    </template>
                    <template s-else>
                        <slot name="unCheckedChildren" />
                    </template>
                </template>
            </span>
        </span>
    `
});
