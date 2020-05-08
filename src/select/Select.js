/**
 * @file select/Select
 * @author
 */

import san, {DataTypes} from 'san';
import Empty from '../empty';
import Icon from '../icon';
import Trigger from '../core/trigger';
import DropdownMenu from './DropdownMenu';
import Selector from './Selector';
import KeyCode from '../core/util/keyCode';
import {
    dropdownPrefixCls,
    emptyPrefixCls,
    includesSeparators,
    generateUUID,
    getMapKey,
    prefixCls,
    preventDefaultEvent,
    splitBySeparators,
    toArray
} from './util';

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
const sizeMap = {
    large: 'lg',
    small: 'sm'
};
const BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    }
};
const valueType = DataTypes.oneOfType([
    DataTypes.string,
    DataTypes.arrayOf(DataTypes.string),
    DataTypes.number,
    DataTypes.arrayOf(DataTypes.number)
]);

export default san.defineComponent({
    template: `
        <div class="{{wrapClass}}"
            on-mouseenter="fireEvent($event, 'mouseenter')"
            on-mouseleave="fireEvent($event, 'mouseleave')"
        >
            <s-trigger
                s-ref="trigger"
                builtinPlacements="{{builtinPlacements}}"
                getPopupContainer="{{getPopupContainer}}"
                popupAlign="{{dropdownAlign}}"
                popupClassName="{{popupClassName}}"
                popupStyle="{{popupStyle}}"
                popupPlacement="bottomLeft"
                popupTransitionName="slide-up"
                popupVisible="{{realOpen}}"
                prefixCls="${dropdownPrefixCls}"
                showAction="{{disabled ? [] : showAction}}"
                hideAction="{{hideAction}}"
                on-visibleChange="handleVisibleChange"
            >
                <div
                    s-ref="selection"
                    s-bind="selectionAttrs"
                            class="{{selectionClass}}"
                    on-blur="capture:handleOuterBlur"
                    on-focus="capture:handleOuterFocus"
                    on-keydown="handleKeyDown"
                    on-mousedown="markMouseDown"
                    on-mouseup="markMouseLeave"
                    on-mouseout="markMouseLeave"
                >
                    <s-selector context="{{context}}" inputValue="{=inputValue=}" isAutoComplete="{{isAutoComplete}}">
                        <slot name="removeIcon"/>
                    </s-selector>
                    <span
                        s-if="renderClear"
                        class="${prefixCls}-selection__clear ${prefixCls}-unselectable"
                        unselectable="on"
                        on-click="handleClearSelection"
                        on-mousedown="preventDefaultEvent"
                    >
                        <slot name="clearIcon">
                            <s-icon type="close-circle" theme="filled" class="${prefixCls}-clear-icon"/>
                        </slot>
                    </span>
                    <span
                        s-if="renderArrow"
                        class="${prefixCls}-arrow ${prefixCls}-unselectable"
                        unselectable="on"
                        on-click="handleArrowClick"
                    >
                        <slot name="suffixIcon">
                            <s-icon s-if="loading" type="loading"/>
                            <s-icon s-else type="down" class="${prefixCls}-arrow-icon"/>
                        </slot>
                    </span>
                </div>
                <s-dropdown-render
                    s-ref="dropdown"
                    slot="popup"
                    context="{{context}}"
                    inputValue="{{inputValue}}"
                    visible="{{realOpen}}"
                >
                    <slot name="dropdownRender"/>
                    <slot name="menuItemSelectedIcon" slot="menuItemSelectedIcon">
                        <s-icon type="check" class="${prefixCls}-selected-icon"/>
                    </slot>
                    <slot name="notFoundContent" slot="notFoundContent">
                        <template s-if="notFoundContent">{{notFoundContent}}</template>
                        <s-empty s-else
                            image="${Empty.PRESENTED_IMAGE_SIMPLE}"
                            class="${emptyPrefixCls}-small"
                        />
                    </slot>
                </s-dropdown-render>
                <div style="display: none;"><slot/></div>
            </s-trigger>
        </div>
    `,

    components: {
        's-empty': Empty,
        's-icon': Icon,
        's-trigger': Trigger,
        's-dropdown-render': DropdownMenu,
        's-selector': Selector
    },

    dataTypes: {
        allowClear: DataTypes.bool,
        autoClearSearchValue: DataTypes.bool,
        autoFocus: DataTypes.bool,
        defaultActiveFirstOption: DataTypes.bool,
        defaultValue: valueType,
        disabled: DataTypes.bool,
        dropdownClassName: DataTypes.string,
        dropdownMatchSelectWidth: DataTypes.bool,
        dropdownRender: DataTypes.func,
        dropdownStyle: DataTypes.object,
        dropdownMenuStyle: DataTypes.object,
        filterOption: DataTypes.oneOfType([
            DataTypes.bool,
            DataTypes.func
        ]),
        firstActiveValue: DataTypes.bool,
        getPopupContainer: DataTypes.func,
        labelInValue: DataTypes.bool,
        maxTagCount: DataTypes.number,
        maxTagTextLength: DataTypes.number,
        maxTagPlaceholder: DataTypes.func,
        mode: DataTypes.oneOf([
            'default',
            'multiple',
            'tags',
            'combobox',
            SECRET_COMBOBOX_MODE_DO_NOT_USE
        ]),
        notFoundContent: DataTypes.string,
        optionFilterProp: DataTypes.string,
        optionLabelProp: DataTypes.string,
        placeholder: DataTypes.string,
        showArrow: DataTypes.bool,
        showSearch: DataTypes.bool,
        size: DataTypes.oneOf([
            'default',
            'large',
            'small'
        ]),
        tokenSeparators: DataTypes.arrayOf(DataTypes.string),
        value: valueType,
        defaultOpen: DataTypes.bool,
        open: DataTypes.bool,
        loading: DataTypes.bool
    },

    computed: {
        modeConfig() {
            const mode = this.data.get('mode');
            const multiple = mode === 'multiple';
            const tags = mode === 'tags';
            const combobox = mode === 'combobox' || mode === SECRET_COMBOBOX_MODE_DO_NOT_USE;

            return {
                multiple,
                tags,
                combobox,
                single: !multiple && !tags && !combobox
            };
        },

        wrapClass() {
            const data = this.data;
            const allowClear = data.get('allowClear');
            const disabled = data.get('disabled');
            const loading = data.get('loading');
            const modeConfig = data.get('modeConfig');
            const open = data.get('open');
            const focused = data.get('_focused');
            const showArrow = data.get('showArrow');
            const size = sizeMap[this.data.get('size')] || '';

            return [
                prefixCls,
                `${prefixCls}-${disabled ? 'disabled' : 'enabled'}`,
                allowClear && `${prefixCls}-allow-clear`,
                modeConfig.combobox && `${prefixCls}-combobox`,
                loading && `${prefixCls}-loading`,
                open && `${prefixCls}-open`,
                size && `${prefixCls}-${size}`,
                showArrow !== undefined && `${prefixCls}-${showArrow ? 'show' : 'no'}-arrow`,
                (open || focused) && `${prefixCls}-focused`
            ].filter(name => name);
        },

        selectionClass() {
            const mode = this.data.get('mode');

            return [
                `${prefixCls}-selection`,
                `${prefixCls}-selection--${(mode && mode !== 'default') ? 'multiple' : 'single'}`
            ];
        },

        selectionAttrs() {
            const data = this.data;
            const modeConfig = data.get('modeConfig');
            return {
                'role': 'combobox',
                'aria-autocomplete': 'list',
                'aria-haspopup': true,
                'aria-controls': data.get('context.ariaId'),
                'aria-expanded': !!data.get('realOpen'),
                [modeConfig.single && 'tabindex']: data.get('disabled') ? -1 : 0
            };
        },

        renderClear() {
            const allowClear = this.data.get('allowClear');
            const value = this.data.get('value');
            if (allowClear && value && value.length) {
                return true;
            }
            return false;
        },

        renderArrow() {
            // showArrow : Set to true if not multiple by default but keep set value.
            const data = this.data;
            const loading = data.get('loading');
            const modeConfig = data.get('modeConfig');
            let showArrow = data.get('showArrow');

            if (showArrow === undefined) {
                showArrow = !(modeConfig.multiple || modeConfig.tags);
            }
            if (!showArrow && !loading) {
                return false;
            }
            return true;
        },

        hideAction() {
            const data = this.data;
            const disabled = data.get('disabled');
            if (disabled) {
                return [];
            }

            const modeConfig = data.get('modeConfig');
            const showSearch = data.get('showSearch');
            return !showSearch && modeConfig.single ? ['click'] : ['blur'];
        },

        popupClassName() {
            const data = this.data;
            const dropdownClassName = data.get('dropdownClassName');
            const empty = false;
            const modeConfig = data.get('modeConfig');
            return [
                dropdownClassName,
                `${dropdownPrefixCls}--${modeConfig.single ? 'single' : 'multiple'}`,
                empty && `${dropdownPrefixCls}--empty`
            ].filter(name => name).join(' ');
        },

        popupStyle() {
            const data = this.data;
            const dropdownMatchSelectWidth = data.get('dropdownMatchSelectWidth');
            const dropdownStyle = data.get('dropdownStyle') || {};
            const dropdownWidth = data.get('dropdownWidth');
            const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
            let popupStyle = {...dropdownStyle};
            if (dropdownWidth) {
                popupStyle[widthProp] = `${dropdownWidth}px`;
            }
            return popupStyle;
        },

        realOpen() {
            const data = this.data;
            let open = data.get('open');
            const modeConfig = data.get('modeConfig');
            const options = data.get('options') || [];
            const showSearch = data.get('showSearch');
            if (!modeConfig.single || !showSearch) {
                if (open && !options.length) {
                    open = false;
                }
            }
            return open;
        }
    },

    messages: {
        'select:updateOptions'() {
            this.updateOptions();
        },

        'select:setInputElement'({value: inputElement}) {
            this.data.set('inputElement', inputElement);
        },

        'select:inputChange'({value: event}) {
            this.handleInputChange(event);
        },

        'select:inputKeyDown'({value: event}) {
            this.handleInputKeyDown(event);
        }
    },

    initData() {
        return {
            // ----- data ----- //
            allowClear: false,
            autoClearSearchValue: true,
            autoFocus: false,
            backfill: false,
            defaultActiveFirstOption: true,
            disabled: false,
            dropdownMatchSelectWidth: true,
            getPopupContainer: () => document.body,
            labelInValue: false,
            optionFilterProp: 'value',
            showSearch: false,
            size: 'default',
            tokenSeparators: [],
            loading: false,

            // -- extra data -- //
            builtinPlacements: BUILT_IN_PLACEMENTS,
            context: {},
            dropdownPrefixCls,
            dropdownWidth: 0,
            options: [],
            optionGroups: [],
            optionsInfo: {},
            showAction: ['click']
        };
    },

    inited() {
        this.watch('value', value => {
            this.setState({value});
        });
    },

    created() {
        const props = this.props = this.data.get();

        this.setState({
            value: this.getValueFromProps(true),
            open: !!props.defaultOpen,
            backfillValue: '',
            ariaId: generateUUID()
        });

        this.setDropdownWidth();
    },

    attached() {
        this.setState({
            inputValue: '',
            ready: true
        });

        const props = this.props;
        if (props.autoFocus || props.open) {
            this.focus();
        }
    },

    updated() {
        this.setDropdownWidth();
        this.forcePopupAlign();
    },

    detached() {
        this.clearFocusTime();
        this.clearBlurTime();
        this.clearComboboxTime();
    },

    updateOptions() {
        const {options, optionGroups} = this.getOptionsFromChildren(this.children);
        const optionsInfo = this.getOptionsInfo(options);

        this.setState({
            options,
            optionGroups,
            optionsInfo
        });
    },

    findFirstMenuItem() {
        const items = this.ref('dropdown').data.get('menuItems');
        if (items.length) {
            return items[0];
        }
        return null;
    },

    getOptionsFromChildren(children = [], options = [], optionGroups = [], currGroup = [], hasGroup = false) {
        children.forEach(child => {
            if (child) {
                if (child.isSelectOption) {
                    options.push(child);
                    hasGroup && currGroup.push(child);
                }
                else if (child.isSelectOptionGroup) {
                    currGroup = [];
                    this.getOptionsFromChildren(child.children || [], options, optionGroups, currGroup, true);
                    optionGroups.push({
                        group: child,
                        options: currGroup
                    });
                }
                else if (child.children && child.children.length) {
                    this.getOptionsFromChildren(child.children, options, optionGroups, currGroup, hasGroup);
                }
            }
        });
        return {options, optionGroups};
    },

    getInputValueForCombobox(props, optionsInfo, useDefaultValue) {
        let value = [];
        if ('value' in props && !useDefaultValue) {
            value = toArray(props.value);
        }
        if ('defaultValue' in props && useDefaultValue) {
            value = toArray(props.defaultValue);
        }
        if (value.length) {
            value = value[0];
        }
        else {
            return '';
        }
        let label = value;
        if (props.labelInValue) {
            label = value.label;
        }
        else if (optionsInfo[getMapKey(value)]) {
            label = optionsInfo[getMapKey(value)].label;
        }
        if (label === undefined) {
            label = '';
        }
        return label;
    },

    getLabelFromOption(option) {
        const optionLabelProp = this.getOptionLabelProp(this.props);
        if (optionLabelProp === 'children') {
            return option.el ? option.el.textContent.trim() : '';
        }
        return option.data.get(optionLabelProp);
    },

    getOptionInfo(option) {
        const {value, title, disabled} = option.data.get();
        const label = this.getLabelFromOption(option);
        return {
            disabled,
            label,
            option,
            title,
            value
        };
    },

    getOptionsInfo(options = []) {
        const optionsInfo = {};
        options.forEach(option => {
            const key = getMapKey(option.data.get('value'));
            optionsInfo[key] = this.getOptionInfo(option);
        });
        return optionsInfo;
    },

    getOptionLabelProp(props) {
        const {optionLabelProp, modeConfig} = props;
        return optionLabelProp || (modeConfig.combobox ? 'value' : 'children');
    },

    getValueByInput(str) {
        const {tokenSeparators} = this.data.get();
        let nextValue = this.data.get('value');
        let hasNewValue = false;
        splitBySeparators(str, tokenSeparators).forEach(label => {
            if (nextValue.indexOf(label) === -1) {
                nextValue = [...nextValue, label];
                hasNewValue = true;
                this.fireSelect(label);
            }
        });
        return hasNewValue ? nextValue : undefined;
    },

    getValueFromProps(useDefaultValue) {
        let value = [];
        const props = this.props;
        if ('defaultValue' in props && useDefaultValue) {
            value = toArray(props.defaultValue);
        }
        if (!value.length) {
            value = toArray(props.value);
        }
        if (props.labelInValue) {
            value = value.map(v => v.key);
        }
        return value;
    },

    setDropdownWidth() {
        const width = this.el.offsetWidth;
        if (width !== this.data.get('dropdownWidth')) {
            this.setState({dropdownWidth: width});
        }
    },

    setInputValue(inputValue, fireSearch = true) {
        const preInputValue = this.data.get('inputValue');
        if (inputValue !== preInputValue) {
            this.setState({inputValue});
            fireSearch && this.fire('search', inputValue);
        }
    },

    setOpenState(open, config = {}) {
        const {needFocus, fireSearch} = config;
        const isAutoComplete = this.data.get('isAutoComplete');
        const props = this.data.get();

        if (props.open === open) {
            this.maybeFocus(open, !!needFocus);
            return;
        }

        this.fire('dropdown-visible-change', open);

        const nextState = {
            open,
            backfillValue: ''
        };

        // clear search input value when open is false in singleMode.
        if (!open && props.modeConfig.single && props.showSearch && !isAutoComplete) {
            this.setInputValue('', fireSearch);
        }
        if (!open) {
            this.maybeFocus(open, !!needFocus);
        }
        this.setState({
            open,
            ...nextState
        });
        this.nextTick(() => {
            if (open) {
                this.maybeFocus(open, !!needFocus);
            }
        });
    },

    setState(props, config) {
        if ('context' in props) {
            console.log('context is forbidden to setState'); // eslint-disable-line
            return;
        }
        Object.keys(props).forEach(key => {
            const val = props[key];
            this.data.set(key, val, config);
            this.props[key] = val;
        });
        this.data.set('context', Object.assign({}, this.props, props), config);
    },

    forcePopupAlign() {
        if (!this.data.get('open')) {
            return;
        }
        this.nextTick(() => {
            const trigger = this.ref('trigger');
            trigger && trigger.refresh();
        });
    },

    maybeFocus(open, needFocus) {
        if (needFocus || open) {
            const $input = this.data.get('inputElement');
            const $selection = this.ref('selection');
            const $activeElement = document.activeElement;
            const modeConfig = this.data.get('modeConfig');
            if ($input && (open || !modeConfig.single)) {
                if ($activeElement !== $input) {
                    $input.focus();
                    this.data.set('_focused', true);
                }
            }
            else if ($selection && $activeElement !== $selection) {
                $selection.focus();
                this.data.set('_focused', true);
            }
        }
    },

    openIfHasChildren() {
        const props = this.props;

        if (props.options.length || props.modeConfig.single) {
            this.setOpenState(true);
        }
    },

    removeSelected(selectedKey, e) {
        // Do not trigger Trigger popup
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        const {value: oldValue, modeConfig, labelInValue} = this.data.get();

        const value = oldValue.filter(singleValue => singleValue !== selectedKey);

        if (modeConfig.multiple || modeConfig.tags) {
            let event = selectedKey;
            if (labelInValue) {
                event = {
                    key: selectedKey,
                    label: selectedKey // this.getLabelBySingleValue(selectedKey)
                };
            }
            this.fire('deselect', event);
        }
        this.fireChange(value);
    },

    fireChange(value) {
        this.setState({value});
        this.fire('change', value);
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
    },

    fireSelect(value) {
        this.fire('select', value);
    },

    fireEvent(e, type) {
        this.fire(type, e);
    },

    handleArrowClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const {disabled, open} = this.data.get();
        if (!disabled) {
            this.setOpenState(!open, {needFocus: !open});
        }
    },

    handleBackfill(item) {
        const {modeConfig, backfill} = this.props;
        if (!backfill || !(modeConfig.single || modeConfig.combobox)) {
            return;
        }

        const key = item.value;

        if (modeConfig.combobox) {
            this.setInputValue(key, false);
        }

        this.setState({
            value: [key],
            backfillValue: key
        });
    },

    handleClearSelection(e) {
        if (this.data.get('disabled')) {
            return;
        }

        let {inputValue, value} = this.data.get();
        value = toArray(value);
        e.stopPropagation();

        if (inputValue || value.length) {
            if (value.length) {
                this.fireChange([]);
            }
            this.setOpenState(false, {needFocus: true});
            if (inputValue) {
                this.setInputValue('');
            }
        }
    },

    handleInputChange(e) {
        const {modeConfig, tokenSeparators, inputElement: $input} = this.data.get();
        const val = e.target.value;
        if (
            (modeConfig.multiple || modeConfig.tags)
            && tokenSeparators.length
            && includesSeparators(val, tokenSeparators)
        ) {
            const nextValue = this.getValueByInput(val);
            if (nextValue !== undefined) {
                this.fireChange(nextValue);
            }
            this.setOpenState(false, {needFocus: true});

            $input.value = '';
            this.nextTick(() => {
                this.setState({inputValue: ''});
            });
            return;
        }
        this.setInputValue(val);
        this.setState({open: true});
        if (modeConfig.combobox || this.data.get('isAutoComplete')) {
            this.fireChange([val]);
        }
    },

    handleInputKeyDown(e) {
        const {
            disabled,
            modeConfig,
            defaultActiveFirstOption,
            realOpen,
            open,
            value
        } = this.data.get();
        if (disabled) {
            return;
        }

        // magic code
        const keyCode = e.keyCode;
        if ((modeConfig.multiple || modeConfig.tags) && !e.target.value && keyCode === KeyCode.BACKSPACE) {
            e.preventDefault();
            const val = toArray(value);
            if (val.length) {
                this.removeSelected(val[val.length - 1]);
            }
            return;
        }
        if (keyCode === KeyCode.DOWN) {
            if (!open) {
                this.openIfHasChildren();
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }
        else if (keyCode === KeyCode.ENTER && open) {
            // Aviod trigger form submit when select item
            if (realOpen || !modeConfig.combobox) {
                e.preventDefault();
            }

            // Hard close popup to avoid lock of non option in combobox mode
            if (realOpen && modeConfig.combobox && defaultActiveFirstOption === false) {
                const comboboxTimer = setTimeout(() => {
                    this.setOpenState(false);
                });
                this.data.set('comboboxTimer', comboboxTimer);
            }
        }
        else if (keyCode === KeyCode.ESC) {
            if (open) {
                this.setOpenState(false);
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }

        if (realOpen && this.ref('dropdown')) {
            const $dropdown = this.ref('dropdown');
            if ($dropdown && $dropdown.handleKeyDown) {
                $dropdown.handleKeyDown(e, this.handleBackfill.bind(this));
            }
        }

        this.fire('input-keydown', e);
    },

    handleKeyDown(e) {
        const {open, disabled, inputElement: $input} = this.data.get();
        if (disabled) {
            return;
        }
        const keyCode = e.keyCode;
        if (open && !$input) {
            this.handleInputKeyDown(e);
        }
        else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
            if (!open) {
                this.setOpenState(true);
            }
            e.preventDefault();
        }
        else if (keyCode === KeyCode.SPACE) {
            // Not block space if popup is shown
            if (!open) {
                this.setOpenState(true);
                e.preventDefault();
            }
        }
    },

    handleOuterBlur(e) {
        if (this.data.get('disabled')) {
            e.preventDefault();
            return;
        }
        const blurTimer = window.setTimeout(() => {
            this.data.set('_focused', false);
            const props = this.data.get();
            const {
                inputElement: $input,
                inputValue,
                modeConfig,
                showSearch,
                defaultActiveFirstOption,
                _mouseDown // eslint-disable-line
            } = props;
            let value = props.value;

            if (modeConfig.single && showSearch && inputValue && defaultActiveFirstOption) {
                const firstOption = this.findFirstMenuItem();
                if (firstOption) {
                    this.fireChange(firstOption.value);
                }
            }
            else if ((modeConfig.multiple || modeConfig.tags) && inputValue) {
                if (_mouseDown) {
                    // need update dropmenu when not blur
                    this.setInputValue('');
                }
                else {
                    this.setState({inputValue: ''});
                    if ($input) {
                        $input.value = '';
                    }
                }
                const tmpValue = this.getValueByInput(inputValue);

                if (tmpValue !== undefined) {
                    value = tmpValue;
                    this.fireChange(value);
                }
            }

            // if click the rest space of Select in multiple mode
            if ((modeConfig.multiple || modeConfig.tags) && _mouseDown) {
                this.maybeFocus(true, true);
                this.data.set('_mouseDown', false);
                return;
            }
            this.setOpenState(false);
            this.fire('blur', value);
        }, 10);
        this.data.set('blurTimer', blurTimer);
    },

    handleOuterFocus(e) {
        if (this.data.get('disabled')) {
            e.preventDefault();
            return;
        }
        this.clearBlurTime();
        const {inputElement: $input, modeConfig, _focused, _mouseDown} = this.data.get(); // eslint-disable-line

        if ($input && e.target === this.ref('selection')) {
            return;
        }

        if (modeConfig.single && e.target === $input) {
            return;
        }
        if (_focused) {
            return;
        }
        this.data.set('_focused', true);

        // only effect multiple or tag mode
        if (!(modeConfig.multiple || modeConfig.tags) || !_mouseDown) {
            this.timeoutFocus();
        }
    },

    handlePlaceholderClick() {
        const $input = this.data.get('inputElement');
        if ($input) {
            $input.focus();
        }
    },

    handlePopupFocus() {
        // fix ie scrollbar, focus element again
        this.maybeFocus(true, true);
    },

    handleVisibleChange(open) {
        if (open && !this.data.get('_focused')) {
            this.clearBlurTime();
            this.timeoutFocus();
            this.data.set('_focused', true);
        }
        this.setOpenState(open);
    },

    preventDefaultEvent,

    focus() {
        const modeConfig = this.data.get('modeConfig');
        const $selection = this.ref('selection');
        if (modeConfig.single && $selection) {
            $selection.focus();
        }
        else {
            const $input = this.data.get('inputElement');
            $input && $input.focus();
        }
    },

    blur() {
        const modeConfig = this.data.get('modeConfig');
        const $selection = this.ref('selection');
        if (modeConfig.single && $selection) {
            $selection.blur();
        }
        else {
            const $input = this.data.get('inputElement');
            $input && $input.blur();
        }
    },

    clearBlurTime() {
        const blurTimer = this.data.get('blurTimer');
        if (blurTimer) {
            clearTimeout(blurTimer);
            this.data.set('blurTimer', null);
        }
    },

    clearFocusTime() {
        const focusTimer = this.data.get('focusTimer');
        if (focusTimer) {
            clearTimeout(focusTimer);
            this.data.set('focusTimer', null);
        }
    },

    clearComboboxTime() {
        const comboboxTimer = this.data.get('comboboxTimer');
        if (comboboxTimer) {
            clearTimeout(comboboxTimer);
            this.data.set('comboboxTimer', null);
        }
    },

    timeoutFocus() {
        const focusTimer = this.data.get('focusTimer');
        if (focusTimer) {
            this.clearFocusTime();
        }
        this.data.set('focusTimer', window.setTimeout(() => {
            this.fire('focus');
        }, 10));
    },

    markMouseDown() {
        this.data.set('_mouseDown', true);
    },

    markMouseLeave() {
        this.data.set('_mouseDown', false);
    }
});
