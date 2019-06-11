/**
* @file select 头部分
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import KEYCODE from 'santd/core/util/keyCode';
import Icon from 'santd/icon';
const pagin = classCreator('select');
const prefixCls = pagin();

const SingleHeadComponent = san.defineComponent({
    dataTypes: {
        hideTag: DataTypes.bool,
        allData: DataTypes.object
    },
    computed: {
        opacityStyle() {
            const isShow = this.data.get('allData._open');
            const hideTag = this.data.get('hideTag');
            const showSearch = this.data.get('allData.showSearch');
            return {
                opacity: hideTag ? '0' : (isShow && showSearch ? '0.4' : '1')
            };
        },
        sigleSearch() {
            return classNames({
                [`${prefixCls}-search`]: true,
                [`${prefixCls}-search--inline`]: true
            });
        },
        sigleSearchStyle() {
            const isOpen = this.data.get('allData._open');
            return {
                display: isOpen ? 'block' : 'none'
            };
        },
        titles() {
            const optionsInfo = this.data.get('allData._optionsInfo');
            const resValue = this.data.get('allData._value');
            let arrTitles = [];
            if (!resValue || !resValue.length) {
                return '';
            }
            return resValue.map(item => {
                return item.label;
            });
        },
        setTitle() {
            const optionsInfo = this.data.get('allData._optionsInfo');
            const resValue = this.data.get('allData._value');
            let targetTitle = [];
            if (!resValue || !resValue.length) {
                return '';
            }
            Object.keys(optionsInfo).forEach(opt => {
                resValue.forEach(v => {
                    if (v.value === optionsInfo[opt].value) {
                        let title = optionsInfo[opt].title
                            ? optionsInfo[opt].title.trim()
                            : optionsInfo[opt].label.trim();
                        targetTitle.push(title);
                    }
                });
            });
            return targetTitle;
        },
        placeholderStyles() {
            const allData = this.data.get('allData');
            let hidden = false;
            if (allData && allData._inputValue) {
                hidden = true;
            }
            const value = allData && allData._value || [];
            if (value.length) {
                hidden = true;
            }
            return {
                display: hidden ? 'none' : 'block',
                'user-select': 'none'
            };
        }
    },
    initData() {
        return {
            hideTag: false
        };
    },
    compiled() {
        const inputElement = this.parentComponent.data.get('inputElement');
        if (inputElement) {
            this.components.inputelement = inputElement;
        }
    },
    created() {
        this.watch('allData._open', value => {
            const showSearch = this.data.get('allData.showSearch');
            if (showSearch && value) {
                this.maybeFocus();
            }
        });
        // 将value重置
        this.watch('allData._inputValue', val => {
            const inputRef = this.ref('sigleInput');
            inputRef ? inputRef.value = val : null;
        });
    },
    attached() {
        const autoFocus = this.data.get('autoFocus');
        if (autoFocus) {
            this.maybeFocus();
        }
        setTimeout(() => {
            // 默认处理autocomplete中的value
            const sigleInput = this.ref('sigleInput');
            const isAutoComplete = this.data.get('isAutoComplete');
            if (isAutoComplete && sigleInput) {
                sigleInput.value = this.data.get('titles');
            }
        }, 0);
    },
    maybeFocus() {
        setTimeout(() => {
            const sigleInput = this.ref('sigleInput');
            sigleInput && sigleInput.focus();
        }, 0);
    },
    onInput(e) {
        const value = e.target.value;
        this.data.set('hideTag', true);
        this.dispatch('queryInput', {value, event: e});
    },
    onInputBlur(e) {
        const isAutoComplete = this.data.get('isAutoComplete');
        if (!isAutoComplete) {
            e.target.value = '';
        }
        this.data.set('hideTag', false);
        this.dispatch('inputOnBlur', e.target.value);
    },
    inputOnFocus(e) {
        this.dispatch('inputOnFocus', e);
    },
    template: `
    <div>
        <div
            unselectable="on"
            class="${prefixCls}-selection__placeholder"
            style="{{placeholderStyles}}"
        >{{allData.placeholder}}</div>
        <div
            class="${prefixCls}-selection-selected-value"
            s-if="!isAutoComplete"
            title="{{setTitle}}"
            style="{{opacityStyle}}"
            >
            {{titles | raw}}
        </div>
        <div
            s-if="allData.showSearch"
            class="{{sigleSearch}}"
        >
            <div class="${prefixCls}-search__field__wrap">
                <input
                    s-if="!getInputElement"
                    s-ref="sigleInput"
                    autoComplete="off"
                    class="san-input ${prefixCls}-search__field"
                    on-input="onInput($event)"
                    on-blur="onInputBlur($event)"
                    on-focus="inputOnFocus($event)"
                />
                <inputelement s-else value="{{allData._inputValue}}"></inputelement>
                <span class="${prefixCls}-search__field__mirror"></span>
            </div>
        </div>
    </div>
    `
});

const MultagsComponent = san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        inputValue: DataTypes.string,
        emptyValue: DataTypes.string
    },
    components: {
        's-icon': Icon
    },
    computed: {
        classes() {
            const disabled = this.data.get('allData.disabled');
            return classNames({
                [`${prefixCls}-selection__choice`]: true,
                [`${prefixCls}-selection__choice__disabled`]: disabled
            });
        },
        headData() {
            const defaultValue = this.data.get('allData.defaultValue') || [];
            const addTagsOptions = this.data.get('allData._addTagsOptions');
            const resValue = this.data.get('allData._value');
            const maxTagCount = this.data.get('allData.maxTagCount');
            const maxTagContent = this.data.get('allData._maxTagContent');
            let defaultMaxTag = resValue;
            if (!resValue || !resValue.length) {
                return '';
            }
            if (resValue.length > maxTagCount) {
                defaultMaxTag = resValue.filter((val, index) => {
                    return index < maxTagCount;
                });
                defaultMaxTag.push({label: maxTagContent});
            }
            return defaultMaxTag.map(v => {
                return v.label;
            });
        },
        placeholderStyles() {
            const allData = this.data.get('allData');
            let hidden = false;
            if (allData && allData._inputValue) {
                hidden = true;
            }
            const value = allData && allData._value || [];
            if (value.length) {
                hidden = true;
            }
            return {
                display: hidden ? 'none' : 'block',
                'user-select': 'none'
            };
        }
    },
    initData() {
        return {
            disabled: false,
            inputValue: '',
            emptyValue: '',
            focus: false
        };
    },
    created() {
        this.watch('allData._value', resValue => {
            setTimeout(() => {
                const removeIcon = this.data.get('removeIcon');
                if (removeIcon) {
                    resValue.forEach((item, index) => {
                        const removeIconRef = this.ref('removeIconRef-' + index);
                        if (typeof removeIcon === 'function') {
                            if (removeIconRef) {
                                removeIconRef.innerHTML = '';
                            }
                            const Render = removeIcon();
                            const renderer = new Render();
                            renderer.attach(removeIconRef);
                            renderer.parentComponent = this;
                        }
                    });
                }
            }, 10);

        });
    },
    attached() {
        const autoFocus = this.data.get('autoFocus');
        const resValue = this.data.get('allData._value');
        if (autoFocus) {
            this.ref('importInput').focus;
        }

    },
    closeHandler(e) {
        // 关闭按钮
        const value = e.currentTarget.getAttribute('title');
        e.stopPropagation();
        this.dispatch('closeBtnClick', value);
    },
    inputChange(e) {
        // 当input时，实时增加或减少input框的宽度
        const value = e.target.value;
        e.target.style.width = value.length * 10 + 10 + 'px';
        this.data.set('inputValue', value);
        this.query(value, e);
    },
    query(query, e) {
        this.dispatch('queryInput', {value: query, event: e});
    },
    inputKeyDown(e) {
        const value = e.target.value;
        if (e.keyCode === KEYCODE.ENTER && value) {
            this.dispatch('keyEnter', {value, event: e});
            // e.target.value = '';
        }
        // 处理del键时的删除事件
        if (e.keyCode === KEYCODE.BACKSPACE) {
            if (value === '') {
                this.dispatch('handleBackspace', e);
            }
        }
    },
    inputOnBlur(e) {
        this.dispatch('inputOnBlur', e.target.value);
        e.target.value = '';

    },
    inputOnFocus(e) {
        this.dispatch('inputOnFocus', e);
    },
    template: `
    <div>
    <div
        unselectable="on"
        class="${prefixCls}-selection__placeholder"
        style="{{placeholderStyles}}"
    >{{allData.placeholder}}</div>
    <ul>
        <li s-for="content, index in headData" class="{{classes}}" style="user-select: none;">
            <div class="${prefixCls}-selection__choice__content">
                {{content | raw}}
            </div>
            <span
                s-if="!allData.disabled && index < allData.maxTagCount"
                class="${prefixCls}-selection__choice__remove"
                title="{{content}}"
                s-ref="removeIconRef-{{index}}"
                on-click="closeHandler($event)"
            >
                <s-icon type="close"></s-icon>
            </span>
        </li>
        <!--input位置-->
        <li class="${prefixCls}-search ${prefixCls}-search--inline" key="__input">
            <div class="${prefixCls}-search__field__wrap">
                <input
                    s-ref="importInput"
                    autoComplete="off"
                    class="${prefixCls}-search__field"
                    on-input="inputChange($event)"
                    on-keydown="inputKeyDown($event)"
                    value="{{ emptyValue }}"
                    on-blur="inputOnBlur($event)"
                    on-focus="inputOnFocus($event)"
                    >
                <span class="${prefixCls}-search__field__mirror">
                    {{inputValue}}&nbsp;
                </span>
            </div>
        </li>
    </ul>
    </div>
    `
});

export default san.defineComponent({
    components: {
        's-singlehead': SingleHeadComponent,
        's-multags': MultagsComponent
    },
    headMouseenter() {
        this.dispatch('headMouseenter');
    },
    headMouseleave() {
        this.dispatch('headMouseleave');
    },
    template: `
        <div on-mouseenter="headMouseenter" on-mouseleave="headMouseleave">
            <s-multags
                s-if="mode === 'multiple' || mode === 'tags'"
                s-ref="multagsRef"
                allData="{{allData}}"
                removeIcon="{{removeIcon}}"
                autoFocus="{{autoFocus}}"
            ></s-multags>
            <s-singlehead
                s-else
                s-ref="singleRef"
                isAutoComplete="{{isAutoComplete}}"
                allData="{{allData}}"
                getInputElement="{{inputElement}}"
                autoFocus="{{autoFocus}}"
            ></s-singlehead>
        </div>
    `
});
