/**
 * @file 组件 mention
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import '../style/index.less';
import san, {DataTypes} from 'san';
import classNames from 'classnames';
import PlaceHolder from './placeHolder';
import Suggestions from './suggestions';
import {getRegExp, insertString, setCursorPosition, getSearchWordPos} from '../utils/index';

// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';

// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx
const cc = classCreator('mention');
const prefixCls = cc();

export default san.defineComponent({
    components: {
        's-placeholder': PlaceHolder,
        's-suggestions': Suggestions
    },
    dataTypes: {
        autoFocus: DataTypes.bool,
        defaultValue: DataTypes.string,
        defaultSuggestions: DataTypes.array,
        disabled: DataTypes.bool,
        loading: DataTypes.bool,
        multiLines: DataTypes.bool,
        notFoundContent: DataTypes.string,
        placeholder: DataTypes.string,
        placement: DataTypes.string,
        prefix: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.array
        ]),
        readOnly: DataTypes.bool,
        suggestions: DataTypes.array,
        suggestionStyle: DataTypes.string,
        value: DataTypes.string
    },
    initData() {
        return {
            placeholder: '',
            readOnly: false,
            disabled: false,
            contenteditable: true,
            suggestions: [],
            filteredSuggestions: [],
            isShowSug: false,
            notFoundContent: '无匹配结果，轻敲空格完成输入',
            multiLines: false,
            placement: 'bottom',
            prefix: '@',
            value: ''
        };
    },
    computed: {
        classes() {
            return classNames({
                [`${prefixCls}-wrapper`]: true,
                [`${prefixCls}-active`]: false,
                [`${prefixCls}-placement-top`]: false,
                ['disabled']: !!this.data.get('disabled')
            });
        },
        editor() {
            return classNames({
                'public-DraftEditor-content': true,
                'notranslate': !this.data.get('readOnly')
            });
        },
        showPlaceholder() {
            const placeholder = this.data.get('placeholder');
            const value = this.data.get('value');
            return !!placeholder && !value;
        },
        contenteditable() {
            return !this.data.get('disabled') && !this.data.get('readOnly');
        },
        editorStyle() {
            let multiLines = !!this.data.get('multiLines');
            return multiLines ? this.data.get('style') : '';
        }
    },
    messages: {
        itemSelect(e) {
            const {value, start, end} = this.data.get();
            let newInputValue = insertString(value, start, end, e.value);
            // 点击下拉选项后，设置输入框的值
            this.setInputValue(newInputValue);
            setCursorPosition(this.ref('mention-editor'), newInputValue.length);
            this.fire('select', e.value);
        }
    },
    inited() {
        const {value, defaultValue, suggestions, defaultSuggestions} = this.data.get();
        const initValue = value || defaultValue || '';
        const initSuggestions = defaultSuggestions && defaultSuggestions.length > 0 && suggestions.length === 0
            ? defaultSuggestions : suggestions;
        this.data.set('value', initValue);
        this.data.set('filteredSuggestions', initSuggestions);
        this.data.set('suggestions', initSuggestions);
    },
    attached() {
        const {value, autoFocus} = this.data.get();
        this.setInputValue(value);
        autoFocus && setCursorPosition(this.ref('mention-editor'), 0);
    },
    setInputValue(val) {
        this.data.set('value', val);
        this.ref('mention-editor').innerText = val;
    },
    onFocus(e) {
        this.fire('focus', e);
        this.showList(e);
    },
    onBlur(e) {
        let $this = this;
        // 为了解决输入框blur事件和下拉框选择点击事件冲突，blur事件设置了延迟
        setTimeout(function () {
            $this.hideSug();
        }, 300);
        this.fire('blur', e);
    },
    onInput(e) {
        this.fire('change', e);
    },
    onKeyUp(e) {
        this.showList(e);
    },
    showList(e) {
        this.data.set('value', e.target.textContent);
        if (!e.target.textContent) {
            return this.hideSug();
        }
        this.buildSugList();
    },
    hideSug() {
        this.data.set('isShowSug', false);
    },
    // 匹配到的检索列表
    buildSugList() {
        // 获取检索词（光标左右非空白符的文字）
        const {value, prefix} = this.data.get();
        const anchorOffset = window.getSelection().anchorOffset; // 光标位置
        const startPos = value.slice(0, anchorOffset).search(/\S+$/);
        const endPos = value.slice(anchorOffset).search(/(\s|$)/);
        this.data.set('start', startPos + 1);
        this.data.set('end', anchorOffset + endPos + 1);
        const word = value.slice(startPos, anchorOffset + endPos);
        // 设置下拉框位置position的值,
        const rect = getSearchWordPos(this.ref('mention-editor'));
        this.data.set('position', rect);
        // suggestionsRegExp正则匹配出前缀符和检索文字
        const suggestionsRegExp = getRegExp(prefix); // 生成前缀的正则
        const matchArr = suggestionsRegExp.exec(word);
        if (!matchArr) {
            return this.hideSug();
        }
        // 显示下拉框
        this.data.set('isShowSug', true);
        // 将正则匹配得到的前缀符和检索文字作为搜索词传入onSearchChange函数
        this.onSearchChange(matchArr[3], matchArr[2]);
    },
    onSearchChange(value, trigger) {
        if (this.listeners.searchChange) {
            return this.fire('searchChange', {
                value,
                trigger
            });
        }
        const searchValue = value.toLowerCase();
        const filteredSuggestions = (this.data.get('defaultSuggestions') || []).filter(
            suggestion => (
                suggestion.toLowerCase().indexOf(searchValue) !== -1
            )
        );
        this.data.set('filteredSuggestions', filteredSuggestions);
    },
    focus() {
        this.ref('mention-editor').focus();
    },
    blur() {
        this.ref('mention-editor').blur();
    },
    template: `
        <div className="{{classes}}">
            <div className="${prefixCls}-editor">
                <s-placeholder s-if="{{showPlaceholder}}">{{placeholder}}</s-placeholder>
                <div s-ref="mention-editor"
                    style="{{editorStyle}}"
                    className="${prefixCls}-editor-wrapper"
                    contenteditable="{{contenteditable}}"
                    on-focus="onFocus"
                    on-blur="onBlur"
                    on-keyup="onKeyUp"
                    on-input="onInput"
                    on-keydown="onKeyDown"
                >
                </div>
            </div>
            <s-suggestions
                isShowSug="{{isShowSug}}"
                loading="{{loading}}"
                suggestions="{{suggestions || filteredSuggestions}}"
                style="{{suggestionStyle}}"
                placement="{{placement}}"
                position="{{position}}"
                notFoundContent="{{notFoundContent}}"
            >
            </s-suggestions>
        </div>
    `
});
