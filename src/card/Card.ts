/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import * as I from './interface';
import Base from 'santd/base';

import {classCreator} from '../core/util';
import LoadingBlock from './LoadingBlock';
import Tabs from '../tabs';
import Meta from './Meta';
import Grid from './Grid';

const prefix = classCreator('card')();
export default class Card extends Base<I.State> {
    static template = `
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
    `;
    static components = {
        's-loadingblock': LoadingBlock,
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane
    };
    static computed = {
        cls(this: Card) {
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
    };
    static Meta: Meta;
    static Grid: Grid;

    initData(): I.State {
        return {
            bordered: true,
        };
    }

    inited(): void {
        let hasExtra = !!this.sourceSlots.named.extra;
        let showHeader = this.data.get('title') || this.data.get('tabList') || hasExtra;

        this.data.set('showHeader', showHeader);
        this.data.set('hasExtra', hasExtra);
    }
    onTabChange(key: string): void {
        this.fire('tabChange', key);
    }

}