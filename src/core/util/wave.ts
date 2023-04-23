/**
 * @file 波纹效果，用在 button switch 等上面
 * @author wangyongqing01@baidu.com
 */
import TransitionEvents, {EventType} from './css-animation/Event';
import {classCreator} from './index';
import Base from 'santd/base';

type ClickAnimatingClsFun = (name?: string) => string;
type AnimationEventInstance = {cancel: () =>  void} | void | null;

const cc = classCreator('click-animating') as unknown as ClickAnimatingClsFun;


export default class Wave extends Base {
    static template = /* html */ `
        <ins style="display:none;"></ins>
    `;

    extraNode: HTMLDivElement | null = null;
    clickWaveTimeoutId: number | null = null;
    styleForPesudo: HTMLStyleElement | null = null;
    instance: AnimationEventInstance = null;

    attached(): void {
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.nextTick(() => {
            let el = this.el as HTMLElement;
            if (this.owner && this.owner.el) {
                el = (this.owner.ref('ownerWave') || this.owner.el) as unknown as HTMLElement;
            }
            this.instance = this.bindAnimationEvent(el);
        });
        // 清理掉无用的标签。。。好无语的写法。。
        this.el?.parentNode?.removeChild(this.el);
    };

    disposed(): void {
        if (this.instance) {
            this.instance.cancel();
        }
    };

    isNotGrey(color: string): boolean {
        const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }

        return true;
    };

    onClick(node: HTMLElement, waveColor: string) {
        if (node.className.indexOf('-leave') >= 0) {
            return;
        }
        TransitionEvents.addEndEventListener(node, this.onTransitionEnd);
        this.removeExtraStyleNode();
        const insertExtraNode = this.data.get('insertExtraNode');
        const extraNode = (this.extraNode = document.createElement('div'));
        extraNode.className = cc('node');

        const attributeName = this.getAttributeName();
        node.removeAttribute(attributeName);
        node.setAttribute(attributeName, 'true');
        // Not white or transparnt or grey
        if (
            waveColor
            && waveColor !== '#ffffff'
            && waveColor !== 'rgb(255, 255, 255)'
            && this.isNotGrey(waveColor)
            && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) // any transparent rgba color
            && waveColor !== 'transparent'
        ) {
            extraNode.style.borderColor = waveColor;
            const styleForPesudo = (this.styleForPesudo = document.createElement('style'));
            styleForPesudo.innerHTML = `[${cc('without-extra-node')}]:after { border-color: ${waveColor}; }`;
            document.body.appendChild(styleForPesudo);
        }

        if (insertExtraNode) {
            node.appendChild(extraNode);
        }

    };
    bindAnimationEvent(node: HTMLElement): AnimationEventInstance {
        if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
            return;
        }

        const onClick = (e: Event) => {
            // Fix radio button click twice
            if (e.target && (e.target as Element).tagName === 'INPUT') {
                return;
            }

            this.resetEffect(node);
            const nodeStyle = window.getComputedStyle(node);
            // Get wave color from target
            const waveColor = nodeStyle.getPropertyValue('border-top-color') // Firefox Compatible
                || nodeStyle.getPropertyValue('border-color')
                || nodeStyle.getPropertyValue('background-color');
            this.clickWaveTimeoutId = window.setTimeout(() => this.onClick(node, waveColor), 0);
        };

        node.addEventListener('click', onClick, true);
        return {
            cancel: () => {
                node.removeEventListener('click', onClick, true);
            }
        };
    };

    getAttributeName(): string {
        const insertExtraNode = this.data.get('insertExtraNode');
        return insertExtraNode ? cc() : cc('without-extra-node');
    };

    resetEffect(node: HTMLElement): void {
        if (!node || node === this.extraNode) {
            return;
        }

        const insertExtraNode = this.data.get('insertExtraNode');
        const attributeName = this.getAttributeName();
        node.removeAttribute(attributeName);
        this.removeExtraStyleNode();
        if (insertExtraNode && this.extraNode && node.contains(this.extraNode)) {
            node.removeChild(this.extraNode);
        }

        TransitionEvents.removeEndEventListener(node, this.onTransitionEnd);
    };

    onTransitionEnd(e: EventType): void {
        if (!e || TransitionEvents.isAnimationEvent(e) && e.animationName !== 'fadeEffect') {
            return;
        }
        this.resetEffect(e.target as HTMLElement);
    };

    removeExtraStyleNode(): void {
        if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
            document.body.removeChild(this.styleForPesudo);
            this.styleForPesudo = null;
        }
    }
}
