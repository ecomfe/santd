/**
* @file Santd list file
* @author mayihui@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import Spin from '../spin';
import Pagination from '../pagination';
import Grid from '../grid';
import Item from './Item';
import type * as I from './interface';

import './style/index';
import {Component} from 'san/types';

const prefixCls = classCreator('list')();

const contentTemplate = `
    <div s-if="!loading && !hasChildren()" class="${prefixCls}-empty-text">
        <slot name="renderEmpty" s-if="hasRenderEmpty" />
        <span s-else>{{locale.emptyText}}</span>
    </div>
    <template s-else>
        <s-row gutter="{{grid.gutter}}" s-if="grid">
            <s-col
                span="{{getGrid(grid, 'column')}}"
                xs="{{getGrid(grid, 'xs')}}"
                sm="{{getGrid(grid, 'sm')}}"
                md="{{getGrid(grid, 'md')}}"
                lg="{{getGrid(grid, 'lg')}}"
                xl="{{getGrid(grid, 'xl')}}"
                xxl="{{getGrid(grid, 'xxl')}}"
                s-for="item, index in splitDataSource"
            >
                <slot name="renderItem" var-item="{{item}}" var-index="{{index}}" />
            </s-col>
        </s-row>
        <slot
            s-for="item, index in splitDataSource"
            name="renderItem"
            var-index="{{index}}"
            var-item="{{item}}" s-else />
    </template>
`;

export default class List extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <div class="{{classes}}" id="{{id}}">
            <div
                class="${prefixCls}-pagination"
                s-if="(paginationPosition === 'top' || paginationPosition === 'both') && pagination"
            >
                <s-pagination
                    total="{{paginationProps.total}}"
                    current="{{paginationProps.current}}"
                    pageSize="{{paginationProps.pageSize}}"
                    on-change="handlePaginationChange"
                    on-showSizeChang="handleShowSizeChange"
                ></s-pagination>
            </div>
            <div class="${prefixCls}-header" s-if="hasHeader">
                {{header}}<slot name="header" />
            </div>
            <s-spin spinning="{{loading}}" s-if="hasLoadMore">
                <div slot="content">${contentTemplate}</div>
            </s-spin>
            <template s-else>
                ${contentTemplate}
            </template>
            <div class="${prefixCls}-footer" s-if="hasFooter">
                {{footer}}<slot name="footer" />
            </div>
            <slot s-if="hasLoadMore" name="loadMore" />
            <template s-else>
                <div
                    class="${prefixCls}-pagination"
                    s-if="(paginationPosition === 'bottom' || paginationPosition === 'both') && pagination"
                >
                    <s-pagination
                        total="{{paginationProps.total}}"
                        current="{{paginationProps.current}}"
                        pageSize="{{paginationProps.pageSize}}"
                        on-change="handlePaginationChange"
                        on-showSizeChang="handleShowSizeChange"
                    ></s-pagination>
                </div>
            </template>
        </div>
    `

    static Item = Item;

    static components = {
        's-spin': Spin,
        's-row': Grid.Row,
        's-col': Grid.Col,
        's-pagination': Pagination
    }

    static computed: I.Computed = {
        classes(this: List) {
            const size = this.data.get('size');
            let classArr = [prefixCls];

            this.data.get('itemLayout') === 'vertical' && classArr.push(`${prefixCls}-vertical`);
            size === 'large' && classArr.push(`${prefixCls}-lg`);
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            this.data.get('split') && classArr.push(`${prefixCls}-split`);
            this.data.get('bordered') && classArr.push(`${prefixCls}-bordered`);
            this.data.get('loading') && classArr.push(`${prefixCls}-loading`);
            this.data.get('grid') && classArr.push(`${prefixCls}-grid`);
            this.data.get('somethingAfterLastItem') && classArr.push(`${prefixCls}-something-after-last-item`);
            return classArr;
        },
        paginationProps(this: List) {
            const dataSource = this.data.get('dataSource');
            const pagination = this.data.get('pagination');

            return {
                ...this.data.get('defaultPaginationProps'),
                total: dataSource.length,
                current: this.data.get('paginationCurrent'),
                pageSize: this.data.get('pageSize'),
                ...(pagination as object || {})
            };
        },
        splitDataSource(this: List) {
            const dataSource = this.data.get('dataSource');
            const paginationProps = this.data.get('paginationProps');

            if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
                return Array.from(dataSource).splice(
                    (paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize
                );
            }
            return dataSource;
        }
    }

    static messages = {
        santd_list_addItem(this: List, payload: {value: Component}): void {
            const item = payload.value;
            item.data.set('itemLayout', this.data.get('itemLayout'));
            this.data.push('itemChildren', item);
        }
    }

    initData(): I.State {
        return {
            dataSource: [],
            bordered: false,
            split: true,
            loading: false,
            pagination: false,
            paginationPosition: 'bottom',
            defaultPaginationProps: {
                current: 1,
                total: 0
            },
            itemChildren: [],
            locale: {
                emptyText: '没有数据'
            }
        };
    }

    inited(): void {
        const pagination: I.paginationType = this.data.get('pagination') || {};

        this.data.set('paginationCurrent', pagination.defaultCurrent || 1);
        this.data.set('paginationSize', pagination.defaultPageSize || 10);
        this.data.set('hasHeader', !!this.sourceSlots.named.header || this.data.get('header'));
        this.data.set('hasFooter', !!this.sourceSlots.named.footer || this.data.get('footer'));
        this.data.set('hasRenderEmpty', !!this.sourceSlots.named.renderEmpty);
        this.data.set('hasLoadMore', !!this.sourceSlots.named.loadMore);
    }

    attached(): void {
        const dataSource = this.data.get('splitDataSource');
        this.data.get('itemChildren').forEach((child: Component, index) => {
            child.data.set('item', dataSource[index]);
            child.data.set('index', index);
        });
        this.data.set('somethingAfterLastItem', this.somethingAfterLastItem());
    }

    getGrid(grid: I.gridType, type: string): number {
        return grid[type] && Math.floor(24 / grid[type]);
    }
    
    hasChildren(): boolean {
        const dataSource = this.data.get('dataSource');
        return this.data.get('hasHeader') || this.data.get('hasFooter') || dataSource.length !== 0;
    }

    somethingAfterLastItem(): boolean {
        const loadMore = this.data.get('loadMore');
        const pagination = this.data.get('pagination');
        return !!(loadMore || pagination || this.data.get('hasFooter'));
    }

    handlePaginationChange(payload: {page: number, pageSize: number}): void {
        const pagination: I.paginationType = this.data.get('pagination') || {};

        this.data.set('paginationCurrent', payload.page);
        this.data.set('paginationSize', payload.pageSize);

        pagination.onChange && pagination.onChange(payload.page, payload.pageSize);
    }

    handleShowSizeChange(payload: {page: number, pageSize: number}): void {
        const pagination: I.paginationType = this.data.get('pagination') || {};

        this.data.set('paginationCurrent', payload.page);
        this.data.set('paginationSize', payload.pageSize);

        pagination.onShowSizeChange && pagination.onShowSizeChange(payload.page, payload.pageSize);
    }
}
