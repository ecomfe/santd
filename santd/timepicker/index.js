/**
 * @file 组件 timepicker
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import Icon from '../icon';
import TimePicker from './src/timepicker';
import inherits from '../core/util/inherits';
import enUS from './locale/en_US';
import LocaleReceiver from '../localeprovider/localereceiver';

const prefixCls = classCreator('time-picker')();

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'TimePicker',
            defaultLocale: enUS
        };
    }
}), LocaleReceiver);

export default inherits(san.defineComponent({
    initData() {
        return {
            align: {
                offset: [0, -2]
            },
            prefixCls,
            transitionName: 'slide-up'
        };
    },
    computed: {
        timePlaceholder() {
            const locale = this.data.get('locale');
            const placeholder = this.data.get('placeholder');
            return placeholder || locale.placeholder;
        },
        pickerClassName() {
            const className = this.data.get('className');
            const size = this.data.get('size');

            return classNames(className, {
                [`${prefixCls}-${size}`]: !!size
            });
        },
        renderInputIcon() {
            const prefixCls = this.data.get('prefixCls');
            const suffixIcon = this.data.get('suffixIcon');

            return san.defineComponent({
                initData() {
                    return {
                        prefixCls
                    };
                },
                inited() {
                    this.data.set('instance', this);
                },
                computed: {
                    hasSuffixIcon() {
                        const instance = this.data.get('instance');
                        return instance && instance.components.suffixicon;
                    }
                },
                components: {
                    suffixicon: suffixIcon,
                    icon: Icon
                },
                template: `<span class="{{prefixCls}}-icon">
                    <suffixicon s-if="hasSuffixIcon"/>
                    <icon s-else type="clock-circle" className="{{prefixCls}}-clock-icon" />
                </span>`
            });
        },
        renderClearIcon() {
            const prefixCls = this.data.get('prefixCls');
            const clearIcon = this.data.get('clearIcon');

            if (clearIcon) {
                return clearIcon;
            }

            return inherits(san.defineComponent({
                initData() {
                    return {
                        type: 'close-circle',
                        className: prefixCls + '-clear',
                        theme: 'filled'
                    };
                }
            }), Icon);
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
}), inherits(TimePicker, Locale));
