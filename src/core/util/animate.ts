/**
 * @file Santd animate file
 * @author mayihui@baidu.com
 **/

import Base , {NodeChild} from 'santd/base';
import cssAnimate, {isCssAnimationSupported, AnimateNode} from './css-animation/index';

const transitionMap = {
    enter: 'transitionEnter',
    appear: 'transitionAppear',
    leave: 'transitionLeave'
} as const;

type ReturnOfCssAnimate = ReturnType<typeof cssAnimate>;

type TransitionMap = keyof typeof transitionMap;

type AnimationMap = {
    [key in TransitionMap]: (ele: Element | undefined, end: Callback) => ReturnOfCssAnimate;
}

export type TransitionName = string | {
    [key in TransitionMap]: string;
} &  {
    [key in TransitionMap as `${key}Active`]?: string;
}

interface Props {
    transitionName?: TransitionName;
    transitionEnter?: boolean;
    showProp?: string;
    animation?: AnimationMap;
}

export interface State {
    currentlyAnimatingKeys: Record<string, string>;
    transitionEnter: boolean;
    transitionLeave: boolean;
    transitionAppear?: boolean;
    animation: Partial<AnimationMap>;
}

interface Computed {
    isEnterSupported: () => AnimationMap[TransitionMap] | boolean;
    isAppearSupported: () => AnimationMap[TransitionMap] | boolean;
    isLeaveSupported: () => AnimationMap[TransitionMap] | boolean;
}

type Callback = () => void;

function isTransitionNameString(name: string | undefined): name is string {
    return typeof name === 'string' && name !== '';
}

function getChildrenFromComponent(children: NodeChild[]) {
    return children.filter(child => child.nodeType && child.nodeType === 5);
}

export default class Animate extends Base<State, Props, Computed> {
    childs!: Base[]
    stopper!: ReturnOfCssAnimate | null;

    initData(): State {
        return {
            currentlyAnimatingKeys: {},
            transitionEnter: true,
            transitionLeave: true,
            animation: {}
        };
    }
    attached() {
        const slot = this.slotChildren[0];
        const showProp = this.data.get('showProp') || 'visible';
        let children = slot && (getChildrenFromComponent(slot.children) as Base[]) || [];
        this.childs = children.length ? children : [this];
        if (showProp) {
            children = (this.childs).filter(child => child.data.get(showProp));
        }
        children.forEach(child => {
            this.performAppear(child.id);
        });
    }
    static computed: Computed = {
        isEnterSupported(this: Animate) {
            const transitionName = this.data.get('transitionName');
            const transitionEnter = this.data.get('transitionEnter');
            const animation = this.data.get('animation');

            return transitionName && transitionEnter || animation && animation.enter;
        },
        isAppearSupported(this: Animate) {
            const transitionName = this.data.get('transitionName');
            const transitionAppear = this.data.get('transitionAppear');
            const animation = this.data.get('animation');

            return transitionName && transitionAppear || animation && animation.appear;
        },
        isLeaveSupported(this: Animate) {
            const transitionName = this.data.get('transitionName');
            const transitionLeave = this.data.get('transitionLeave');
            const animation = this.data.get('animation');
            return transitionName && transitionLeave || animation && animation.leave;
        }
    }
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
    }
    performAppear(key: string) {
        this.childs.forEach(child => {
            if (child.id === key) {
                this.data.set('currentlyAnimatingKeys.' + key, true, {silent: true});
                this.componentWillAppear(child, this.handleDoneAdding.bind(this, key, 'appear', child));
            }
        });
    }
    performEnter(key: string) {
        this.childs.forEach(child => {
            if (child.id === key) {
                this.data.set('currentlyAnimatingKeys.' + key, true, {silent: true});
                this.componentWillEnter(child, this.handleDoneAdding.bind(this, key, 'enter', child));
            }
        });
    }
    performLeave(key: string) {
        this.childs.forEach(child => {
            if (child.id === key) {
                (child.el as HTMLElement).style.display = 'block';
                this.data.set('currentlyAnimatingKeys.' + key, true, {silent: true});
                this.componentWillLeave(child, this.handleDoneLeaving.bind(this, key, 'leave', child));
            }
        });
    }
    componentWillAppear(node: Base, done: Callback) {
        const isAppearSupported = this.data.get('isAppearSupported');
        if (isAppearSupported) {
            this.transition(node, 'appear', done);
        }
        else {
            done();
        }
    }
    componentWillEnter(node: Base, done: Callback) {
        const isEnterSupported = this.data.get('isEnterSupported');
        if (isEnterSupported) {
            this.transition(node, 'enter', done);
        }
        else {
            done();
        }
    }
    componentWillLeave(node: Base, done: Callback) {
        const isLeaveSupported = this.data.get('isLeaveSupported');
        if (isLeaveSupported) {
            this.transition(node, 'leave', done);
        }
        else {
            done();
        }
    }
    transition(child: Base, animationType: TransitionMap, callback: Callback) {
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
            if (nameIsObj) {
                let activeStr = transitionName[`${animationType}Active`];
                if (isTransitionNameString(activeStr)) {
                    activeName = activeStr;
                }
            }
            this.stopper = cssAnimate(child.el as AnimateNode, {
                name,
                active: activeName
            }, end);
        }
        else {
            this.stopper = animation[animationType](child.el, end);
        }
    }
    handleDoneAdding(key: string, _animationType?: TransitionMap, _child?: Base) {
        this.data.set('currentlyAnimatingKeys.' + key, false, {silent: true});
    }
    handleDoneLeaving(key: string, _animationType?: TransitionMap, child?: Base) {
        // 解决动画结束后闪一下的问题，设置了子的属性后要到下一次nextTick才会刷新，所以会闪
        child?.el && ((child.el as HTMLElement).style.display = '');
        this.data.set('currentlyAnimatingKeys.' + key, false, {silent: true});
    }
    stop() {
        const stopper = this.stopper;
        if (stopper) {
            this.stopper = null;
            stopper.stop();
        }
    }
    static template = /* html */ `
        <div class="{{!visible ? hiddenClassName : ''}}"><slot /></div>
    `
};
