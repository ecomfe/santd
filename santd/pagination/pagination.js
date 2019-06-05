/**
 * @file Santd pagination main file
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import Input from 'santd/input';
import KEYCODE from 'santd/core/util/keyCode';
import Pager from './pager';
import Options from './options';

const prevTemplate = `
    <li
        title="{{showTitle ? '上一页' : ''}}"
        on-click="handlePrev"
        on-keypress="runIfEnterPrev"
        tabIndex="{{hasPrev ? 0 : ''}}"
        class="{{hasPrev ? '' : prefixCls + '-disabled'}} {{prefixCls + '-prev'}}"
        aria-disabled="{{!hasPrev}}"
    >
        <previcon prefixCls="{{prefixCls}}"></previcon>
    </li>
`;

const nextTemplate = `
    <li
        title="{{showTitle ? '下一页' : ''}}"
        on-click="handleNext"
        on-keypress="runIfEnterNext"
        tabIndex="{{hasNext ? 0 : ''}}"
        class="{{hasNext ? '' : prefixCls + '-disabled'}} {{prefixCls + '-next'}}"
        aria-disabled="{{!hasNext}}"
    >
        <nexticon prefixCls="{{prefixCls}}"></nexticon>
    </li>
`;

const simpleTemplate = `
    ${prevTemplate}
    <li
        title="{{showTitle ? current + '/' + allPages : ''}}"
        class="{{prefixCls + '-simple-pager'}}"
    >
        <input
            type="text"
            value="{{currentInputValue}}"
            size="3"
            ok-keydown="handleKeyDown"
            on-keyup="handleKeyUp"
            on-change="handleKeyUp"
        />
        <span class="{{prefixCls + '-slash'}}">/</span>
        {{allPages}}
    </li>
    ${nextTemplate}
    <li
        s-if="showQuickJumper && showQuickJumper.goButton"
        title="{{showTitle ? '跳转' + current + '/' + allPages : ''}}"
        class="{{prefixCls + '-simple-pager'}}"
    >
        <button
            s-if="hasGoButton"
            type="button"
            on-click="handleGoTo"
            on-keyup="handleGoTo"
        >跳转</button>
        <span s-else on-click="handleGoTo" on-keyup="handleGoTo">{{showQuickJumper.goButton}}</span>
    </li>

`;

const defaultItemRender = function (type, elem) {
    return elem;
};

export default san.defineComponent({
    DataTypes: {
        prefixCls: DataTypes.string,
        current: DataTypes.number,
        defaultCurrent: DataTypes.number,
        total: DataTypes.number,
        pageSize: DataTypes.number,
        defaultPageSize: DataTypes.number,
        hideOnSinglePage: DataTypes.bool,
        showSizeChanger: DataTypes.bool,
        showLessItems: DataTypes.bool,
        selectSizeChange: DataTypes.func,
        showPrevNextJumpers: DataTypes.bool,
        showQuiclJumper: DataTypes.oneOfType([
            DataTypes.bool,
            DataTypes.object
        ]),
        showTitle: DataTypes.bool,
        pageSizeOptions: DataTypes.array,
        showTotal: DataTypes.bool,
        style: DataTypes.object
    },
    initData() {
        return {
            defaultCurrent: 1,
            total: 0,
            defaultPageSize: 10,
            onChange() {},
            className: '',
            selectPrefixCls: 'select',
            prefixCls: 'pagination',
            selectComponentClass: null,
            hideOnSinglePage: false,
            showPrevNextJumpers: true,
            showQuickJumper: false,
            showSizeChanger: false,
            showLessItems: false,
            showTitle: true,
            pageSizeOptions: [10, 20, 30, 40],
            onShowSizeChange() {},
            style: {}
        };
    },
    inited() {
        const current = this.data.get('current') || this.data.get('defaultCurrent');
        const pageSize = this.data.get('pageSize') || this.data.get('defaultPageSize');

        this.data.set('current', current);
        this.data.set('currentInputValue', current);
        this.data.set('pageSize', pageSize);
    },
    compiled() {
        const itemRender = this.parentComponent.data.get('itemRender') || defaultItemRender;
        this.components.previcon = itemRender('prev', this.parentComponent.data.get('prevIcon'));
        this.components.nexticon = itemRender('next', this.parentComponent.data.get('nextIcon'));
        this.components.jumpprevicon = itemRender('jump-prev', this.parentComponent.data.get('jumpPrevIcon'));
        this.components.jumpnexticon = itemRender('jump-next', this.parentComponent.data.get('jumpNextIcon'));
    },
    components: {
        's-input': Input,
        's-pager': Pager,
        's-options': Options
    },
    computed: {
        classes() {
            const simple = this.data.get('simple');
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const size = this.data.get('size');

            if (simple) {
                return classNames(prefixCls, prefixCls + '-simple', className);
            }
            return classNames(prefixCls, size === 'small' ? 'mini' : '');
        },
        hasPrev() {
            return this.data.get('current') > 1;
        },
        hasNext() {
            return this.data.get('current') < this.data.get('allPages');
        },
        getJumpPrevPage() {
            const current = this.data.get('current');
            return Math.max(1, current - (this.data.get('showLessItems') ? 3 : 5));
        },
        getJumpNextPage() {
            const current = this.data.get('current');
            const allPages = this.data.get('allPages');
            return Math.min(allPages, current + (this.data.get('showLessItems') ? 3 : 5));
        },
        allPages() {
            const pageSize = this.data.get('pageSize');
            const total = this.data.get('total');
            return Math.floor((total - 1) / pageSize) + 1;
        },
        pageBufferSize() {
            return this.data.get('showLessItems') ? 1 : 2;
        },
        hasGoButton() {
            const button = this.data.get('showQuickJumper.goButton');
            return typeof button === 'boolean';
        },
        pageList() {
            const allPages = this.data.get('allPages');
            const pageBufferSize = this.data.get('pageBufferSize');
            const current = this.data.get('current');
            const prefixCls = this.data.get('prefixCls');
            const pageList = [];

            if (allPages <= 5 + pageBufferSize * 2) {
                for (let i = 1; i <= allPages; i++) {
                    pageList.push({
                        type: 'page',
                        page: i
                    });
                }
            }
            else {
                let left = Math.max(1, current - pageBufferSize);
                let right = Math.min(current + pageBufferSize, allPages);

                if (current - 1 <= pageBufferSize) {
                    right = 1 + pageBufferSize * 2;
                }

                if (allPages - current <= pageBufferSize) {
                    left = allPages - pageBufferSize * 2;
                }

                for (let i = left; i <= right; i++) {
                    pageList.push({
                        type: 'page',
                        page: i
                    });
                }

                if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
                    pageList.length && (pageList[0].className = prefixCls + '-item-after-jump-prev');
                    pageList.unshift({
                        type: 'jumpPrev'
                    });
                }

                if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
                    pageList.length && (pageList[pageList.length - 1].className = prefixCls + '-item-before-jump-next');

                    pageList.push({
                        type: 'jumpNext'
                    });
                }

                if (left !== 1) {
                    pageList.unshift({
                        type: 'page',
                        page: 1
                    });
                }

                if (right !== allPages) {
                    pageList.push({
                        type: 'page',
                        page: allPages
                    });
                }
            }
            return pageList;
        },
        shouldDisplayQuickJumper() {
            const showQuickJumper = this.data.get('showQuickJumper');
            const pageSize = this.data.get('pageSize');
            const total = this.data.get('total');
            if (total <= pageSize) {
                return false;
            }
            return showQuickJumper;
        },
        totalText() {
            const showTotal = this.data.get('showTotal');
            const total = this.data.get('total');
            const current = this.data.get('current');
            const pageSize = this.data.get('pageSize');
            if (showTotal) {
                return showTotal(total, [
                    total === 0 ? 0 : (current - 1) * pageSize + 1,
                    current * pageSize > total ? total : current * pageSize
                ]);
            }
            return false;
        }
    },
    isValid(page) {
        return typeof page === 'number'
            && isFinite(page)
            && Math.floor(page) === page
            && page >= 1
            && page !== this.data.get('current');
    },
    handlePrev() {
        const hasPrev = this.data.get('hasPrev');
        if (hasPrev) {
            this.handleChange(this.data.get('current') - 1);
        }
    },
    handleNext() {
        const hasNext = this.data.get('hasNext');
        if (hasNext) {
            this.handleChange(this.data.get('current') + 1);
        }
    },
    handleJumpPrev() {
        this.handleChange(this.data.get('getJumpPrevPage'));
    },
    handleJumpNext() {
        this.handleChange(this.data.get('getJumpNextPage'));
    },
    handleKeyDown(e) {
        if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
            e.preventDefault();
        }
    },
    handleKeyUp(e) {
        const inputValue = e.target.value;
        const currentInputValue = this.data.get('currentInputValue');
        let value;

        if (inputValue === '') {
            value = inputValue;
        }
        else if (isNaN(Number(inputValue))) {
            value = currentInputValue;
        }
        else {
            value = Number(inputValue);
        }

        if (value !== currentInputValue) {
            this.data.set('currentInputValue', value);
        }

        if (e.keyCode === KEYCODE.ENTER) {
            this.handleChange(value);
        }
        else if (e.keyCode === KEYCODE.ARROW_UP) {
            this.handleChange(value - 1);
        }
        else if (e.keyCode === KEYCODE.ARROW_DOWN) {
            this.handleChange(value + 1);
        }
    },
    runIfEnter(event, callback, ...restParams) {
        if (event.key === 'Enter' || event.charCode === 13) {
            callback(...restParams);
        }
    },
    runIfEnterPrev(e) {
        this.runIfEnter(e, this.prev);
    },
    runIfEnterNext(e) {
        this.runIfEnter(e, this.next);
    },
    runIfEnterJumpPrev(e) {
        this.runIfEnter(e, this.jumpPrev);
    },
    runIfEnterJumpNext(e) {
        this.runIfEnter(e, this.jumpNext);
    },
    handleChange(page) {
        if (this.isValid(page)) {
            const allPages = this.data.get('allPages');
            if (page > allPages) {
                page = allPages;
            }

            this.data.set('current', page);
            this.data.set('currentInputValue', page);

            const pageSize = this.data.get('pageSize');

            this.fire('change', {page, pageSize});
        }
    },
    handleChangeSize(size) {
        let current = this.data.get('current');
        const total = this.data.get('total');
        const newCurrent = Math.floor((total - 1) / size) + 1;

        current = current > newCurrent ? newCurrent : current;

        if (newCurrent === 0) {
            current = this.data.get('current');
        }

        this.data.set('pageSize', size);
        this.data.set('current', current);
        this.data.set('currentInputValue', current);
        this.fire('showSizeChange', {current, pageSize: size});
    },
    handleGoTo(e) {
        if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
            this.handleChange(this.data.get('currentInputValue'));
        }
    },
    template: `<ul class="{{classes}}">
        <template s-if="simple && (hideOnSinglePage !== true || total > pageSize)">
            ${simpleTemplate}
        </template>
        <template s-else-if="hideOnSinglePage !== true || total > pageSize">
            <li
                s-if="totalText"
                class="{{prefixCls}}-total-text"
            >
                {{totalText}}
            </li>
            ${prevTemplate}
            <template s-for="item in pageList">
            <s-pager
                s-if="item.type === 'page'"
                key="{{item.page}}"
                page="{{item.page}}"
                active="{{current === item.page}}"
                rootPrefixCls="{{prefixCls}}"
                showTitle="{{showTitle}}"
                on-click="handleChange"
                on-keyPress="runIfEnter"
            ></s-pager>
            <li
                s-if="item.type === 'jumpPrev'"
                className="{{prefixCls}}-jump-prev {{prefixCls}}-jump-prev-custom-icon"
                tabIndex="0"
                key="prev"
                on-click="handleJumpPrev"
                on-keypress="runIfEnterJumpPrev"
            >
                <jumpprevicon prefixCls="{{prefixCls}}"></jumpprevicon>
            </li>
            <li
                s-if="item.type === 'jumpNext'"
                className="{{prefixCls}}-jump-next {{prefixCls}}-jump-next-custom-icon"
                tabIndex="0"
                key="next"
                on-click="handleJumpNext"
                on-keypress="runIfEnterJumpNext"
            >
                <jumpnexticon prefixCls="{{prefixCls}}"></jumpnexticon>
            </li>
            </template>
            ${nextTemplate}
            <s-options
                rootPrefixCls="{{prefixCls}}"
                size="{{size}}"
                selectComponentClass="{{selectComponentClass}}"
                selectPrefixCls="{{selectPrefixCls}}"
                showSizeChanger="{{showSizeChanger}}"
                current="{{current}}"
                pageSize="{{pageSize}}"
                pageSizeOptions="{{pageSizeOptions}}"
                quickGo="{{shouldDisplayQuickJumper}}"
                goButton="{{showQuickJumper.goButton}}"
                on-changeSize="handleChangeSize"
                on-quickGo="handleChange"
            >
            </s-options>
        </template>
    </ul>`
});
