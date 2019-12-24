/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {NodeType} from 'san';
import icon from '../icon';
import tooltip from '../tooltip';
import copy from 'copy-to-clipboard';
import {classCreator, getComponentChildren} from '../core/util';
import localeReceiver from '../localeprovider/receiver';

const prefixCls = classCreator('typography')();

const isStyleSupport = function (styleName) {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
        const documentElement = window.document.documentElement;

        return styleNameList.some(name => name in documentElement.style);
    }
    return false;
};


const create = function (tag) {
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

    let template;
    if (!tag || tag === 'paragraph') {
        template = `<div class="{{classes}}">${content}</div>`;
    }
    else if (tag === 'text') {
        template = `<span class="{{classes}}">${content}</span>`;
    }
    else if (tag === 'title') {
        template = `<span>${content}</span>`;
    }

    return san.defineComponent({
        template,
        initData() {
            return {
                componentName: 'Text',
                clientRendered: false
            };
        },

        attached() {
            this.data.set('clientRendered', true);
        },

        inited: localeReceiver.inited,

        computed: {
            ...localeReceiver.computed,

            getEllipsis() {
                const ellipsis = this.data.get('ellipsis');
                return !ellipsis ? {} : {
                    rows: 1,
                    expandable: false,
                    ...(typeof ellipsis === 'object' ? ellipsis : null)
                };
            },

            canUseCSSEllipsis() {
                const {
                    clientRendered,
                    copyable,
                    getEllipsis
                } = this.data.get();
                const rows = getEllipsis.rows;
                const expandable = getEllipsis.expandable;

                if (copyable || expandable || !clientRendered) {
                    return false;
                }

                if (rows === 1) {
                    return isStyleSupport('textOverflow');
                }

                return isStyleSupport('webkitLineClamp');
            },

            classes() {
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
        },

        components: {
            's-icon': icon,
            's-tooltip': tooltip
        },

        handleCopy() {
            let copyable = this.data.get('copyable');
            const copyConfig = {
                ...(typeof copyable === 'object' ? copyable : null)
            };

            if (copyConfig.text == null) {
                let textnode = getComponentChildren(this.children, item => item.nodeType === NodeType.TEXT);
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
    });
};

const base = create();

base.create = create;

export default base;
