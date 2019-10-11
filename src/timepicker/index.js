/**
 * @file 组件 timepicker
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import TimePicker from './src/timepicker';
import inherits from '../core/util/inherits';
import enUS from './locale/en_US';
import localeReceiver from '../localeprovider/receiver';

const prefixCls = classCreator('time-picker')();


export default inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'TimePicker',
            defaultLocale: enUS,

            align: {
                offset: [0, -2]
            },
            prefixCls,
            transitionName: 'slide-up'
        };
    },

    inited: localeReceiver.inited,

    computed: {
        ...localeReceiver.computed,

        timePlaceholder() {
            const locale = this.data.get('locale') || {};
            const placeholder = this.data.get('placeholder');
            return placeholder || locale.placeholder;
        },
        pickerClassName() {
            const className = this.data.get('className');
            const size = this.data.get('size');
            let classArr = [className];
            !!size && classArr.push(`${prefixCls}-${size}`);
            return classArr.join(' ');
        },
        defaultFormat() {
            const format = this.data.get('format');
            const use12Hours = this.data.get('use12Hours');
            if (format) {
                return format;
            }
            else if (use12Hours) {
                return 'h:mm:ss a';
            }
            return 'HH:mm:ss';
        },
        showHour() {
            const format = this.data.get('defaultFormat');
            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
        },
        showMinute() {
            const format = this.data.get('defaultFormat');
            return format.indexOf('m') > -1;
        },
        showSecond() {
            const format = this.data.get('defaultFormat');
            return format.indexOf('s') > -1;
        },
        pickerAddon() {
            const addon = this.data.get('addon');
            const prefixCls = this.data.get('prefixCls');
            if (addon) {
                return function (panel) {
                    return san.defineComponent({
                        components: {
                            addon: addon(panel)
                        },
                        initData() {
                            return {
                                prefixCls
                            };
                        },
                        template: `<div class="{{prefixCls}}-panel-addon">
                            <addon />
                        </div>`
                    });
                };
            }
            return null;
        },
        popupTransitionName() {
            return this.data.get('transitionName');
        }
    },
    setOpen(open) {
        this.data.set('open', open);
        this.fire('openChange', open);
    }
}), TimePicker);
