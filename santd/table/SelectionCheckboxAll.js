/**
 * @file santd Table SelectionCheckboxAll
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import Checkbox from 'santd/checkbox';
import Menu from 'santd/menu';
import DropDown from 'santd/dropdown';
import Icon from 'santd/icon';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string
    },
    initData() {
        return {
            selectionDirty: false
        };
    },
    created() {
        this.data.set('instance', this);
    },
    computed: {
        defaultSelections() {
            return this.data.get('hideDefaultSelections')
                ? []
                : [{
                    key: 'all',
                    text: this.data.get('locale.selectAll'),
                    onSelect() {}
                }, {
                    key: 'invert',
                    text: this.data.get('locale.selectInvert'),
                    onSelect() {}
                }];
        },
        selectionPrefixCls() {
            const prefixCls = this.data.get('prefixCls');
            return classNames(`${prefixCls}-selection`);
        },
        checked() {
            const data = this.data.get('data');
            const parent = this.data.get('parent');
            const instance = this.data.get('instance');
            const selectionDirty = this.data.get('selectionDirty');
            const refresh = this.data.get('refresh');
            let checked;
            if (!data.length) {
                checked = false;
            }
            else {
                checked = selectionDirty && refresh
                    ? instance && instance.checkSelection(data, 'every', false)
                    : instance && instance.checkSelection(data, 'every', false)
                        || instance && instance.checkSelection(data, 'every', true);
            }
            return checked;
        },
        indeterminate() {
            const data = this.data.get('data');
            const parent = this.data.get('parent');
            const instance = this.data.get('instance');
            const selectionDirty = this.data.get('selectionDirty');
            const refresh = this.data.get('refresh');
            let indeterminate;
            if (!data.length) {
                indeterminate = false;
            }
            else {
                indeterminate = selectionDirty && refresh
                    ? instance && instance.checkSelection(data, 'some', false)
                        && instance && !instance.checkSelection(data, 'every', false)
                    : (instance && instance.checkSelection(data, 'some', false)
                        && instance && !instance.checkSelection(data, 'every', false))
                        || (instance && instance.checkSelection(data, 'some', true)
                            && instance && !instance.checkSelection(data, 'every', true));
            }
            return indeterminate;
        },
        newSelections() {
            const selections = this.data.get('selections');
            const defaultSelections = this.data.get('defaultSelections');
            return selections
                ? Array.isArray(selections)
                    ? defaultSelections.concat(selections)
                    : defaultSelections
                : [];
        },
        hasCustomSelections() {
            const newSelections = this.data.get('newSelections');
            return newSelections.length > 0;
        },
        customSelectionsCls() {
            const hasCustomSelections = this.data.get('hasCustomSelections');
            const prefixCls = this.data.get('prefixCls');
            return classNames({
                [`${prefixCls}-selection-select-all-custom`]: hasCustomSelections
            });
        }
    },
    checkSelection(data, type, byDefaultChecked) {
        const parent = this.data.get('parent');
        if (type === 'every' || type === 'some') {
            return byDefaultChecked
                ? data[type]((item, i) => parent.getCheckboxPropsByItem(item, i).defaultChecked)
                : data[type](
                    (item, i) => parent.data.get('selectedRowKeys').indexOf(parent.getRecordKey(item, i)) >= 0,
                );
        }
        return false;
    },
    components: {
        's-checkbox': Checkbox,
        's-menu': Menu,
        's-dropdown': DropDown,
        's-dropdownmenu': DropDown.DropDownMenu,
        's-dropdownitem': DropDown.DropDownItem,
        's-icon': Icon
    },
    handleSelectAllChange(e) {
        const checked = e.target.checked;
        this.fire('select', {
            selectionKey: checked ? 'all' : 'removeAll',
            index: 0,
            onSelectFunc: null
        });
    },
    handleDropDownClick(key, index, onSelect) {
        this.fire('select', {
            selectionKey: key,
            index: index,
            onSelectFunc: onSelect
        });
    },
    template: `
        <div class="{{selectionPrefixCls}}">
            <s-checkbox
                class="{{customSelectionsCls}}"
                checked="{{checked}}"
                indeterminate="{{indeterminate}}"
                on-change="handleSelectAllChange($event)"
                disabled="{{disabled}}"
            ></s-checkbox>
            <!--<s-dropdown
                s-if="hasCustomSelections"
                trigger="click"
                on-click="handleDropDownClick"
            >
                <div class="{{prefixCls}}-selection-down">
                    <s-icon type="down"></s-icon>
                </div>
                <s-dropdownmenu slot="list">
                    <s-dropdownitem
                        s-for="selection, index in newSelections"
                        on-click="handleDropDownClick(selection.key, index, selection.onSelect)"
                    >{{selection.text}}</s-dropdownitem>
                </s-dropdownmenu>
            </s-dropdown>-->
        </div>
    `
});
