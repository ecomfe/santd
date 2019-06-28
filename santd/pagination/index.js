/**
* @file 分页组件
* @author fuqiangqiang@baidu.com
*/
import san from 'san';
import Icon from 'santd/icon';
import {classCreator} from 'santd/core/util';
import './style/index';
import pagination from './pagination';
import LocaleReceiver from '../localeprovider/localereceiver';
import enUS from './locale/en_US';
import inherits from 'santd/core/util/inherits';

const prefixCls = classCreator('pagination')();

const prevIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="{{prefixCls + '-item-link'}}">
        <s-icon type="left"></s-icon>
      </a>`
});

const nextIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="{{prefixCls + '-item-link'}}">
        <s-icon type="right"></s-icon>
      </a>`
});

const jumpPrevIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="{{prefixCls + '-item-link'}}">
        <div className="{{prefixCls + '-item-container'}}">
            <s-icon className="{{prefixCls + '-item-link-icon'}}" type="double-left" />
            <span className="{{prefixCls + '-item-ellipsis'}}">•••</span>
        </div>
      </a>`
});

const jumpNextIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<a class="{{prefixCls + '-item-link'}}">
        <div className="{{prefixCls + '-item-container'}}">
            <s-icon className="{{prefixCls + '-item-link-icon'}}" type="double-right" />
            <span className="{{prefixCls + '-item-ellipsis'}}">•••</span>
        </div>
      </a>`
});

const Pagination = san.defineComponent({
    components: {
        pagination
    },
    initData() {
        return {
            prevIcon,
            nextIcon,
            jumpPrevIcon,
            jumpNextIcon,
            prefixCls
        };
    },
    handleShowSizeChange(payload) {
        this.fire('showSizeChange', payload);
    },
    handleChange(payload) {
        this.fire('change', payload);
    },
    template: `
        <div>
            <pagination
                defaultCurrent="{{defaultCurrent}}"
                defaultPageSize="{{defaultPageSize}}"
                hideOnSinglePage="{{hideOnSinglePage}}"
                current="{{current}}"
                prevIcon="{{prevIcon}}"
                nextIcon="{{nextIcon}}"
                jumpPrevIcon="{{jumpPrevIcon}}"
                jumpNextIcon="{{jumpNextIcon}}"
                total="{{total}}"
                simple="{{simple}}"
                pageSize="{{pageSize}}"
                showQuickJumper="{{showQuickJumper}}"
                showSizeChanger="{{showSizeChanger}}"
                prefixCls="{{prefixCls}}"
                size="{{size}}"
                showTotal="{{showTotal}}"
                itemRender="{{itemRender}}"
                locale="{{locale}}"
                on-showSizeChange="handleShowSizeChange"
                on-change="handleChange"
            />
        </div>
    `
});

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'Pagination',
            defaultLocale: enUS
        };
    }
}), LocaleReceiver);

export default inherits(Pagination, Locale);
