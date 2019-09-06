/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import LoadingBlock from './loadingBlock';
import Tabs from '../tabs';

const prefix = classCreator('card')();
export default san.defineComponent({
    dataTypes: {
        type: DataTypes.string,
        title: DataTypes.string,
        size: DataTypes.string,
        tabList: DataTypes.array,
        loading: DataTypes.bool,
        hoverable: DataTypes.bool,
        defaultActiveKey: DataTypes.string,
        activeTabKey: DataTypes.string,
        bordered: DataTypes.bool,
        actions: DataTypes.array
    },
    template: `
        <div class="{{cls}}">
            <div s-if="showHeader" class="${prefix}-head" style="{{headStyle}}">
                <div class="${prefix}-head-wrapper">
                    <div s-if="title" class="${prefix}-head-title">{{title}}</div>
                    <div s-if="hasExtra" class="${prefix}-extra">
                        <slot name="extra" />
                    </div>
                </div>
                <s-tabs
                    s-if="tabList && tabList.length"
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
                <slot name="cover" />
            </div>
            <div class="${prefix}-body" style="{{bodyStyle}}">
                <s-loadingblock s-if="loading" />
                <slot s-else />
            </div>
            <ul s-if="actions" class="${prefix}-actions">
                <li s-for="action in actions" style="width: {{100 / actions.length}}%">
                    <span><slot name="{{action}}"/></span>
                </li>
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
            let loading = this.data.get('loading');
            let bordered = this.data.get('bordered');
            let type = this.data.get('type');
            let tabList = this.data.get('tabList');
            let isContainGrid = this.data.get('isContainGrid');
            let hoverable = !!this.data.get('hoverable');
            let size = this.data.get('size');

            let classArr = [prefix];
            loading && classArr.push(`${prefix}-loading`);
            bordered && classArr.push(`${prefix}-bordered`);
            hoverable && classArr.push(`${prefix}-hoverable`);
            isContainGrid && classArr.push(`${prefix}-contain-grid`);
            tabList && tabList.length && classArr.push(`${prefix}-contain-tabs`);
            !!type && classArr.push(`${prefix}-type-${type}`);
            !!size && classArr.push(`${prefix}-${size}`);

            return classArr;
        }
    },
    inited() {
        let hasExtra = !!this.sourceSlots.named.extra;
        let showHeader = this.data.get('title') || this.data.get('tabList') || hasExtra;

        this.data.set('showHeader', showHeader);
        this.data.set('hasExtra', hasExtra);
    },
    onTabChange(key) {
        this.fire('tabChange', key);
    }
});