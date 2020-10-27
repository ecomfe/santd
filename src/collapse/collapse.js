/**
 * @file Santd collapse collapse source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('collapse')();

export default san.defineComponent({
    dataTypes: {
        activeKey: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        defaultActiveKey: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        acordion: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool,
        expandIconPosition: DataTypes.string
    },

    initData() {
        return {
            bordered: true,
            accordion: false,
            destroyInactivePanel: false,
            expandIconPosition: 'left'
        };
    },

    computed: {
        classes() {
            const expandIconPosition = this.data.get('expandIconPosition') || 'left';
            const bordered = this.data.get('bordered');
            let classArr = [prefixCls];
            classArr.push(`${prefixCls}-icon-position-${expandIconPosition}`);
            !bordered && classArr.push(`${prefixCls}-borderless`);
            return classArr;
        }
    },

    inited() {
        this.panelChildren = [];

        let activeKey = this.data.get('activeKey') || this.data.get('defaultActiveKey');
        if (!(activeKey instanceof Array)) {
            activeKey = [activeKey];
        }

        this.data.set('activeKey', activeKey);
    },

    disposed() {
        this.panelChildren = null;
    },

    updated() {
        const activeKey = this.data.get('activeKey');
        const accordion = this.data.get('accordion');

        this.panelChildren.forEach((child, index) => {
            const key = child.data.get('key') || String(index);

            let isActive = accordion ? activeKey[0] === key : activeKey.includes(key);

            child.data.set('panelKey', key);
            child.data.set('isActive', isActive);
            child.data.set('accordion', accordion);
        });
    },

    messages: {
        santd_panel_add(payload) {
            this.panelChildren.push(payload.value);
        },

        santd_panel_click(payload) {
            let activeKey = this.data.get('activeKey');
            const accordion = this.data.get('accordion');

            const key = payload.value;

            if (accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            }
            else {
                activeKey = activeKey.slice(0);
                if (activeKey.includes(key)) {
                    activeKey.splice(activeKey.indexOf(key), 1);
                }
                else {
                    activeKey.push(key);
                }
            }
            this.data.set('activeKey', activeKey);
            this.fire('change', activeKey);
        }
    },

    attached() {
        this.updated();
    },

    template: `
        <div class="{{classes}}" role="{{accordion ? 'tablist' : ''}}">
            <slot />
        </div>
    `
});
