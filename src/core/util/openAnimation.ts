/**
 * @file Santd open animation file
 **/

import cssAnimation from './css-animation';
import {requestAnimationTimeout, cancelAnimationTimeout} from './index';

function animate(node: HTMLElement, show: boolean, done = () => {}) {
    let height: number;
    let requestAnimationFrameId: {id: number};
    return cssAnimation(node, 'san-motion-collapse-legacy', {
        start() {
            if (!show) {
                node.style.height = `${node.offsetHeight}px`;
                node.style.opacity = '1';
            }
            else {
                height = node.offsetHeight;
                node.style.height = '0px';
                node.style.opacity = '0';
            }
        },
        active() {
            if (requestAnimationFrameId) {
                cancelAnimationTimeout(requestAnimationFrameId);
            }
            requestAnimationFrameId = requestAnimationTimeout(() => {
                node.style.height = `${show ? height : 0}px`;
                node.style.opacity = show ? '1' : '0';
            }, 0);
        },
        end() {
            if (requestAnimationFrameId) {
                cancelAnimationTimeout(requestAnimationFrameId);
            }
            node.style.height = '';
            node.style.opacity = '';
            done();
        }
    });
}

export default {
    enter(node: HTMLElement, done = () => {}) {
        return animate(node, true, done);
    },
    leave(node: HTMLElement, done = () => {}) {
        return animate(node, false, done);
    },
    appear(node: HTMLElement, done = () => {}) {
        return animate(node, true, done);
    }
};
