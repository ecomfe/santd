/**
 * @file san-button按钮
 * @author fuqiangqiang@baidu.com
 */
import Base from 'santd/base';
import Icon from '../icon';
import Wave from '../core/util/wave';
import {classCreator} from '../core/util';
import './style/index';
import type {
    ButtonState as State,
    ButtonProps as Props,
    ButtonComputed as Computed
} from './interface';
import type {TButtonGroup} from './ButtonGroup'

const PREFIX_CLASS = classCreator('btn')();

function isLoadingObject(loading: Props['loading']): loading is {delay: number} {
    return typeof loading !== 'boolean' && loading?.delay !== undefined;
}

export default class Button extends Base<State, Props, Computed> {

    static components = {
        's-icon': Icon,
        's-wave': Wave
    }

    static computed = {
        classes(this: Button) {
            // 处理class
            const data = this.data;
            const type = data.get('type');
            const shape = data.get('shape');
            const size = data.get('sizeMap')[data.get('size')];


            let clazz = [PREFIX_CLASS];
            type && clazz.push(`${PREFIX_CLASS}-${type}`);
            shape && clazz.push(`${PREFIX_CLASS}-${shape}`);
            size && clazz.push(`${PREFIX_CLASS}-${size}`);
            !shape && clazz.push(`${PREFIX_CLASS}-icon-only`);
            (data.get('loading') === true) && clazz.push(`${PREFIX_CLASS}-loading`);
            data.get('block') && clazz.push(`${PREFIX_CLASS}-block`);
            data.get('ghost') && clazz.push(`${PREFIX_CLASS}-background-ghost`);

            return clazz;
        }
    }

    static Group: TButtonGroup

    delayTimeout!: number

    initData(): State {
        return {
            disabled: false,
            icons: null,
            loading: false,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            size: 'default',
            noWave: false
        };
    }

    updated() {
        let loading = this.data.get('loading');
        if (isLoadingObject(loading)) {
            this.delayTimeout = window.setTimeout(
                () => this.data.set('loading', true),
                loading.delay
            );
        }
    }

    btnClick(e: MouseEvent) {
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
    }

    handleFocus(e: FocusEvent) {
        this.dispatch('santd_button_trigger', {
            action: 'handleFocus', e
        });
    }

    handleBlur(e: FocusEvent) {
        this.dispatch('santd_button_trigger', {
            action: 'handleBlur', e
        });
    }

    static template = /* html */ `
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
                <slot />
            </span>
            <s-wave s-if="!noWave && type !== 'link'" />
        </button>
    `
};
