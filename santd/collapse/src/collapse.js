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
        className: DataTypes.string,
        destroyInactivePanel: DataTypes.bool
    },
    initData() {
        return {
            prefixCls: 'collapse',
            accordion: false,
            destroyInactivePanel: false,
            children: []
        };
    },
    inited() {
        const activeKey = this.data.get('activeKey');
        const defaultActiveKey = this.data.get('defaultActiveKey');

        let currentActiveKey = defaultActiveKey;
        if (activeKey) {
            currentActiveKey = activeKey;
        }
        this.data.set('activeKey', toArray(currentActiveKey));
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            return [prefixCls, className];
        }
    },
    updated() {
        const children = this.data.get('children');
        const prefixCls = this.data.get('prefixCls');
        children.forEach((child, index) => {
            const activeKey = this.data.get('activeKey');
            const key = child.data.get('key') || String(index);
            const accordion = this.data.get('accordion');
            const expandIcon = this.data.get('expandIcon');

            let isActive = false;
            if (accordion) {
                isActive = activeKey[0] === key;
            }
            else {
                isActive = activeKey.indexOf(key) > -1;
            }
            child.data.set('key', key);
            child.data.set('panelKey', key);
            child.data.set('prefixCls', prefixCls);
            child.data.set('isActive', isActive);
            child.data.set('accordion', accordion);
            child.data.set('expandIcon', expandIcon);
        });
    },
    messages: {
        addPanel(payload) {
            this.data.push('children', payload.value);
        },
        panelClick(payload) {
            let activeKey = this.data.get('activeKey');
            const accordion = this.data.get('accordion');
            const key = payload.value;

            if (accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            }
            else {
                activeKey = [...activeKey];
                const index = activeKey.indexOf(key);
                const isActive = index > -1;
                if (isActive) {
                    // remove active state
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
        <div class="{{classes}}" role="{{accordion ? 'tablist' : ''}}">
            <slot></slot>
        </div>
    `
});
