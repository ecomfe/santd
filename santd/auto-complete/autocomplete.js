/**
 * @file 组件 auto-complete
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import option from './option';
import input from 'santd/input';
import {loopComponentList} from 'santd/core/util/findCompont';

// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx

const ccSelect = classCreator('select');
const ccTran = classCreator('transition');
const selectPrefix = ccSelect();
const tranPrefix = ccTran('drop');

export default san.defineComponent({
    template: `
    	<div
            class="
                ${selectPrefix}-show-search
                ${selectPrefix}-auto-complete
                ${selectPrefix}
                ${selectPrefix}-combobox
                ${selectPrefix}-enabled"
            style="{{style}}"
        >
            <div class="${selectPrefix}-selection
                    ${selectPrefix}-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true">
                <div class="${selectPrefix}-selection__rendered">
                    <div 
                        unselectable="on"
                        class="${selectPrefix}-selection__placeholder"
                        style="display: none; user-select: none;">input here
                    </div>
                    <ul>
                        <li class="${selectPrefix}-search ${selectPrefix}-search--inline">
                            <div class="${selectPrefix}-search__field__wrap">
                                <input
                                    type="text"
                                    class="san-input ${selectPrefix}-search__field"
                                    on-input="inputChange($event)"
                                    on-keydown="inputKeyDown($event)"
                                    on-blur="inputOnBlur($event)"
                                    on-focus="inputOnFocus($event)"
                                    value="{{inputValue}}"
                                    placeholder="{{placeholder}}"
                                >
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="{{showDrop ? dropCls : dorpHideCls}}"
                style="transform-origin: center top 0px;display:{{showDrop ? 'block' : 'none'}}">
                <ul>
                    <s-option
                        s-for="data in dataSource"
                        class="{{itemCls}}"
                        text="{{data}}"
                    />
                    <slot/>
                </ul>
            </div>
        </div>
    `,
    components: {
        's-option': option
    },
    initData() {
        return {
            showDrop: false,
            defaultOpen: false,
            dataSource: []
        };
    },
    computed: {
        inputValue() {
            return this.data.get('value') || '';
        },
        dropCls() {
            let showDrop = this.data.get('showDrop');
            return classNames({
                [`${tranPrefix}`]: true,
                [`${tranPrefix}-enter`]: !!showDrop,
                [`${tranPrefix}-enter-active`]: !!showDrop,
                [`${selectPrefix}-dropShow`]: !!showDrop,
                [`${tranPrefix}-leave`]: !showDrop,
                [`${tranPrefix}-leave-active`]: !showDrop,
                [`${selectPrefix}-dropHide`]: !showDrop
            });
        },
        dorpHideCls() {
            return classNames({
                [`${selectPrefix}-dropHide`]: true,
                [`${tranPrefix}`]: true,
                [`${tranPrefix}-leave`]: true,
                [`${tranPrefix}-leave-active`]: true
            });
        },
        itemCls() {
            const showDrop = this.data.get('showDrop');
            return classNames({
                [`${selectPrefix}-dropdown-menu-item-show`]: showDrop,
                // [`${selectPrefix}-dropdown-menu-item-hide`]: !showDrop,
                [`${selectPrefix}-dropdown-menu-item`]: true
            });
        }
    },
    messages: {
        itemHandleClick(param) {
            this.fire('select', param.value);
            this.data.set('inputValue', param.value);
            this.data.set('showDrop', false);
            this.fire('dropdownVisibleChange', false);
        }
    },
    inited() {
        let defaultOpen = this.data.get('defaultOpen');
        if (defaultOpen !== undefined) {
            this.data.set('showDrop', defaultOpen);
        }
    },
    attached() {
        // let inputEle;
        // let loopInput = list => {
        //     list && list.length && list.forEach(item => {
        //         if ((item.el && item.el.tagName === 'INPUT' && item.el.type === 'text')
        //             || item.el && item.el.tagName === 'TEXTAREA') {
        //             inputEle = item.el;
        //             console.log(item.el.tagName, item.el.type);
        //             return;
        //         }
        //         loopInput(item.children);
        //     });
        // };
        // loopInput(this.slotChildren[0].children);
        // if (inputEle) {
        // }
    },
    inputChange(e) {
        const value = e.target.value;
        // console.log('inputChange', value);
        this.data.set('showDrop', true);
        this.fire('dropdownVisibleChange', true);
        this.fire('search', value);
    },
    inputKeyDown(e) {
        const value = e.target.value;
        // console.log('inputKeyDown', value);
    },
    inputOnBlur(e) {
        setTimeout(() => {
            // wait for click event
            this.data.set('showDrop', false);
            this.fire('dropdownVisibleChange', false);
            this.fire('blur', e);
        }, 200);
    },
    inputOnFocus(e) {
        // this.data.set('showDrop', true);
        this.dispatch('focus', e);
    }
});