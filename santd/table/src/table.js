/**
 * @file santd Table 表格组件
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import ColumnManager from './ColumnManager';
import HeadTable from './HeadTable';
import BodyTable from './BodyTable';

const prefixCls = classCreator('table')();

const innerTable = san.defineComponent({
    components: {
        's-headtable': HeadTable,
        's-bodytable': BodyTable
    },
    computed: {
        inject() {
            const innertable = this.data.get('innertable');
            const notFoundContent = this.data.get('notFoundContent');
            if (innertable && notFoundContent) {
                innertable.components.notfoundcontent = notFoundContent;
            }
        }
    },
    inited() {
        this.data.set('innertable', this);
    },
    handleBodyScroll(e) {
        this.fire('handleBodyScroll', e);
    },
    handleBodyScrollLeft(e) {
        this.fire('handleBodyScrollLeft', e);
    },
    attached() {
        const headTable = this.ref('headtable');
        const bodyTable = this.ref('bodytable');
        const fixed = this.data.get('fixed');
        let fixedHeadTable;
        let fixedBodyTable;
        let fixedColumnsBodyLeft;
        let fixedColumnsBodyRight;
        if (fixed === 'left') {
            fixedColumnsBodyLeft = bodyTable && bodyTable.el.children[0];
        }
        else if (fixed === 'right') {
            fixedColumnsBodyRight = bodyTable && bodyTable.el.children[0];
        }
        else {
            fixedHeadTable = headTable && headTable.el;
            fixedBodyTable = bodyTable && bodyTable.el;
        }
        this.fire('handleTableRef', {
            headTable: fixedHeadTable,
            bodyTable: fixedBodyTable,
            fixedColumnsBodyLeft: fixedColumnsBodyLeft,
            fixedColumnsBodyRight: fixedColumnsBodyRight
        });
    },
    template: `
        <div class="{{scrollable ? prefixCls + '-scroll' : ''}}">
            <s-headtable
                s-if="(showHeader && useFixedHeader) || scroll.y"
                key="head"
                table="{{instance}}"
                columns="{{groupedColumns}}"
                fixed="{{fixed}}"
                data="{{data}}"
                tableClassName="{{tableClassName}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                scroll="{{scroll}}"
                isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                s-ref="headtable"
                bodyRowHeight="{{bodyRowHeight}}"
                headRowHeight="{{headRowHeight}}"
                on-handleBodyScrollLeft="handleBodyScrollLeft"
                showHeader="{{showHeader}}"
                defaultExpandAllRows="{{defaultExpandAllRows}}"
                defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                expandedRowKeys="{{expandedRowKeys}}"
            ></s-headtable>
            <s-bodytable
                key="body"
                table="{{instance}}"
                columns="{{groupedColumns}}"
                data="{{data}}"
                fixed="{{fixed}}"
                tableClassName="{{tableClassName}}"
                isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                selectedRowKeys="{{selectedRowKeys}}"
                selectionDirty="{{selectionDirty}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                expandedRowRender="{{expandedRowRender}}"
                expandIconColumnIndex="{{expandIconColumnIndex}}"
                expandIconAsCell="{{expandIconAsCell}}"
                scroll="{{scroll}}"
                on-handleBodyScroll="handleBodyScroll"
                s-ref="bodytable"
                bodyRowHeight="{{bodyRowHeight}}"
                headRowHeight="{{headRowHeight}}"
                showHeader="{{showHeader}}"
                defaultExpandAllRows="{{defaultExpandAllRows}}"
                defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                expandedRowKeys="{{expandedRowKeys}}"
            >
            </s-bodytable>
            <div
                class="{{prefixCls}}-placeholder"
                s-if="{{!data.length}}"
            >
                <notfoundcontent />
            </div>
        </div>
    `
});

export default san.defineComponent({
    dataTypes: {
        // table所持有的数据
        data: DataTypes.array,
        // 是否固定表头
        useFixedHeader: DataTypes.bool,
        columns: DataTypes.array,
        className: DataTypes.string,
        bodyStyle: DataTypes.object,
        rowKey: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.func
        ]),
        rowClassName: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.func
        ]),
        showHeader: DataTypes.bool,
        title: DataTypes.func,
        footer: DataTypes.func,
        id: DataTypes.string,
        emptyText: DataTypes.oneOfType([
            DataTypes.object,
            DataTypes.func
        ]),
        scroll: DataTypes.object,
        rowRef: DataTypes.func,
        getBodyWrapper: DataTypes.func,
        rowHeight: DataTypes.object
    },
    initData() {
        return {
            data: [],
            useFixedHeader: false,
            rowKey: 'key',
            rowClassName: () => '',
            prefixCls: prefixCls,
            bodyStyle: {},
            showHeader: true,
            scroll: {},
            rowRef: () => null,
            emptyText: () => 'No Data',
            scrollPosition: 'left',
            rowHeight: {}
        };
    },
    components: {
        's-innertable': innerTable
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const useFixedHeader = this.data.get('useFixedHeader');
            const scroll = this.data.get('scroll');
            const scrollPosition = this.data.get('scrollPosition');

            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-${className}`]: !!className,
                [`${prefixCls}-fixed-header`]: useFixedHeader || (scroll && scroll.y),
                [`${prefixCls}-scroll-position-left
                 ${prefixCls}-scroll-position-right`]: scrollPosition === 'both',
                [`${prefixCls}-scroll-position-${scrollPosition}`]: scrollPosition
                    && scrollPosition !== 'both'
            });
        },
        renderTitle() {
            const title = this.data.get('title');
            const data = this.data.get('data');
            return title ? title(data) : null;
        },
        renderFooter() {
            const footer = this.data.get('footer');
            const data = this.data.get('data');
            return footer ? footer(data) : null;
        },
        tableClassName() {
            const scroll = this.data.get('scroll');
            const fixed = this.data.get('fixed');
            return (scroll.x || fixed) ? prefixCls + '-fixed' : '';
        },
        groupedColumns() {
            const columnManager = this.data.get('columnManager');
            return columnManager && columnManager.groupedColumns();
        },
        leftGroupedColumns() {
            const columnManager = this.data.get('columnManager');
            return columnManager && columnManager.leftColumns();
        },
        rightGroupedColumns() {
            const columnManager = this.data.get('columnManager');
            return columnManager && columnManager.rightColumns();
        },
        isAnyColumnsFixed() {
            const columnManager = this.data.get('columnManager');
            return columnManager && columnManager.isAnyColumnsFixed();
        },
        scrollable() {
            const isAnyColumnsFixed = this.data.get('isAnyColumnsFixed');
            const scroll = this.data.get('scroll');
            return isAnyColumnsFixed || scroll.x || scroll.y;
        },
        hasLeftFixed() {
            const columnManager = this.data.get('columnManager');
            return columnManager && columnManager.isAnyColumnsLeftFixed();
        },
        hasRightFixed() {
            const columnManager = this.data.get('columnManager');
            return columnManager && columnManager.isAnyColumnsRightFixed();
        },
        bodyRowHeight() {
            return this.data.get('fixedBodyRowHeight');
        },
        headRowHeight() {
            return this.data.get('fixedHeadRowHeight');
        }
    },
    created() {
        const columns = this.data.get('columns');
        const columnManager = new ColumnManager(columns, this.children);

        this.data.set('columnManager', columnManager);
        this.data.set('instance', this);
    },
    getRowKey(record, index) {
        const rowKey = this.data.get('rowKey');
        const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
        return key === undefined ? index : key;
    },
    setScrollPositionClassName() {
        const node = this.bodyTable;
        const scrollToLeft = node.scrollLeft === 0;
        const scrollToRight = node.scrollLeft + 1
            >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;

        if (scrollToLeft && scrollToRight) {
            this.data.set('scrollPosition', 'both');
        }
        else if (scrollToLeft) {
            this.data.set('scrollPosition', 'left');
        }
        else if (scrollToRight) {
            this.data.set('scrollPosition', 'right');
        }
        else if (this.scrollPosition !== 'middle') {
            this.data.set('scrollPosition', 'middle');
        }
    },
    syncFixedTableRowHeight() {
        const tableRect = this.el.getBoundingClientRect();
        if (tableRect.height !== undefined && tableRect.height <= 0) {
            return;
        }
        const prefixCls = this.data.get('prefixCls');
        const headRows = this.headTable
            ? this.headTable.querySelectorAll('thead')
            : this.bodyTable.querySelectorAll('thead');
        const bodyRows = this.bodyTable.querySelectorAll(`.${prefixCls}-row`) || [];
        const fixedColumnsHeadRowsHeight = [].map.call(
            headRows,
            row => row.getBoundingClientRect().height || 'auto',
        );
        this.data.set('fixedHeadRowHeight', fixedColumnsHeadRowsHeight);
    },
    handleBodyScrollLeft(e) {
        if (e.currentTarget !== e.target) {
            return;
        }
        const target = e.target;
        const scroll = this.data.get('scroll');
        const {
            headTable,
            bodyTable
        } = this;
        if (target.scrollLeft !== this.lastScrollLeft && scroll.x) {
            if (target === bodyTable && headTable) {
                headTable.scrollLeft = target.scrollLeft;
            }
            else if (target === headTable && bodyTable) {
                bodyTable.scrollLeft = target.scrollLeft;
            }
            this.setScrollPositionClassName();
        }
        this.lastScrollLeft = target.scrollLeft;
    },
    handleTableRef(payload) {
        if (payload.headTable) {
            this.headTable = payload.headTable;
        }
        if (payload.bodyTable) {
            this.bodyTable = payload.bodyTable;
        }
        if (payload.fixedColumnsBodyLeft) {
            this.fixedColumnsBodyLeft = payload.fixedColumnsBodyLeft;
        }
        if (payload.fixedColumnsBodyRight) {
            this.fixedColumnsBodyRight = payload.fixedColumnsBodyRight;
        }
    },
    handleBodyScrollTop(e) {
        const target = e.target;
        if (e.currentTarget !== target) {
            return;
        }
        const scroll = this.data.get('scroll');
        const {
            headTable,
            bodyTable,
            fixedColumnsBodyLeft,
            fixedColumnsBodyRight
        } = this;
        if (target.scrollTop !== this.lastScrollTop && scroll.y && target !== headTable) {
            const scrollTop = target.scrollTop;
            if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
                fixedColumnsBodyLeft.scrollTop = scrollTop;
            }
            if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
                fixedColumnsBodyRight.scrollTop = scrollTop;
            }
            if (bodyTable && target !== bodyTable) {
                bodyTable.scrollTop = scrollTop;
            }
        }
        this.lastScrollTop = target.scrollTop;
    },
    handleBodyScroll(e) {
        this.handleBodyScrollLeft(e);
        this.handleBodyScrollTop(e);
    },
    messages: {
        setBodyRowHeight(payload) {
            const key = payload.value.key;
            const height = payload.value.height;

            this.data.set('fixedBodyRowHeight.' + key, height);
        }
    },
    attached() {
        setTimeout(() => {
            this.syncFixedTableRowHeight();
        }, 0);
    },
    template: `<div class="{{classes}}" style="{{bodyStyle}}">
        <div s-if="renderTitle" class="${prefixCls}-title" key="title">{{renderTitle}}</div>
        <div class="${prefixCls}-content">
            <s-innertable
                instance="{{instance}}"
                groupedColumns="{{groupedColumns}}"
                data="{{data}}"
                fixed="{{fixed}}"
                tableClassName="{{tableClassName}}"
                isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                selectedRowKeys="{{selectedRowKeys}}"
                selectionDirty="{{selectionDirty}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                expandedRowRender="{{expandedRowRender}}"
                expandIconColumnIndex="{{expandIconColumnIndex}}"
                expandIconAsCell="{{expandIconAsCell}}"
                scroll="{{scroll}}"
                scrollable="{{scrollable}}"
                prefixCls="{{prefixCls}}"
                on-handleBodyScroll="handleBodyScroll"
                on-handleBodyScrollLeft="handleBodyScrollLeft"
                on-handleTableRef="handleTableRef"
                showHeader="{{showHeader}}"
                defaultExpandAllRows="{{defaultExpandAllRows}}"
                defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                expandedRowKeys="{{expandedRowKeys}}"
                notFoundContent="{{notFoundContent}}"
            ></s-innertable>
            <div
                s-if="hasLeftFixed"
                class="{{prefixCls}}-fixed-left"
            >
                <s-innertable
                    instance="{{instance}}"
                    groupedColumns="{{leftGroupedColumns}}"
                    data="{{data}}"
                    fixed="left"
                    tableClassName="{{tableClassName}}"
                    isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                    selectedRowKeys="{{selectedRowKeys}}"
                    selectionDirty="{{selectionDirty}}"
                    sortOrder="{{sortOrder}}"
                    sortColumn="{{sortColumn}}"
                    expandedRowRender="{{expandedRowRender}}"
                    expandIconColumnIndex="{{expandIconColumnIndex}}"
                    expandIconAsCell="{{expandIconAsCell}}"
                    scroll="{{scroll}}"
                    showHeader="{{showHeader}}"
                    useFixedHeader="{{useFixedHeader}}"
                    bodyRowHeight="{{bodyRowHeight}}"
                    headRowHeight="{{headRowHeight}}"
                    on-handleBodyScroll="handleBodyScroll"
                    on-handleBodyScrollLeft="handleBodyScrollLeft"
                    on-handleTableRef="handleTableRef"
                    showHeader="{{showHeader}}"
                    defaultExpandAllRows="{{defaultExpandAllRows}}"
                    defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                    expandedRowKeys="{{expandedRowKeys}}"
                    notFoundContent="{{notFoundContent}}"
                ></s-innertable>
            </div>
            <div
                s-if="hasRightFixed"
                class="{{prefixCls}}-fixed-right"
            >
                <s-innertable
                    instance="{{instance}}"
                    groupedColumns="{{rightGroupedColumns}}"
                    data="{{data}}"
                    fixed="right"
                    tableClassName="{{tableClassName}}"
                    isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                    selectedRowKeys="{{selectedRowKeys}}"
                    selectionDirty="{{selectionDirty}}"
                    sortOrder="{{sortOrder}}"
                    sortColumn="{{sortColumn}}"
                    expandedRowRender="{{expandedRowRender}}"
                    expandIconColumnIndex="{{expandIconColumnIndex}}"
                    expandIconAsCell="{{expandIconAsCell}}"
                    scroll="{{scroll}}"
                    bodyRowHeight="{{bodyRowHeight}}"
                    headRowHeight="{{headRowHeight}}"
                    on-handleBodyScroll="handleBodyScroll"
                    on-handleBodyScrollLeft="handleBodyScrollLeft"
                    on-handleTableRef="handleTableRef"
                    showHeader="{{showHeader}}"
                    defaultExpandAllRows="{{defaultExpandAllRows}}"
                    defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                    expandedRowKeys="{{expandedRowKeys}}"
                    notFoundContent="{{notFoundContent}}"
                ></s-innertable>
            </div>
        </div>
        <div s-if="renderFooter" class="${prefixCls}-footer" key="footer">{{renderFooter}}</div>
    </div>
    `
});
