/*
* @file createMenu 将数据创建成Menu组件
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import Menu from 'santd/menu';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Icon from 'santd/icon';
const pagin = classCreator('select-dropdown');
const prefixCls = pagin();

const loadingComponent = san.defineComponent({
    attached() {
        const notFound = this.data.get('allData.notFoundContent');
        if (typeof notFound === 'function') {
            this.el.innerHTML = '';
            const Component = notFound();
            const renderer = new Component();
            renderer.attach(this.el);
        }
    },
    template: `
        <span>
            {{allData.notFoundContent || 'Not Found'}}
        </span>
    `
});

export default san.defineComponent({
    components: {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-menu-group': Menu.MenuItemGroup,
        's-loading': loadingComponent,
        's-icon': Icon
    },
    computed: {
        optionsInfo() {
            let options = [];
            // query时根据查询结果找到的options集合
            let innerOptions = this.data.get('allData._innerOptions');
            for (let opt in innerOptions) {
                const itemData = innerOptions[opt];
                if (!itemData.visible) {
                    continue;
                }
                options.push({
                    value: itemData.value,
                    label: itemData.label,
                    disabled: itemData.disabled || false,
                    className: itemData.className
                });
            }
            return [].concat(options);
        },
        selectedKeys() {
            const selectedKeys = this.data.get('allData._value');
            return selectedKeys ? selectedKeys.map(key => {
                return key.value;
            }) : [];
        }

    },
    compiled() {
        const dropdownRender = this.getTargetData('dropdownRender');
        this.components.droprender = dropdownRender;
    },
    initData() {
        return {
            cls: 'san-select-dropdown'
        };
    },
    inited() {
        // 获取到s-trigger上的allData数据
        this.data.set('allData', this.getTargetData('allData'));
    },
    getTargetData(attr) {
        let parent = this.parentComponent;
        let hasTar = parent.data.get(attr);
        while (parent && !hasTar) {
            parent = parent.parentComponent;
            hasTar = parent && parent.data.get(attr);
        }
        return hasTar;
    },
    created() {
    },
    attached() {
        this.dispatch('menuUp', this);
    },
    onMenuSelectChange(changeVal) {
        this.dispatch('onMenuSelect', changeVal);
    },
    dropRenderClick(e) {
        e.stopPropagation();
        this.dispatch('dropRender', this);
    },
    scroll(data) {
        this.dispatch('popupScroll', data.value);
    },
    template: `
        <div>
            <s-menu
                prefixCls="{{cls}}"
                selectedKeys="{{selectedKeys}}"
                on-click="onMenuSelectChange"
                on-scroll="scroll"
            >
                <s-menu-group
                    prefixCls="{{cls}}"
                    s-if="allData._groupInfo"
                    s-for="data in allData._groupInfo"
                    title="{{data.label}}"
                    key="{{data.key}}"
                >
                    <s-menu-item
                        prefixCls="{{cls}}"
                        s-for="item in data.options"
                        key="{{item.value}}"
                        disabled="{{item.disabled}}"
                        class="{{item.className}}"
                    >
                        {{item.label | raw}}
                        <span
                            s-if="allData.mode === 'multiple' || allData.mode === 'tags'"
                            class="san-select-selected-icon"
                        >
                            <s-icon type="check"></s-icon>
                        </span>
                    </s-menu-item>
                </s-menu-group>
                <s-menu-item
                    prefixCls="{{cls}}"
                    s-else-if="optionsInfo.length"
                    s-for="item,index in optionsInfo"
                    key="{{item.value}}"
                    disabled="{{item.disabled}}"
                    class="{{item.className}}"
                >
                    {{item.label | raw}}
                    <span
                        s-if="allData.mode === 'multiple' || allData.mode === 'tags'"
                        class="san-select-selected-icon"
                    >
                        <s-icon type="check"></s-icon>
                    </span>
                </s-menu-item>
                <s-menu-item
                    prefixCls="{{cls}}"
                    s-else-if="!optionInfo.length && allData.notFoundContent !== 'null'"
                    disabled
                >
                    <s-loading allData="{{allData}}"></s-loading>
                </s-menu-item>
            </s-menu>
            <div s-if="allData.dropdownRender" on-click="dropRenderClick($event)">
                <droprender></droprender>
            </div>
        </div>
    `
});
