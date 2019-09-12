/**
 * @file santd Table HeadTable
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import BaseTable from './BaseTable';
import toStyle from 'to-style';

let scrollbarVerticalSize;
let scrollbarHorizontalSize;

// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px'
};

const measureScrollbar = (direction = 'vertical') => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return 0;
    }
    const isVertical = direction === 'vertical';
    if (isVertical && scrollbarVerticalSize) {
        return scrollbarVerticalSize;
    }
    else if (!isVertical && scrollbarHorizontalSize) {
        return scrollbarHorizontalSize;
    }
    const scrollDiv = document.createElement('div');
    Object.keys(scrollbarMeasure).forEach(scrollProp => {
        scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    });
    // Append related overflow style
    if (isVertical) {
        scrollDiv.style.overflowY = 'scroll';
    }
    else {
        scrollDiv.style.overflowX = 'scroll';
    }
    document.body.appendChild(scrollDiv);
    let size = 0;
    if (isVertical) {
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        scrollbarVerticalSize = size;
    }
    else {
        size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        scrollbarHorizontalSize = size;
    }

    document.body.removeChild(scrollDiv);
    return size;
};

export default san.defineComponent({
    dataTypes: {
        fixed: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.bool
        ]),
        columns: DataTypes.array,
        tableClassName: DataTypes.string
    },
    computed: {
        prefixCls() {
            const table = this.data.get('table');
            return table && table.data.get('prefixCls');
        },
        classes() {
            const fixed = this.data.get('fixed');
            const columns = this.data.get('columns');
            const prefixCls = this.data.get('prefixCls');
            
            let classArr = [];
            fixed && columns.length && classArr.push(`${prefixCls}-body-outer`);
            !fixed && classArr.push(`${prefixCls}-body`);
            return classArr;
        },
        bodyStyle() {
            const scroll = this.data.get('scroll');
            const fixed = this.data.get('fixed');
            const columns = this.data.get('columns');
            const bodyStyle = {};
            if (scroll.x || fixed) {
                bodyStyle.overflowX = bodyStyle.overflowX || 'scroll';
                bodyStyle.WebkitTransform = 'translate3d (0, 0, 0)';
            }
            if (scroll.y) {
                if (!fixed) {
                    bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
                }
                bodyStyle.overflowY = bodyStyle.overflowY || 'scroll';

                const scrollbarWidth = measureScrollbar();
                if (scrollbarWidth > 0 && fixed) {
                    bodyStyle.marginBottom = `-${scrollbarWidth}px`;
                    bodyStyle.paddingBottom = '0px';
                }
            }
            if (fixed && columns.length) {
                delete bodyStyle.overflowX;
                delete bodyStyle.overflowY;
            }
            return toStyle.string(bodyStyle);
        },
        innerBodyStyle() {
            const scroll = this.data.get('scroll');
            const fixed = this.data.get('fixed');
            if (fixed) {
                return toStyle.string({
                    'max-height': scroll.y,
                    'overflow-y': 'scroll'
                });
            }
        },
        useFixedHeader() {
            return this.data.get('scroll.y');
        }
    },
    components: {
        basetable: BaseTable
    },
    handleBodyScroll(e) {
        this.fire('handleBodyScroll', e);
    },
    template: `
        <div
            key="bodyTable"
            class="{{classes}}"
            style="{{bodyStyle}}"
            on-scroll="handleBodyScroll"
        >
            <div
                s-if="fixed && columns.length"
                class="{{prefixCls + '-body-inner'}}"
                style="{{innerBodyStyle}}"
                on-scroll="handleBodyScroll"
            >
                <basetable
                    table="{{table}}"
                    tableClassName="{{tableClassName}}"
                    hasBody="{{true}}"
                    hasHead="{{!useFixedHeader}}"
                    fixed="{{fixed}}"
                    columns="{{columns}}"
                    data="{{data}}"
                    selectedRowKeys="{{selectedRowKeys}}"
                    selectionDirty="{{selectionDirty}}"
                    sortOrder="{{sortOrder}}"
                    sortColumn="{{sortColumn}}"
                    scroll="{{scroll}}"
                    isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                    bodyRowHeight="{{bodyRowHeight}}"
                    showHeader="{{showHeader}}"
                    defaultExpandAllRows="{{defaultExpandAllRows}}"
                    defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                    expandedRowKeys="{{expandedRowKeys}}"
                ></basetable>
            </div>
            <basetable
                s-else
                table="{{table}}"
                tableClassName="{{tableClassName}}"
                hasBody="{{true}}"
                hasHead="{{!useFixedHeader}}"
                fixed="{{fixed}}"
                columns="{{columns}}"
                data="{{data}}"
                selectedRowKeys="{{selectedRowKeys}}"
                selectionDirty="{{selectionDirty}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                expandedRowRender="{{expandedRowRender}}"
                expandIconColumnIndex="{{expandIconColumnIndex}}"
                expandIconAsCell="{{expandIconAsCell}}"
                scroll="{{scroll}}"
                isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                bodyRowHeight="{{bodyRowHeight}}"
                showHeader="{{showHeader}}"
                defaultExpandAllRows="{{defaultExpandAllRows}}"
                defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                expandedRowKeys="{{expandedRowKeys}}"
            >
            </basetable>
        </div>
    `
});
