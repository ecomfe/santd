/**
 * @file 组件 transfer
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import checkbox from 'santd/checkbox';
import input from 'santd/input';
import icon from 'santd/icon';
import empty from 'santd/empty';
import transLabel from './transLabel';

const cc = classCreator('transfer');
const prefix = cc();

export default san.defineComponent({
    template: `
        <div class="{{cls}}" style="{{listStyle}}">
            <div class="${prefix}-list-header">
                <s-checkbox
                    indeterminate="{{indeterminate}}"
                    checked="{{allChecked}}"
                    on-change="handleSelectAll"
                    disabled="{{disabled}}">
                        <span>{{selectInfo}} 项</span>
                    </s-checkbox>
                <span class="${prefix}-list-header-selected">
                    <span class="${prefix}-list-header-title">{{title}}</span>
                </span>
            </div>
            <div class="{{bodyCls}}">
                <div class="${prefix}-list-body-not-found" s-if="{{!sourceList.length}}">
                    <s-empty class="san-empty-small"/>
                </div>
                <div class="${prefix}-list-body-search-wrapper" s-if="showSearch">
                    <s-input
                        inputType="inputFix"
                        placeholder="请输入搜索内容"
                        on-change="handleInputChange"
                        disabled="{{disabled}}">
                        <s-icon slot="suffix" type="search"></s-icon>
                    </s-input>
                </div>
                <ul class="${prefix}-list-content" on-scroll="handleScroll">
                    <div class="LazyLoad is-visible" s-for="item in sourceList">
                        <li class="${prefix}-list-content-item
                                {{item.disabled || disabled ? '${prefix}-list-content-item-disabled' : ''}}"
                            title="{{item.title}}">
                            <s-checkbox
                                on-change="handleCheck(item, $event)"
                                disabled="{{item.disabled || disabled}}"
                                checked="{{item.checked}}">
                                    <s-trans-label render="{{render}}" data="{{item}}"/>
                                </s-checkbox>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="${prefix}-list-footer" s-if="showFooter">
                <slot name="footer"/>
            </div>
        </div>
    `,
    components: {
        's-checkbox': checkbox,
        's-input': input,
        's-icon': icon,
        's-empty': empty,
        's-trans-label': transLabel
    },
    initData() {
        return {
            sourceList: [],
            selectKeys: []
        };
    },
    computed: {
        cls() {
            const showFooter = this.data.get('showFooter');
            return classNames({
                [`${prefix}-list`]: true,
                [`${prefix}-list-with-footer`]: showFooter
            });
        },
        bodyCls() {
            const showSearch = this.data.get('showSearch');
            return classNames({
                [`${prefix}-list-body`]: true,
                [`${prefix}-list-body-with-search`]: showSearch
            });
        },
        activeTotal() {
            const sourceList = this.data.get('sourceList');
            return sourceList.filter(item => !item.disabled).length;
        },
        selectKeys() {
            const sourceList = this.data.get('sourceList');
            return sourceList.filter(item => item.checked).map(item => item.key);
        },
        selectCount() {
            return this.data.get('selectKeys').length;
        },
        selectInfo() {
            const total = this.data.get('sourceList').length;
            const selectCount = this.data.get('selectCount');
            return selectCount > 0 ? `${selectCount}/${total}` : total;
        },
        indeterminate() {
            const allChecked = this.data.get('allChecked');
            const selectCount = this.data.get('selectCount');
            return selectCount > 0 && (!allChecked);
        },
        allChecked() {
            const total = this.data.get('activeTotal');
            const selectCount = this.data.get('selectCount');
            return selectCount === total && selectCount !== 0;
        }
    },
    useRender(item) {
        const render = this.data.get('render');
        return render(item);
    },
    getSelectKeys(sourceList) {
        return sourceList.filter(item => item.checked).map(item => item.key);
    },
    handleCheck(item, e) {
        const checked = e.target.checked;
        item.checked = checked;
        const sourceList = this.data.get('sourceList');
        const selectKeys = this.getSelectKeys(sourceList);
        this.data.set('selectKeys', selectKeys);
        this.dispatch('UI:select-list-item', {
            dir: this.data.get('direction'),
            selectKeys
        });
    },
    handleSelectAll(e) {
        const checked = e.target.checked;
        let sourceList = this.data.get('sourceList');
        sourceList = sourceList.map(item => {
            item.checked = item.disabled ? false : checked;
            return item;
        });
        this.data.set('sourceList', sourceList);
        const selectKeys = this.getSelectKeys(sourceList);
        this.data.set('selectKeys', selectKeys);
        this.dispatch('UI:select-list-item', {
            dir: this.data.get('direction'),
            selectKeys
        });
    },
    handleInputChange(text) {
        const filterOption = this.data.get('filterOption');
        if (filterOption) {
            const oriSourceList = this.data.get('oriSourceList');
            const sourceList = text ? oriSourceList.filter(item => filterOption(text, item)) : oriSourceList;
            this.data.set('sourceList', sourceList);
        }
        this.dispatch('UI:input-search', {
            direction: this.data.get('direction'),
            value: text
        });
    },
    handleScroll(event) {
        this.dispatch('UI:list-scroll', {
            direction: this.data.get('direction'),
            event
        });
    },
    inited() {
        this.data.set('oriSourceList', this.data.get('sourceList'));
    }
});