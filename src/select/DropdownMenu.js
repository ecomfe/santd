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
import KeyCode from '../core/util/keyCode';

const formatOptionInfo = (option, optionsInfo) => {
    const value = option.data.get('value');
    const info = optionsInfo[getMapKey(value)];
    return {
        content: option.el.innerHTML.trim(),
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
            on-mouseleave="handleMouseLeave"
            on-scroll="capture:handlePopupScroll"
        >
            <s-menu
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
                        class="{{item | getItemClass(activeKey)}}"
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
                    class="{{item | getItemClass(activeKey)}}"
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
                let inputValues = value.filter(val => childrenKeys.indexOf(val) < 0 && val.indexOf(inputValue) >= 0);
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

    filters: {
        getItemClass(item, activeKey) {
            let klass = `${prefixCls}-unselectable`;

            if (item.value === activeKey) {
                klass += ` ${dropdownPrefixCls}-menu-item-active`;
            }
            return klass;
        }
    },

    messages: {
        'santd_menu_itemMouseEnter'({value}) {
            this.data.set('activeKey', value.key);
        }
    },

    initData() {
        return {
            activeKey: '',
            context: {},
            inputValue: ''
        };
    },

    inited() {
        this.resetActiveKey();

        this.owner.watch('realOpen', open => {
            if (open) {
                this.resetActiveKey();
            }
        });

        this.owner.watch('inputValue', value => {
            this.data.set('activeKey', value);
        });
    },

    getActiveItem() {
        const activeKey = this.data.get('activeKey');
        if (!activeKey) {
            return null;
        }

        const menuItems = this.data.get('menuItems')
            .filter(item => !item.disabled && item.value === activeKey);

        return menuItems.length ? menuItems[0] : null;
    },

    resetActiveKey() {
        let activeKey = '';
        const {menuItems, selectedKeys} = this.data.get();

        if (selectedKeys.length) {
            activeKey = selectedKeys[0];
        }
        else if (this.owner.data.get('defaultActiveFirstOption')) {
            const tmpArr = menuItems.filter(item => !item.disabled);

            if (tmpArr.length) {
                activeKey = tmpArr[0].value;
            }
        }

        this.data.set('activeKey', activeKey);
    },

    // direction: -1 UP, 1 DOWN
    updateActiveKey(activeItem = null, direction = 0) {
        let activeKey = '';
        const menuItems = this.data.get('menuItems')
            .filter(item => !item.disabled);

        if (menuItems.length) {
            if (!activeItem) {
                activeKey = menuItems[0].value;
            }
            else if (direction) {
                let max = menuItems.length - 1;
                let index = menuItems.findIndex(item => item.value === activeItem.value);

                if (index >= 0) {
                    index += direction;

                    if (index < 0) {
                        index = max;
                    }
                    else if (index > max) {
                        index = 0;
                    }

                    activeKey = menuItems[index].value;
                }
            }

            this.data.set('activeKey', activeKey);
        }
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

    handleMouseLeave() {
        // this.data.set('activeKey', '');
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
        const selectedValue = item.value || item.data.get('value') || item.data.get('key');
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
            else {
                this.owner.setInputValue(selectedValue, true);
            }
        }
    },

    handleMenuDeselect({item}) {
        const value = item.value || item.data.get('value');
        this.owner.removeSelected(value);

        const autoClearSearchValue = this.data.get('context.autoClearSearchValue');
        if (autoClearSearchValue) {
            this.owner.setInputValue('');
        }
    },

    handleKeyDown(e, callback) {
        const keyCode = e.keyCode;
        let activeItem = this.getActiveItem();

        if (keyCode === KeyCode.ENTER) {
            if (activeItem) {
                const modeConfig = this.data.get('context.modeConfig');
                if (modeConfig.single) {
                    this.handleMenuSelect({item: activeItem});
                }
                else if (modeConfig.tags || modeConfig.multiple) {
                    const selectedKeys = this.data.get('selectedKeys');

                    if (selectedKeys.indexOf(activeItem.value) >= 0) {
                        this.handleMenuDeselect({item: activeItem});
                    }
                    else {
                        this.handleMenuSelect({item: activeItem});
                    }
                }
            }
            return;
        }

        if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
            this.updateActiveKey(activeItem, keyCode === KeyCode.UP ? -1 : 1);
            e.preventDefault();

            if (typeof callback === 'function') {
                callback(activeItem);
            }
        }
    },

    preventDefaultEvent
});
