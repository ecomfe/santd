/**
 * @file san-button按钮
 * @author fuqiangqiang@baidu.com
 */
import san, {DataTypes} from 'san';
import Icon from 'santd/icon';
import Wave from 'santd/core/util/wave';
import {classCreator} from 'santd/core/util';
import './style/index';

const PREFIX_CLASS = classCreator('btn')();

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
            let data = this.data;
            let type = data.get('type');
            let shape = data.get('shape');
            let size = data.get('sizeMap')[data.get('size')];
            let className = data.get('className');


            let clazz = [PREFIX_CLASS];
            type && clazz.push(`${PREFIX_CLASS}-${type}`);
            shape && clazz.push(`${PREFIX_CLASS}-${shape}`);
            size && clazz.push(`${PREFIX_CLASS}-${size}`);
            !shape && clazz.push(`${PREFIX_CLASS}-icon-only`);
            (data.get('loading') === true) && clazz.push(`${PREFIX_CLASS}-loading`);
            data.get('block') && clazz.push(`${PREFIX_CLASS}-block`);
            data.get('ghost') && clazz.push(`${PREFIX_CLASS}-background-ghost`);
            className && clazz.push(className);

            return clazz;
        }
    },

    initData() {
        return {
            disabled: false,
            icons: null,
            loading: false,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            noWave: false
        };
    },

    updated() {
        let loading = this.data.get('loading');
        if (loading && loading.delay) {
            this.delayTimeout = window.setTimeout(
                () => this.data.set('loading', true), 
                loading.delay
            );
        }
    },

    btnClick(e) {
        if (this.data.get('loading')) {
            return;
        }


        // 模拟a的动作
        let href = this.data.get('href');
        if (href) {
            let node = document.createElement('a');
            node.href = href;
            node.target = this.data.get('target') || '_self';
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
                <s-icon s-if="loading === true" type="loading" />
                <s-icon s-elif="icon" type="{{icon}}" />
                <slot s-if="!shape" />
            </span>
            <s-wave s-if="!noWave && type !== 'link'" />
        </button>
    `
});