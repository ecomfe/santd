/**
 * @file Santd tabs ink tab bar node file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import {
    setTransform,
    isTransform3dSupported,
    getLeft,
    getTop,
    getActiveIndex
} from './utils';

function update(component, init) {
    const refs = component.data.get('refs');
    const rootNode = refs.root;
    const wrapNode = refs.nav || rootNode;
    const inkBarNode = refs.inkBar;
    const activeTab = refs.activeTab;
    const inkBarNodeStyle = inkBarNode && inkBarNode.style;
    const tabBarPosition = component.data.get('tabBarPosition');
    const children = component.data.get('children');
    const activeKey = component.data.get('activeKey');
    const activeIndex = getActiveIndex(children, activeKey);
    const styles = component.data.get('styles');

    if (init) {
        inkBarNodeStyle.display = 'none';
    }
    if (!inkBarNode) {
        return;
    }
    if (activeTab) {
        const tabNode = activeTab;
        const transformSupported = isTransform3dSupported(inkBarNodeStyle);

        // Reset current style
        setTransform(inkBarNodeStyle, '');
        inkBarNodeStyle.width = '';
        inkBarNodeStyle.height = '';
        inkBarNodeStyle.left = '';
        inkBarNodeStyle.top = '';
        inkBarNodeStyle.bottom = '';
        inkBarNodeStyle.right = '';

        if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
            let left = getLeft(tabNode, wrapNode);
            let width = tabNode.offsetWidth;

            // If tabNode'width width equal to wrapNode'width when tabBarPosition is top or bottom
            // It means no css working, then ink bar should not have width until css is loaded
            // Fix https://github.com/ant-design/ant-design/issues/7564
            if (width === rootNode.offsetWidth) {
                width = 0;
            } else if (styles.inkBar && styles.inkBar.width !== undefined) {
                width = parseFloat(styles.inkBar.width, 10);
                if (width) {
                    left += (tabNode.offsetWidth - width) / 2;
                }
            }

            // use 3d gpu to optimize render
            if (transformSupported) {
                setTransform(inkBarNodeStyle, `translate3d(${left}px,0,0)`);
            } else {
                inkBarNodeStyle.left = `${left}px`;
            }
            inkBarNodeStyle.width = `${width}px`;
        }
        else {
            let top = getTop(tabNode, wrapNode, true);
            let height = tabNode.offsetHeight;
            if (styles.inkBar && styles.inkBar.height !== undefined) {
                height = parseFloat(styles.inkBar.height, 10);
                if (height) {
                    top += (tabNode.offsetHeight - height) / 2;
                }
            }
            if (transformSupported) {
                setTransform(inkBarNodeStyle, `translate3d(0,${top}px,0)`);
                inkBarNodeStyle.top = '0';
            } else {
                inkBarNodeStyle.top = `${top}px`;
            }
            inkBarNodeStyle.height = `${height}px`;
        }
    }
    inkBarNodeStyle.display = activeIndex !== -1 ? 'block' : 'none';
}

export default san.defineComponent({
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const inkBarAnimated = this.data.get('inkBarAnimated');
            let classArr = [`${prefixCls}-ink-bar`];
            inkBarAnimated
                ? classArr.push(`${prefixCls}-ink-bar-animated`)
                : classArr.push(`${prefixCls}-ink-bar-no-animated`);
            return classArr;
        }
    },
    initData() {
        return {
            inkBarAnimated: true,
            styles: {}
        };
    },
    updated() {
        update(this);
    },
    attached() {
        this.dispatch('addRef', {
            name: 'inkBar',
            ref: this.el
        });

        window.setTimeout(() => {
            update(this, true);
        }, 0);
    },
    template: `
        <div
            class="{{classes}}"
            key="inkBar"
            style="{{styles.inkBar}}"
        >
        </div>
    `
});
