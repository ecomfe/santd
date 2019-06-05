/**
 * @file Santd tabs scrollable ink tab bar file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import TabBarRootNode from './tabBarRootNode';
import ScrollableTabBarNode from './scrollableTabBarNode';
import TabBarTabsNode from './tabBarTabsNode';
import InkTabBarNode from './inkTabBarNode';

export default san.defineComponent({
    components: {
        's-tabbarrootnode': TabBarRootNode,
        's-scrollabletabbarnode': ScrollableTabBarNode,
        's-tabbartabsnode': TabBarTabsNode,
        's-inktabbarnode': InkTabBarNode
    },
    initData() {
        return {
            refs: {}
        };
    },
    computed: {
        bodyStyle() {
            const tabBarPosition = this.data.get('tabBarPosition');
            if (tabBarPosition === 'left' || tabBarPosition === 'right') {
                return {
                    height: '100%',
                    float: tabBarPosition
                };
            }
        }
    },
    messages: {
        addRef(payload) {
            this.data.set('refs.' + payload.value.name, payload.value.ref);
        }
    },
    handleTabClick(payload) {
        this.fire('tabClick', payload);
    },
    template: `
        <div style="{{bodyStyle}}">
            <s-tabbarrootnode
                prefixCls="{{prefixCls}}"
                className="{{className}}"
                tabBarExtraContent="{{tabBarExtraContent}}"
                prevIcon="{{prevIcon}}"
                nextIcon="{{nextIcon}}"
                style="{{tabBarStyle}}"
            >
                <s-scrollabletabbarnode
                    prefixCls="{{prefixCls}}"
                    refs="{{refs}}"
                    tabBarPosition="{{tabBarPosition}}"
                >
                    <s-tabbartabsnode
                        prefixCls="{{prefixCls}}"
                        children="{{children}}"
                        activeKey="{{activeKey}}"
                        tabBarGutter="{{tabBarGutter}}"
                        tabBarPosition="{{tabBarPosition}}"
                        on-tabClick="handleTabClick"
                        injectComponent="{{injectComponent}}"
                    ></s-tabbartabsnode>
                    <s-inktabbarnode
                        prefixCls="{{prefixCls}}"
                        refs="{{refs}}"
                        children="{{children}}"
                        activeKey="{{activeKey}}"
                        tabBarPosition="{{tabBarPosition}}"
                    ></s-inktabbarnode>
                </s-scrollabletabbarnode>
            </s-tabbarrootnode>
        </div>
    `
});
