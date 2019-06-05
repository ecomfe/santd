/**
 * @file 组件 date-picker
 * @author jinzhan@baidu.com fuqiangqiang@baidu.com
 *
 * ant-design-vue
 * https://github.com/vueComponent/ant-design-vue
 *
 * 参考代码
 * https://github.com/ecomfe/san-xui
 * https://github.com/ecomfe/esui
 * https://github.com/ecomfe/san-mui
 * http://one-design.baidu-int.com/development/getting-started
 * http://icode.baidu.com/repos/baidu/hulk/hulk-cli/tree/master
 * http://icode.baidu.com/repos/baidu/hulk/san-project-base/tree/master
 * http://icode.baidu.com/repos/baidu/hulk/antd-san-component-template/tree/master
 * http://icode.baidu.com/repos/baidu/hulk/xbox
 */

import './style/index';
import {DataTypes, defineComponent} from 'san';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import compareAsc from 'date-fns/compare_asc';
import Icon from 'santd/icon';
import Layer from 'santd/layer';
import MonthView from './MonthView';
import RangePicker from './range';

// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';


// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx
const cc = classCreator('date-picker');

const kDefaultRange = {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)};

export {RangePicker};

export const DatePicker = defineComponent({
    template: `
        <div on-click="toggleLayer" class="{{mainClass}}">
            <div class="{{contentClass}}">{{text}}</div>
            <s-icon type="calendar" />
            <s-layer open="{=active=}" s-ref="layer" follow-scroll="{{false}}" target="{{target}}">
                <div class="${cc('layer')}">
                    <s-monthview value="{=value=}" time="{{time}}" range="{{range}}" on-change="onChange"/>
                </div>
            </s-layer>
        </div>
    `,
    components: {
        's-layer': Layer,
        's-monthview': MonthView,
        's-icon': Icon
    },
    computed: {
        mainClass() {
            const disabled = this.data.get('disabled');
            return disabled ? [cc(), cc('disabled')] : cc();
        },
        contentClass() {
            const size = this.data.get('sizeMap')[this.data.get('size')] || 'default';
            return [cc('text'), cc(size)];
        },
        text() {
            const value = this.data.get('value');
            if (value) {
                const valueText = format(value, this.data.get('format'));
                return `${valueText}`;
            }
            return '';
        },
        prevDisabled() {
            const disabled = this.data.get('disabled');
            const range = this.data.get('range');
            const value = this.data.get('value');
            // computed的执行早于了inted，所以需要判断下range
            return disabled || (range && compareAsc(range.begin, addDays(value, 1)) === 1);
        },
        nextDisabled() {
            const disabled = this.data.get('disabled');
            const range = this.data.get('range');
            const value = this.data.get('value');
            // computed的执行早于了inted，所以需要判断下range
            return disabled || (range && (compareAsc(range.end, value) <= 0));
        }
    },
    initData() {
        return {
            value: '',
            time: false,
            prev: false,
            next: false,
            active: false,
            range: kDefaultRange,
            format: 'YYYY-MM-DD',
            closeOnChange: true,
            disabled: false,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 选择日期之后是否关闭浮层
         * @default false
         */
        closeOnChange: DataTypes.bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: DataTypes.bool,

        /**
         * 是否展示前一天的按钮
         * @default false
         */
        prev: DataTypes.bool,

        /**
         * 是否展示后一天的按钮
         * @default false
         */
        next: DataTypes.bool,

        /**
         * 浮层的展开状态
         * @default false
         */
        active: DataTypes.bool,

        /**
         * 日期的值
         * @default new Date()
         */
        value: DataTypes.oneOfType([DataTypes.instanceOf(Date), DataTypes.string]),

        /**
         * 文案格式化日期的时候默认格式
         * @default YYYY-MM-DD
         */
        format: DataTypes.string
    },
    inited() {
        let {value, range} = this.data.get();
        if (!range) {
            this.data.set('range', kDefaultRange);
        }
        if (value && typeof value === 'string') {
            value = new Date(value);
        }
        // 只有 new Date(value), 数据才会同步到外部的组件里面去
        if (value) {
            this.data.set('value', new Date(value));
            this.fire('change', {value});
        }
        this.watch('value', value => {
            this.fire('change', {value});
            const closeOnChange = this.data.get('closeOnChange');
            if (closeOnChange) {
                this.data.set('active', false);
            }
        });
    },
    nextDay() {
        const value = this.data.get('value');
        const newValue = addDays(value, 1);
        this.data.set('value', newValue);
    },
    prevDay() {
        const value = this.data.get('value');
        const newValue = addDays(value, -1);
        this.data.set('value', newValue);
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        const value = this.data.get('value');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        if (!value) {
            this.data.set('value', new Date());
            this.data.set('closeOnChange', false);
        }
        this.data.set('active', !active);
    },
    onChange({value}) {
        if (value !== this.data.get('value')) {
            this.data.set('closeOnChange', true);
            this.data.set('value', value);
        }
    }
});

export default DatePicker;
