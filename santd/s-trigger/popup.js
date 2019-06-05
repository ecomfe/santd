/**
* @file trigger 下拉菜单触发
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';

import classNames from 'classnames';
import animate from 'santd/core/util/css-animation';
// import Popper from 'popper.js/dist/umd/popper';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
const pagin = classCreator('dropdown');
const prefixCls = pagin();
const transitionName = 'slide-up';

const loadingComponent = san.defineComponent({
    dataTypes: {

    },
    initData() {

    },
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

const DropdownMenu = san.defineComponent({
    dataTypes: {
        allData: DataTypes.object
    },
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-menu-group': Menu.MenuItemGroup,
        's-icon': Icon,
        's-loading': loadingComponent
    },
    initData() {
        return {
            cls: 'san-select-dropdown',
            optionsInfo: []
        };
    },
    computed: {
        optionsInfo() {
            let optionsInfo;
            let options = [];
            // 记录当前的options
            const mode = this.data.get('allData.mode');
            // query时根据查询结果找到的options集合
            let innerOptions = this.data.get('allData._innerOptions');
            optionsInfo = innerOptions;
            // 要想实现功能，首先要确保在输入值，进行查询时，
            for (let opt in optionsInfo) {
                const itemData = optionsInfo[opt];
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
    created() {
        this.watch('optionsInfo', info => {
            setTimeout(() => {
                // 为的optionsInfo数据更新以后，再重新的设置selectedKeys，能够重新匹配。
                this.data.set('allData._value', [].concat(this.data.get('allData._value')));
            }, 0);
        });
    },
    attached() {
        // 要获取到包装好的options值

    },
    onMenuSelectChange(changeVal) {
        this.dispatch('onMenuSelect', changeVal);
    },
    template: `
        <div>
            <s-menu
                prefixCls="{{cls}}"
                selectedKeys="{{selectedKeys}}"
                on-click="onMenuSelectChange"
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
                        {{item.label}}
                        <span
                            s-ref="selectedIconRef"
                            s-if="allData.mode === 'multiple' || allData.mode === 'tags'"
                            class="san-select-selected-icon"
                        >
                            <s-icon type="check"></s-icon>
                        </span>
                    </s-menu-item>
                </s-menu-group>
                <s-menu-item
                    prefixCls="{{cls}}"
                    s-else-if="optionsInfo.length > 0"
                    s-for="item,index in optionsInfo"
                    key="{{item.value}}"
                    disabled="{{item.disabled}}"
                    class="{{item.className}}"
                >
                    {{item.label}}
                    <span
                        s-ref="selectedIconRef"
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
        </div>
    `
});

export default san.defineComponent({
    dataTypes: {
        isShow: DataTypes.bool,
        computedStyle: DataTypes.object,
        popupListener: DataTypes.object,
        point: DataTypes.object,
        className: DataTypes.string,
        placemens: DataTypes.object,
        overlayClassName: DataTypes.string,
        overlayStyle: DataTypes.object
    },
    components: {
        's-dropdown-menu': DropdownMenu
    },
    initData() {
        return {
            dropAnimate: null,
            showDone: false,
            prefixCls: prefixCls
        };
    },
    computed: {
        collectClasses() {
            const prefixCls = this.data.get('prefixCls');
            const dropdownClass = this.data.get('allData.dropdownClassName');
            const className = this.data.get('className');
            const overlayClassName = this.data.get('overlayClassName');
            const hide = !this.data.get('isShow');
            const showDone = this.data.get('showDone');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-hidden`]: hide && showDone,
                [`${overlayClassName}`]: !!overlayClassName,
                [`${className}`]: !!className,
                [`${dropdownClass}`]: !!dropdownClass
            });
        },
        getListener() {
            const popupListener = this.data.get('popupListener');
            return  popupListener
                ? {
                    mouseenter: popupListener.mouseenter,
                    mouseleave: popupListener.mouseleave,
                    popupclick: popupListener.popupclick,
                    mousedown: popupListener.mousedown
                }
                : null;
        },
        collectStyles() {
            const width = this.data.get('width');
            const overlayStyle = this.data.get('overlayStyle') || this.data.get('allData.dropdownStyle');
            const dropdownMatchSelectWidth = this.data.get('dropdownMatchSelectWidth');
            const popupWidth = width
                ? dropdownMatchSelectWidth ? {width: width + 'px'} : {'min-width': width + 'px'}
                : {};
            if (typeof overlayStyle === 'object') {
                return {...overlayStyle, ...popupWidth};
            }
            return popupWidth;
        }
    },
    created() {
        this.watch('isShow', flag => {
            const el = this.ref('dropdownArea');
            if (flag) {
                setTimeout(() => {
                    el.style.visibility = 'visible';
                    animate(el, `${transitionName}-enter`, this.noop);
                }, 10);
            } else {
                el.style.visibility = 'hidden';
                animate(el, `${transitionName}-leave`, this.noop);
                this.data.set('showDone', true);
            }
        });
        this.watch('allData.dropdownRender', dropdownRender => {
            const menuNode = new DropdownMenu({
                data: {
                    allData: this.data.get('allData')
                }
            });
            // 处理 dropdownRender
            if (dropdownRender && typeof dropdownRender === 'function') {
                const Render = dropdownRender(menuNode);
                const renderer = new Render();
                this.nextTick(() => {
                    const refs = this.ref('dropdownRender');
                    renderer.attach(refs);
                    renderer.parentComponent = this;
                });
            }
        });
    },
    attached() {
        const parent = this.parent = this.data.get('parent');
        const initOverlay = this.handleInitOverlay();
        const placements = this.data.get('placemens');
        if (this.ref('dropdownArea') && initOverlay) {
            initOverlay.attach(this.ref('dropdownArea'));
        }
        this.dispatch('childComponent', this.ref('dropdownArea'));
    },

    handleInitOverlay(data) {
        const overlay = this.data.get('overlay');
        if (typeof overlay === 'function') {
            const Render = overlay;
            const renderer = new Render({
                data: data || {},
                owner: this
            });
            return renderer;
        }
        return null;
    },

    onPopupMouseenter(e) {
        // 执行triiger中的方法
        const getListener = this.data.get('getListener');
        if (getListener) {
            getListener.mouseenter.bind(this.parent)(e);
        }
    },
    onPopupMouseleave(e) {
        const getListener = this.data.get('getListener');
        if (getListener) {
            getListener.mouseleave.bind(this.parent)(e);
        }
    },
    onPopupMousedown(e) {
        const getListener = this.data.get('getListener');
        if (getListener) {
            getListener.mousedown.bind(this.parent)(e);
        }
    },
    noop() {

    },
    onPopupClick(e) {
        const getListener = this.data.get('getListener');
        if (getListener) {
            getListener.popupclick.bind(this.parent)(this);
        }
    },
    template: `
    <div>
        <div
            s-ref="dropdownArea"
            class="{{collectClasses}}"
            style="{{collectStyles}}"
            on-mouseenter="onPopupMouseenter"
            on-mouseleave="onPopupMouseleave"
            on-mousedown="onPopupMousedown($event)"
            on-click="onPopupClick($event)"
        >
            <slot></slot>
            <div s-if="allData.dropdownRender" s-ref="dropdownRender">
            </div>
            <s-dropdown-menu
                s-if="!allData.dropdownRender && targetProperty === 'select'"
                allData="{{allData}}"
            ></s-dropdown-menu>
        </div>
    </div>
    `
});
