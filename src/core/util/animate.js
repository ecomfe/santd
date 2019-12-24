/**
 * @file Santd animate file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import cssAnimate, {isCssAnimationSupported} from './css-animation/index';

function getChildrenFromComponent(children) {
    return children.filter(child => child.nodeType && child.nodeType === 5);
}

const transitionMap = {
    enter: 'transitionEnter',
    appear: 'transitionAppear',
    leave: 'transitionLeave'
};

export default san.defineComponent({
    initData() {
        return {
            currentlyAnimatingKeys: {},
            transitionEnter: true,
            transitionLeave: true,
            animation: {}
        };
    },
    attached() {
        const slot = this.slotChildren[0];
        const showProp = this.data.get('showProp') || 'visible';
        let children = slot && getChildrenFromComponent(slot.children) || [];
        this.childs = children.length ? children : [this];
        if (showProp) {
            children = this.childs.filter(child => child.data.get(showProp));
        }
        children.forEach(child => {
            this.performAppear(child.id);
        });
    },
    computed: {
        isEnterSupported() {
            const transitionName = this.data.get('transitionName');
            const transitionEnter = this.data.get('transitionEnter');
            const animation = this.data.get('animation');

            return transitionName && transitionEnter || animation && animation.enter;
        },
        isAppearSupported() {
            const transitionName = this.data.get('transitionName');
            const transitionAppear = this.data.get('transitionAppear');
            const animation = this.data.get('animation');

            return transitionName && transitionAppear || animation && animation.appear;
        },
        isLeaveSupported() {
            const transitionName = this.data.get('transitionName');
            const transitionLeave = this.data.get('transitionLeave');
            const animation = this.data.get('animation');
            return transitionName && transitionLeave || animation && animation.leave;
        }
    },
    updated() {
        const currentlyAnimatingKeys = this.data.get('currentlyAnimatingKeys');

        const showProp = this.data.get('showProp');
        let keyToEnter;
        let keyToLeave;
        if (showProp) {
            this.childs.forEach(child => {
                if (currentlyAnimatingKeys[child.id]) {
                    return;
                }
                if (child.data.get(showProp)) {
                    keyToEnter = child.id;
                }
                else {
                    keyToLeave = child.id;
                }
            });
        }

        if (keyToEnter) {
            this.performEnter(keyToEnter);
        }
        if (keyToLeave) {
            this.performLeave(keyToLeave);
        }
    },
    performAppear(key) {
        this.childs.forEach(child => {
            if (child.id === key) {
                this.data.set('currentlyAnimatingKeys.' + key, true, {silent: true});
                this.componentWillAppear(child, this.handleDoneAdding.bind(this, key, 'appear', child));
            }
        });
    },
    performEnter(key) {
        this.childs.forEach(child => {
            if (child.id === key) {
                this.data.set('currentlyAnimatingKeys.' + key, true, {silent: true});
                this.componentWillEnter(child, this.handleDoneAdding.bind(this, key, 'enter', child));
            }
        });
    },
    performLeave(key) {
        this.childs.forEach(child => {
            if (child.id === key) {
                child.el.style.display = 'block';
                this.data.set('currentlyAnimatingKeys.' + key, true, {silent: true});
                this.componentWillLeave(child, this.handleDoneLeaving.bind(this, key, 'leave', child));
            }
        });
    },
    componentWillAppear(node, done) {
        const isAppearSupported = this.data.get('isAppearSupported');
        if (isAppearSupported) {
            this.transition(node, 'appear', done);
        }
        else {
            done();
        }
    },
    componentWillEnter(node, done) {
        const isEnterSupported = this.data.get('isEnterSupported');
        if (isEnterSupported) {
            this.transition(node, 'enter', done);
        }
        else {
            done();
        }
    },
    componentWillLeave(node, done) {
        const isLeaveSupported = this.data.get('isLeaveSupported');
        if (isLeaveSupported) {
            this.transition(node, 'leave', done);
        }
        else {
            done();
        }
    },
    transition(child, animationType, callback) {
        const transitionName = this.data.get('transitionName');
        const nameIsObj = typeof transitionName === 'object';
        const animation = this.data.get('animation') || {};

        this.stop();
        const end = () => {
            this.stopper = null;
            callback();
        };
        if ((isCssAnimationSupported || !animation[animationType])
            && transitionName && this.data.get(transitionMap[animationType])) {
            const name = nameIsObj ? transitionName[animationType] : `${transitionName}-${animationType}`;
            let activeName = `${name}-active`;
            if (nameIsObj && transitionName[`${animationType}Active`]) {
                activeName = transitionName[`${animationType}Active`];
            }
            this.stopper = cssAnimate(child.el, {
                name,
                active: activeName
            }, end);
        }
        else {
            this.stopper = animation[animationType](child.el, end);
        }
    },
    handleDoneAdding(key, animationType) {
        this.data.set('currentlyAnimatingKeys.' + key, false, {silent: true});
    },
    handleDoneLeaving(key, animationType, child) {
        // 解决动画结束后闪一下的问题，设置了子的属性后要到下一次nextTick才会刷新，所以会闪
        child.el && (child.el.style.display = '');
        this.data.set('currentlyAnimatingKeys.' + key, false, {silent: true});
    },
    stop() {
        const stopper = this.stopper;
        if (stopper) {
            this.stopper = null;
            stopper.stop();
        }
    },
    template: `
        <div class="{{!visible ? hiddenClassName : ''}}"><slot /></div>
    `
});
