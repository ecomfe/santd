/**
 * @file Santd tooltip file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Trigger from '../../core/trigger/index';
import Placement from './placements';
import inherits from '../../core/util/inherits';

export default inherits(san.defineComponent({
    dataTypes: {
        animation: DataTypes.oneOfType([DataTypes.func, DataTypes.string]),
        disabled: DataTypes.bool,
        transitionName: DataTypes.string,
        getCalendarContainer: DataTypes.func,
        calendar: DataTypes.func,
        open: DataTypes.bool,
        defaultOpen: DataTypes.bool,
        prefixCls: DataTypes.string,
        placement: DataTypes.object,
        value: DataTypes.oneOfType([
            DataTypes.object,
            DataTypes.array
        ]),
        defaultValue: DataTypes.oneOfType([
            DataTypes.object,
            DataTypes.array
        ]),
        align: DataTypes.object
    },
    initData() {
        return {
            prefixCls: 'calendar-picker',
            align: {},
            destroyPopupOnHide: true,
            builtinPlacements: Placement,
            popupPlacement: 'bottomLeft'
        };
    },
    inited() {
        const open = this.data.get('open');
        const defaultOpen = this.data.get('defaultOpen');

        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        this.data.set('open', open || defaultOpen);
        this.data.set('value', value || defaultValue);

        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});
    },
    computed: {
        popupVisible() {
            return this.data.get('open');
        },
        popup() {
            const calendar = this.data.get('calendar');
            const instance = this.data.get('instance');
            const value = this.data.get('value');
            const defaultValue = calendar.prototype.initData().defaultValue;

            return inherits(san.defineComponent({
                initData() {
                    return {
                        selectedValue: value,
                        defaultValue: value || defaultValue
                    };
                }
            }), calendar);
        },
        popupAlign() {
            return this.data.get('align');
        },
        action() {
            const disabled = this.data.get('disabled');
            const open = this.data.get('open');
            return disabled && !open ? [] : ['click'];
        },
        getPopupContainer() {
            return this.data.get('getCalendarContainer');
        },
        popupStyle() {
            return this.data.get('bodyStyle');
        },
        popupAnimation() {
            return this.data.get('animation');
        },
        popupTransitionName() {
            return this.data.get('transitionName');
        },
        popupClassName() {
            return this.data.get('dropdownClassName');
        }
    },
    open() {
        this.setOpen(true);
    },
    close() {
        this.setOpen(false);
    },
    setOpen(open) {
        if (open !== this.data.get('open')) {
            this.data.set('open', open);
            this.fire('openChange', open);
        }
    },
    messages: {
        select(payload) {
            const value = payload.value.value;
            const cause = payload.value.cause || {};
            const calendar = this.data.get('calendar');
            const timePicker = calendar.prototype.initData().timePicker;

            if (cause.source === 'keyboard'
                || cause.source === 'dateInputSelect'
                || (!timePicker && cause.source !== 'dateInput')
                || cause.source === 'todayButton'
            ) {
                this.close();
            }
            this.fire('change', value);
        },
        ok(payload) {
            this.close();
            this.fire('ok', payload.value);
        },
        panelChange(payload) {
            const value = payload.value.value;
            const mode = payload.value.mode;

            this.fire('panelChange', {value, mode});
        }
    }
}), Trigger);
