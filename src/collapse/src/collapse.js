/**
 * @file Santd collapse collapse source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

function toArray(activeKey) {
    let currentActiveKey = activeKey;
    if (!Array.isArray(currentActiveKey)) {
        currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
    }
    return currentActiveKey;
}

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        activeKey: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        defaultActiveKey: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        acordion: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool
    },

    initData() {
        return {
            prefixCls: 'collapse',
            accordion: false,
            destroyInactivePanel: false,
            linkChildren: []
        };
    },

    inited() {
        const activeKey = this.data.get('activeKey');
        const defaultActiveKey = this.data.get('defaultActiveKey');

        this.data.set('activeKey', toArray(activeKey || defaultActiveKey));
    },

    updated() {
        const linkChildren = this.data.get('linkChildren');
        const activeKey = this.data.get('activeKey');
        const prefixCls = this.data.get('prefixCls');
        const accordion = this.data.get('accordion');
        const expandIcon = this.data.get('expandIcon');

        linkChildren.forEach((child, index) => {
            const key = child.data.get('key') || String(index);

            let isActive = false;
            isActive = accordion ? activeKey[0] === key : activeKey.includes(key);

            child.data.set('key', key);
            child.data.set('panelKey', key);
            child.data.set('prefixCls', prefixCls);
            child.data.set('isActive', isActive);
            child.data.set('accordion', accordion);
            child.data.set('expandIcon', expandIcon);
        });
    },

    messages: {
        santd_panel_add(payload) {
            this.data.push('linkChildren', payload.value);
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
                    const index = activeKey.indexOf(key);
                    activeKey.splice(index, 1);
                }
                else {
                    activeKey.push(key);
                }
            }
            this.data.set('activeKey', activeKey);
        }
    },

    template: `
        <div class="{{prefixCls}} {{classes}}" role="{{accordion ? 'tablist' : ''}}">
            <slot />
        </div>
    `
});
