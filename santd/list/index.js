/**
* @file Santd list file
* @author mayihui@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Spin from '../spin';
import Pagination from '../pagination';
import Grid from '../grid';
import Item from './item';

import './style/index';

const prefixCls = classCreator('list')();

const List = san.defineComponent({
    dataTypes: {
        bordered: DataTypes.bool,
        className: DataTypes.string,
        dataSource: DataTypes.array,
        id: DataTypes.string,
        loading: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        pagination: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        prefixCls: DataTypes.string,
        rowKey: DataTypes.string,
        size: DataTypes.string,
        split: DataTypes.bool
    },
    initData() {
        return {
            prefixCls: prefixCls,
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
            children: []
        };
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const sizeClass = this.data.get('sizeClass');
            let classArr = [prefixCls];

            className && classArr.push(className);
            this.data.get('itemLayout') === 'vertical' && classArr.push(`${prefixCls}-vertical`);
            sizeClass && classArr.push(`${prefixCls}-${sizeClass}`);
            this.data.get('split') && classArr.push(`${prefixCls}-split`);
            this.data.get('bordered') && classArr.push(`${prefixCls}-bordered`);
            this.data.get('loading') && classArr.push(`${prefixCls}-loading`);
            this.data.get('grid') && classArr.push(`${prefixCls}-grid`);
            this.data.get('somethingAfterLastItem') && classArr.push(`${prefixCls}-something-after-last-item`);
            return classArr;
        },
        sizeClass() {
            const size = this.data.get('size');

            if (size === 'large') {
                return 'lg';
            }
            else if (size === 'small') {
                return 'sm';
            }
            return '';
        },
        paginationProps() {
            const dataSource = this.data.get('dataSource');
            const pagination = this.data.get('pagination');

            return {
                ...this.data.get('defaultPaginationProps'),
                total: dataSource.length,
                current: this.data.get('paginationCurrent'),
                pageSize: this.data.get('pageSize'),
                ...(pagination || {})
            };
        },
        splitDataSource() {
            const dataSource = this.data.get('dataSource');
            const paginationProps = this.data.get('paginationProps');

            if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
                return [...dataSource].splice(
                    (paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize
                );
            }
            return dataSource;
        }
    },
    inited() {
        const pagination = this.data.get('pagination');
        const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

        this.data.set('paginationCurrent', paginationObj.defaultCurrent || 1);
        this.data.set('paginationSize', paginationObj.defaultPageSize || 10);
        this.data.set('instance', this);
    },
    components: {
        's-spin': Spin,
        's-row': Grid.Row,
        's-col': Grid.Col,
        's-pagination': Pagination
    },
    getGrid(grid, type) {
        return grid[type] && Math.floor(24 / grid[type]);
    },
    messages: {
        santd_list_addItem(payload) {
            const item = payload.value;
            item.data.set('itemLayout', this.data.get('itemLayout'));
            this.data.push('children', item);
        }
    },
    attached() {
        const dataSource = this.data.get('splitDataSource');
        this.data.get('children').forEach((child, index) => {
            child.data.set('item', dataSource[index]);
            child.data.set('index', index);
        });
        this.data.set('somethingAfterLastItem', this.somethingAfterLastItem());
    },
    hasHeader() {
        return this.sourceSlots.named.header || this.data.get('header');
    },
    hasFooter() {
        return this.sourceSlots.named.footer || this.data.get('footer');
    },
    hasChildren() {
        const dataSource = this.data.get('dataSource');

        return this.hasHeader() || this.hasFooter() || dataSource.length !== 0;
    },
    hasRenderEmpty() {
        return this.sourceSlots.named.renderEmpty;
    },
    hasLoadMore() {
        return this.sourceSlots.named.loadMore;
    },
    somethingAfterLastItem() {
        const loadMore = this.data.get('loadMore');
        const pagination = this.data.get('pagination');
        return !!(loadMore || pagination || this.hasFooter());
    },
    handlePaginationChange(payload) {
        const pagination = this.data.get('pagination');

        this.data.set('paginationCurrent', payload.page);
        this.data.set('paginationSize', payload.pageSize);

        if (pagination && pagination['onChange']) {
            pagination['onChange'](payload.page, payload.pageSize);
        }
    },
    handleShowSizeChange(payload) {
        const pagination = this.data.get('pagination');

        this.data.set('paginationCurrent', payload.page);
        this.data.set('paginationSize', payload.pageSize);

        if (pagination && pagination['onShowSizeChange']) {
            pagination['onShowSizeChange'](payload.page, payload.pageSize);
        }
    },
    template: `
        <div class="{{classes}}" id="{{id}}">
            <div
                class="{{prefixCls}}-pagination"
                s-if="{{(paginationPosition === 'top' || paginationPosition === 'both') && pagination}}"
            >
                <s-pagination
                    total="{{paginationProps.total}}"
                    current="{{paginationProps.current}}"
                    pageSize="{{paginationProps.pageSize}}"
                    on-change="handlePaginationChange"
                    on-showSizeChang="handleShowSizeChange"
                ></s-pagination>
            </div>
            <div class="{{prefixCls}}-header" s-if="{{hasHeader() || header}}">
                {{header}}<slot name="header"></slot>
            </div>
            <s-spin spinning="{{loading}}">
                <div slot="content">
                    <div style="min-height: 53px;" s-if="loading"></div>
                    <div s-if="{{!loading && !hasChildren()}}" class="{{prefixCls}}-empty-text">
                        <slot name="renderEmpty" s-if="{{hasRenderEmpty()}}"></slot>
                        <span s-else>没有数据</span>
                    </div>
                    <template s-else>
                        <s-row gutter="{{grid.gutter}}" s-if="{{grid}}">
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
                                <slot name="renderItem" s-bind="{{{item: item, index: index}}}"></slot>
                            </s-col>
                        </s-row>
                        <slot s-for="item in splitDataSource" name="renderItem" s-bind="{{{item: item}}}" s-else></slot>
                    </template>
                </div>
            </s-spin>
            <div class="{{prefixCls}}-footer" s-if="{{hasFooter() || footer}}">
                {{footer}}<slot name="footer"></slot>
            </div>
            <slot s-if="{{hasLoadMore()}}" name="loadMore"></slot>
            <template s-else>
                <div
                    class="{{prefixCls}}-pagination"
                    s-if="{{(paginationPosition === 'bottom' || paginationPosition === 'both') && pagination}}"
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
});

List.Item = Item;
export default List;
