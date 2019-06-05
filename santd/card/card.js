/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes, NodeType} from 'san';
// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import LoadingBlock from './loadingBlock';
import Grid from './grid';
import Tabs from 'santd/tabs';

// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx
const cc = classCreator('card');
const prefix = cc();
export default san.defineComponent({
    template: `
    	<div class="{{cls}}">
            <div s-if="showHeader" className="${prefix}-head" style="{{headStyle}}">
                <div className="${prefix}-head-wrapper">
                    <div s-if="title" class="${prefix}-head-title">{{title}}</div>
                    <div s-if="isExtra" class="${prefix}-extra">
                        <slot name="extra"></slot>
                    </div>
                </div>
                <!--tabs-->
                <s-tabs
                    s-if="{{tabList && tabList.length}}"
                    activeTabKey="{{activeTabKey}}"
                    defaultActiveKey="{{defaultActiveKey}}"
                    class="${prefix}-head-tabs"
                    size="large"
                    on-change="onTabChange"
                >
                    <s-tabpane
                        s-for="item in tabList"
                        tab="{{item.tab}}"
                        key="{{item.key}}"
                        disabled="{{disabled}}"
                    />
                </s-tabs>
            </div>
            <div class="${prefix}-cover">
                <slot name="cover"></slot>
            </div>
            <div class="${prefix}-body" style="{{bodyStyle}}" s-ref="content">
                <s-loadingblock s-if="loading"/>
                <slot s-else></slot>
            </div>
            <ul s-if="isActions" class="${prefix}-actions" s-ref="actionsContain">
                <slot name="actions"></slot>
            </ul>
        </div>
    `,
    components: {
        's-loadingblock': LoadingBlock,
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane
    },
    initData() {
        return {
            bordered: true
        };
    },
    computed: {
        cls() {
            let selfClass = this.data.get('class');
            let loading = this.data.get('loading');
            let bordered = this.data.get('bordered');
            let type = this.data.get('type');

            let widerPadding = this.data.get('widerPadding');
            let tabList = this.data.get('tabList');
            let updateWiderPaddingCalled = this.data.get('updateWiderPaddingCalled');
            let isContainGrid = this.data.get('isContainGrid');

            let hoverable = !!this.data.get('hoverable');
            let noHovering = this.data.get('noHovering');
            let size = this.data.get('size');
            if (noHovering !== undefined) {
                hoverable = !noHovering || hoverable;
            }

            return classNames(prefix, selfClass, {
                [`${prefix}-loading`]: loading,
                [`${prefix}-bordered`]: bordered,
                [`${prefix}-hoverable`]: hoverable,
                [`${prefix}-wider-padding`]: widerPadding,
                [`${prefix}-padding-transition`]: updateWiderPaddingCalled,
                [`${prefix}-contain-grid`]: isContainGrid,
                [`${prefix}-contain-tabs`]: tabList && tabList.length,
                [`${prefix}-type-${type}`]: !!type,
                [`${prefix}-${size}`]: !!size
            });
        }
    },
    inited() {
        let isExtra = !!this.sourceSlots.named['extra'];
        let isActions = !!this.sourceSlots.named['actions'];
        let showHeader = this.data.get('title') || this.data.get('tabList') || isExtra;
        this.data.set('showHeader', showHeader);
        this.data.set('isActions', isActions);
        this.data.set('isExtra', isExtra);

    },
    attached() {
        // let slots = this.slotChildren || [];
        let defaultSlot = this.slot()[0];
        defaultSlot && this.data.set('isContainGrid', defaultSlot.children.some(slot => slot.constructor === Grid));
        let actSlot = this.slotChildren.filter(child => child.name === 'actions');

        let cmptNodeList = [];
        let loopCMPT = list => {
            list && list.length && list.forEach(item => {
                if (item.nodeType === NodeType.CMPT && item.tagName === 'i') {
                    cmptNodeList.push(item);
                }
                loopCMPT(item.children);
            });
        };
        if (actSlot.length) {
            actSlot = actSlot[0];
            loopCMPT(actSlot.children);
            cmptNodeList.forEach(item => {
                let li = document.createElement('li');
                let span = document.createElement('span');
                li.style = `width: ${100 / cmptNodeList.length}%`;
                span.appendChild(item.el);
                li.appendChild(span);
                this.ref('actionsContain').appendChild(li);
            });
        }
    },
    onTabChange(key) {
        this.fire('tabChange', key);
    }
});
