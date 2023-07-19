/**
 * @file 组件 affix
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import Base from 'santd/base';
import {classCreator} from '../core/util';
import {on, off, getScrollTop, getOffset} from '../core/util/dom';
import './style/index';
import {State, Props, ObjectDetail, Scroller}  from './interface'

const outerCls = classCreator('affix-outer')();
const innerCls = classCreator('affix')();

export default class Affix extends Base<State, Props> {
    _scroller: Scroller;
    initData(): State {
        return {
            affix: false,
            styles: {},
            offsetTop: 0,
            offsetBottom: 0,
            outerStyles: {}
        };
    }
    attached() {
        if (!this._scroller) {
            this._scroller = this.handleScroll.bind(this);

            const target: any = this.data.get('target');
            const element = target ? target() : window;
            on(element, 'scroll', this._scroller);
            on(element, 'resize', this._scroller);
        }
    }

    disposed(): void {
        if (this._scroller) {
            const target = this.data.get('target');
            const element: any = target ? target() : window;
            off(element, 'scroll', this._scroller);
            off(element, 'resize', this._scroller);
            this._scroller = null as unknown as Scroller;
        }
    }

    handleScroll() {
        const target: any = this.data.get('target');
        const targetOffset = target && getOffset(target());
        const elOffset = getOffset(this.el);
        const scrollTop = getScrollTop();
        const innerEl: any = this.ref('inner');
        let offsetTop = this.data.get('offsetTop') || 0;
        let offsetBottom = this.data.get('offsetBottom') || 0;
        let isAffixBottom = offsetBottom >= 0;

        let affixTo = null;
        let styles: ObjectDetail = {};
        let outerStyles = {};

        if (isAffixBottom) {
            const winBottomPos = window.innerHeight + scrollTop;
            const targetBottomPos = target && (target().offsetHeight + targetOffset.top);
            const elBottomAffixPos = elOffset.top + offsetBottom + innerEl.offsetHeight;
            if (elBottomAffixPos >= (target ? targetBottomPos : winBottomPos)) {
                affixTo = true;
                styles = {
                    position: 'fixed',
                    bottom: target ? `${winBottomPos - targetOffset.bottom + offsetBottom}px` : `${offsetBottom}px`
                };
            }
            else {
                affixTo = false;
            }
        }
        else {
            const elTopAffixPos = elOffset.top - offsetTop;
            if (elTopAffixPos <= (target ? targetOffset.top : scrollTop)) {
                affixTo = true;
                styles = {
                    position: 'fixed',
                    top: target ? `${targetOffset.top - scrollTop + offsetTop}px` : `${offsetTop}px`
                };
            }
            else {
                affixTo = false;
            }
        }

        if (affixTo != null) {
            if (affixTo === true) {
                outerStyles = {
                    width: innerEl.clientWidth + 'px',
                    height: innerEl.clientHeight + 'px'
                };
                styles.left = `${elOffset.left}px`;
                styles.width = `${elOffset.width}px`;
            }

            this.data.set('outerStyles', outerStyles);
            this.data.set('styles', styles);
            this.data.set('affix', affixTo);
            this.fire('change', affixTo);
        }
    }

    static template = `
        <div class="${outerCls}" style="{{outerStyles}}">
            <div class="{{affix ? '${innerCls}' : ''}}" style="{{styles}}" s-ref="inner">
                <slot></slot>
            </div>
        </div>
    `
};
