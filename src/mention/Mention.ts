/**
 * @file 组件 mention
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import './style/index.less';
import PlaceHolder from './PlaceHolder';
import Suggestions from './Suggestions';
import {getRegExp, insertString, setCursorPosition, getSearchWordPos} from './utils/index';
import {classCreator} from '../core/util';
import Base from 'santd/base';
import {Messages, State, Props} from './interface';

const prefixCls = classCreator('mention')();

interface HandleInputEvent {
    target: {
        textContent: string;
    }
}
export default class Mention extends Base<State, Props> {
    static Nav: any
    multilDown!: boolean
    
    static template = `
        <div class="${prefixCls}-wrapper {{disabled ? 'disabled' : ''}}">
            <div class="${prefixCls}-editor">
                <s-placeholder s-if="{{!value && placeholder}}">{{placeholder}}</s-placeholder>
                <div s-ref="mention-editor"
                    style="{{editorStyle}}"
                    class="${prefixCls}-editor-wrapper"
                    contenteditable="{{!disabled && !readOnly}}"
                    on-focus="onFocus($event)"
                    on-blur="onBlur($event)"
                    on-keydown="onKeydown($event)"
                    on-input="onInput($event)"
                >
                </div>
            </div>
            <s-suggestions
                isShowSug="{{isShowSug}}"
                loading="{{loading}}"
                suggestions="{{suggestions}}"
                style="{{suggestionStyle}}"
                placement="{{placement}}"
                position="{{position}}"
                notFoundContent="{{notFoundContent}}"
            >
            </s-suggestions>
        </div>
    `
    
    static components = {
        's-placeholder': PlaceHolder,
        's-suggestions': Suggestions
    }
    initData(): State {
        return {
            placeholder: '',
            readOnly: false,
            disabled: false,
            suggestions: [],
            filteredSuggestions: [],
            isShowSug: false,
            notFoundContent: '无匹配结果，轻敲空格完成输入',
            multiLines: false,
            placement: 'bottom',
            prefix: '@',
            value: '',
            split: ' '
        };
    }
    static computed = {
        editorStyle(this: Mention) {
            let multiLines = !!this.data.get('multiLines');
            const baseStyle = multiLines ? this.data.get('baseStyle') : {};
            return {...baseStyle, outline: 'none', 'white-space': 'pre-wrap', 'overflow-wrap': 'break-word'};
        }
    }
    static messages: Messages = {
        santd_mention_itemSelect(e) {
            const {value, start, end, split} = this.data.get();
            let newInputValue = insertString(value!, start!, end!, e.value, split!);
            // 点击下拉选项后，设置输入框的值
            this.setInputValue(newInputValue);
            setCursorPosition(this.ref('mention-editor'), newInputValue.length);
            this.fire('select', e.value);
            this.fire('change', newInputValue);
        }
    }
    inited() {
        const {value, defaultValue, suggestions, defaultSuggestions} = this.data.get();
        const initValue = value || defaultValue || '';
        const initSuggestions = defaultSuggestions && defaultSuggestions.length > 0 && suggestions!.length === 0
            ? defaultSuggestions : suggestions;
        this.data.set('value', initValue);
        this.data.set('suggestions', initSuggestions!);
    }
    attached() {
        const {value, autoFocus} = this.data.get();
        this.setInputValue(value!);
        autoFocus && setCursorPosition(this.ref('mention-editor'), 0);
        this.watch('value', val => {
            const refs = this.ref('mention-editor') as unknown as HTMLDivElement;
            if (refs && val === '') {
                refs.innerText = val;
            }
        });
    }
    setInputValue(val: string) {
        this.data.set('value', val);
        (this.ref('mention-editor') as unknown as HTMLDivElement).innerText = val;
    }
    onFocus(e: MouseEvent) {
        this.fire('focus', e);
    }
    onBlur(e: HandleInputEvent) {
        let $this = this;
        // 为了解决输入框blur事件和下拉框选择点击事件冲突，blur事件设置了延迟
        setTimeout(function () {
            $this.hideSug();
        }, 300);
        this.dispatch('UI:form-item-interact', {fieldValue: e.target.textContent, type: 'blur', e});
        this.fire('blur', e);
    }
    onInput(e: HandleInputEvent) {
        // 如果只是回车
        if (this.multilDown) {
            return null;
        }
        this.showList(e);
        this.fire('change', e.target.textContent);
        this.dispatch('UI:form-item-interact', {fieldValue: e.target.textContent, type: 'change', e});
    }
    onKeydown(e: KeyboardEvent) {
        const keyCode = e.keyCode;
        const multiLines = this.data.get('multiLines');
        if (keyCode === 13 && multiLines) {
            this.multilDown = true;
        }
        else if (keyCode === 13 && !multiLines) {
            e.preventDefault();
        }
        else {
            this.multilDown = false;
        }
    }
    showList(e: HandleInputEvent) {
        this.data.set('value', e.target.textContent);
        if (!e.target.textContent) {
            return this.hideSug();
        }
        this.buildSugList();
    }
    hideSug() {
        this.data.set('isShowSug', false);
    }
    // 匹配到的检索列表
    buildSugList() {
        // 获取检索词（光标左右非空白符的文字）
        const {value, prefix, split, validateSearch} = this.data.get();
        // 需要先获取到上面行的字符数，而且，如果是同一行，不能加，只能在回车后的第一次才能加上
        const preLineOffset = (this.ref('mention-editor') as unknown as HTMLDivElement).innerText.length;
        let anchorOffset = window.getSelection()!.anchorOffset; // 光标位置
        if (anchorOffset === 1) {
            anchorOffset += preLineOffset;
        }
        // 对分隔符中的特殊字符进行转义
        const splitRegExp = split!.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const endRegExp = new RegExp(`${splitRegExp}|$`);
        const startPos = value!.slice(0, anchorOffset).lastIndexOf(split!) + 1;
        const endPos = value!.slice(anchorOffset).search(endRegExp);
        this.data.set('start', startPos + 1);
        this.data.set('end', anchorOffset + endPos + 1);
        const word = value!.slice(startPos, anchorOffset + endPos);
        // 设置下拉框位置position的值,
        const rect = getSearchWordPos(this.ref('mention-editor'));
        this.data.set('position', rect);
        // suggestionsRegExp正则匹配出前缀符和检索文字
        const suggestionsRegExp = (prefix && getRegExp(Array.isArray(prefix) ? prefix : [prefix], split!)) as RegExp; // 生成前缀的正则
        const matchArr = suggestionsRegExp.exec(word);
        // 未通过校验逻辑
        if (
            matchArr && matchArr.length > 3 && validateSearch && !validateSearch(matchArr[3])
            || !matchArr
        ) {
            return this.hideSug();
        }
        // 显示下拉框
        this.data.set('isShowSug', true);
        // 将正则匹配得到的前缀符和检索文字作为搜索词传入onSearchChange函数
        this.onSearchChange(matchArr[3], matchArr[2]);
    }
    onSearchChange(value: string, trigger: any) {
        const {defaultSuggestions, filterOption} = this.data.get();
        const searchValue = value.toLowerCase();
        const filteredSuggestions = (defaultSuggestions || []).filter(
            suggestion => (
                filterOption
                ? typeof filterOption !== 'boolean' && filterOption(searchValue, suggestion)
                : suggestion.toLowerCase().indexOf(searchValue) !== -1
            )
        );
        this.fire('searchChange', {
            value,
            trigger
        });
        this.data.set('suggestions', filteredSuggestions);
    }
    focus() {
        (this.ref('mention-editor') as unknown as HTMLDivElement).focus();
    }
    blur() {
        (this.ref('mention-editor') as unknown as HTMLDivElement).blur();
    }
};
