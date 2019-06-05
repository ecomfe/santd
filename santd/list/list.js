/**
* @file list.js 列表组件主文件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Spin from 'santd/spin';
import Row from 'santd/row';
import Button from 'santd/button';
import './style/index';
const pagin = classCreator('list');
const prefixCls = pagin();

export default san.defineComponent({
    components: {
        's-spin': Spin,
        's-row': Row,
        's-button': Button
    },
    computed: {
        classes() {
            const itemLayout = this.data.get('itemLayout');
            const sizeCls = this.data.get('sizeMap')[this.data.get('size')];
            const split = this.data.get('split') && this.data.get('split').toString() === 'false'
                ? false : true;
            const bordered = this.data.get('bordered');
            const grid = this.data.get('grid');
            const isLoading = this.data.get('loading');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-vertical`]: itemLayout === 'vertical',
                [`${prefixCls}-${sizeCls}`]: sizeCls,
                [`${prefixCls}-split`]: split,
                [`${prefixCls}-bordered`]: bordered,
                [`${prefixCls}-loading`]: isLoading,
                [`${prefixCls}-grid`]: grid,
                [`${prefixCls}-something-after-last-item`]: true
            });
        },
        headerClass() {
            const headShow = this.data.get('headShow') || this.data.get('header');
            return classNames({
                [`${prefixCls}-header`]: true,
                [`${prefixCls}-header-show`]: headShow,
                [`${prefixCls}-header-hide`]: !headShow
            });
        },
        footerClass() {
            const footerShow = this.data.get('footShow') || this.data.get('footer');
            return classNames({
                [`${prefixCls}-footer`]: true,
                [`${prefixCls}-footer-show`]: footerShow,
                [`${prefixCls}-footer-hide`]: !footerShow
            });
        }
    },
    initData() {
        return {
            componentPropName: 'a-list',
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    inited() {
        const loading = this.data.get('loading') && this.data.get('loading').toString() === 'true'
            ? true : false;
        this.data.set('loading', loading);
        const grid = this.data.get('grid');
        if (typeof grid === 'string') {
            const gridObj = grid && this.parseObjString(grid);
            this.data.set('grid', gridObj);
        }
    },
    parseObjString(str) {
        str = str.replace(/'/g, '');
        const regExp = /{(.*)}/;
        let res = regExp.exec(str)[1].split(',');
        if (!res) {
            return '';
        }
        let obj = {};
        res.forEach(item => {
            let temp = item.split(':');
            obj[temp[0].trim()] = temp[1].toString().trim();
        });
        return obj;
    },
    loadMoreData() {
        this.fire('loadmore');
    },
    attached() {
        const headerSlot = this.slot('header')[0];
        const footerSlot = this.slot('footer')[0];
        if (headerSlot && headerSlot.isInserted) {
            this.data.set('headShow', true);
        }
        if (footerSlot && footerSlot.isInserted) {
            this.data.set('footShow', true);
        }
    },
    template: `
        <div>
            <div s-if="{{grid}}" class="{{classes}}">
                <s-row gutter="{{grid.gutter}}">
                    <slot name="renderItem"></slot>
                </s-row>
            </div>
            <div s-else class="{{classes}}">
                <div class="{{headerClass}}">
                    <slot name="header">{{header}}</slot>
                </div>
                <s-spin spinning="{{false}}" delay="{{100}}">
                    <template slot="content">
                        <slot name="renderItem"></slot>
                    </template>
                </s-spin>
                <div class="{{footerClass}}">
                    <slot name="footer">{{footer}}</slot>
                </div>
                <!--loadMore-->
                <div s-if="{{loadMore}}" style="text-align: center; margin-top: 12px; height: 32px; line-height: 32px;">
                    <s-button on-click="loadMoreData">Load More</s-button>
                </div>
            </div>
        </div>
    `
});
