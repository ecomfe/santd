/**
 * @file 组件 modal/ActionButton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */

import * as I from './interface';
import Base from 'santd/base';
import button from '../button';

interface buttonNodeType extends Element {
    focus: () => void;
}

export default class ActionButton extends Base<I.ActionButtonState, I.ActionButtonProps, I.ActionButtonComputed> {
    static template = /* html */ `
        <template>
            <s-button s-ref="button"
                s-bind="{{buttonProps}}"
                type="{{type}}"
                loading="{{loading}}"
                on-click="onClick"
            ><slot/></s-button>
        </template>
    `;

    static components = {
        's-button': button
    }

    initData(): I.ActionButtonState {
        return {
            loading: false
        };
    }

    timeoutId!: NodeJS.Timer;

    attached(): void {
        const buttonNode = this.ref('button').el as buttonNodeType;
        const parentNode = (this.el as Element).parentNode;
        parentNode?.replaceChild(buttonNode, (this.el as Element));

        if (this.data.get('autoFocus')) {
            this.timeoutId = setTimeout(() => buttonNode.focus());
        }
    }

    detached(): void {
        clearTimeout(this.timeoutId);
    }

    onClick(): void {
        const data = this.data;
        const actionFn = data.get('actionFn');
        const closeModal = data.get('closeModal');

        if (actionFn) {
            let ret;
            if (actionFn.length) {
                ret = actionFn(closeModal);
            }
            else {
                ret = actionFn();
                if (!ret) {
                    closeModal();
                }
            }
            if (ret && ret.then) {
                data.set('loading', true);
                ret.then((...args: any[]) => {
                    // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
                    // data.set('loading', false);
                    closeModal(...args);
                }, () => {
                    // See: https://github.com/ant-design/ant-design/issues/6183
                    data.set('loading', false);
                });
            }
        }
        else {
            closeModal();
        }
    }
};
