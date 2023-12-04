/**
 * @file select/MultipleSelector
 * @author
 */

import Base from 'santd/base';
import {
    getMapKey,
    memoize,
    prefixCls,
    preventDefaultEvent as preventDefault,
    toTitle,
    isValueArray
} from './util';
import {
    MultipleSelectorState as State,
    MultipleSelectorProps as Props,
    MultipleSelectorComputed as Computed,
    TSelectItem,
    TDeSelectEventItem,
    RawValueType
} from './interface';

const getOptionsInfoWithMemory = memoize();

export default class MultipleSelector extends Base<State, Props, Computed> {
    static template = `
        <ul>
            <li s-for="item in selectedItems"
                class="{{item.klass}}"
                unselectable="on"
                role="presentation"
                title="{{item.title}}"
                on-mousedown="preventDefaultEvent"
            >
                <div class="${prefixCls}-selection__choice__content">{{item.content}}</div>
                <span
                    s-if="!item.disabled"
                    class="${prefixCls}-selection__choice__remove"
                    on-click="handleRemoveSelected($event, item)"
                >
                    <slot name="removeIcon">
                        <i class="${prefixCls}-selection__choice__remove-icon">×</i>
                    </slot>
                </span>
            </li>
            <li class="${prefixCls}-search ${prefixCls}-search--inline">
                <slot name="input"/>
            </li>
        </ul>
    `

    static computed: Computed = {
        selectedItems(this: MultipleSelector) {
            const {
                maxTagCount,
                maxTagPlaceholder,
                maxTagTextLength,
                optionsInfo = {},
                value
            } = this.data.get('context');
            const klass = [
                `${prefixCls}-unselectable`,
                `${prefixCls}-selection__choice`
            ];
            const klassDisabled = `${prefixCls}-selection__choice__disabled`;
            let selectedValues = value || [];
            let maxTagPlaceholderItem;

            if (maxTagCount !== undefined && (isValueArray(value) && value.length > maxTagCount)) {
                if (isValueArray(selectedValues)) {
                    selectedValues = selectedValues.slice(0, maxTagCount);
                }
                const omittedValues = value?.slice(maxTagCount, value.length);
                let content = `+ ${value?.length - maxTagCount} ...`;

                if (maxTagPlaceholder) {
                    content = typeof maxTagPlaceholder === 'function'
                        ? maxTagPlaceholder(omittedValues as RawValueType[])
                        : maxTagPlaceholder;
                }
                maxTagPlaceholderItem = {
                    klass,
                    content,
                    title: toTitle(content),
                    value: 'placeholder',
                    disabled: true
                };
            }

            let selectedItems: TSelectItem[] = [];

            if (isValueArray(selectedValues)) {
                selectedItems = selectedValues.map(val => {
                    let info = getOptionsInfoWithMemory(optionsInfo)[getMapKey(val)] || {label: val};
                    let content = info.label;
                    const title = toTitle(info.title || content);

                    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
                        content = `${content.slice(0, maxTagTextLength)}...`;
                    }

                    return {
                        klass: info.disabled ? klass.concat(klassDisabled) : klass,
                        content,
                        title,
                        value: val,
                        disabled: info.disabled
                    };
                });
            }

            maxTagPlaceholderItem && selectedItems.push(maxTagPlaceholderItem);

            return selectedItems;
        }
    }

    initData(): State {
        return {
            context: {}
        };
    }

    handleRemoveSelected(e: MouseEvent, item: TSelectItem) {
        const props = this.data.get('context');

        if (props.disabled || item.disabled) {
            return;
        }

        // Do not trigger Trigger popup
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        let selectedKey = item.value;
        const {value: oldValue, modeConfig} = props;
        let value: RawValueType[] = [];
        if (isValueArray(oldValue)) {
            value = oldValue?.filter(singleValue => singleValue !== selectedKey);
        }

        if (modeConfig?.multiple || modeConfig?.tags) {
            let event: TDeSelectEventItem = selectedKey;
            if (props.labelInValue) {
                event = {
                    key: selectedKey,
                    label: selectedKey // this.getLabelBySingleValue(selectedKey)
                };
            }

            this.fire('deselect', event);
        }
        this.fire('change', value);
    }

    preventDefaultEvent = preventDefault
};
