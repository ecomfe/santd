/**
 * @file Santd full calendar source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Base from './base';
import DateTable from './date/dateTable';
import MonthTable from './month/monthTable';
import CalendarHeader from './fullCalendarHeader';
import inherits from '../../core/util/inherits';
import moment from 'moment';
import classNames from 'classnames';

export default inherits(san.defineComponent({
    components: {
        's-datetable': DateTable,
        's-monthtable': MonthTable
    },
    initData() {
        return {
            defaultType: 'date',
            fullscreen: false,
            showTypeSwitch: true,
            showHeader: true
        };
    },
    computed: {
        className() {
            const prefixCls = this.data.get('prefixCls');
            const fullscreen = this.data.get('fullscreen');

            return classNames(`${prefixCls}-full`, {
                [`${prefixCls}-fullscreen`]: fullscreen
            });
        },
        injectHeader() {
            const headerRender = this.data.get('headerRender');
            const value = this.data.get('value');
            const type = this.data.get('type');
            const locale = this.data.get('locale');
            const instance = this.data.get('instance');
            const headerComponent = this.data.get('headerComponent');
            if (headerRender) {
                instance && (instance.components.calendarheader = headerRender(value, type, locale));
            }
            else {
                instance && (instance.components.calendarheader = headerComponent || CalendarHeader);
            }
        }
    },
    inited() {
        const type = this.data.get('type');
        const defaultType = this.data.get('defaultType');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const selectedValue = this.data.get('selectedValue');
        const defaultSelectedValue = this.data.get('defaultSelectedValue');

        this.data.set('type', type || defaultType);
        this.data.set('value', value || defaultValue || moment());
        this.data.set('selectedValue', selectedValue || defaultSelectedValue);
        this.data.set('instance', this);
    },
    handleSelect(value) {
        this.data.set('value', value);
        this.fire('select', value);
    },
    handleMonthSelect(value) {
        this.data.set('value', value);
        this.fire('select', value);
    },
    setType(type) {
        this.data.set('type', type);
        this.fire('typeChange', type);
    },
    template: `
        <div
            class="{{classes}}"
            tabIndex="0"
        >
            <calendarheader
                s-if="showHeader"
                prefixCls="{{prefixCls}}"
                key="calendar-header"
                type="{{type}}"
                value="{{value}}"
                locale="{{locale}}"
                showTypeSwitch="{{showTypeSwitch}}"
                fullscreen="{{fullscreen}}"
                on-typeChange="setType"
                on-valueChange="setValue"
            />
            <div key="calendar-body" class="{{prefixCls}}-calendar-body">
            <s-datetable
                s-if="type === 'date'"
                dateRender="{{dateCellRender}}"
                contentRender="{{dateCellContentRender}}"
                locale="{{locale}}"
                prefixCls="{{prefixCls}}"
                value="{{value}}"
                disabledDate="{{disabledDate}}"
                on-select="handleSelect"
            />
            <s-monthtable
                s-else
                cellRender="{{monthCellRender}}"
                contentRender="{{contentRender}}"
                locale="{{locale}}"
                prefixCls="{{prefixCls}}-month-panel"
                rootPrefixCls="{{prefixCls}}"
                value="{{value}}"
                disabledDate="{{disabledDate}}"
                on-select="handleMonthSelect"
            />
            </div>
        </div>
    `
}), Base);
