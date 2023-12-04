/**
 * @file 组件 modal/Modal
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */

import * as I from './interface';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import Dialog from './Dialog';
import button from '../button';
import icon from '../icon';
import localeReceiver from '../locale-provider/receiver';
import {Component} from 'san';

const prefixCls = classCreator('modal')();


export default class Modal extends Base<I.State, I.Props, I.Computed> {
    static components = {
        's-button': button,
        's-icon': icon
    }

    static computed: I.Computed = {
        ...localeReceiver.computed,

        wrapClass(this: Modal) {
            const centered = this.data.get('centered');
            const wrapClassName = this.data.get('wrapClassName');
            let classArr = [wrapClassName];
            !!centered && classArr.push(`${prefixCls}-centered`);
            return classArr.join(' ');
        }
    }

    initData(): I.State {
        return {
            componentName: 'Modal',
            width: 520,
            transitionName: 'zoom',
            maskTransitionName: 'fade',
            confirmLoading: false,
            visible: false,
            okType: 'primary'
        };
    }

    inited<TBase extends Base>(this: TBase) {
        this.dispatch('santd_add_locale_receiver', this);
    }

    dialog: Component<{}> | null = null;

    attached() {
        if (!this.dialog) {
            const {getContainer, ...props} = this.data.get();
            this.data.set('_PROPS_', props);
            this.dialog = new Dialog({
                owner: this,
                source: /* html */ `
                    <s-dialog s-bind="{{_PROPS_}}"
                        title="{=title=}"
                        visible="{=visible=}"
                        wrapClassName="{{wrapClass}}"
                        on-close="handleCancel"
                        on-afterClose="afterClose"
                    >
                        <slot/>
                        <slot name="closeIcon" slot="closeIcon">
                            <span class="${prefixCls}-close-x">
                                <s-icon class="${prefixCls}-close-icon" type="close"/>
                            </span>
                        </slot>
                        <slot name="footer" slot="footer">
                            <s-button s-bind="{{cancelButtonProps}}"
                                on-click="handleCancel"
                            >{{cancelText || locale.cancelText}}</s-button>
                            <s-button s-bind="{{okButtonProps}}"
                                type="{{okType}}"
                                loading="{{confirmLoading}}"
                                on-click="handleOk"
                            >{{okText || locale.okText}}</s-button>
                        </slot>
                    </s-dialog>
                `
            });

            const container = getContainer ? getContainer() : document.body;
            this.dialog.attach(container);
        }
    }

    handleCancel(e: MouseEvent): void {
        this.fire('cancel', e);
    }

    handleOk(e: MouseEvent): void {
        this.fire('ok', e);
    }

    afterClose(): void {
        this.fire('afterClose');
    }

    static template =  '<div />';
};
