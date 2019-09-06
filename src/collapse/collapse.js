/**
 * @file Santd collapse collapse source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('collapse')();

function toArray(activeKey) {
    let currentActiveKey = activeKey;
    if (!Array.isArray(currentActiveKey)) {
        currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
    }
    return currentActiveKey;
}

export default san.defineComponent({
    dataTypes: {
        activeKey: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        defaultActiveKey: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        acordion: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool
    },

    initData() {
        return {
            bordered: true,
            accordion: false,
            destroyInactivePanel: false,
            panelChildren: []
        };
    },

    inited() {
        const activeKey = this.data.get('activeKey');
        const defaultActiveKey = this.data.get('defaultActiveKey');

        this.data.set('activeKey', toArray(activeKey || defaultActiveKey));
    },

    updated() {
        const panelChildren = this.data.get('panelChildren');
        const activeKey = this.data.get('activeKey');
        const accordion = this.data.get('accordion');

        panelChildren.forEach((child, index) => {
            const key = child.data.get('key') || String(index);

            let isActive = accordion ? activeKey[0] === key : activeKey.includes(key);

            child.data.set('panelKey', key);
            child.data.set('prefixCls', prefixCls);
            child.data.set('isActive', isActive);
            child.data.set('accordion', accordion);
        });
    },

    messages: {
        santd_panel_add(payload) {
            this.data.push('panelChildren', payload.value);
        },
        santd_panel_click(payload) {
            let activeKey = this.data.get('activeKey');
            const accordion = this.data.get('accordion');
            const key = payload.value;

            if (accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            }
            else {
                activeKey = [...activeKey];
                if (activeKey.includes(key)) {
                    activeKey.splice(activeKey.indexOf(key), 1);
                }
                else {
                    activeKey.push(key);
                }
            }
            this.data.set('activeKey', activeKey);
        }
    },

    template: `
        <div class="${prefixCls} {{bordered ? '' : '${prefixCls}-borderless'}}" role="{{accordion ? 'tablist' : ''}}">
            <slot />
        </div>
    `
});