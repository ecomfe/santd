/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {NodeType} from 'san';
import classNames from 'classnames';
import icon from '../icon';
import tooltip from '../tooltip';
import copy from 'copy-to-clipboard';
import {classCreator, getComponentChildren} from '../core/util';
import inherits from '../core/util/inherits';
import LocaleReceiver from '../localeprovider/localereceiver';

const prefix = classCreator('typography')();

const isStyleSupport = function (styleName) {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
        const documentElement = window.document.documentElement;

        return styleNameList.some(name => name in documentElement.style);
    }
    return false;
};

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'Text'
        };
    }
}), LocaleReceiver);

const create = function (tag) {
    const content = `
        <strong s-if="strong"><slot/></strong>
        <u s-elif="underline"><slot/></u>
        <del s-elif="delete"><slot/></del>
        <code s-elif="code"><slot/></code>
        <mark s-elif="mark"><slot/></mark>
        <slot s-else/>
        <s-tooltip title="{{copied ? locale.copied : locale.copy}}" s-if="{{copyable}}">
            <button
                class="${prefix}-copy"
                style="border: 0px; background: transparent; padding: 0px; line-height: inherit;"
                s-if="copyable"
                on-click="handleCopy">
                <s-icon type="{{copied ? 'check' : 'copy'}}"></s-icon>
            </button>
        </s-tooltip>
    `;

    let template;
    if (!tag || tag === 'paragraph') {
        template = ['<div class="{{classes}}">', content, '</div>'];
    }
    else if (tag === 'text') {
        template = ['<span class="{{classes}}">', content, '</span>'];
    }
    else if (tag === 'title') {
        template = ['<span>', content, '</span>'];
    }

    const base = san.defineComponent({
        template: template.join(''),
        initData() {
            return {
                clientRendered: false
            };
        },
        attached() {
            this.data.set('clientRendered', true);
        },
        computed: {
            getEllipsis() {
                const ellipsis = this.data.get('ellipsis');
                if (!ellipsis) {
                    return {};
                }

                return {
                    rows: 1,
                    expandable: false,
                    ...(typeof ellipsis === 'object' ? ellipsis : null)
                };
            },
            canUseCSSEllipsis() {
                const clientRendered = this.data.get('clientRendered');
                const copyable = this.data.get('copyable');
                const getEllipsis = this.data.get('getEllipsis');
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

                return classNames(prefix, {
                    [`${prefix}-secondary`]: type === 'secondary',
                    [`${prefix}-warning`]: type === 'warning',
                    [`${prefix}-danger`]: type === 'danger',
                    [`${prefix}-disabled`]: disabled,
                    [`${prefix}-ellipsis`]: rows,
                    [`${prefix}-ellipsis-single-line`]: cssTextOverflow,
                    [`${prefix}-ellipsis-multiple-line`]: cssLineClamp
                });
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

            if (copyConfig.text === undefined) {
                let textnode = getComponentChildren(this.children,
                    item => item.nodeType === NodeType.TEXT);
                copyConfig.text = textnode.reduce(
                    (total, cur) => !/^\n\s*$/g.test(cur.content) ? (total + cur.content) : total, '');
            }
            copy(copyConfig.text || '');
            copyConfig.onCopy && typeof copyConfig.onCopy === 'function' && copyConfig.onCopy();

            this.data.set('copied', true);
            this.copyId = window.setTimeout(() => {
                this.data.set('copied', false);
            }, 3000);
        }
    });
    return inherits(base, Locale);
};

const base = create();

base.create = create;

export default base;
