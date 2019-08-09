/**
 * @file Santd month calendar source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Base from './base';
import CalendarHeader from './calendar/calendarHeader';
import inherits from '../../core/util/inherits';
import moment from 'moment';

export default inherits(san.defineComponent({
    initData() {
        return {
            mode: 'month'
        };
    },
    inited() {
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const selectedValue = this.data.get('selectedValue');
        const defaultSelectedValue = this.data.get('defaultSelectedValue');

        this.data.set('value', value || selectedValue || defaultValue || moment());
        this.data.set('selectedValue', selectedValue || defaultSelectedValue);
        this.data.set('instance', this);
        this.data.set('mode', 'month');

        this.watch('selectedValue', val => {
            this.data.set('value', val);
        });
    },
    handleMonthSelect(value) {
        // this.data.set('value', value);
        this.fire('select', value);
        this.dispatch('select', {value: value, cause: null});
    },
    handlePanelChange({value, mode}) {
        if (mode && mode !== 'date') {
            this.data.set('mode', mode);
        }
        this.dispatch('panelChange', {value: value || this.data.get('value'), mode});
    },
    components: {
        's-calendarheader': CalendarHeader
    },
    template: `
        <div
            class="{{classes}} {{prefixCls}}-month-calendar"
            tabIndex="0"
        >
            <div class="{{prefixCls}}-month-calendar-contnet">
                <div class="{{prefixCls}}-month-header-wrap">
                    <s-calendarheader
                        prefixCls="{{prefixCls}}"
                        mode="{{mode}}"
                        value="{{value || defaultValue}}"
                        locale="{{locale}}"
                        disabledMonth="{{disabledDate}}"
                        monthCellRender="{{monthCellRender}}"
                        monthCellContentRender="{{monthCellContentRender}}"
                        renderFooter="{{renderFooter}}"
                        on-valueChange="setValue"
                        on-panelChange="handlePanelChange"
                        on-monthSelect="handleMonthSelect"
                    />
                </div>
            </div>
        </div>
    `
}), Base);
