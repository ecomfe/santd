/**
 * @file Santd tabs scrollable tab bar node file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';
import {setTransform, isTransform3dSupported} from './utils';
import Icon from 'santd/icon';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        tabBarPosition: DataTypes.oneOf(['left', 'right', 'top', 'bottom']),
        activeKey: DataTypes.string,
        scrollAnimated: DataTypes.bool
    },
    initData() {
        return {
            prefixCls: '',
            className: '',
            tabBarPosition: 'left',
            scrollAnimated: true,
            next: false,
            prev: false,
            offset: 0
        };
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const showNextPrev = this.data.get('showNextPrev');

            return classNames(`${prefixCls}-nav-container`, {
                [`${prefixCls}-nav-container-scrolling`]: showNextPrev
            }, className);
        },
        navClasses() {
            const prefixCls = this.data.get('prefixCls');
            const scrollAnimated = this.data.get('scrollAnimated');

            return classNames({
                [`${prefixCls}-nav`]: true,
                [scrollAnimated
                    ? `${prefixCls}-nav-animated`
                    : `${prefixCls}-nav-no-animated`]: true
            });
        },
        prevClasses() {
            const prefixCls = this.data.get('prefixCls');
            const prev = this.data.get('prev');
            const next = this.data.get('next');

            return classNames({
                [`${prefixCls}-tab-prev`]: true,
                [`${prefixCls}-tab-btn-disabled`]: !prev,
                [`${prefixCls}-tab-arrow-show`]: prev || next
            });
        },
        nextClasses() {
            const prefixCls = this.data.get('prefixCls');
            const prev = this.data.get('prev');
            const next = this.data.get('next');

            return classNames({
                [`${prefixCls}-tab-next`]: true,
                [`${prefixCls}-tab-btn-disabled`]: !next,
                [`${prefixCls}-tab-arrow-show`]: prev || next
            });
        },
        showNextPrev() {
            const prev = this.data.get('prev');
            const next = this.data.get('next');
            return prev || next;
        }
    },
    handleKeyDown(e) {
        this.fire('keydown', e);
    },
    compiled() {
        this.components.previcon = this.parentComponent.data.get('prevIcon');
        this.components.nexticon = this.parentComponent.data.get('nextIcon');
    },
    updated() {
    },
    attached() {
        this.dispatch('addRef', {
            name: 'container',
            ref: this.el
        });
        this.dispatch('addRef', {
            name: 'nav',
            ref: this.ref('nav')
        });
        this.dispatch('addRef', {
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
                } else {
                    navOffset = {
                        name: 'top',
                        value: `${target}px`
                    };
                }
            } else if (transformSupported) {
                navOffset = {
                    value: `translate3d(${target}px,0,0)`
                };
            } else {
                navOffset = {
                    name: 'left',
                    value: `${target}px`
                };
            }
            if (transformSupported) {
                setTransform(navStyle, navOffset.value);
            } else {
                navStyle[navOffset.name] = navOffset.value;
            }
            if (checkNextPrev) {
                this.setNextPrev();
            }
        }
    },
    setNextPrev() {
        const refs = this.data.get('refs');
        const navNode = refs.nav;
        const navTabsContainer = refs.navTabsContainer;
        const navNodeWH = this.getScrollWH(navTabsContainer || navNode);
        // Add 1px to fix `offsetWidth` with decimal in Chrome not correct handle
        // https://github.com/ant-design/ant-design/issues/13423
        const containerWH = this.getOffsetWH(refs.container) + 1;
        const navWrapNodeWH = this.getOffsetWH(refs.navWrap);
        let offset = this.data.get('offset');
        const minOffset = containerWH - navNodeWH;
        let {next, prev} = this.data.get();
        if (minOffset >= 0) {
            next = false;
            this.setOffset(0, false);
            offset = 0;
        } else if (minOffset < offset) {
            next = true;
        } else {
            next = false;
            // Fix https://github.com/ant-design/ant-design/issues/8861
            // Test with container offset which is stable
            // and set the offset of the nav wrap node
            const realOffset = navWrapNodeWH - navNodeWH;
            this.setOffset(realOffset, false);
            offset = realOffset;
        }

        if (offset < 0) {
            prev = true;
        } else {
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
        if (prev !== v) {
            this.data.set('prev', v);
        }
    },
    setNext(v) {
        const next = this.data.get('next');
        if (next !== v) {
            this.data.set('next', v);
        }
    },
    isNextPrevShown() {
        return this.data.get('next') || this.data.get('prev');
    },
    scrollToActiveTab(e) {
        const refs = this.data.get('refs');
        const activeTab = refs.activeTab;
        const navWrap = refs.navWrap;
        if (e && e.target !== e.currentTarget || !activeTab) {
            return;
        }

        // when not scrollable or enter scrollable first time, don't emit scrolling
        const needToSroll = this.isNextPrevShown() && this.lastNextPrevShown;
        this.lastNextPrevShown = this.isNextPrevShown();
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
        } else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
            offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
            this.setOffset(offset);
        }
    },
    handlePrev(e) {
        // this.props.onPrevClick(e);
        this.dispatch('prevClick', e);
        const refs = this.data.get('refs');
        const navWrapNode = refs.navWrap;
        const navWrapNodeWH = this.getOffsetWH(navWrapNode);
        const offset = this.data.get('offset');
        this.setOffset(offset + navWrapNodeWH);
    },
    handleNext(e) {
        this.dispatch('nextClick', e);
        const refs = this.data.get('refs');
        const navWrapNode = refs.navWrap;
        const navWrapNodeWH = this.getOffsetWH(navWrapNode);
        const offset = this.data.get('offset');
        this.setOffset(offset - navWrapNodeWH);
    },
    components: {
        's-icon': Icon
    },
    template: `
        <div
            class="{{classes}}"
            key="container"
            s-ref="container"
        >
            <span
                unselectable="unselectable"
                className="{{prevClasses}}"
                on-click="handlePrev"
            >
                <previcon prefixCls="{{prefixCls}}" tabPosition="{{tabBarPosition}}"></previcon>
            </span>
            <span
                unselectable="unselectable"
                className="{{nextClasses}}"
                on-click="handleNext"
            >
                <nexticon prefixCls="{{prefixCls}}" tabPosition="{{tabBarPosition}}"></nexticon>
            </span>
            <div class="{{prefixCls}}-nav-wrap" s-ref="navWrap">
                <div class="{{prefixCls}}-nav-scroll">
                    <div class="{{navClasses}}" s-ref="nav">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    `
});
