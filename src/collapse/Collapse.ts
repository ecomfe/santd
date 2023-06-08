/**
 * @file Santd collapse collapse source file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import Panel from './Panel';
const prefixCls = classCreator('collapse')();
type MessagesCollapse = {
    santd_panel_add?: (this: Collapse, payload: {
        value: any;
    }) => void;

    santd_panel_click?: (this: Collapse, payload: {
        value: any;
    }) => void;
};
import {ICollapseProps} from './interface';

export default class Collapse extends Base<ICollapseProps> {
    panelChildren: any[] | null | undefined;
    static Panel = Panel;
    initData(): ICollapseProps {
        return {
            bordered: true,
            accordion: false,
            destroyInactivePanel: false,
            expandIconPosition: 'left'
        };
    }

    static computed = {
        classes(this: Collapse) {
            const expandIconPosition = this.data.get('expandIconPosition') || 'left';
            const bordered = this.data.get('bordered');
            let classArr = [prefixCls];
            classArr.push(`${prefixCls}-icon-position-${expandIconPosition}`);
            !bordered && classArr.push(`${prefixCls}-borderless`);
            return classArr;
        }
    }

    inited() {
        this.panelChildren = [];

        let activeKey = this.data.get('activeKey') || this.data.get('defaultActiveKey') || '1';
        if (activeKey && !(activeKey instanceof Array)) {
            activeKey = [activeKey];
        }

        this.data.set('activeKey', activeKey);
    }

    disposed() {
        this.panelChildren = null;
    }

    updated() {
        const activeKey = this.data.get('activeKey');
        const accordion = this.data.get('accordion');

        this.panelChildren?.length && this.panelChildren.forEach((child, index) => {
            const key = child.data.get('key') || String(index);

            let isActive = accordion ? activeKey && activeKey[0] === key : activeKey && activeKey?.includes(key);

            child.data.set('panelKey', key);
            child.data.set('isActive', isActive);
            child.data.set('accordion', accordion);
        });
    }

    static messages: MessagesCollapse = {
        santd_panel_add(payload) {
            this.panelChildren && this.panelChildren.push(payload.value);
        },

        santd_panel_click(payload) {
            let activeKey = this.data.get('activeKey') as string[];
            const accordion = this.data.get('accordion');
            const key = payload.value;

            if (accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            }
            else {
                activeKey = activeKey?.slice(0);
                if (activeKey?.includes(key)) {
                    activeKey.splice(activeKey?.indexOf(key), 1);
                }
                else {
                    (activeKey)?.push(key);
                }
            }
            this.data.set('activeKey', activeKey);
            this.fire('change', activeKey);
        }
    }

    attached() {
        this.updated();
    }

    static template = `
        <div class="{{classes}}" role="{{accordion ? 'tablist' : ''}}">
            <slot />
        </div>
    `;
};
