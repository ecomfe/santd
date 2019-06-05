/**
 * @file 组件 affix
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import {on, off, getScrollTop, getOffset} from 'santd/core/util/dom';
import classNames from 'classnames';
import './style/index';
const prefixCls = classCreator('affix')();

/*function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

export default san.defineComponent({
    dataTypes: {
        offsetTop: DataTypes.number,
        offset: DataTypes.number,
        offsetBottom: DataTypes.number,
        target: DataTypes.func,
        prefixCls: DataTypes.string,
        className: DataTypes.string
    },
    initData() {
        return {
            target: getDefaultTarget
        };
    },
    computed: {
        mergedPlaceholderStyle() {
            const status = this.data.get('status');
            const placeholderStyle = this.data.get('placeholderStyle');

            return {
                ...(status === 'None' ? placeholderStyle : null),
                ...toStyle.object(this.data.get('bodyStyle'))
            };
        }
    },
    inited() {
        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});
    },
    template: `
        <div style="{{mergedPlaceholderStyle}}">
            <div class="{{className}}" style="{{affixStyle}}">
                <slot></slot>
            </div>
        </div>
    `
});*/

export default san.defineComponent({
    dataTypes: {
        offsetTop: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        offsetBottom: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },
    computed: {
        classes() {
            const styles = !(JSON.stringify(this.data.get('styles')) === '{}');
            return classNames({
                [`${prefixCls}`]: styles
            });
        }
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
            <div class="{{classes}}" style="{{styles}}" s-ref="point">
                <slot></slot>
            </div>
        </div>
    `
});
