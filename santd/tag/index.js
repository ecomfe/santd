/**
* @file tag入口文件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import CheckableTag from './checkableTag';
import classNames from 'classnames';
import {classCreator} from 'santd/core/util';
import Wave from 'santd/core/util/wave';
import Icon from 'santd/icon';
import toStyle from 'to-style';
import './style/index.js';

const prefixCls = classCreator('tag')();
const presetColorTypes = [
    'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue',
    'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'
];
const presetColorRegex = new RegExp(`^(${presetColorTypes.join('|')})(-inverse)?$`);

const Tag = san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        color: DataTypes.string,
        closable: DataTypes.bool,
        visible: DataTypes.bool,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object])
    },
    computed: {
        classes() {
            const visible = this.data.get('visible');
            const color = this.data.get('color');
            const className = this.data.get('className');
            const isPresetColor = this.data.get('isPresetColor');

            return classNames(prefixCls, {
                [`${prefixCls}-${color}`]: isPresetColor,
                [`${prefixCls}-has-color`]: color && !isPresetColor,
                [`${prefixCls}-hidden`]: !visible
            }, className);
        },
        isPresetColor() {
            const color = this.data.get('color');
            return color ? presetColorRegex.test(color) : false;
        },
        tagStyle() {
            const color = this.data.get('color');
            const bodyStyle = this.data.get('bodyStyle');
            const isPresetColor = this.data.get('isPresetColor');

            return {
                'background-color': color && !isPresetColor ? color : undefined,
                ...toStyle.object(bodyStyle)
            };
        },
        isNeedWave() {
            const instance = this.data.get('instance');
            const children = instance && instance.sourceSlots.noname[0];

            return children && children.tagName === 'a';
        }
    },
    initData() {
        return {
            closable: false,
            visible: true
        };
    },
    inited() {
        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});
        this.data.set('instance', this);
    },
    setVisible(visible, e) {
        this.fire('close', e);
        if (e.defaultPrevented) {
            return;
        }
        this.data.set('visible', visible);
    },
    handleIconClick(e) {
        this.setVisible(false, e);
    },
    handleClick(e) {
        this.fire('click', e);
    },
    components: {
        's-wave': Wave,
        's-icon': Icon
    },
    template: `
        <div class="{{classes}}" style="{{tagStyle}}" on-click="handleClick">
            <slot></slot>
            <s-icon type="close" on-click="handleIconClick" s-if="closable" />
            <s-wave s-if="isNeedWave"></s-wave>
        </div>
    `
});

Tag.CheckableTag = CheckableTag;
export default Tag;
