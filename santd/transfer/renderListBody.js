/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import ListItem from './listItem';


export default san.defineComponent({
        handleItemSelect(item) {
            const selectedKeys = this.data.get('selectedKeys');
            const checked = selectedKeys.indexOf(item.key) >= 0;
            this.fire('itemSelect', {selectedKey: item.key, checked: !checked});
        },
        handleScroll(e) {
            this.fire('scroll', e);
        },
        components: {
            's-listitem': ListItem
        },
        template: `
            <ul class="{{prefixCls}}-content" on-scroll="handleScroll">
                <s-listitem
                    s-for="item in filteredRenderItems"
                    disabled="{{item.item.disabled}}"
                    key="{{item.key}}"
                    item="{{item.item}}"
                    renderedText="{{item.renderedText}}"
                    renderedEl="{{item.renderedEl}}"
                    on-click="handleItemSelect"
                    prefixCls="{{prefixCls}}"
                    selectedKeys="{{selectedKeys}}"
                />
            </ul>
        `
    });
/*
export default function (prop) {
    const prefixCls = prop.data.get('prefixCls');
    return san.defineComponent({
        initData() {
            return {
                prefixCls
            };
        },
        handleItemSelect(item) {
            const selectedKeys = this.data.get('selectedKeys');
            const checked = selectedKeys.indexOf(item.key) >= 0;
            this.fire('itemSelect', {selectedKey: item.key, checked: !checked});
        },
        handleScroll(e) {
            this.fire('scroll', e);
        },
        components: {
            's-listitem': ListItem
        },
        template: `
            <ul class="{{prefixCls}}-content" on-scroll="handleScroll">
                <s-listitem
                    s-for="item in filteredRenderItems"
                    disabled="{{item.item.disabled}}"
                    key="{{item.key}}"
                    item="{{item.item}}"
                    renderedText="{{item.renderedText}}"
                    renderedEl="{{item.renderedEl}}"
                    on-click="handleItemSelect"
                    prefixCls="{{prefixCls}}"
                    selectedKeys="{{selectedKeys}}"
                />
            </ul>
        `
    });
}*/
