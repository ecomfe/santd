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
import {classCreator} from 'santd/core/util';

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
        defaultSuggestions: DataTypes.any,
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
        suggestions: DataTypes.any,
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
            const baseStyle = multiLines ? this.data.get('baseStyle') : {};
            return {...baseStyle, outline: 'none', 'white-space': 'pre-wrap', 'overflow-wrap': 'break-word'}
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
            this.fire('change', newInputValue);
        }
    },
    inited() {
        const {value, defaultValue, suggestions, defaultSuggestions} = this.data.get();
        const initValue = value || defaultValue || '';
        const initSuggestions = defaultSuggestions && defaultSuggestions.length > 0 && suggestions.length === 0
            ? defaultSuggestions : suggestions;
        this.data.set('value', initValue);
        this.data.set('suggestions', initSuggestions);
    },
    attached() {
        const {value, autoFocus} = this.data.get();
        this.setInputValue(value);
        autoFocus && setCursorPosition(this.ref('mention-editor'), 0);
        this.watch('value', val => {
            const refs = this.ref('mention-editor');
            if (refs && val === '') {
                refs.innerText = val;
            }
        });
    },
    setInputValue(val) {
        this.data.set('value', val);
        this.ref('mention-editor').innerText = val;
    },
    onFocus(e) {
        this.fire('focus', e);
    },
    onBlur(e) {
        let $this = this;
        // 为了解决输入框blur事件和下拉框选择点击事件冲突，blur事件设置了延迟
        setTimeout(function () {
            $this.hideSug();
        }, 300);
        this.dispatch('UI:form-item-interact', {fieldValue: e.target.textContent, type: 'blur'});
        this.fire('blur', e);
    },
    onInput(e) {
        // 如果只是回车
        if (this.multilDown) {
            return null;
        }
        this.showList(e);
        this.fire('change', e.target.textContent);
        this.dispatch('UI:form-item-interact', {fieldValue: e.target.textContent, type: 'change'});
    },
    onKeydown(e) {
        const keyCode = e.keyCode;
        const multiLines = this.data.get('multiLines');
        if (keyCode === 13 && multiLines) {
            this.multilDown = true;
        } else if (keyCode === 13 && !multiLines) {
            e.preventDefault();
        } else {
            this.multilDown = false;
        }
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
        // 需要先获取到上面行的字符数，而且，如果是同一行，不能加，只能在回车后的第一次才能加上
        const preLineOffset = this.ref('mention-editor').innerText.length;
        let anchorOffset = window.getSelection().anchorOffset; // 光标位置
        if (anchorOffset ===1) {
            anchorOffset += preLineOffset;
        }
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
        const searchValue = value.toLowerCase();
        const filteredSuggestions = (this.data.get('defaultSuggestions') || []).filter(
            suggestion => (
                suggestion.toLowerCase().indexOf(searchValue) !== -1
            )
        );
        this.fire('searchChange', {
            value,
            trigger
        });
        this.data.set('suggestions', filteredSuggestions);
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
});
