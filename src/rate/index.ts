/**
 * @file 组件 rate
 * @author panming <panming@baidu.com>
 */

import './style/index.less';
import KeyCode from '../core/util/keyCode';
import {classCreator} from '../core/util';
import {getOffset} from '../core/util/dom';
import icon from '../icon';
import tooltip from '../tooltip';
import star from './Star';
import Base from 'santd/base';
import type {State, Props, Computed, SlotNode} from './interface';

const prefixCls = classCreator('rate')();

export default class Rate extends Base <State, Props, Computed> {
    static template = `
        <ul
            class="${prefixCls}{{disabled ? ' ${prefixCls}-disabled' : ''}}"
            on-mouseleave="onMouseLeave"
            tabIndex="{{tabIndex}}"
            on-focus="onFocus"
            on-blur="onBlur"
            on-keydown="onKeyDown"
        >
            <template s-for="props, index in starsProps">
                <s-tooltip title="{{tooltips[index]}}" s-if="{{tooltips}}">
                    <s-star
                        s-ref="{{props.ref}}"
                        index="{{props.index}}"
                        focused="{{props.focused}}"
                        value="{{props.value}}"
                        on-hover="onHover"
                        on-click="onClick"
                        character="{{character}}"
                        characterIsString="{{characterIsString}}"
                    >
                        <template s-if="characterIsString && character" slot="starCharacter">
                            {{character}}
                        </template>
                        <template s-else-if="!characterIsString" slot="starCharacter">
                            <slot name="character" />
                        </template>
                        <s-icon type="star" theme="filled" s-else="!character" slot="starCharacter" />
                    </s-star>
                </s-tooltip>
                <s-star
                    s-else
                    s-ref="{{props.ref}}"
                    index="{{props.index}}"
                    focused="{{props.focused}}"
                    value="{{props.value}}"
                    on-hover="onHover"
                    on-click="onClick"
                    character="{{character}}"
                    characterIsString="{{characterIsString}}"
                >
                    <template s-if="{{characterIsString && character}}" slot="starCharacter">
                        {{character}}
                    </template>
                    <template s-else-if="{{!characterIsString}}" slot="starCharacter">
                        <slot name="character" />
                    </template>
                    <s-icon type="star" theme="filled" s-else="!character" slot="starCharacter" />
                </s-star>
            </template>
        </ul>
    `
    
    static components = {
        's-star': star,
        's-icon': icon,
        's-tooltip': tooltip
    }
    initData() {
        return {
            disabled: false,
            allowClear: true,
            autoFocus: false,
            allowHalf: false,
            value: undefined,
            focused: false,
            cleanedValue: null,
            hoverValue: undefined,
            defaultValue: 0,
            count: 5,
            starsProps: [],
            sValue: undefined, // 组件内维护的分数值
            characterIsString: false
        };
    }
    inited() {
        const data = this.data;
        let value = data.get('value') === undefined ? data.get('defaultValue') : data.get('value');
        data.set('value', value);
        data.set('sValue', value);
    }
    attached() {
        const hasSlot = Boolean(this.slot('character')[0] && (this.slot('character') as SlotNode[])[0].children.length);
        if (!hasSlot) {
            this.data.set('characterIsString', true);
        }
        this.nextTick(() => {
            if (this.data.get('autoFocus') && !this.data.get('disabled')) {
                this.focus();
            }
        });
    }
    static computed = {
        starsProps(this: Rate) {
            const data = this.data;
            let hoverValue = data.get('hoverValue');
            let sValue = data.get('sValue') || data.get('value');
            let starsProps = [];
            for (let i = 0; i < data.get('count'); i++) {
                let starProps = {
                    index: i,
                    disabled: false,
                    allowHalf: true,
                    value: hoverValue === undefined ? sValue : hoverValue,
                    focused: data.get('focused'),
                    ref: `stars${i}`
                };
                starsProps.push(starProps);
            }
            return starsProps;
        }
    }
    onHover(event: {starIndex: number, pageX: number}) {
        if (this.data.get('disabled')) {
            return;
        }
        const hoverValue = this.getStarValue(event.starIndex, event.pageX);
        const cleanedValue = this.data.get('cleanedValue');
        if (hoverValue !== cleanedValue) {
            this.data.set('hoverValue', hoverValue);
            this.data.set('cleanedValue', null);
        }
        this.fire('hoverChange', hoverValue);
    }
    onMouseLeave() {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('hoverValue', undefined);
        this.data.set('cleanedValue', null);
        this.fire('hoverChange', undefined);
    }
    onClick(event: {starIndex: number, pageX: number}) {
        if (this.data.get('disabled')) {
            return;
        }
        const value = this.getStarValue(event.starIndex, event.pageX);
        let isReset = false;
        if (this.data.get('allowClear')) {
            isReset = value === this.data.get('sValue');
        }
        this.onMouseLeave();
        this.changeValue(isReset ? 0 : value, event);
        this.data.set('cleanedValue', isReset ? value : null);
    }
    onFocus() {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('focused', true);
        this.fire('focus');
    }
    onBlur() {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('focused', false);
        this.fire('blur');
    }
    onKeyDown(event: {preventDefault: () => any, keyCode: number}) {
        if (this.data.get('disabled')) {
            return;
        }
        const {
            count,
            allowHalf
        } = this.data.get();
        let sValue = this.data.get('sValue');
        if (event.keyCode === KeyCode.RIGHT && sValue && count && sValue < count) {
            if (allowHalf) {
                sValue += 0.5;
            }
            else {
                sValue += 1;
            }
            this.changeValue(sValue, event);
            event.preventDefault();
        }
        else if (event.keyCode === KeyCode.LEFT && sValue && sValue > 0) {
            if (allowHalf) {
                sValue -= 0.5;
            }
            else {
                sValue -= 1;
            }
            this.changeValue(sValue, event);
            event.preventDefault();
        }
        this.fire('keydown', event);
    }
    getStarDOM(index: number) {
        return this.ref(`stars${index}`).el;
    }
    getStarValue(index: number, x: number) {
        let value = +index + 1;
        if (this.data.get('allowHalf')) {
            const starEle = this.getStarDOM(index);
            const leftDis = getOffset(starEle).left;
            const width = starEle!.clientWidth;
            if ((x - leftDis) < width / 2) {
                value -= 0.5;
            }
        }
        return value;
    }
    focus() {
        if (!this.data.get('disabled')) {
            (this.el as unknown as HTMLInputElement).focus();
        }
    }
    blur() {
        if (!this.data.get('disabled')) {
            (this.el as unknown as HTMLInputElement).blur();
        }
    }
    changeValue(value: number, e: any) {
        this.data.set('sValue', value);
        this.data.set('value', value);
        this.fire('change', value);
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change', e});
    }
    
};
