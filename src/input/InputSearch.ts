/**
* @file input-search 输入框search组件
* @author fuqiangqiang@baidu.com
*/
import {classCreator} from '../core/util';
import Icon from '../icon';
import Button from '../button';
import BaseInput from './Base';
import './style/index.less';
import type {
    InputSearchProps as Props,
    InputSearchComputed as Computed,
    InputComp
} from './interface';

type InputSearchComp = InputComp<{}, Props>;

const prefixCls = classCreator('input')();

export default class InputSearch extends BaseInput {
    static components = {
        's-icon': Icon,
        's-button': Button
    }
    searchClick() {
        const inputValue = (this.ref('input') as unknown as HTMLInputElement).value;
        this.fire('search', inputValue);
    }
    static computed: Computed = {
        classes(this: InputSearchComp) {
            const enterButton = this.data.get('enterButton');
            const size = this.data.get('size');
            let classArr = [`${prefixCls}-search`, `${prefixCls}-affix-wrapper`];

            !!enterButton && classArr.push(`${prefixCls}-search-enter-button`);
            !!size && classArr.push(`${prefixCls}-affix-wrapper-${size}`);

            return classArr;
        },
        btnType(this: InputSearchComp) {
            const loading = this.data.get('loading');
            return loading && 'loading' || 'search';
        }
    }
    static template = /* html */ `
        <span class="{{classes}}">
            ${BaseInput.template}
            <span s-if="enterButton" class="${prefixCls}-suffix" on-click="searchClick()">
                <s-button type="primary" class="${prefixCls}-search-button" size="{{size}}">
                    <s-icon s-if="enterButton === true" type={{btnType}} />
                    <span s-else>{{enterButton}}</span>
                </s-button>
            </span>
            <span s-else class="${prefixCls}-suffix" on-click="searchClick()">
                <s-icon class="${prefixCls}-search-icon" type={{btnType}} />
            <span>
        </span>
    `
};

export type TInputSearch = typeof InputSearch;
