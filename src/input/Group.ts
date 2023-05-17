/**
* @file inputGroup 输入框组件
* @author fuqiangqiang@baidu.com
*/
import Base from 'santd/base';
import {classCreator} from '../core/util';
import type {
    GroupInputState as State,
    GroupInputProps as Props
} from './interface';

const prefixCls = classCreator('input-group')();

export default class Group extends Base<State, Props> {
    initData(): State {
        return {
            size: 'default'
        };
    }
    static template = /* html */ `
        <div class="${prefixCls} ${prefixCls}-{{size}} {{compact ? '${prefixCls}-compact' : ''}}">
            <slot />
        </div>
    `
};

export type TGroup = typeof Group;
