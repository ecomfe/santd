/**
 * @file 波纹效果，用在 button switch 等上面
 * @author wangyongqing01@baidu.com
 */
import san from 'san';
import TransitionEvents from './css-animation/Event';
import {classCreator} from './index';
const cc = classCreator('click-animating');

export default san.defineComponent({
    template: `
        <ins style="display:none;"></ins>
    `,
    attached() {
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.nextTick(() => {
            let el = this.el;
            if (this.owner && this.owner.el) {
                el = this.owner.ref('ownerWave') || this.owner.el;
            }
            this.instance = this.bindAnimationEvent(el);
        });
        // 清理掉无用的标签。。。好无语的写法。。
        this.el.parentNode.removeChild(this.el);
    },
    disposed() {
        if (this.instance) {
            this.instance.cancel();
        }
    },
    isNotGrey(color) {
        const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }

        return true;
    },
    onClick(node, waveColor) {
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

    },
    bindAnimationEvent(node) {
        if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
            return;
        }

        const onClick = e => {
            // Fix radio button click twice
            if (e.target.tagName === 'INPUT') {
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
    },
    getAttributeName() {
        const insertExtraNode = this.data.get('insertExtraNode');
        return insertExtraNode ? cc() : cc('without-extra-node');
    },

    resetEffect(node) {
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
    },

    onTransitionEnd(e) {
        if (!e || e.animationName !== 'fadeEffect') {
            return;
        }

        this.resetEffect(e.target);
    },
    removeExtraStyleNode() {
        if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
            document.body.removeChild(this.styleForPesudo);
            this.styleForPesudo = null;
        }
    }
});
