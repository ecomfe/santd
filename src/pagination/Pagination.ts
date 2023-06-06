/**
 * @file Santd pagination main file
 **/
import Base from 'santd/base';
import Input from '../input';
import KEYCODE from '../core/util/keyCode';
import Pager from './Pager';
import Options from './Options';
import {
    PaginationState as State,
    PaginationProps as Props,
    PaginationComputed as Computed,
    PaginationPrivateProps as PrivateProps,
    JumpFun,
    TPageItem
} from './interface';

const prevTemplate = `
    <li
        title="{{showTitle ? locale.prev_page : ''}}"
        on-click="handlePrev"
        on-keypress="runIfEnterPrev"
        tabIndex="{{hasPrev ? 0 : ''}}"
        class="{{hasPrev ? '' : prefixCls + '-disabled'}} {{prefixCls + '-prev'}}"
        aria-disabled="{{!hasPrev}}"
    >
        <slot name="itemRender" var-type="{{'prev'}}" s-if="{{itemRender}}" />
        <slot name="prevIcon" s-else />
    </li>
`;

const nextTemplate = `
    <li
        title="{{showTitle ? locale.next_page : ''}}"
        on-click="handleNext"
        on-keypress="runIfEnterNext"
        tabIndex="{{hasNext ? 0 : ''}}"
        class="{{hasNext ? '' : prefixCls + '-disabled'}} {{prefixCls + '-next'}}"
        aria-disabled="{{!hasNext}}"
    >
        <slot name="itemRender" var-type="{{'next'}}" s-if="{{itemRender}}" />
        <slot name="nextIcon" s-else />
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
        title="{{showTitle ? locale.jump_to + current + '/' + allPages : ''}}"
        class="{{prefixCls + '-simple-pager'}}"
    >
        <button
            s-if="hasGoButton"
            type="button"
            on-click="handleGoTo"
            on-keyup="handleGoTo"
        >{{locale.jump_to_confirm}}</button>
        <span s-else on-click="handleGoTo" on-keyup="handleGoTo">{{showQuickJumper.goButton}}</span>
    </li>

`;

export default class Pagination extends Base<State, Props & PrivateProps, Computed> {
    prev!: JumpFun;
    next!: JumpFun;
    jumpPrev!: JumpFun;
    jumpNext!: JumpFun;

    initData(): State {
        return {
            defaultCurrent: 1,
            total: 0,
            defaultPageSize: 10,
            onChange() {},
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
            onShowSizeChange() {}
        };
    }
    inited() {
        const current = this.data.get('current') || this.data.get('defaultCurrent');
        const pageSize = this.data.get('pageSize') || this.data.get('defaultPageSize');

        this.data.set('current', current);
        this.data.set('currentInputValue', current);
        this.data.set('pageSize', pageSize);
        this.data.set('hasGoButton', typeof this.data.get('showQuickJumper.goButton') === 'boolean');
    }
    static components = {
        's-input': Input,
        's-pager': Pager,
        's-options': Options
    }
    static computed: Computed = {
        classes(this: Pagination) {
            const simple = this.data.get('simple');
            const prefixCls = this.data.get('prefixCls');
            const size = this.data.get('size');
            const disabled = this.data.get('disabled');
            let classArr = [prefixCls];
            if (simple) {
                classArr.push(prefixCls + '-simple');
                disabled && classArr.push(`${prefixCls}-disabled`);

                return classArr;
            }
            size === 'small' && classArr.push('mini');
            disabled && classArr.push(`${prefixCls}-disabled`);
            return classArr;
        },
        hasPrev(this: Pagination) {
            return this.data.get('current') > 1;
        },
        hasNext(this: Pagination) {
            return this.data.get('current') < this.data.get('allPages');
        },
        allPages(this: Pagination) {
            return Math.floor((this.data.get('total') - 1) / this.data.get('pageSize')) + 1;
        },
        pageList(this: Pagination) {
            const allPages = this.data.get('allPages');
            const pageBufferSize = this.data.get('showLessItems') ? 1 : 2;
            const current = this.data.get('current');
            const prefixCls = this.data.get('prefixCls');
            const pageList: ReturnType<Computed['pageList']> = [];

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
                    pageList.length && ((pageList[0] as TPageItem).className = prefixCls + '-item-after-jump-prev');
                    pageList.unshift({
                        type: 'jumpPrev'
                    });
                }

                if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
                    pageList.length && ((pageList[pageList.length - 1] as TPageItem).className = prefixCls + '-item-before-jump-next');

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
        totalText(this: Pagination) {
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
    }
    isValid(page: any) {
        return typeof page === 'number'
            && isFinite(page)
            && Math.floor(page) === page
            && page >= 1
            && page !== this.data.get('current');
    }
    handlePrev() {
        this.data.get('hasPrev') && this.handleChange(this.data.get('current') - 1);
    }
    handleNext() {
        this.data.get('hasNext') && this.handleChange(this.data.get('current') + 1);
    }
    handleJumpPrev() {
        const jumpPrevPage = Math.max(
            1,
            this.data.get('current') - (this.data.get('showLessItems') ? 3 : 5)
        );
        this.handleChange(jumpPrevPage);
    }
    handleJumpNext() {
        const current = this.data.get('current');
        const allPages = this.data.get('allPages');
        const jumpNextPage = Math.min(allPages, current + (this.data.get('showLessItems') ? 3 : 5));
        this.handleChange(jumpNextPage);
    }
    handleKeyDown(e: KeyboardEvent) {
        if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
            e.preventDefault();
        }
    }
    handleKeyUp(e: KeyboardEvent) {
        const inputValue = (e.target as HTMLInputElement).value;
        const currentInputValue = this.data.get('currentInputValue');
        let value;

        value = isNaN(Number(inputValue)) ? currentInputValue : Number(inputValue);

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
    }

    // TODO 待确认：restParams参数不起作用，原因：
    // 1. 调用该方法时都未传入除event和callback外的第三个参数
    // 2. 对Pager的onKeyPress事件监听，该事件只抛出了一个event，无其他参数
    // 3. 怀疑错误仿照ant中的写法
    runIfEnter(event: KeyboardEvent, callback: JumpFun, ...restParams: any[]) {
        if (event.key === 'Enter' || event.charCode === 13) {
            callback(...restParams);
        }
    }
    runIfEnterPrev(e: KeyboardEvent) {
        // TODO 待确认：文件中没有发现this.prev、this.next、this.jumpPrev、this.jumpNext方法的实现逻辑（ant中是有的）
        this.runIfEnter(e, this.prev);
    }
    runIfEnterNext(e: KeyboardEvent) {
        this.runIfEnter(e, this.next);
    }
    runIfEnterJumpPrev(e: KeyboardEvent) {
        this.runIfEnter(e, this.jumpPrev);
    }
    runIfEnterJumpNext(e: KeyboardEvent) {
        this.runIfEnter(e, this.jumpNext);
    }
    handleChange(page: number) {

        const disabled = this.data.get('disabled');
        if (this.isValid(page) && !disabled) {
            const allPages = this.data.get('allPages');
            if (page > allPages) {
                page = allPages;
            }

            this.data.set('current', page);
            this.data.set('currentInputValue', page);

            const pageSize = this.data.get('pageSize');
            this.fire('change', {page, pageSize});
        }
    }
    handleChangeSize(size: number) {
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
    }
    handleGoTo(e: any) {
        if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
            this.handleChange(this.data.get('currentInputValue'));
        }
    }
    static template = `<ul class="{{classes}}">
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
                locale="{{locale}}"
                on-click="handleChange"
                on-keyPress="runIfEnter"
                itemRender="{{itemRender}}"
            ><slot name="itemRender" slot="itemRender" var-type="{{type}}" var-page="{{page}}" /></s-pager>
            <li
                s-if="item.type === 'jumpPrev'"
                class="{{prefixCls}}-jump-prev {{prefixCls}}-jump-prev-custom-icon"
                tabIndex="0"
                key="prev"
                on-click="handleJumpPrev"
                on-keypress="runIfEnterJumpPrev"
            >
                <slot name="jumpPrevIcon" />
            </li>
            <li
                s-if="item.type === 'jumpNext'"
                class="{{prefixCls}}-jump-next {{prefixCls}}-jump-next-custom-icon"
                tabIndex="0"
                key="next"
                on-click="handleJumpNext"
                on-keypress="runIfEnterJumpNext"
            >
                <slot name="jumpNextIcon" />
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
                quickGo="{{showQuickJumper && total > pageSize}}"
                goButton="{{showQuickJumper.goButton}}"
                locale="{{locale}}"
                disabled="{{disabled}}"
                on-changeSize="handleChangeSize"
                on-quickGo="handleChange"
            >
            </s-options>
        </template>
    </ul>`
};
