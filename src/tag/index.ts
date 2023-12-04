/**
 * @file tag入口文件
 * @author fuqiangqiang@baidu.com
 */

import Base from 'santd/base';
import CheckableTag from './CheckableTag';
import {classCreator} from '../core/util';
import Wave from '../core/util/wave';
import Icon from '../icon';
import './style/index';
import {ITagProps} from './interface';
export interface ITagCopmuted {
    classes: ((this: Tag) => string[]) | string[];
    isPresetColor: ((this: Tag) => boolean) | boolean;
}
const prefixCls = classCreator('tag')();
const presetColorTypes = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
];
const presetColorRegex = new RegExp(`^(${presetColorTypes.join('|')})(-inverse)?$`);

export default class Tag extends Base<ITagProps, ITagCopmuted> {
    static CheckableTag = CheckableTag;

    static computed: ITagCopmuted =  {
        classes() {
            const visible = this.data.get('visible');
            const color = this.data.get('color');
            const isPresetColor = this.data.get('isPresetColor') as boolean;

            let classArr = [prefixCls];
            isPresetColor && classArr.push(`${prefixCls}-${color}`);
            color && !isPresetColor && classArr.push(`${prefixCls}-has-color`);
            !visible && classArr.push(`${prefixCls}-hidden`);
            return classArr;
        },

        isPresetColor() {
            const color = this.data.get('color');
            return color ? presetColorRegex.test(color) : false;
        }
    };

    initData(): ITagProps {
        return {
            closable: false,
            visible: true,
            icon: ''
        };
    }

    inited() {
        let nonameSlots = this.sourceSlots.noname;
        if (nonameSlots && nonameSlots[0].tagName === 'a') {
            this.data.set('isNeedWave', true);
        }
    }

    setVisible(visible: boolean, e: Event) {
        this.fire('close', e);
        if (e.defaultPrevented) {
            return;
        }
        this.data.set('visible', visible);
    }

    handleIconClick(e: Event) {
        this.setVisible(false, e);
    }

    handleClick(e: Event) {
        this.fire('click', e);
    }

    static components = {
        's-wave': Wave,
        's-icon': Icon
    };

    static template = `
        <div class="{{classes}}" style="{{color && !isPresetColor ? 'background-color:' + color : ''}}" on-click="handleClick">
            <s-icon type="{{icon}}" s-if="icon"/>
            <slot />
            <span on-click="handleIconClick" s-if="closable">
                <slot name="closeIcon">
                    <s-icon type="close"/>
                </slot>
            </span>
            <s-wave s-if="isNeedWave" />
        </div>
    `;
};
