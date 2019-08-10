/**
 * @file 组件 affix
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import {on, off, getScrollTop, getOffset} from '../core/util/dom';
import './style/index';
const prefixCls = classCreator('affix')();

export default san.defineComponent({
    dataTypes: {
        offsetTop: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        offsetBottom: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },
    initData() {
        return {
            affix: false,
            styles: {},
            offsetTop: 0,
            pointStyles: {}
        };
    },
    attached() {
        on(window, 'scroll', this.handleScroll.bind(this));
        on(window, 'resize', this.handleScroll.bind(this));
    },
    offsetType() {
        let type = 'top';
        if (+this.data.get('offsetBottom') >= 0) {
            type = 'bottom';
        }
        return type;
    },
    handleScroll() {
        const elOffset = getOffset(this.el);
        const scrollTop = getScrollTop();
        const windowHeight = window.innerHeight;
        const elHeight = this.el.getElementsByTagName('div')[0].offsetHeight;
        const offsetTop = +this.data.get('offsetTop');
        const offsetBottom = +this.data.get('offsetBottom');
        // fixed Top
        if (elOffset.top - offsetTop <= scrollTop
            && this.offsetType() === 'top'
            && !this.data.get('affix')
        ) {
            this.data.set('pointStyles', {
                width: this.ref('point').clientWidth + 'px',
                height: this.ref('point').clientHeight + 'px'
            });

            this.data.set('affix', true);
            this.data.set('styles', {
                top: `${offsetTop}px`,
                left: `${elOffset.left}px`,
                width: `${this.el.offsetWidth}px`
            });
            this.fire('change', true);
        }
        else if (elOffset.top - offsetTop > scrollTop
            && this.offsetType() === 'top'
            && this.data.get('affix')
        ) {
            this.data.set('pointStyles', {});
            this.data.set('affix', false);
            this.data.set('styles', {});
            this.fire('change', false);
        }

        // fixed Bottom
        if ((elOffset.top + offsetBottom + elHeight) > (scrollTop + windowHeight)
            && this.offsetType() === 'bottom'
            && !this.data.get('affix')
        ) {
            this.data.set('pointStyles', {
                width: this.ref('point').clientWidth + 'px',
                height: this.ref('point').clientHeight + 'px'
            });

            this.data.set('affix', true);
            this.data.set('styles', {
                bottom: `${offsetBottom}px`,
                left: `${elOffset.left}px`,
                width: `${this.el.offsetWidth}px`
            });
            this.fire('change', true);
        }
        else if ((elOffset.top + offsetBottom + elHeight) < (scrollTop + windowHeight)
            && this.offsetType() === 'bottom'
            && this.data.get('affix')
        ) {
            this.data.set('pointStyles', {});
            this.data.set('affix', false);
            this.data.set('styles', {});
            this.fire('change', false);
        }
    },
    template: `
        <div class="san-affix-outer" style="{{pointStyles}}">
            <div class="${prefixCls}" style="{{styles}}" s-ref="point">
                <slot></slot>
            </div>
        </div>
    `
});
