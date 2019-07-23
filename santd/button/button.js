/**
 * @file san-button按钮
 * @author fuqiangqiang@baidu.com
 */
import san, {DataTypes} from 'san';
import Icon from 'santd/icon';
import Wave from 'santd/core/util/wave';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import './style/index';

const cc = classCreator('btn');
const prefixCls = cc();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        ghost: DataTypes.bool,
        href: DataTypes.string,
        htmlType: DataTypes.oneOf(['submit', 'button', 'reset']),
        icon: DataTypes.string,
        loading: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        shape: DataTypes.oneOf(['circle', 'circle-outline', 'round']),
        size: DataTypes.oneOf(['small', 'default', 'large']),
        target: DataTypes.string,
        type: DataTypes.oneOf(['default', 'primary', 'ghost', 'dashed', 'danger', 'link']),
        block: DataTypes.bool,
        className: DataTypes.string,
        noWave: DataTypes.bool
    },
    components: {
        's-icon': Icon,
        's-wave': Wave
    },
    computed: {
        classes() {
            // 处理class
            const data = this.data;
            const typei = data.get('type');
            const shapei = data.get('shape');
            const sizei = data.get('sizeMap')[data.get('size')];
            const isLoading = data.get('isLoading');
            const block = data.get('block');
            const ghost = data.get('ghost');
            const className = data.get('className');
            const instance = this.data.get('instance');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-${typei}`]: !!typei,
                [`${prefixCls}-${shapei}`]: !!shapei,
                [`${prefixCls}-${sizei}`]: !!sizei,
                [`${prefixCls}-icon-only`]: instance
                    && instance.slotChildren.length
                    && !instance.slotChildren[0].children.length,
                [`${prefixCls}-loading`]: isLoading,
                [`${prefixCls}-block`]: !!block,
                [`${prefixCls}-background-ghost`]: ghost,
                [`${className}`]: !!className
            });
        },
        isLoading() {
            const loading = this.data.get('loading');
            return loading !== false && typeof loading === 'boolean';
        },
        isCircle() {
            return !!this.data.get('shape');
        }
    },
    attached() {
        this.data.set('instance', this);
        // eslint-disable-next-line
        new Wave();
    },
    initData() {
        return {
            disabled: false,
            icons: null,
            loading: false,
            isCircle: false,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            noWave: false
        };
    },
    updated() {
        const loading = this.data.get('loading');
        if (loading && typeof loading !== 'boolean' && loading.delay) {
            this.delayTimeout = window.setTimeout(() => this.data.set('loading', true), loading.delay);
        }
        else {
            this.data.set('loading', loading);
        }
    },
    btnClick(e) {
        const href = this.data.get('href');
        const loading = this.data.get('loading');
        const target = this.data.get('target');
        if (!!loading) {
            return;
        }

        // 模拟a的动作
        if (href) {
            const node = document.createElement('a');
            node.href = href;
            node.target = target || '_self';
            node.click();
        }
        this.fire('click', e);
    },
    handleFocus(e) {
        this.dispatch('handleTrigger', {
            action: 'handleFocus', e
        });
    },
    handleBlur(e) {
        this.dispatch('handleTrigger', {
            action: 'handleBlur', e
        });
    },
    template: `
        <button
            autofocus="{{autofocus}}"
            autocomplete="{{autocomplete}}"
            form="{{form}}"
            formaction="{{formaction}}"
            formenctype="{{formenctype}}"
            formmethod="{{formmethod}}"
            formnovalidate="{{formnovalidate}}"
            formtarget="{{formtarget}}"
            name="{{name}}"
            value="{{value}}"
            type="{{htmlType || 'button'}}"
            disabled="{{disabled}}"
            class="{{classes}}"
            on-click="btnClick($event)"
            on-focus="handleFocus"
            on-blur="handleBlur"
        >
            <span>
                <s-icon s-if="{{isLoading}}" type="loading"></s-icon>
                <s-icon s-if="{{icon && !isLoading}}" type="{{icon}}"></s-icon>
                <slot s-if="!isCircle"></slot>
            </span>
            <s-wave s-if="!noWave && type !== 'link'"></s-wave>
        </button>
    `
});
