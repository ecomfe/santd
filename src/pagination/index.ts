/**
* @file 分页组件
* @author fuqiangqiang@baidu.com
*/
import './style/index';
import san from 'san';
import Base from 'santd/base';
import Icon from '../icon';
import {classCreator} from '../core/util';
import pagination from './Pagination';
import localeReceiver from '../locale-provider/receiver';
import {
    PaginationData,
    TItemRender,
    TShowTotal
} from './interface';

interface State {
    componentName: string;
}

export interface Props extends Partial<PaginationData> {
    /**
     * 用于自定义页码的结构
     */
    itemRender?: TItemRender | boolean;
    showTotal?: TShowTotal;
}

const prefixCls = classCreator('pagination')();

const prevIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="${prefixCls}-item-link">
        <s-icon type="left" />
      </a>`
});

const nextIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="${prefixCls}-item-link">
        <s-icon type="right" />
      </a>`
});

const jumpPrevIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="${prefixCls}-item-link">
        <div class="${prefixCls}-item-container">
            <s-icon class="${prefixCls}-item-link-icon" type="double-left" />
            <span class="${prefixCls}-item-ellipsis">•••</span>
        </div>
      </a>`
});

const jumpNextIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="${prefixCls}-item-link">
        <div class="${prefixCls}-item-container">
            <s-icon class="${prefixCls}-item-link-icon" type="double-right" />
            <span class="${prefixCls}-item-ellipsis">•••</span>
        </div>
      </a>`
});

export default class extends Base<State, Props> {
    static components = {
        pagination,
        previcon: prevIcon,
        nexticon: nextIcon,
        jumpprevicon: jumpPrevIcon,
        jumpnexticon: jumpNextIcon
    }

    handleShowSizeChange(payload: {current: number, pageSize: number}) {
        this.fire('showSizeChange', payload);
    }

    handleChange(payload: {page: number, pageSize: number}) {
        this.fire('change', payload);
    }

    inited() {
        this.data.set('itemRender', !!this.sourceSlots.named.itemRender);
        localeReceiver.inited.call(this);
    }

    initData() {
        return {
            componentName: 'Pagination'
        };
    }

    static computed = localeReceiver.computed

    static template = `
        <div>
            <pagination
                defaultCurrent="{{defaultCurrent}}"
                defaultPageSize="{{defaultPageSize}}"
                hideOnSinglePage="{{hideOnSinglePage}}"
                current="{{current}}"
                total="{{total}}"
                simple="{{simple}}"
                pageSize="{{pageSize}}"
                showQuickJumper="{{showQuickJumper}}"
                showSizeChanger="{{showSizeChanger}}"
                prefixCls="${prefixCls}"
                size="{{size}}"
                showTotal="{{showTotal}}"
                itemRender="{{itemRender}}"
                locale="{{locale}}"
                disabled="{{disabled}}"
                on-showSizeChange="handleShowSizeChange"
                on-change="handleChange"
                pageSizeOptions="{{pageSizeOptions}}"
            >
                <previcon slot="prevIcon" />
                <nexticon slot="nextIcon" />
                <jumpprevicon slot="jumpPrevIcon" />
                <jumpnexticon slot="jumpNextIcon" />
                <slot slot="itemRender" name="itemRender" var-type="{{type}}" var-page="{{page}}" />
            </pagination>
        </div>
    `
};