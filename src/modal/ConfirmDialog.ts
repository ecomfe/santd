/**
 * @file 组件 modal/ConfirmDialog
 * @author baozhixin <baozhixin@baidu.com>
 */

import * as I from './interface';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import icon from '../icon';
import Dialog from './Dialog';
import ActionButton from './ActionButton';
import localeReceiver from '../locale-provider/receiver';
import san, {Component} from 'san';


const prefixCls = classCreator('modal')();
const contentPrefixCls = `${prefixCls}-confirm`;
interface contentType extends Component {
    prototype: object;
}

// 判断是否SanComponent, 可能会随着san的版本迭代变更，参考依据如下：
// https://github.com/baidu/san/blob/36085399ab3d84df3ff8b741bb2f57c483b59acb/src/view/node-type.js
// https://github.com/baidu/san/blob/9a7cd2e74ecd4f307afd1733aa5b745707edc0c9/src/view/component.js#L278
// 改成使用传统方式判断 by erik at 2019-10-03
function isValidComponent(content: contentType): boolean {
    return content && content.prototype instanceof san.Component;
}

// 动态加载content组件
let contentFun: {
    resolve: any;
    reject: any;
};
const contentLoader = san.createComponentLoader(() => new Promise((resolve, reject) => {
    contentFun = {resolve, reject};
}));

export default class ConfirmDialog extends Base<I.ConfirmDialogState, I.ConfirmDialogProps, I.ConfirmDialogComputed> {
    static template = /* html */ `<template>
        <s-dialog
            prefixCls="{{prefixCls}}"
            className="${contentPrefixCls} ${contentPrefixCls}-{{type}} {{className}}"
            wrapClassName="{{!!centered ? ${prefixCls}-centered : ''}}"
            visible="{{visible}}"
            title=""
            hasFooter="{{false}}"
            transitionName="zoom"
            maskTransitionName="fade"
            maskClosable="{{maskClosable}}"
            maskStyle="{{maskStyle}}"
            style="{{style}}"
            width="{{width}}"
            zIndex="{{zIndex}}"
            keyboard="{{keyboard}}"
            centered="{{centered}}"
            getContainer="{{getContainer}}"
            onCancel="{{close.bind(this, {triggerCancel: true})}}"
            on-afterClose="afterClose"
        >
            <div class="${contentPrefixCls}-body-wrapper">
                <div class="${contentPrefixCls}-body">
                    <s-icon type="{{iconType}}"/>
                    <span class="${contentPrefixCls}-title">{{title}}</span>
                    <div class="${contentPrefixCls}-content">
                        <template s-if="{{contentIsComponent}}"><content-loader/></template>
                        <template s-else>{{content}}</template>
                    </div>
                </div>
                <div class="${contentPrefixCls}-btns">
                    <s-button
                        s-if="{{okCancel}}"
                        actionFn="{{onCancel}}"
                        closeModal="{{close}}"
                        autoFocus="{{autoFocusButton === 'cancel'}}"
                        buttonProps="{{cancelButtonProps}}"
                    >
                        {{cancelText || locale.cancelText}}
                    </s-button>
                    <s-button
                        type="{{okType}}"
                        actionFn="{{onOk}}"
                        closeModal="{{close}}"
                        autoFocus="{{autoFocusButton === 'ok'}}"
                        buttonProps="{{okButtonProps}}"
                    >
                        {{okText || (okCancel ? locale.okText : locale.justOkText)}}
                    </s-button>
                </div>
            </div>
        </s-dialog>
    </template>`;

    static components =  {
        'content-loader': contentLoader,
        's-button': ActionButton,
        's-dialog': Dialog,
        's-icon': icon
    }

    afterClose(): void {
        const afterCloseFn = this.data.get('afterClose');
        'function' === typeof afterCloseFn && afterCloseFn();
    }

    static computed: I.ConfirmDialogComputed = {
        ...localeReceiver.computed,

        contentIsComponent(this: ConfirmDialog) {
            const content = this.data.get('content');
            return isValidComponent(content);
        }
    }

    initData(): I.ConfirmDialogState {
        return {
            componentName: 'Modal',
            autoFocusButton: 'ok',
            iconType: 'question-circle',
            maskClosable: false,
            okCancel: true,
            okType: 'primary',
            width: 416
        };
    }

    inited<TBase extends Base>(this: TBase) {
        this.dispatch('santd_add_locale_receiver', this);
    }

    attached() {
        // 处理content是san组件的情况
        const content = this.data.get('content');
        this.data.get('contentIsComponent') && contentFun.resolve(content);
    }
};
