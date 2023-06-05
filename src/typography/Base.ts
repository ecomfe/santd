/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import BaseComp, {TextNode} from 'santd/base';
import {NodeType} from 'san';
import icon from '../icon';
import tooltip from '../tooltip';
import copy from 'copy-to-clipboard';
import {classCreator, getComponentChildren} from '../core/util';
import localeReceiver from '../locale-provider/receiver';
import {
    TypographyType,
    InternalProps,
    InternalState,
    InternalComputed
} from './interface';

const prefixCls = classCreator('typography')();

const isStyleSupport = function (styleName: string) {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
        const documentElement = window.document.documentElement;

        return styleNameList.some(name => name in documentElement.style);
    }
    return false;
};

const create = function (tag?: TypographyType) {
    const content = `
        <strong s-if="strong"><slot /></strong>
        <u s-elif="underline"><slot /></u>
        <del s-elif="delete"><slot /></del>
        <code s-elif="code"><slot /></code>
        <mark s-elif="mark"><slot /></mark>
        <slot s-else />
        <s-tooltip title="{{copied ? locale.copied : locale.copy}}" s-if="copyable">
            <button
                s-if="copyable"
                class="${prefixCls}-copy"
                style="border: 0px; background: transparent; padding: 0px; line-height: inherit;"
                on-click="handleCopy">
                <s-icon type="{{copied ? 'check' : 'copy'}}" />
            </button>
        </s-tooltip>
    `;

    let template: string;
    if (!tag || tag === 'paragraph') {
        template = `<div class="{{classes}}">${content}</div>`;
    }
    else if (tag === 'text') {
        template = `<span class="{{classes}}">${content}</span>`;
    }
    else if (tag === 'title') {
        template = `<span>${content}</span>`;
    }

    class InternalComponent extends BaseComp<InternalState, InternalProps, InternalComputed> {
        static template = template;

        static computed = {
            ...localeReceiver.computed,

            getEllipsis(this: InternalComponent) {
                const ellipsis = this.data.get('ellipsis');
                return !ellipsis ? {} : {
                    rows: 1,
                    expandable: false,
                    ...(typeof ellipsis === 'object' ? ellipsis : null)
                };
            },

            canUseCSSEllipsis(this: InternalComponent) {
                const clientRendered = this.data.get('clientRendered');
                const copyable = this.data.get('copyable');
                const getEllipsis = this.data.get('getEllipsis');
                const {rows, expandable} = getEllipsis;

                if (copyable || expandable || !clientRendered) {
                    return false;
                }

                if (rows === 1) {
                    return isStyleSupport('textOverflow');
                }

                return isStyleSupport('webkitLineClamp');
            },

            classes(this: InternalComponent) {
                let type = this.data.get('type');
                let disabled = this.data.get('disabled');
                const rows = this.data.get('getEllipsis').rows;
                const cssEllipsis = this.data.get('canUseCSSEllipsis');
                const cssTextOverflow = rows === 1 && cssEllipsis;
                const cssLineClamp = rows && rows > 1 && cssEllipsis;

                let classArr = [prefixCls];
                type === 'secondary' && classArr.push(`${prefixCls}-secondary`);
                type === 'warning' && classArr.push(`${prefixCls}-warning`);
                type === 'danger' && classArr.push(`${prefixCls}-danger`);
                disabled && classArr.push(`${prefixCls}-disabled`);
                rows && classArr.push(`${prefixCls}-ellipsis`);
                cssTextOverflow && classArr.push(`${prefixCls}-ellipsis-single-line`);
                cssLineClamp && classArr.push(`${prefixCls}-ellipsis-multiple-line`);

                return classArr;
            }
        }

        static components = {
            's-icon': icon,
            's-tooltip': tooltip
        }

        static create: (tag?: TypographyType) => typeof InternalComponent

        copyId!: number

        children!: any[]

        inited = localeReceiver.inited

        initData(): InternalState {
            return {
                componentName: 'Text',
                clientRendered: false
            };
        }

        attached() {
            this.data.set('clientRendered', true);
        }

        handleCopy() {
            let copyable = this.data.get('copyable');
            const copyConfig = {
                ...(typeof copyable === 'object' ? copyable : null)
            };

            if (copyConfig.text == null) {
                let textnode = getComponentChildren<TextNode>(this.children, item => item.nodeType === NodeType.TEXT);
                copyConfig.text = textnode.reduce((total, cur) => !/^\n\s*$/g.test(cur.content) ? (total + cur.content) : total, '');
            }
            copy(copyConfig.text || '');
            if (typeof copyConfig.onCopy === 'function') {
                copyConfig.onCopy();
            }

            this.data.set('copied', true);
            this.copyId = window.setTimeout(() => {
                this.data.set('copied', false);
            }, 3000);
        }
    };

    return InternalComponent;
};

const base = create();

base.create = create;

export default base;
