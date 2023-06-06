/**
 * @file select/Select
 * @author
 */
import Base from 'santd/base';
import Empty from '../empty';
import Icon from '../icon';
import Trigger from '../core/trigger';
import KeyCode from '../core/util/keyCode';
import {PlacementMap} from '../tooltip/interface';
import DropdownMenu from './DropdownMenu';
import Selector from './Selector';
import {
    dropdownPrefixCls,
    emptyPrefixCls,
    includesSeparators,
    generateUUID,
    getMapKey,
    prefixCls,
    preventDefaultEvent,
    splitBySeparators,
    toArray,
    isValueArray,
    isValueString
} from './util';

import {
    SelectProps as Props,
    SelectState as State,
    SelectComputed as Computed,
    RawValueType,
    TOption,
    TOptions,
    TOptGroup,
    TOptionGroups,
    TOptionsInfo,
    SelInstanceProps,
    TDeSelectEventItem,
    TMenuItem
} from './interface';
import {TOption as ComponentOption} from './Option';
import {TOptGroup as ComponentOptGroup} from './OptGroup';


interface SizeMap {
    large: 'lg';
    small: 'sm';
    default?: string;
}

interface Messages {
    'select:updateOptions': (this: Select) => void;
    'select:setInputElement': (this: Select, payload: {value: Props['inputElement']}) => void;
    'select:inputChange': (this: Select, paylod: {value: InputEvent}) => void;
    'select:inputKeyDown': (this: Select, paylod: {value: KeyboardEvent}) => void;
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
const sizeMap: SizeMap = {
    large: 'lg',
    small: 'sm'
};
const BUILT_IN_PLACEMENTS: PlacementMap = {
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

export default class Select extends Base<State, Props, Computed> {
    static template = `
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
    `;

    static components = {
        's-empty': Empty,
        's-icon': Icon,
        's-trigger': Trigger,
        's-dropdown-render': DropdownMenu,
        's-selector': Selector
    };

    static computed: Computed = {
        modeConfig(this: Select) {
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

        /* eslint-disable complexity */
        wrapClass(this: Select) {
        /* eslint-enable complexity */
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

        selectionClass(this: Select) {
            const mode = this.data.get('mode');

            return [
                `${prefixCls}-selection`,
                `${prefixCls}-selection--${(mode && mode !== 'default') ? 'multiple' : 'single'}`
            ];
        },

        selectionAttrs(this: Select) {
            const data = this.data;
            const modeConfig = data.get('modeConfig');
            return {
                'role': 'combobox',
                'aria-autocomplete': 'list',
                'aria-haspopup': true,
                'aria-controls': data.get('context.ariaId'),
                'aria-expanded': !!data.get('realOpen'),
                [(modeConfig.single && 'tabindex') as 'tabindex']: data.get('disabled') ? -1 : 0
            };
        },

        renderClear(this: Select) {
            const allowClear = this.data.get('allowClear');
            const value = this.data.get('value');
            // if (allowClear && value && value.length)
            if (allowClear && (isValueArray(value) || isValueString(value)) && value.length) {
                return true;
            }
            return false;
        },

        renderArrow(this: Select) {
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

        hideAction(this: Select) {
            const data = this.data;
            const disabled = data.get('disabled');
            if (disabled) {
                return [];
            }

            const modeConfig = data.get('modeConfig');
            const showSearch = data.get('showSearch');
            return !showSearch && modeConfig.single ? ['click'] : ['blur'];
        },

        popupClassName(this: Select) {
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

        popupStyle(this: Select) {
            const data = this.data;
            const dropdownMatchSelectWidth = data.get('dropdownMatchSelectWidth');
            const dropdownStyle = data.get('dropdownStyle') || {};
            const dropdownWidth = data.get('dropdownWidth');
            const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
            const popupStyle = {...dropdownStyle};
            if (dropdownWidth) {
                popupStyle[widthProp] = `${dropdownWidth}px`;
            }
            return popupStyle;
        },

        realOpen(this: Select) {
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
    };

    static messages: Messages = {
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
    };

    /* eslint-disable @typescript-eslint/naming-convention */
    static Option: ComponentOption;
    static OptGroup: ComponentOptGroup;
    /* eslint-enable @typescript-eslint/naming-convention */

    preventDefaultEvent = preventDefaultEvent;
    props!: SelInstanceProps;


    initData(): State {
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
            optionFilterProp: 'children',
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
    }

    inited() {
        this.watch('value', value => {
            this.setState({value});
        });
    }

    created() {
        this.props = this.data.get('');
        const props = this.props;

        this.setState({
            value: this.getValueFromProps(true),
            open: !!props.defaultOpen,
            backfillValue: '',
            ariaId: generateUUID()
        });

        this.setDropdownWidth();
    }

    attached() {
        this.setState({
            inputValue: '',
            ready: true
        });

        const props = this.props;
        if (props.autoFocus || props.open) {
            this.focus();
        }
    }

    updated() {
        this.setDropdownWidth();
        this.forcePopupAlign();
    }

    detached() {
        this.clearFocusTime();
        this.clearBlurTime();
        this.clearComboboxTime();
    }

    updateOptions() {
        const {options, optionGroups} = this.getOptionsFromChildren(this.children);
        const optionsInfo = this.getOptionsInfo(options);

        this.setState({
            options,
            optionGroups,
            optionsInfo
        });
    }

    findFirstMenuItem() {
        const items = this.ref('dropdown').data.get('menuItems');
        if (items.length) {
            return items[0];
        }
        return null;
    }

    getOptionsFromChildren(
        children: any[] = [],
        options: TOptions = [],
        optionGroups: TOptionGroups = [],
        currGroup: TOptions = [],
        hasGroup: boolean = false
    ) {
        children.forEach(child => {
            if (child) {
                if (child.isSelectOption) {
                    options.push(child);
                    hasGroup && currGroup.push(child as TOption);
                }
                else if (child.isSelectOptionGroup) {
                    /* eslint-disable no-param-reassign */
                    currGroup = [];
                    /* eslint-enable no-param-reassign */
                    this.getOptionsFromChildren(child.children || [], options, optionGroups, currGroup, true);
                    optionGroups.push({
                        group: child as TOptGroup,
                        options: currGroup
                    });
                }
                else if (child.children && child.children.length) {
                    this.getOptionsFromChildren(child.children, options, optionGroups, currGroup, hasGroup);
                }
            }
        });
        return {options, optionGroups};
    }

    getInputValueForCombobox(props: any, optionsInfo: TOptionsInfo, useDefaultValue?: boolean) {
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
    }

    getLabelFromOption(option: TOption) {
        const optionLabelProp = this.getOptionLabelProp(this.props);
        if (optionLabelProp === 'children') {
            return option.el ? (option.el.textContent as string).trim() : '';
        }
        return option.data.get(optionLabelProp);
    }

    getOptionInfo(option: TOption) {
        const {value, title, disabled} = option.data.get();
        const label = this.getLabelFromOption(option);
        return {
            disabled,
            label,
            option,
            title,
            value
        };
    }

    getOptionsInfo(options: TOptions = []) {
        const optionsInfo: TOptionsInfo = {};
        options.forEach(option => {
            const key = getMapKey(option.data.get('value') as RawValueType);
            optionsInfo[key] = this.getOptionInfo(option);
        });
        return optionsInfo;
    }

    getOptionLabelProp(props: Partial<SelInstanceProps>) {
        const {optionLabelProp, modeConfig} = props;
        return optionLabelProp || (modeConfig?.combobox ? 'value' : 'children');
    }

    getValueByInput(str: string) {
        const {tokenSeparators = []} = this.data.get();
        let nextValue = this.data.get('value');
        let hasNewValue = false;
        splitBySeparators(str, tokenSeparators).forEach(label => {
            if (isValueArray(nextValue) && !nextValue.includes(label)) {
                nextValue = [...nextValue, label];
                hasNewValue = true;
                this.fireSelect(label);
            }
        });
        return hasNewValue ? nextValue : undefined;
    }

    getValueFromProps(useDefaultValue?: boolean) {
        let value: any[] = [];
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
        return value as RawValueType[];
    }

    setDropdownWidth() {
        const width = (this.el as HTMLElement).offsetWidth;
        if (width !== this.data.get('dropdownWidth')) {
            this.setState({dropdownWidth: width});
        }
    }

    setInputValue(inputValue: string, fireSearch: boolean = true) {
        const preInputValue = this.data.get('inputValue');
        if (inputValue !== preInputValue) {
            this.setState({inputValue});
            fireSearch && this.fire('search', inputValue);
        }
    }

    setOpenState(open: boolean, config: {needFocus?: boolean, fireSearch?: boolean} = {}) {
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
        if (!open && props.modeConfig?.single && props.showSearch && !isAutoComplete) {
            this.setInputValue('', fireSearch);
        }
        if (!open) {
            this.maybeFocus(open, !!needFocus);
        }
        this.setState({
            ...nextState
        });
        this.nextTick(() => {
            if (open) {
                this.maybeFocus(open, !!needFocus);
            }
        });
    }

    setState(props: Record<string, any>, config?: {silent?: boolean, force?: boolean}) {
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
    }

    forcePopupAlign() {
        if (!this.data.get('open')) {
            return;
        }
        this.nextTick(() => {
            const trigger = this.ref('trigger') as Trigger;
            trigger && trigger.refresh();
        });
    }

    maybeFocus(open: boolean, needFocus: boolean) {
        if (needFocus || open) {
            const $input = this.data.get('inputElement');
            const $selection = this.ref('selection') as unknown as HTMLDivElement;
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
    }

    openIfHasChildren() {
        const props = this.props;

        if (props.options.length || props.modeConfig.single) {
            this.setOpenState(true);
        }
    }

    removeSelected(selectedKey: RawValueType, e?: Event) {
        // Do not trigger Trigger popup
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        const {value: oldValue, modeConfig, labelInValue} = this.data.get();

        let value: RawValueType[] = [];

        if (isValueArray(oldValue)) {
            value = oldValue.filter(singleValue => singleValue !== selectedKey);
        }

        if (modeConfig?.multiple || modeConfig?.tags) {
            let event: TDeSelectEventItem = selectedKey;
            if (labelInValue) {
                event = {
                    key: selectedKey,
                    label: selectedKey // this.getLabelBySingleValue(selectedKey)
                };
            }
            this.fire('deselect', event);
        }
        this.fireChange(value);
    }

    fireChange(value: Props['value']) {
        this.setState({value});
        this.fire('change', value);
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
    }

    fireSelect(value: string) {
        this.fire('select', value);
    }

    fireEvent(e: MouseEvent, type: 'mouseenter' | 'mouseleave') {
        this.fire(type, e);
    }

    handleArrowClick(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        const {disabled, open} = this.data.get();
        if (!disabled) {
            this.setOpenState(!open, {needFocus: !open});
        }
    }

    handleBackfill(item: TMenuItem | null) {
        const {modeConfig, backfill} = this.props;
        if (!backfill || !(modeConfig.single || modeConfig.combobox)) {
            return;
        }

        const key = item?.value as string;

        if (modeConfig.combobox || modeConfig.single) {
            this.setInputValue(key, false);
        }

        this.setState({
            value: [key],
            backfillValue: key
        });
    }

    handleClearSelection(e: MouseEvent) {
        if (this.data.get('disabled')) {
            return;
        }

        this.fire('clear');

        const inputValue = this.data.get('inputValue');
        let value = this.data.get('value');
        value = toArray(value) as RawValueType[];
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
    }

    handleInputChange(e: InputEvent) {
        const {modeConfig, tokenSeparators, inputElement: $input} = this.data.get();
        const val = (e.target as HTMLInputElement).value;
        if (
            (modeConfig?.multiple || modeConfig?.tags)
            && tokenSeparators?.length
            && includesSeparators(val, tokenSeparators)
        ) {
            const nextValue = this.getValueByInput(val);
            if (nextValue !== undefined) {
                this.fireChange(nextValue);
            }
            this.setOpenState(false, {needFocus: true});

            $input && ($input.value = '');
            this.nextTick(() => {
                this.setState({inputValue: ''});
            });
            return;
        }
        this.setInputValue(val);
        this.setState({open: true});
        if (modeConfig?.combobox || this.data.get('isAutoComplete')) {
            this.fireChange([val]);
        }
    }

    /* eslint-disable complexity,max-statements */
    handleInputKeyDown(e: KeyboardEvent) {
    /* eslint-enable complexity,max-statements */
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

        this.fire('input-keydown', e);
        // magic code
        const keyCode = e.keyCode;
        if ((modeConfig?.multiple || modeConfig?.tags)
            && !(e.target as HTMLInputElement).value && keyCode === KeyCode.BACKSPACE
        ) {
            e.preventDefault();
            const val = toArray(value) as RawValueType[];
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
            if (realOpen || !modeConfig?.combobox) {
                e.preventDefault();
            }

            // Hard close popup to avoid lock of non option in combobox mode
            if (realOpen && modeConfig?.combobox && defaultActiveFirstOption === false) {
                const comboboxTimer = window.setTimeout(() => {
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
            const $dropdown = this.ref('dropdown') as DropdownMenu;
            if ($dropdown && $dropdown.handleKeyDown) {
                $dropdown.handleKeyDown(e, this.handleBackfill.bind(this));
            }
        }
    }

    handleKeyDown(e: KeyboardEvent) {
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
    }

    handleOuterBlur(e: Event) {
        if (this.data.get('disabled')) {
            e.preventDefault();
            return;
        }
        /* eslint-disable complexity */
        const blurTimer = window.setTimeout(() => {
        /* eslint-enable complexity */
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

            if (modeConfig?.single && showSearch && inputValue && defaultActiveFirstOption) {
                const firstOption = this.findFirstMenuItem();
                if (firstOption) {
                    this.fireChange(firstOption.value);
                }
            }
            else if ((modeConfig?.multiple || modeConfig?.tags) && inputValue) {
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
            if ((modeConfig?.multiple || modeConfig?.tags) && _mouseDown) {
                this.maybeFocus(true, true);
                this.data.set('_mouseDown', false);
                return;
            }
            this.setOpenState(false);
            this.fire('blur', value);
        }, 10);
        this.data.set('blurTimer', blurTimer);
    }

    handleOuterFocus(e: Event) {
        if (this.data.get('disabled')) {
            e.preventDefault();
            return;
        }
        this.clearBlurTime();
        const {inputElement: $input, modeConfig, _focused, _mouseDown} = this.data.get(); // eslint-disable-line

        if ($input && (e.target as HTMLElement) === this.ref('selection') as unknown as HTMLElement) {
            return;
        }

        if (modeConfig?.single && e.target === $input) {
            return;
        }
        if (_focused) {
            return;
        }
        this.data.set('_focused', true);

        // only effect multiple or tag mode
        if (!(modeConfig?.multiple || modeConfig?.tags) || !_mouseDown) {
            this.timeoutFocus();
        }
    }

    handlePlaceholderClick() {
        const $input = this.data.get('inputElement');
        if ($input) {
            $input.focus();
        }
    }

    handlePopupFocus() {
        // fix ie scrollbar, focus element again
        this.maybeFocus(true, true);
    }

    handleVisibleChange(open: boolean) {
        if (open && !this.data.get('_focused')) {
            this.clearBlurTime();
            this.timeoutFocus();
            this.data.set('_focused', true);
        }
        this.setOpenState(open);
    }

    focus() {
        const modeConfig = this.data.get('modeConfig');
        const $selection = this.ref('selection') as unknown as HTMLElement;
        if (modeConfig.single && $selection) {
            $selection.focus();
        }
        else {
            const $input = this.data.get('inputElement');
            $input && $input.focus();
        }
    }

    blur() {
        const modeConfig = this.data.get('modeConfig');
        const $selection = this.ref('selection') as unknown as HTMLElement;
        if (modeConfig.single && $selection) {
            $selection.blur();
        }
        else {
            const $input = this.data.get('inputElement');
            $input && $input.blur();
        }
    }

    clearBlurTime() {
        const blurTimer = this.data.get('blurTimer');
        if (blurTimer) {
            clearTimeout(blurTimer);
            this.data.set('blurTimer', null);
        }
    }

    clearFocusTime() {
        const focusTimer = this.data.get('focusTimer');
        if (focusTimer) {
            clearTimeout(focusTimer);
            this.data.set('focusTimer', null);
        }
    }

    clearComboboxTime() {
        const comboboxTimer = this.data.get('comboboxTimer');
        if (comboboxTimer) {
            clearTimeout(comboboxTimer);
            this.data.set('comboboxTimer', null);
        }
    }

    timeoutFocus() {
        const focusTimer = this.data.get('focusTimer');
        if (focusTimer) {
            this.clearFocusTime();
        }
        this.data.set('focusTimer', window.setTimeout(() => {
            this.fire('focus');
        }, 10));
    }

    markMouseDown() {
        this.data.set('_mouseDown', true);
    }

    markMouseLeave() {
        this.data.set('_mouseDown', false);
    }
}
