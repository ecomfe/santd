/**
 * @file Santd tabs scrollable tab bar node file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';
import {setTransform, isTransform3dSupported} from './utils';
import Icon from '../icon';
import {classCreator} from '../core/util';
const prefixCls = classCreator('tabs')();

const prevIcon = san.defineComponent({
    computed: {
        prevIconType() {
            const tabPosition = this.data.get('tabPosition');
            const isVertical = tabPosition === 'left' || tabPosition === 'right';

            return isVertical ? 'up' : 'left';
        }
    },
    components: {
        's-icon': Icon
    },
    template: `<span class="${prefixCls}-tab-prev-icon">
        <s-icon type="{{prevIconType}}" class="${prefixCls}-tab-prev-icon-target"/>
    </span>`
});

const nextIcon = san.defineComponent({
    computed: {
        nextIconType() {
            const tabPosition = this.data.get('tabPosition');
            const isVertical = tabPosition === 'left' || tabPosition === 'right';

            return isVertical ? 'down' : 'right';
        }
    },
    components: {
        's-icon': Icon
    },
    template: `<span class="${prefixCls}-tab-next-icon">
        <s-icon type="{{nextIconType}}" class="${prefixCls}-tab-next-icon-target"/>
    </span>`
});

export default san.defineComponent({
    dataTypes: {
        tabBarPosition: DataTypes.oneOf(['left', 'right', 'top', 'bottom']),
        activeKey: DataTypes.string,
        scrollAnimated: DataTypes.bool
    },
    initData() {
        return {
            tabBarPosition: 'left',
            scrollAnimated: true,
            prev: false,
            next: false,
            offset: 0
        };
    },
    handleKeyDown(e) {
        this.fire('keydown', e);
    },
    attached() {
        this.dispatch('santd_tabs_addRef', {
            name: 'container',
            ref: this.el
        });
        this.dispatch('santd_tabs_addRef', {
            name: 'nav',
            ref: this.ref('nav')
        });
        this.dispatch('santd_tabs_addRef', {
            name: 'navWrap',
            ref: this.ref('navWrap')
        });

        this.debouncedResize = debounce(() => {
            this.setNextPrev();
            this.scrollToActiveTab();
        }, 200);
        this.resizeObserver = new ResizeObserver(this.debouncedResize);

        window.setTimeout(() => {
            const refs = this.data.get('refs');
            this.resizeObserver.observe(refs.container);
        }, 0);

        this.watch('tabBarPosition', val => {
            this.scrollToActiveTab();
        });
    },
    getScrollWH(node) {
        const tabBarPosition = this.data.get('tabBarPosition');
        let prop = 'scrollWidth';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            prop = 'scrollHeight';
        }
        return node[prop];
    },
    getOffsetWH(node) {
        const tabBarPosition = this.data.get('tabBarPosition');
        let prop = 'offsetWidth';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            prop = 'offsetHeight';
        }
        return node[prop];
    },
    getOffsetLT(node) {
        const tabBarPosition = this.data.get('tabBarPosition');
        let prop = 'left';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            prop = 'top';
        }
        return node.getBoundingClientRect()[prop];
    },
    setOffset(offset, checkNextPrev = true) {
        const target = Math.min(0, offset);
        if (this.data.get('offset') !== target) {
            this.data.set('offset', target);
            let navOffset = {};
            const tabBarPosition = this.data.get('tabBarPosition');
            const refs = this.data.get('refs');
            const navStyle = refs.nav.style;
            const transformSupported = isTransform3dSupported(navStyle);
            if (tabBarPosition === 'left' || tabBarPosition === 'right') {
                if (transformSupported) {
                    navOffset = {
                        value: `translate3d(0,${target}px,0)`
                    };
                }
                else {
                    navOffset = {
                        name: 'top',
                        value: `${target}px`
                    };
                }
            }
            else if (transformSupported) {
                navOffset = {
                    value: `translate3d(${target}px,0,0)`
                };
            }
            else {
                navOffset = {
                    name: 'left',
                    value: `${target}px`
                };
            }
            if (transformSupported) {
                setTransform(navStyle, navOffset.value);
            }
            else {
                navStyle[navOffset.name] = navOffset.value;
            }
            if (checkNextPrev) {
                this.setNextPrev();
            }
        }
    },
    setNextPrev() {
        const {
            nav,
            navTabsContainer,
            container,
            navWrap
        } = this.data.get('refs');
        const navNodeWH = this.getScrollWH(navTabsContainer || nav);
        const containerWH = this.getOffsetWH(container) + 1;
        const navWrapNodeWH = this.getOffsetWH(navWrap);
        let offset = this.data.get('offset');
        const minOffset = containerWH - navNodeWH;
        let {next, prev} = this.data.get();
        if (minOffset >= 0) {
            next = false;
            this.setOffset(0, false);
            offset = 0;
        }
        else if (minOffset < offset) {
            next = true;
        }
        else {
            next = false;
            const realOffset = navWrapNodeWH - navNodeWH;
            this.setOffset(realOffset, false);
            offset = realOffset;
        }

        if (offset < 0) {
            prev = true;
        }
        else {
            prev = false;
        }

        this.setNext(next);
        this.setPrev(prev);
        return {
            next,
            prev
        };
    },
    setPrev(v) {
        const prev = this.data.get('prev');
        prev !== v && this.data.set('prev', v);
    },
    setNext(v) {
        const next = this.data.get('next');
        next !== v && this.data.set('next', v);
    },
    scrollToActiveTab(e) {
        const {
            activeTab,
            navWrap
        } = this.data.get('refs');
        const isNextPrevShown = this.data.get('next') || this.data.get('prev');
        if (e && e.target !== e.currentTarget || !activeTab) {
            return;
        }

        // when not scrollable or enter scrollable first time, don't emit scrolling
        const needToSroll = isNextPrevShown && this.lastNextPrevShown;
        this.lastNextPrevShown = isNextPrevShown;
        if (!needToSroll) {
            return;
        }

        const activeTabWH = this.getScrollWH(activeTab);
        const navWrapNodeWH = this.getOffsetWH(navWrap);
        let offset = this.data.get('offset');
        const wrapOffset = this.getOffsetLT(navWrap);
        const activeTabOffset = this.getOffsetLT(activeTab);
        if (wrapOffset > activeTabOffset) {
            offset += (wrapOffset - activeTabOffset);
            this.setOffset(offset);
        }
        else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
            offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
            this.setOffset(offset);
        }
    },
    handlePrev(e) {
        this.dispatch('santd_tabs_prevClick', e);
        const refs = this.data.get('refs');
        const navWrapNode = refs.navWrap;
        const navWrapNodeWH = this.getOffsetWH(navWrapNode);
        const offset = this.data.get('offset');
        this.setOffset(offset + navWrapNodeWH);
    },
    handleNext(e) {
        this.dispatch('santd_tabs_nextClick', e);
        const refs = this.data.get('refs');
        const navWrapNode = refs.navWrap;
        const navWrapNodeWH = this.getOffsetWH(navWrapNode);
        const offset = this.data.get('offset');
        this.setOffset(offset - navWrapNodeWH);
    },
    components: {
        's-icon': Icon,
        's-previcon': prevIcon,
        's-nexticon': nextIcon
    },
    template: `
        <div
            class="${prefixCls}-nav-container {{prev || next ? '${prefixCls}-nav-container-scrolling' : ''}}"
            key="container"
            s-ref="container"
        >
            <span
                unselectable="unselectable"
                class="${prefixCls}-tab-prev {{prev || next ? '${prefixCls}-tab-arrow-show' : ''}} {{!prev ? '${prefixCls}-tab-btn-disabled' : ''}}"
                on-click="handlePrev"
            >
                <s-previcon prefixCls="${prefixCls}" tabPosition="{{tabBarPosition}}"></s-previcon>
            </span>
            <span
                unselectable="unselectable"
                class="${prefixCls}-tab-next {{prev || next ? '${prefixCls}-tab-arrow-show' : ''}} {{!next ? '${prefixCls}-tab-btn-disabled' : ''}}"
                on-click="handleNext"
            >
                <s-nexticon prefixCls="${prefixCls}" tabPosition="{{tabBarPosition}}"></s-nexticon>
            </span>
            <div class="${prefixCls}-nav-wrap" s-ref="navWrap">
                <div class="${prefixCls}-nav-scroll">
                    <div class="${prefixCls}-nav ${prefixCls}-nav-{{scrollAnimated ? 'animated' : 'no-animated'}}" s-ref="nav">
                        <slot />
                        <slot name="tab" />
                    </div>
                </div>
            </div>
        </div>
    `
});
