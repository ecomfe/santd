/**
 * @file select/DropdownMenu
 * @author
 */

import san, {DataTypes} from 'san';
import Icon from '../icon';
import Menu from '../menu';
import {
    defaultFilterFn,
    dropdownPrefixCls,
    getMapKey,
    getPropValue,
    prefixCls,
    preventDefaultEvent,
    toTitle
} from './util';

const formatOptionInfo = (option, optionsInfo) => {
    const value = option.data.get('value');
    const info = optionsInfo[getMapKey(value)];
    return {
        content: option.el.innerHTML,
        title: toTitle(info.title),
        value,
        disabled: info.disabled
    };
};

const filterOption = (input, child, context, defaultFilter = defaultFilterFn) => {
    const {backfillValue, value} = context;
    const lastValue = value[value.length - 1];
    if (!input || (lastValue && lastValue === backfillValue)) {
        return true;
    }
    let filterFn = context.filterOption;
    if ('filterOption' in context) {
        if (filterFn === true) {
            filterFn = defaultFilter;
        }
    }
    else {
        filterFn = defaultFilter;
    }

    if (!filterFn) {
        return true;
    }
    else if (typeof filterFn === 'function') {
        return filterFn(input, child, context.optionFilterProp);
    }
    else if (child.data.get('disabled')) {
        return false;
    }
    return true;
};

export default san.defineComponent({
    template: `
        <div id="{{context.ariaId}}"
            style="overflow: auto; transform: translateZ(0);"
            on-mousedown="preventDefaultEvent"
            on-scroll="capture:handlePopupScroll"
        >
            <s-menu
                defaultActiveFirst="{{context.defaultActiveFirstOption}}"
                multiple="{{multiple}}"
                prefixCls="${dropdownPrefixCls}"
                role="listbox"
                selectedKeys="{{selectedKeys}}"
                style="{{context.dropdownMenuStyle}}"
                on-click="handleEvent($event, 'click')"
                on-select="handleEvent($event, 'select')"
                on-deselect="handleEvent($event, 'deselect')"
            >
                <s-menu-group
                    s-if="context.optionGroups.length"
                    s-for="groupInfo in menuGroups"
                    title="{{groupInfo.title}}"
                    prefixCls="${dropdownPrefixCls}-menu"
                >
                    <s-menu-item
                        s-for="item in groupInfo.menuItems"
                        class="${prefixCls}-unselectable"
                        disabled="{{item.disabled}}"
                        value="{{item.value}}"
                        key="{{item.value}}"
                        role="option"
                        rootPrefixCls="${dropdownPrefixCls}-menu"
                    >
                        {{item.content | raw}}
                        <slot s-if="multiple" name="menuItemSelectedIcon"/>
                        <slot s-if="item.empty" name="notFoundContent"/>
                    </s-menu-item>
                </s-menu-group>
                <s-menu-item
                    s-else
                    s-for="item in menuItems"
                    class="${prefixCls}-unselectable"
                    disabled="{{item.disabled}}"
                    value="{{item.value}}"
                    key="{{item.value}}"
                    role="option"
                    rootPrefixCls="${dropdownPrefixCls}-menu"
                >
                    {{item.content | raw}}
                    <slot s-if="multiple" name="menuItemSelectedIcon"/>
                    <slot s-if="item.empty" name="notFoundContent"/>
                </s-menu-item>
            </s-menu>
            <slot/>
        </div>
    `,

    components: {
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-menu-group': Menu.MenuItemGroup
    },

    dataTypes: {
        context: DataTypes.object,
        inputValue: DataTypes.string
    },

    computed: {
        menuGroups() {
            const context = this.data.get('context');
            const {optionGroups, optionsInfo} = context;
            return optionGroups.map(og => {
                const title = og.group.data.get('label');
                const menuItems = og.options.map(option => formatOptionInfo(option, optionsInfo));
                return {
                    title,
                    menuItems
                };
            });
        },

        menuItems() {
            const context = this.data.get('context');
            const {options, optionsInfo, modeConfig, notFoundContent, value} = context;
            const inputValue = this.data.get('inputValue');
            let menuItems = options
                .filter(option => filterOption(inputValue, option, context))
                .map(option => formatOptionInfo(option, optionsInfo));

            if (modeConfig.tags) {
                const childrenKeys = menuItems.map(item => item.value);
                let inputValues = value.filter(val => childrenKeys.indexOf(val) < 0);
                inputValues.sort((val1, val2) => val1.length - val2.length);

                inputValues.forEach(val => {
                    menuItems.push({
                        content: val,
                        value: val
                    });
                });

                if (inputValue && menuItems.map(optionInfo => optionInfo.value).indexOf(inputValue) < 0) {
                    menuItems.unshift({
                        content: inputValue,
                        value: inputValue
                    });
                }
            }

            if (!menuItems.length && (notFoundContent || notFoundContent === undefined)) {
                return [{
                    content: '',
                    disabled: true,
                    empty: true,
                    value: 'NOT_FOUND'
                }];
            }

            return menuItems;
        },

        multiple() {
            const mode = this.data.get('context.modeConfig');
            return mode && (mode.multiple || mode.tags);
        },

        selectedKeys() {
            let selectedKeys = [];
            const value = this.data.get('context.value');
            if (value === null || value === undefined) {
                return [];
            }

            const options = this.data.get('context.options');
            options.forEach(item => {
                const itemValue = item.data.get('value');
                if (value.indexOf(itemValue) > -1) {
                    selectedKeys.push(itemValue);
                }
            });

            // add for tags
            const modeConfig = this.data.get('context.modeConfig');
            if (modeConfig.tags) {
                value.forEach(val => {
                    if (selectedKeys.indexOf(val) < 0) {
                        selectedKeys.push(val);
                    }
                });
            }

            return selectedKeys;
        }
    },

    initData() {
        return {
            context: {},
            inputValue: ''
        };
    },

    handlePopupScroll(e) {
        this.owner.fire('popup-scroll', event);
    },

    handleEvent(e, type) {
        const multiple = this.data.get('multiple');

        if (multiple) {
            if (type === 'select') {
                this.handleMenuSelect(e);
            }
            else if (type === 'deselect') {
                this.handleMenuDeselect(e);
            }
        }
        else if (type === 'select') {
            this.handleMenuSelect(e);
        }
    },

    handleMenuSelect({item}) {
        if (!item) {
            return;
        }

        const context = this.data.get('context');
        let skipTrigger = false;
        let {
            autoClearSearchValue,
            backfillValue,
            modeConfig,
            value
        } = context;
        const selectedValue = item.data.get('value') || item.data.get('key');
        const lastValue = value[value.length - 1];
        const optionLabelProp = this.owner.getOptionLabelProp(context);

        if (modeConfig.multiple || modeConfig.tags) {
            if (value.indexOf(selectedValue) > -1) {
                skipTrigger = true;
            }
            else {
                value = [...value, selectedValue];
            }
        }
        else {
            if (
                !modeConfig.combobox
                && lastValue !== undefined
                && lastValue === selectedValue
                && selectedValue !== backfillValue
            ) {
                skipTrigger = true;
            }
            else {
                value = [selectedValue];
            }

            this.owner.setOpenState(false, {
                needFocus: true,
                fireSearch: false
            });
        }

        if (!skipTrigger) {
            this.owner.fireChange(value);
        }
        this.owner.fireSelect(selectedValue);

        if (!skipTrigger) {
            const inputValue = modeConfig.combobox ? getPropValue(item, optionLabelProp) : '';

            if (autoClearSearchValue) {
                this.owner.setInputValue(inputValue, false);
            }
        }
    },

    handleMenuDeselect({item}) {
        const value = item.data.get('value');
        this.owner.removeSelected(value);

        const autoClearSearchValue = this.data.get('context.autoClearSearchValue');
        if (autoClearSearchValue) {
            this.owner.setInputValue('');
        }
    },

    preventDefaultEvent
});
